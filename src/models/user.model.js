import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class UserModel extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        password_hash: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.VIRTUAL,
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
