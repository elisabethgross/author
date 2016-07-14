'use strict';

app.directive('contenteditable', function (AuthFactory) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function (scope, element, attrs, ngModel) {
      if (!ngModel) return;
      function read() {
        ngModel.$setViewValue(element.html());
      }
      ngModel.$render = function () {
        element.html(ngModel.$viewValue || '');
      };
      element.bind('blur keyup change', function () {
        scope.$apply(read);
      });
      scope.isSuperUser = AuthFactory.currentUser.isAdmin;
    }
  };
});
