'use strict';

app.directive('navbar', function ($state, $location, $http, $log, AuthFactory) {
  return {
    restrict: 'E',
    templateUrl: '/browser/components/navbar/navbar.html',
    link: function (scope) {
      scope.pathStartsWithStatePath = function (state) {
        var partial = $state.href(state);
        var path = $location.path();
        return path.startsWith(partial);
      };
      scope.logout = function() {
        return $http.get('/logout')
        .then(function() {
          AuthFactory.currentUser.loggedIn = false;
          $state.go('login');
        })
        .catch($log.error);
      };
      scope.isLoggedIn = AuthFactory.isLoggedIn;
    }
  };
});
