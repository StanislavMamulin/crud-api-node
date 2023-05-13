import {
  HandleError,
  IdNotFoundError,
  InvalidUrlError,
  UserNotFoundError,
} from '../Errors/customErrors.js';
import { USER_API_URL } from '../constants/api.js';
import { RouterCallback } from '../routers/router.types';
import * as UserService from '../services/user.service.js';

const getID = (url: string) => {
  const id = url.split(`${USER_API_URL}/`).pop();
  if (!id) {
    throw new IdNotFoundError();
  }
  if (id.split('/').length > 1) {
    throw new InvalidUrlError();
  }

  return id;
};

export const getAllUsers: RouterCallback = async (req, res) => {
  try {
    const users = UserService.getUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(users));
    res.end();
  } catch (error) {
    HandleError(req, res, error);
  }
};

export const getUserById: RouterCallback = async (req, res) => {
  try {
    if (!req.url) {
      throw new InvalidUrlError();
    }

    const id = getID(req.url);
    const user = UserService.getUser(id);
    if (!user) {
      throw new UserNotFoundError();
    }

    res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(user));
    res.end();
  } catch (error) {
    HandleError(req, res, error);
  }
};
