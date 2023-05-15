import { IncomingMessage, Server, ServerResponse } from 'http';
import { UserRecord } from './model/user.types.js';

export type CreateHTTPServer = (
  DB: UserRecord[]
) => Server<typeof IncomingMessage, typeof ServerResponse>;

export type GetDB = () => UserRecord[];
