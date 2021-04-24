import { Router } from 'express';

import UserController from './controllers/user.controller';

const routes = Router();
const userController = new UserController();

routes.get('/', (req, res) => res.render('index'));

routes.get('/entrar', (req, res) => res.render('login'));

routes.get('/cadastrar', userController.renderRegisterPage);
routes.post('/cadastrar', userController.store);

routes.get('/painel', (req, res) => res.render('panel'));

routes.use((req, res) => res.status(404).render('404'));

export default routes;
