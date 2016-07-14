'use-strict';

app.controller('signup', function($scope, AuthFactory) {

  $scope.submitSignup = function () {
    return AuthFactory.signup($scope.signup);
  };
});
