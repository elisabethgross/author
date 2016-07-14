'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: '/browser/app/home/home.html',
    controller: function ($http, $log, AuthFactory) {
      $http.get('/auth/me')
      .then(function(response) {
        // console.log(response.data);
        return response.data;
      })
      .then(function(user) {
        AuthFactory.currentUser = user;
      })
      .catch($log.error);
    }
  });
});
