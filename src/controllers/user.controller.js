import User from '../models/user.model';

export default class UserController {
  renderRegisterPage(req, res) {
    return res.render('register');
  }

  async store(req, res) {
    try {
      const { id, name, email } = await User.create(req.body);

      return res.status(201).json({ id, name, email });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro interno no servidor!' });
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(400).json({ errors: ['Usuário não existe!'] });
      }
      const { id, name, email } = user;
      return res.status(200).json({ id, name, email });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro interno no servidor!' });
    }
  }
}
