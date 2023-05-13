import { v4 as uuidv4 } from 'uuid';
import { UserInfo, UserRecord, UserUpdate } from '../model/user.types';
import { checkId, checkSearchResult } from '../helpers/validators.js';
import { getUsersDB } from '../model/usersDB.js';

const usersDB = getUsersDB();

export const getUsers = (): UserRecord[] => usersDB;

export const createUser = (user: UserInfo) => {
  usersDB.push({ id: uuidv4(), ...user });
};

export const getUser = (id: string) => {
  checkId(id);

  const user = usersDB.find((userRecord) => userRecord.id === id);
  checkSearchResult(user);

  return user;
};

export const updateUser = (id: string, userInfo: UserUpdate): UserRecord => {
  checkId(id);

  const userIndex = usersDB.findIndex((user) => user.id === id);
  checkSearchResult(userIndex);

  const existedUser = usersDB[userIndex];
  usersDB[userIndex] = { ...existedUser, ...userInfo };

  return usersDB[userIndex];
};

export const deleteUser = (id: string) => {
  checkId(id);

  const userIndex = usersDB.findIndex((user) => user.id === id);
  checkSearchResult(userIndex);

  usersDB.splice(userIndex, 1);
};
