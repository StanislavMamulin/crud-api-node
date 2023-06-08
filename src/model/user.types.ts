export type UserInfo = {
  username: string;
  age: number;
  hobbies: string[];
};

export type UserRecord = UserInfo & {
  id: string;
};

export type UserUpdate = Partial<UserInfo>;

export function isUserInfo(info: unknown): info is UserInfo {
  return (
    (info as UserInfo).username !== undefined &&
    typeof (info as UserInfo).username === 'string' &&
    (info as UserInfo).age !== undefined &&
    typeof (info as UserInfo).age === 'number' &&
    (info as UserInfo).hobbies !== undefined &&
    Array.isArray((info as UserInfo).hobbies)
  );
}

export function isUserUpdate(update: unknown): update is UserUpdate {
  return (
    ((update as UserUpdate).username !== undefined &&
      typeof (update as UserUpdate).username === 'string') ||
    ((update as UserUpdate).age !== undefined && typeof (update as UserUpdate).age === 'number') ||
    ((update as UserUpdate).hobbies !== undefined && Array.isArray((update as UserUpdate).hobbies))
  );
}

export function isUserRecord(info: unknown): info is UserRecord {
  return (
    (info as UserRecord).username !== undefined &&
    typeof (info as UserRecord).username === 'string' &&
    (info as UserRecord).age !== undefined &&
    typeof (info as UserRecord).age === 'number' &&
    (info as UserRecord).hobbies !== undefined &&
    Array.isArray((info as UserRecord).hobbies) &&
    (info as UserRecord).id !== undefined &&
    typeof (info as UserRecord).id === 'string'
  );
}
