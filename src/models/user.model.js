import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class UserModel extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Nome é obrigatório!',
            },
            len: {
              args: [4, 255],
              msg: 'Nome precisa ter entre 4 e 255 caracteres!',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'E-mail já existe!',
          },
          validate: {
            isEmail: {
              msg: 'E-mail inválido!',
            },
          },
        },
        password_hash: {
          type: Sequelize.STRING,
          defaultValue: '',
        },
        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: '',
          validate: {
            len: {
              args: [6, 50],
              msg: 'Senha precisa ter entre 6 e 50 caracteres!',
            },
          },
        },
      },
      {
        sequelize,
        modelName: 'User',
      },
    );

    // Um callback que será executado antes de salvar os dados na base de dados
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
