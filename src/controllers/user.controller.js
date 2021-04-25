import UserService from '../services/user.service';

class UserController {
  renderRegisterPage(req, res) {
    return req.session.user ? res.redirect('/painel') : res.render('register');
  }

  async register(req, res, next) {
    const userService = new UserService();
    try {
      await userService.register(req.body);

      req.flash('success', 'Usuário criado com sucesso!');
      return req.session.save(() => res.status(201).redirect('/entrar'));
    } catch (err) {
      next(err);
    }
  }

  renderLoginPage(req, res) {
    return req.session.user ? res.redirect('/painel') : res.render('login');
  }

  async login(req, res, next) {
    const userService = new UserService();
    try {
      const user = await userService.login(req.body);
      req.session.user = user;
      return req.session.save(() => res.status(200).redirect('/painel'));
    } catch (err) {
      next(err);
    }
  }

  logout(req, res) {
    req.session.destroy();
    return res.redirect('/');
  }
}

export default new UserController();
