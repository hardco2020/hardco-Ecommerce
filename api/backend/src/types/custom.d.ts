declare namespace Express {
  interface User {
    _id: string;
    email: string;
    password?: string;
    username: string;
    isAdmin: boolean;
    facebookId?: string;
  }
}
