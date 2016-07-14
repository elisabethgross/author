'use strict';

var app = require('express')();
var path = require('path');
var session = require('express-session');
var User = require('../api/users/user.model.js');

app.use(require('./logging.middleware'));

app.use(session({
  // this mandatory configuration ensures that session IDs are not predictable
  secret: 'tongiscool' // or whatever you like
}));

app.use(function (req, res, next) {
  console.log('session', req.session);
  next();
});


app.use(require('./request-state.middleware'));

app.use(require('./statics.middleware'));


app.use('/api', require('../api/api.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use('/auth/me', function(req, res, next) {

  User.findOne({
    where: {
      id: req.session.userId
    }
  })
  .then(function (user) {
    if (!user) {
      res.sendStatus(401);
    } else {
      res.send(user);
      res.sendStatus(200);
    }
  })
  .catch(next);
})

app.use('/login', function (req, res, next) {

  User.findOne({
    where: req.body
  })
  .then(function (user) {
    if (!user) {
      res.sendStatus(401);
    } else {
      req.session.userId = user.id;
      res.send(user);
      res.sendStatus(204);
    }
  })
  .catch(next);

});

app.use('/logout', function(req, res, next) {
  req.session.userId = null;
  res.sendStatus(200);
});


app.use(require('./error.middleware'));

module.exports = app;
