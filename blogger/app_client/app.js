(function () {

    var app = angular.module('bloggerApp', ['ngRoute']);

    app.controller("blogCtrl", function($scope) {
      $scope.myInput = "Eric Almonrode's Blogger";
   });     
  
  //   function config ($routeProvider) {
  //     $routeProvider
  //       .when('/', {
  //         templateUrl: 'home/index.html',
  //         controller: 'homeCtrl',
  //         controllerAs: 'vm'
  //       })
  //       .otherwise({redirectTo: '/'});
  //     $routeProvider
  //       .when('/blogs', {
  //           templateUrl: 'home/index.html',
  //           controller: 'listCtrl',
  //           controllerAs: 'vm'
  //       })
  //       .otherwise({redirectTo: '/'});
  //     $routeProvider
  //       .when('/blogs/add', {
  //           templateUrl: 'home/index.html',
  //           controller: 'addCtrl',
  //           controllerAs: 'vm'
  //       })
  //       .otherwise({redirectTo: '/'});
  //     $routeProvider
  //       .when('/blog/:blogid/edit', {
  //           templateUrl: 'home/index.html',
  //           controller: 'editCtrl',
  //           controllerAs: 'vm'
  //       })
  //       .otherwise({redirectTo: '/'});
  //     $routeProvider
  //       .when('/blog/:blogid/delete', {
  //           templateUrl: 'home/index.html',
  //           controller: 'delCtrl',
  //           controllerAs: 'vm'
  //       })
  //       .otherwise({redirectTo: '/'})
  //   }
  // })();
});