import { createServer } from 'http';
import { router } from './routers/router.js';
import { UserRecord } from './model/user.types.js';
import { CreateHTTPServer, GetDB } from './server.types.js';

let database: UserRecord[];

export const createHTTPServer: CreateHTTPServer = (DB: UserRecord[]) => {
  database = DB;
  const server = createServer();

  server.on('request', router);

  return server;
};

export const getDB: GetDB = () => database;
