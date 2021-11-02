import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import { CreateUserDto } from '@dtos/users.dto';
import { LoginFormDto } from '@dtos/login.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';

class AuthService {
  public users = userModel;

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) {
      if (findUser.facebookId !== undefined) {
        throw new HttpException(409, `You have already register this email with Facebook,please login with Facebook`);
      }
      throw new HttpException(409, `Your email already exists`);
    }
    // if (isEmpty(findUser.facebookId) !== true) {
    //   throw new HttpException(409, `You have already register this email with Facebook,please login with Facebook`);
    // }
    // if (findUser) throw new HttpException(409, `Your email already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async login(userData: LoginFormDto): Promise<{ cookie: string; findUser: User }> {
    //確認有沒有data
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    //尋找對應email的User 分以下幾種狀況
    //找到Facebook Emai
    //   - 到Facebook Email回傳 已經有Facebook帳戶 請利用Facebook登入
    //找到正常Email
    //   - 檢查 password 如果沒有password回傳要輸入password
    //   - 檢查 password有沒有一樣如果沒有一樣則回傳password不對
    const findUser: User = await this.users.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `Your email not found`);

    // if (!findUser) throw new HttpException(409, `Your email ${userData.email} not found`);

    if (findUser.facebookId !== undefined) {
      throw new HttpException(409, `Your email already registered a Facebook account, please sign in with Facebook`);
    } else {
      if (isEmpty(userData.password)) throw new HttpException(409, 'Please input password');
      const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
      if (!isPasswordMatching) throw new HttpException(409, 'Your password not matching');
    }

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }
  public async FacebookLogin(user: User): Promise<{ cookie: string }> {
    const tokenData = this.createToken(user);
    const cookie = this.createCookie(tokenData);
    return { cookie };
  }
  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    console.log(userData);
    const findUser: User = await this.users.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey: string = config.get('secretKey');
    const expiresIn: number = 60 * 60 * 60;

    return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
    //jwt token 方式
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
