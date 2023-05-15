import { v4 as uuidv4 } from 'uuid';
import { UserInfo, UserRecord, UserUpdate } from '../model/user.types';
import { checkId, checkSearchResult } from '../helpers/validators.js';
import { getDB } from '../server.js';

export const getUsers = (): UserRecord[] => getDB();

export const createUser = (user: UserInfo): UserRecord => {
  const usersDB = getDB();
  const newUser: UserRecord = { id: uuidv4(), ...user };
  usersDB.push(newUser);

  return newUser;
};

export const getUser = (id: string) => {
  const usersDB = getDB();
  checkId(id);

  const user = usersDB.find((userRecord) => userRecord.id === id);
  checkSearchResult(user);

  return user;
};

export const updateUser = (id: string, userInfo: UserUpdate): UserRecord => {
  const usersDB = getDB();
  checkId(id);

  const userIndex = usersDB.findIndex((user) => user.id === id);
  checkSearchResult(userIndex);

  const existedUser = usersDB[userIndex];
  usersDB[userIndex] = { ...existedUser, ...userInfo };

  return usersDB[userIndex];
};

export const deleteUser = (id: string) => {
  const usersDB = getDB();
  checkId(id);

  const userIndex = usersDB.findIndex((user) => user.id === id);
  checkSearchResult(userIndex);

  usersDB.splice(userIndex, 1);
};
