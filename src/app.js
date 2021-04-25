/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import helmet from 'helmet';
import path from 'path';
import session from 'express-session';
import flash from 'connect-flash';
import csurf from 'csurf';

import './database/connection';
import sessionConfig from './configs/session.config';
import { csrfToken, locals } from './middlewares';
import routes from './routes';
import handlerError from './errors/handler.error';

class App {
  constructor() {
    this.app = express();

    this.config();
    this.middlewares();
    this.routes();
    this.errors();
  }

  config() {
    this.app.set('views', path.resolve(__dirname, '..', 'public'));
    this.app.set('view engine', 'ejs');
  }

  middlewares() {
    this.app.use(helmet({ referrerPolicy: false })); // Pra não atrapalhar no redirect('back')
    this.app.use(session(sessionConfig));
    this.app.use(flash());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(csurf());
    this.app.use(locals);
    this.app.use(csrfToken);
  }

  routes() {
    this.app.use(routes);
  }

  errors() {
    this.app.use(handlerError.responseWithAnAppropriateError);
  }
}

export default new App().app;
