import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import App from '@/app';
import { CreateUserDto } from '@dtos/users.dto';
import UsersRoute from '@routes/users.route';

jest.mock('@middlewares/authAdmin.middleware', () =>
  jest.fn((req, res, next) => {
    return next();
  }),
);
jest.mock('@middlewares/auth.middleware', () =>
  jest.fn((req, res, next) => {
    return next();
  }),
);
jest.mock('@middlewares/authUser.middleware', () =>
  jest.fn((req, res, next) => {
    return next();
  }),
);
// import authMiddlewareAdmin from '@middlewares/authAdmin.middleware';
// import authMiddleware from '@middlewares/authAdmin.middleware';
afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Users', () => {
  describe('[GET] /users', () => {
    it('response fineAll Users', async () => {
      //還沒有test query的
      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.find = jest.fn().mockReturnValue([
        {
          _id: 'qpwoeiruty',
          email: 'a@email.com',
          password: await bcrypt.hash('q1w2e3r4!', 10),
        },
        {
          _id: 'alskdjfhg',
          email: 'b@email.com',
          password: await bcrypt.hash('a1s2d3f4!', 10),
        },
        {
          _id: 'zmxncbv',
          email: 'c@email.com',
          password: await bcrypt.hash('z1x2c3v4!', 10),
        },
      ]);

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}`).expect(200);
    });
    it('response find latest User', async () => {
      //還沒有test query的
      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.find = jest.fn().mockReturnValue([
        {
          _id: 'qpwoeiruty',
          email: 'a@email.com',
          password: await bcrypt.hash('q1w2e3r4!', 10),
        },
        {
          _id: 'qpwoeiruty',
          email: 'a@email.com',
          password: await bcrypt.hash('q1w2e3r4!', 10),
        },
        {
          _id: 'qpwoeiruty',
          email: 'a@email.com',
          password: await bcrypt.hash('q1w2e3r4!', 10),
        },
      ]);

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);
      const response = await request(app.getServer()).get(`${usersRoute.path}`).query({ new: 'true' });
      console.log(response.body);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('[GET] /users/:id', () => {
    it('response findOne User', async () => {
      const userId = 'qpwoeiruty';

      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.findOne = jest.fn().mockReturnValue({
        _id: 'qpwoeiruty',
        email: 'a@email.com',
        isAdmin: false,
        password: await bcrypt.hash('q1w2e3r4!', 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}/${userId}`).expect(200);
    });
  });

  describe('[POST] /users', () => {
    it('response Create User', async () => {
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4!',
        username: 'Kai3456',
        isAdmin: false,
      };

      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.findOne = jest.fn().mockReturnValue(null);
      users.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).post(`${usersRoute.path}`).send(userData).expect(201);
    });
  });

  describe('[PUT] /users/:id', () => {
    it('response Update User', async () => {
      const userId = '60706478aad6c9ad19a31c84';
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4!',
        username: 'Kai3456',
        isAdmin: false,
      };

      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      if (userData.email) {
        users.findOne = jest.fn().mockReturnValue({
          _id: userId,
          email: userData.email,
          password: await bcrypt.hash(userData.password, 10),
        });
      }

      users.findByIdAndUpdate = jest.fn().mockReturnValue({
        _id: userId,
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).put(`${usersRoute.path}/${userId}`).send(userData).expect(200);
    });
  });
  describe('[GET] /users/find/stats', () => {
    it('response Find UserStats', async () => {
      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;
      users.aggregate = jest.fn().mockReturnValue({
        _id: 10,
        total: 1,
      });
      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}/find/stats`).expect(200);
      // const response = await request(app.getServer()).get(`${usersRoute.path}/find/stats`);
      // expect(response.body).toEqual({ _id: 10, total: 1 });
    });
  });
  describe('[DELETE] /users/:id', () => {
    it('response Delete User', async () => {
      const userId = '60706478aad6c9ad19a31c84';

      const usersRoute = new UsersRoute();
      const users = usersRoute.usersController.userService.users;

      users.findByIdAndDelete = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        email: 'test@email.com',
        password: await bcrypt.hash('q1w2e3r4!', 10),
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).delete(`${usersRoute.path}/${userId}`).expect(200);
    });
  });
});
