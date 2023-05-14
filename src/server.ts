import { createServer } from 'http';
import { router } from './routers/router.js';

export const server = createServer();

server.on('request', router);
