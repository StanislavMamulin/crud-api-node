import cluster, { Worker } from 'node:cluster';
import { cpus } from 'node:os';
import { createServer, request } from 'http';
import { UserRecord, isUserRecord } from './model/user.types.js';
import { getUsersDB } from './model/usersDB.js';
import { createHTTPServer } from './server.js';
import { routerMulti } from './routers/routerMulti.js';
import { getHostnameFromReq } from './helpers/network.js';

const numCPUs = cpus().length;
const PORT = process.env.PORT || 4000;
let currentWorker = 0;
const workers: Worker[] = [];
const DB: UserRecord[] = [];

const pidToPort = new Map<number, number>();

const getNextWorker = () => {
  currentWorker %= numCPUs;
  return currentWorker++;
};

const createWorkers = () => {
  for (let i = 1; i <= numCPUs; i++) {
    const workerPort: number = Number(PORT) + i;
    const worker = cluster.fork({ PORT: workerPort });

    if (!worker || !worker.process.pid) {
      throw new Error('Worker not created');
    }

    pidToPort.set(worker.process.pid, workerPort);
    workers.push(worker);
  }
};

if (cluster.isPrimary) {
  console.log(`Primary process with PID ${process.pid} is running`);
  createWorkers();

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
  });

  const server = createServer();
  server.on('request', async (req, res) => {
    const currentWorkerReq: Worker = workers[getNextWorker()];
    const currentWorkerPid = currentWorkerReq.process.pid;
    const workerPort = pidToPort.get(currentWorkerPid!);

    const options = {
      hostname: getHostnameFromReq(req),
      port: workerPort,
      path: req.url,
      method: req.method,
      headers: req.headers,
    };

    const proxy = request(options, async (proxyRes) => {
      const DBl = getUsersDB();

      if (proxyRes.statusCode && proxyRes.statusCode < 299) {
        const action = await routerMulti(req, res, proxyRes, DBl);

        workers.forEach((worker) => {
          if (worker.process.pid !== currentWorkerPid) {
            worker.send(action);
          }
        });
      }

      proxyRes.pipe(res, {
        end: true,
      });
    });

    req.pipe(proxy, {
      end: true,
    });
  });

  server.listen(PORT, () => {
    console.log(`Load balancer server is running: http://localhost:${PORT}`);
  });
} else {
  process.on('message', (msg: { action: string; payload: UserRecord | number }) => {
    const { action, payload } = msg;
    if (action === 'add') {
      if (isUserRecord(payload)) {
        DB.push(payload);
      }
    } else if (action === 'delete') {
      if (typeof payload === 'number') {
        DB.splice(payload, 1);
      }
    } else if (action === 'update') {
      if (isUserRecord(payload)) {
        const { id } = payload;
        const index = DB.findIndex((userItem) => userItem.id === id);
        DB[index] = payload;
      }
    }
  });

  const server = createHTTPServer(DB);

  server.listen(PORT, () => {
    console.log(`Fork server is running: http://localhost:${PORT}`);
  });
}
