export type UserInfo = {
  username: string;
  age: number;
  hobbies: string[];
};

export type UserRecord = UserInfo & {
  id: string;
};

export type UserUpdate = Partial<UserInfo>;
