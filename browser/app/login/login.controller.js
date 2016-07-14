'use-strict';

app.controller('Login', function($scope, AuthFactory) {

  $scope.submitLogin = function() {
    return AuthFactory.login($scope.login);
  };

});
