import * as yup from 'yup';
import bcryptjs from 'bcryptjs';

import UserModel from '../models/user.model';
import AppError from '../errors/app.error';

export default class UserService {
  /**
   * Return only the necessary
   */
  returnData(user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async register({ name, email, password }) {
    // Validating data
    const schema = yup.object().shape({
      name: yup
        .string()
        .required('Nome é obrigatório!')
        .max(255, 'Nome deve ter no máximo 255 caracteres!'),
      email: yup
        .string()
        .required('E-mail é obrigatório!')
        .email('E-mail inválido!'),
      password: yup
        .string()
        .required('Senha é obrigatória!')
        .min(8, 'Senha deve ter no mínimo 8 caracteres!')
        .max(50, 'Senha deve ter no máximo 50 caracteres!'),
    });
    await schema.validate({ name, email, password }, { abortEarly: false });

    // Checking if user already exists
    const userExists = await UserModel.findOne({ where: { email } });
    if (userExists) {
      throw new AppError('Este email já foi registrado!', 400);
    }

    await UserModel.create({ name, email, password });
  }

  async login({ email, password }) {
    // Validating data
    const schema = yup.object().shape({
      email: yup
        .string()
        .required('E-mail é obrigatório!')
        .email('E-mail inválido!'),
      password: yup
        .string()
        .required('Senha é obrigatória!')
        .min(8, 'Senha deve ter no mínimo 8 caracteres!')
        .max(50, 'Senha deve ter no máximo 50 caracteres!'),
    });
    await schema.validate({ email, password }, { abortEarly: false });

    // Checking if user exists
    const userExists = await UserModel.findOne({ where: { email } });
    if (!userExists) {
      throw new AppError('Usuário não existe!', 400);
    }

    // Checking if the password is valid
    if (!bcryptjs.compareSync(password, userExists.password_hash)) {
      throw new AppError('Senha inválida!');
    }

    return userExists;
  }
}
