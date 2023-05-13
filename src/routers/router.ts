import { HandleError, InvalidUrlError } from '../Errors/customErrors.js';
import { USER_API_URL } from '../constants/api.js';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '../controllers/user.controller.js';
import { RouterCallback } from './router.types';

export const router: RouterCallback = async (req, res): Promise<void> => {
  const { method } = req;

  try {
    if (!req.url || !req.url.includes(USER_API_URL)) {
      throw new InvalidUrlError();
    }

    const id = req.url.split(`${USER_API_URL}/`).pop();
    if (method === 'GET') {
      if (!id) {
        getAllUsers(req, res);
      } else {
        getUserById(req, res);
      }
    } else if (method === 'POST') {
      createUser(req, res);
    } else if (method === 'PUT') {
      updateUser(req, res);
    } else if (method === 'DELETE') {
      // deleteUser(req, res);
    }
  } catch (error) {
    HandleError(req, res, error);
  }
};
