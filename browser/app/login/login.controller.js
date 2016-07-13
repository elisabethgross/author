'use-strict';

app.controller('Login', function($scope, $http, $state, Auth) {
  // need: email & password
  // goal: find user in db, return $scope.login.email & $scope.login.password
  // if not found,

  $scope.submitLogin = Auth.post('/login', $scope.login);

});
