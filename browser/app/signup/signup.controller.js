'use-strict';

app.controller('signup', function($scope, $http, $state, $log, Auth) {

  $scope.submitSignup = Auth.post('/signup', $scope.signup);

});
