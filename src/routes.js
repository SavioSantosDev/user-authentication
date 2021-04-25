import { Router } from 'express';

import userController from './controllers/user.controller';
import panelController from './controllers/panel.controller';
import { loginRequired } from './middlewares';

const routes = Router();

routes.get('/', (req, res) => res.render('index'));

routes.get('/entrar', userController.renderLoginPage);
routes.post('/entrar', userController.login);

routes.get('/cadastrar', userController.renderRegisterPage);
routes.post('/cadastrar', userController.register);

routes.get('/sair', userController.logout);

/**
 * Rotas privates
 */

routes.get('/painel', loginRequired, panelController.renderPanelPage);

// Erro 404
routes.use((req, res) => res.status(404).render('404'));

export default routes;
