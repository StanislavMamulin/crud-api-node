import {
  HandleError,
  IdNotFoundError,
  InvalidUrlError,
  RequiredParametersNotProvided,
  ServerInternalError,
  UserNotFoundError,
} from '../Errors/customErrors.js';
import { USER_API_URL } from '../constants/api.js';
import { UserInfo, UserRecord, UserUpdate, isUserInfo, isUserUpdate } from '../model/user.types.js';
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

export const createUser: RouterCallback = async (req, res) => {
  try {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        if (!req.url) throw new InvalidUrlError();

        const userInfo: UserInfo = JSON.parse(body);
        if (!isUserInfo(userInfo)) throw new RequiredParametersNotProvided();

        const user: UserRecord = UserService.createUser(userInfo);
        if (!user) throw new ServerInternalError();

        res.writeHead(201, { 'Content-Type': 'application/json' }).end(JSON.stringify(user));
      } catch (err) {
        HandleError(req, res, err);
      }
    });
  } catch (error) {
    HandleError(req, res, error);
  }
};

export const updateUser: RouterCallback = async (req, res) => {
  try {
    if (!req.url) throw new InvalidUrlError();

    const id = getID(req.url);
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const userInfo: UserUpdate = JSON.parse(body);
        if (!isUserUpdate(userInfo)) throw new RequiredParametersNotProvided();

        const user = UserService.updateUser(id, userInfo);
        if (!user) throw new UserNotFoundError();

        res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(user));
      } catch (err) {
        HandleError(req, res, err);
      }
    });
  } catch (error) {
    HandleError(req, res, error);
  }
};
