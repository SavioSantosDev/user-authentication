import { ValidationError } from 'yup';

import AppError from './app.error';

/**
 * errors will be returned within an array
 */

class HandlerError {
  responseWithAnAppropriateError(err, req, res, next) {
    if (err.code === 'EBADCSRFTOKEN') {
      req.flash('errors', ['CSRF token inválido!']);
      return req.session.save(() => res.status(400).redirect('back'));
    }

    // Erros tratados na aplicação
    if (err instanceof AppError) {
      req.flash('errors', [err.message]);
      return req.session.save(() => res.status(err.code).redirect('back'));
    }

    // Erros de validação do yup
    if (err instanceof ValidationError) {
      req.flash('errors', err.errors);
      return req.session.save(() => res.status(400).redirect('back'));
    }

    // Erros desconhecidos
    console.error(err);
    req.flash('errors', ['Erro interno no servidor!']);
    return req.session.save(() => res.status(500).redirect('back'));
  }
}

export default new HandlerError();
