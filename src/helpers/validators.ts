import { validate as uuidValidate } from 'uuid';
import { UserRecord } from '../model/user.types.js';
import { IncorrectIdError, UserNotFoundError } from '../Errors/customErrors.js';

export const checkId = (id: string) => {
  if (!uuidValidate(id)) {
    throw new IncorrectIdError();
  }
};

export const checkSearchResult = (result: UserRecord | undefined | number) => {
  if (result === -1 || result === undefined) {
    throw new UserNotFoundError();
  }
};
