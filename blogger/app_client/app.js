(function () {

    angular.module('bloggerApp', ['ngRoute']);
  
    function config ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'home/index.html',
          controller: 'homeCtrl',
          controllerAs: 'vm'
        })
        .otherwise({redirectTo: '/'});
      $routeProvider
        .when('/blogs', {

        })
        .otherwise({redirectTo: '/'});
      $routeProvider
        .when('/blogs/add', {

        })
        .otherwise({redirectTo: '/'});
    }
  
    angular
      .module('bloggerApp')
      .config(['$routeProvider', config]);
  
  })();