process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import ProductsRoute from './routes/products.route';
import CartRoute from '@/routes/cart.route';
import OrderRoute from './routes/order.route';
import StripeRoute from './routes/stripe.route';
import EmailRoute from '@routes/email.route';
validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new ProductsRoute(),
  new CartRoute(),
  new OrderRoute(),
  new StripeRoute(),
  new EmailRoute(),
]);

app.listen();
