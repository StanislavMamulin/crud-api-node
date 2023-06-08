import { IncomingMessage, ServerResponse } from 'http';
import { Worker } from 'cluster';
import { UserRecord } from '../model/user.types.js';

export type RouterCallback = (req: IncomingMessage, res: ServerResponse) => Promise<void>;
export type RouterErrorCallback = (req: IncomingMessage, res: ServerResponse, err: unknown) => void;
export type RouterMultiCallback = (
  req: IncomingMessage,
  DB: UserRecord[],
  worker: Worker
) => Promise<void>;
