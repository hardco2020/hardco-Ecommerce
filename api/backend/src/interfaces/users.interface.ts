export interface User extends MongoResult {
  _id: string;
  email: string;
  password?: string;
  username: string;
  isAdmin: boolean;
  facebookId?: string;
}
export interface MongoResult {
  _doc?: any;
}

export interface UserStats {
  _id: number;
  totla: number;
}
