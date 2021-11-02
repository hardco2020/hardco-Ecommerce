import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import App from '@/app';
import { CreateUserDto } from '@dtos/users.dto';
import AuthRoute from '@routes/auth.route';
import { LoginFormDto } from '@/dtos/login.dto';
// import { User } from '@/interfaces/users.interface';

afterAll(async () => {
  // await mongoose.connection.db.dropDatabase();
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Auth', () => {
  describe('[POST] /signup', () => {
    //Server action should only call once
    //Successful response from creating data
    //----should return expected data
    //errorHandler when passing wrong data should also return 400、409response
    //----spell error handleing with middleware ( password length has to > 8 , email has to be email )
    //----for repeating register account
    //----for missing field
    //----if using facebook email to create normal email
    it('save the data into the database basic action', async () => {
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4!',
        username: 'Kai3456',
        isAdmin: false,
      };
      const authRoute = new AuthRoute();
      const users = authRoute.authController.authService.users; // test services?
      users.findOne = jest.fn().mockReturnValue(null); //建立一個假的return value
      users.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
        username: userData.username,
        isAdmin: false,
      });
      (mongoose as any).connect = jest.fn();
      const app = new App([authRoute]);
      const response = await request(app.getServer()).post(`${authRoute.path}signup`).send(userData);
      // console.log(response.text);
      expect(response.statusCode).toBe(201); //create successful
    });
    it('response should return 404 if data has missing field', async () => {
      //check User
      const userData = {
        password: 'q1w2e3r4!',
        username: 'Kai3456',
        isAdmin: false,
      };

      const authRoute = new AuthRoute();
      const users = authRoute.authController.authService.users;

      users.findOne = jest.fn().mockReturnValue(null); //建立一個假的return value
      // users.create = jest.fn().mockReturnValue({
      //   _id: '60706478aad6c9ad19a31c84',
      //   email: userData.email,
      //   password: await bcrypt.hash(userData.password, 10),
      // });

      (mongoose as any).connect = jest.fn();
      const app = new App([authRoute]);
      const response = await request(app.getServer()).post(`${authRoute.path}signup`).send(userData);
      expect(response.text).toContain('email must be an email');
      expect(response.statusCode).toBe(400);
    });
    it('if senddata has repeat email , it shuold return 409 and error message', async () => {
      //check User
      const userData = {
        email: 'test@email.com',
        password: 'q1w2e3r4!',
        username: 'Kai3456',
        isAdmin: false,
      };

      const authRoute = new AuthRoute();
      const users = authRoute.authController.authService.users;

      users.findOne = jest.fn().mockReturnValue(userData); //建立一個假的return value
      // users.create = jest.fn().mockReturnValue({
      //   _id: '60706478aad6c9ad19a31c84',
      //   email: userData.email,
      //   password: await bcrypt.hash(userData.password, 10),
      // });

      (mongoose as any).connect = jest.fn();
      const app = new App([authRoute]);
      const response = await request(app.getServer()).post(`${authRoute.path}signup`).send(userData);
      expect(response.text).toContain('already exists');
      expect(response.statusCode).toBe(409);
    });
    // it('if send data has register facebook email , it shuold return 409 and error message', async () => {
    //   const userData: CreateUserDto = {
    //     email: 'test@email.com',
    //     password: 'q1w2e3r4!',
    //     username: 'Kai3456',
    //     isAdmin: false,
    //   };
    //   const authRoute = new AuthRoute();
    //   const users = authRoute.authController.authService.users;
    //   users.findOne = jest.fn().mockReturnValue({
    //     _id: '60706478aad6c9ad19a31c84',
    //     email: userData.email,
    //     facebookId: '394834983434',
    //   });
    //   (mongoose as any).connect = jest.fn();
    //   const app = new App([authRoute]);
    //   const response = await request(app.getServer()).post(`${authRoute.path}signup`).send(userData);
    //   expect(response.text).toContain('You have already register this email with Facebook,please login with Facebook');
    //   expect(response.statusCode).toBe(409);
    // });
  });

  describe('[POST] /login', () => {
    //test successful response data
    //test wrong password input response message
    //test wrong email input response message
    //test missing field
    //test if not sending anything ?
    const authRoute = new AuthRoute();
    const users = authRoute.authController.authService.users;
    (mongoose as any).connect = jest.fn();
    const app = new App([authRoute]);
    const userData: LoginFormDto = {
      email: 'test@email.com',
      password: 'q1w2e3r4!',
    };
    it('response should have the Set-Cookie header with the Authorization token', async () => {
      users.findOne = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });
      const response = await request(app.getServer())
        .post(`${authRoute.path}login`)
        .send(userData)
        .expect('Set-Cookie', /^Authorization=.+/);
      expect(response.statusCode).toBe(200);
      expect(response.text).toContain('_id');
    });
    it('input wrong password will return error message', async () => {
      users.findOne = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        email: userData.email,
        password: await bcrypt.hash('34348394', 10),
      });
      const response = await request(app.getServer()).post(`${authRoute.path}login`).send(userData);
      expect(response.statusCode).toBe(409);
      expect(response.text).toContain('Your password not matching');
    });
    it('input none existing email will return error message', async () => {
      users.findOne = jest.fn().mockReturnValue(null);
      const response = await request(app.getServer()).post(`${authRoute.path}login`).send(userData);
      expect(response.statusCode).toBe(409);
      expect(response.text).toContain(`Your email not found`);
    });
    it('Did not input password field will return error message', async () => {
      const userData = {
        email: 'test@email.com',
      };
      users.findOne = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        email: userData.email,
        password: await bcrypt.hash('34348394', 10),
      });
      const response = await request(app.getServer()).post(`${authRoute.path}login`).send(userData);
      expect(response.text).toContain(`Please input password`);
      expect(response.statusCode).toBe(409);
    });
    it('testing middleware not sending anything', async () => {
      const response = await request(app.getServer()).post(`${authRoute.path}login`);
      expect(response.statusCode).toBe(400);
      expect(response.text).toContain(`email must be an email`);
    });

    it('Should return error when login local with Facebook email', async () => {
      users.findOne = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        email: userData.email,
        password: await bcrypt.hash('34348394', 10),
        facebookId: '344343434343434',
      });
      const response = await request(app.getServer()).post(`${authRoute.path}login`).send(userData);
      expect(response.statusCode).toBe(409);
      expect(response.text).toContain(`Your email already registered a Facebook account, please sign in with Facebook`);
    });
  });

  // describe('[POST] /logout', () => {
  //   const authRoute = new AuthRoute();
  //   const users = authRoute.authController.authService.users;
  //   (mongoose as any).connect = jest.fn();
  //   const app = new App([authRoute]);

  //   it('logout Set-Cookie Authorization=; Max-age=0', async () => {
  //     const userData: User = {
  //       _id: '60706478aad6c9ad19a31c84',
  //       email: 'test@email.com',
  //       username: 'Kai123456',
  //       isAdmin: false,
  //       password: await bcrypt.hash('q1w2e3r4!', 10),
  //     };
  //     users.findById = jest.fn().mockReturnValue(userData);
  //     const response = await request(app.getServer())
  //       .post(`${authRoute.path}logout`)
  //       .send(userData)
  //       .set('Cookie', ['nameOne=valueOne;nameTwo=valueTwo']);
  //     // .set('set-cookie', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ');
  //     // .expect('Set-Cookie', /^Authorization=\; Max-age=0/);
  //     // console.log(response.header);
  //     // console.log(response);
  //   });
  // });
});
