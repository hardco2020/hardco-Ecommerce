/* eslint-disable prettier/prettier */
import nodemailer from 'nodemailer';
import config from 'config';
import { Email, Website } from '@interfaces/email.interface';
import path from 'path';
import hbs from 'nodemailer-express-handlebars';
import UserService from './users.service';

class EmailService {
  public email: Email = config.get('email');
  public website: Website = config.get('website');
  public mailTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: this.email.user,
      pass: this.email.password,
    },
  });
  public handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./src/emailView/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./src/emailView/'),
  };
  public userService = new UserService();
  
  public async sendWelcome(userName: string, userEmail: string) {
      this.mailTransport.use('compile',hbs(this.handlebarOptions))
      const mailData = {
        from: 'Hardco-Ecommerce', // sender address
        to: userEmail, // list of receivers
        subject: 'Hardco-Ecommerce',
        text: 'That was easy!',
        template: 'welcome', // the name of the template file i.e email.handlebars
        context:{
            name: userName, // replace {{name}} with Adebola
            url: this.website.url // replace {{company}} with My Company
        },
        // html: compiledTemplate.render({name:name})
      };
      this.mailTransport.sendMail(mailData, (error, info) => {
        if (error) {
          return console.log(error);
        }
        return info.messageId;
      });
  }
  //TODO: send to all with admin's message 
  //- [ ] get all user's email
  //- [ ] send all 
  public async sendAll(message: string) {
    const users = this.userService.findAllUser();
    const emailList = (await users).map((user)=>user.email);
    const emails = emailList.toString()
    console.log(emails);
    console.log(message);
    this.mailTransport.use('compile',hbs(this.handlebarOptions))
    const mailData = {
      from: 'Hardco-Ecommerce', // sender address
      to: emails, // list of receivers
      subject: '"Hello ✔"',
      text: 'That was easy!',
      template: 'Message', // the name of the template file i.e email.handlebars
      context:{
          url: this.website.url,// replace {{company}} with My Company
          message: message,
      },
      // html: compiledTemplate.render({name:name})
    };
    this.mailTransport.sendMail(mailData, (error, info) => {
      if (error) {
        return console.log(error);
      }
      return info.messageId;
    });

  }
}

export default EmailService;
