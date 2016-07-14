
app.factory('AuthFactory', function ($http, $state) {
  var authObj = {};

  // var superUser = false; //isAdmin determines superUser
  authObj.currentUser = {};
  authObj.currentUser.loggedIn = false;

  authObj.login = function(data) {
    return $http.post('/login', data)
    .then(function(response) {
      return response.data;
    })
    .then(function(user) {
      authObj.currentUser = user;
      authObj.currentUser.loggedIn = true;
      $state.go('stories');
    });
    // .catch($log.error);
  };

  authObj.signup = function(data) {
    return $http.post('/api/users', data)
    .then(function() {
      $state.go('stories');
    });
    // .catch($log.error);
  };

  authObj.isLoggedIn = function() {
    return authObj.currentUser.loggedIn;
  };

  return authObj;
});
