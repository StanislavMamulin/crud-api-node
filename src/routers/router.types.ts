import { IncomingMessage, ServerResponse } from 'http';

export type RouterCallback = (req: IncomingMessage, res: ServerResponse) => Promise<void>;
export type RouterErrorCallback = (req: IncomingMessage, res: ServerResponse, err: unknown) => void;
