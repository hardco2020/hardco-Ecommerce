export interface User extends MongoResult {
  _id: string;
  email: string;
  password?: string;
  username: string;
  isAdmin: boolean;
  facebookId?: string;
  googleId?: string;
  img?: string;
}
export interface MongoResult {
  _doc?: any;
}

export interface UserStats {
  _id: number;
  total: number;
}
