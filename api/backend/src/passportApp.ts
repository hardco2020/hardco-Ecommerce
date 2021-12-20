import { THIRD_PARTY_SECRET } from './interfaces/auth.interface';
import userModel from './models/users.model';
import { User } from '@interfaces/users.interface';
import passport from 'passport';
import passportFacebook from 'passport-facebook';
import passportGoogle from 'passport-google-oauth20';
import config from 'config';
import { NativeError } from 'mongoose';
import EmailService from './services/email.service';

const { id: FacebookId, secret: FacebookSecret }: THIRD_PARTY_SECRET = config.get('Facebook');
const { id: GoogleId, secret: GoogleSecret }: THIRD_PARTY_SECRET = config.get('Google');
const FacebookStrategy = passportFacebook.Strategy;
const GoogleStrategy = passportGoogle.Strategy;
const emailService = new EmailService();
passport.use(
  new FacebookStrategy(
    {
      clientID: FacebookId,
      clientSecret: FacebookSecret,
      callbackURL: 'http://localhost:3001/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'link', 'email'],
    },
    function (accessToken, refreshToken, profile, cb, done) {
      // console.log('妳好', accessToken);
      // console.log('妳好', refreshToken);
      // console.log('你好', profile);
      // console.log('你好', profile.email);
      console.log('你好', cb);
      userModel.findOne({ facebookId: cb.id }, (err: NativeError, existingUser: User) => {
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
              user.username = cb.displayName;
              user.isAdmin = false;
              // userModel.create({ user });
              user.save((err: Error) => {
                done(err, user);
              });
              //TODO: call the email sending API
              emailService.sendWelcome(cb.displayName, cb._json.email);
            }
          });
        }
      });
    },
  ),
);
passport.use(
  new GoogleStrategy(
    {
      clientID: GoogleId,
      clientSecret: GoogleSecret,
      callbackURL: '/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      console.log('你好', profile);
      userModel.findOne({ googleId: profile.id }, (err: NativeError, existingUser: User) => {
        if (err) {
          console.log('錯誤', err);
          return done(err);
        }
        if (existingUser) {
          console.log('存在', existingUser);
          return done(undefined, existingUser);
        } else {
          userModel.findOne({ email: profile._json.email }, (err: NativeError, existingEmailUser: User) => {
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
              user.email = profile._json.email;
              user.googleId = profile.id;
              user.username = profile.displayName;
              user.isAdmin = false;
              // userModel.create({ user });
              user.save((err: Error) => {
                done(err, user);
              });
              emailService.sendWelcome(profile.displayName, profile._json.email);
            }
          });
        }
      });
    },
  ),
);

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user: Express.User, done) {
  done(null, user);
});
