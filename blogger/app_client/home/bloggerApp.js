(function () {
  angular
      .module('blogApp', ['ngRoute'])
      .config(function($routeProvider) {
          $routeProvider
              .when('/', {
                  templateUrl: 'pages/home.html',
                  controller: 'homeCtrl',
                  controllerAs: 'vm'
              })
              .otherwise({ redirectTo: '/' });
      });

  angular
      .module('blogApp')
      .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope'];
  function homeCtrl ($scope) {
      var vm = this;
      vm.pageHeader = {
          title: "Eric Almonrode's Blogger",
          strapline: 'Blogs'
      };
      vm.sidebar = {
          content: "Blogger"
      };

      vm.showError = function (error) {
          $scope.$apply(function() {
              vm.message = error.message;
          });
      };
  }
})();
