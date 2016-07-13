
app.factory('Auth', function ($http, $state) {
  var authObj = {};

  authObj.post = function (url, data) {
    $http.post(url, data)
    .then(function() {
      return $state.go('stories');
    });
  };
  return authObj;
});
