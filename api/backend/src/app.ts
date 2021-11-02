process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from 'config';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { connect, NativeError, set } from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { dbConnection } from '@databases';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import passport from 'passport';
import passportFacebook from 'passport-facebook';
import session from 'express-session';
import { FACEBOOK_APP_SECRET } from './interfaces/auth.interface';
import userModel from './models/users.model';
import { User } from '@interfaces/users.interface';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }
    connect(dbConnection.url, dbConnection.options);
    // .then(() => console.log('DB Connection Successful!'))
    // .catch(err => {
    //   console.log(err);
    // });
  }

  private initializeMiddlewares() {
    this.app.use(morgan(config.get('log.format'), { stream }));
    this.app.use(cors({ origin: 'http://localhost:3000', credentials: config.get('cors.credentials') }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(session({ secret: 'secret' }));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    // this.app.all('/*', function (req, res, next) {
    //   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    //   next();
    // });
    passport.serializeUser(function (user, done) {
      done(null, user);
    });
    passport.deserializeUser(function (user: Express.User, done) {
      done(null, user);
    });
    const { id, secret }: FACEBOOK_APP_SECRET = config.get('Facebook');
    const FacebookStrategy = passportFacebook.Strategy;
    passport.use(
      new FacebookStrategy(
        {
          clientID: id,
          clientSecret: secret,
          callbackURL: 'http://localhost:3001/auth/facebook/callback',
          profileFields: ['id', 'displayName', 'link', 'email'],
        },
        function (accessToken, refreshToken, profile, cb, done) {
          // console.log('妳好', accessToken);
          // console.log('妳好', refreshToken);
          // console.log('你好', profile);
          // console.log('你好', profile.email);
          console.log('你好', cb);
          userModel.findOne({ facebook: cb.id }, (err: NativeError, existingUser: User) => {
            if (err) {
              console.log('錯誤', err);
              return done(err);
            }
            if (existingUser) {
              console.log('存在', existingUser);
              return done(undefined, existingUser);
            } else {
              userModel.findOne({ email: cb._json.email }, (err: NativeError, existingEmailUser: User) => {
                console.log('不存在');
                if (err) {
                  console.log(err);
                  return done(err);
                }
                if (existingEmailUser) {
                  console.log('此email已經被註冊', existingUser);
                  return done(undefined, existingEmailUser);
                } else {
                  const user = new userModel();
                  user.email = cb._json.email;
                  user.facebookId = cb.id;
                  user.isAdmin = false;
                  // userModel.create({ user });
                  user.save((err: Error) => {
                    done(err, user);
                  });
                }
              });
            }
          });
        },
      ),
    );
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
