module.exports = {
  secret: process.env.SESSION_SECRET || 'pao de queijo',
  // store: sessionStore,
  resave: false,
  saveUninitialized: false, // A session is uninitialized when it is new but not modified
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true,
  },
};
