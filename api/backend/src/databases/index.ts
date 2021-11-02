import config from 'config';
import { dbConfig } from '@interfaces/db.interface';

const { DB_USER, DB_PWD, DB_NAME }: dbConfig = config.get('dbConfig');

export const dbConnection = {
  url: `mongodb+srv://${DB_USER}:${DB_PWD}@cluster0.5iof1.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};
