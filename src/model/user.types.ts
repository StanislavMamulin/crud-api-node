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
