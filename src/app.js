import express from 'express';
import helmet from 'helmet';
import path from 'path';

import './database/connection';
import routes from './routes';

class App {
  constructor() {
    this.app = express();

    this.middlewares();
    this.config();
    this.routes();
  }

  middlewares() {
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  config() {
    this.app.set('views', path.resolve(__dirname, '..', 'public'));
    this.app.set('view engine', 'ejs');
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
