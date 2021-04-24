import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => res.render('index'));

routes.get('/entrar', (req, res) => res.render('login'));

routes.get('/cadastrar', (req, res) => res.render('register'));

routes.get('/painel', (req, res) => res.render('panel'));

routes.use((req, res) => res.status(404).render('404'));

export default routes;
