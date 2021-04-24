import Sequelize from 'sequelize';

import config from '../configs/database.config';
import UserModel from '../models/user.model';

const models = [UserModel];

const connection = new Sequelize(config);

// Chamar o método estático init() passando a connection como argumento
models.forEach((model) => model.init(connection));
