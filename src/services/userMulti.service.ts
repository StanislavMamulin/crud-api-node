import { UserRecord } from '../model/user.types.js';

export const addUser = (user: UserRecord, usersDB: UserRecord[]): void => {
  usersDB.push(user);
};

export const updateUser = (id: string, newUserInfo: UserRecord, usersDB: UserRecord[]): void => {
  const userIndex = usersDB.findIndex((user) => user.id === id);

  usersDB[userIndex] = newUserInfo;
};

export const deleteUser = (id: string, usersDB: UserRecord[]) => {
  const userIndex = usersDB.findIndex((userItem) => userItem.id === id);

  usersDB.splice(userIndex, 1);

  return userIndex;
};
