import { IncomingMessage } from 'http';

export const getHostnameFromReq = (req: IncomingMessage) => req.headers.host?.split(':')[0];

export const getBodyFromReq = (req: IncomingMessage) =>
  new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      resolve(JSON.parse(body));
    });
  });
