const path = require('path');

module.exports = {
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database', 'database.sqlite'),
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
