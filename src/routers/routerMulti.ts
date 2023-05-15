import { IncomingMessage, ServerResponse } from 'http';
import * as UserMultiService from '../services/userMulti.service.js';
import { UserRecord, isUserRecord } from '../model/user.types.js';
import { USER_API_URL } from '../constants/api.js';
import { getBodyFromReq } from '../helpers/network.js';

export const routerMulti = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  proxyResponse: IncomingMessage,
  DB: UserRecord[]
) => {
  const { method } = req;

  if (method === 'POST') {
    const user = (await getBodyFromReq(proxyResponse)) as UserRecord;
    if (user && isUserRecord(user)) {
      UserMultiService.addUser(user, DB);
    }
    res.end(JSON.stringify(user));

    return { action: 'add', payload: user };
  }
  if (method === 'PUT') {
    const user = (await getBodyFromReq(proxyResponse)) as UserRecord;

    if (req.url && isUserRecord(user)) {
      const id = req.url.split(`${USER_API_URL}/`)[1];
      UserMultiService.updateUser(id, user, DB);
    }

    res.end(JSON.stringify(user));

    return { action: 'update', payload: user };
  }
  if (method === 'DELETE') {
    let deletedIndex = -1;
    if (req.url) {
      const id = req.url.split(`${USER_API_URL}/`)[1];
      deletedIndex = UserMultiService.deleteUser(id, DB);
    }
    return { action: 'delete', payload: deletedIndex };
  }

  return { action: 'unknown' };
};
