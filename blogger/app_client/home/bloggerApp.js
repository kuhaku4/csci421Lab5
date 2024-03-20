(function () {

    angular
      .module('bloggerApp')
      .controller('homeCtrl', homeCtrl);
  
    homeCtrl.$inject = ['$scope'];
    function homeCtrl ($scope) {
      var vm = this;
      vm.pageHeader = {
        title: 'blogger',
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
    angular
    .module('bloggerApp')
    .controller('blogCtrl', addCtrl);

  blogCtrl.$inject = ['$scope'];
  function blogCtrl($scope){
    
  }
  
  })();