import { validate as uuidValidate } from 'uuid';
import { INCORRECT_ID, USER_NOT_EXISTS } from '../constants/errorText.js';
import { UserRecord } from '../model/user.model';

export const checkId = (id: string) => {
  if (!uuidValidate(id)) {
    throw new Error(INCORRECT_ID);
  }
};

export const checkSearchResult = (result: UserRecord | undefined | number) => {
  if (result === -1 || result === undefined) {
    throw new Error(USER_NOT_EXISTS);
  }
};
