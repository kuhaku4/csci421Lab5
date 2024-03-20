(function () {

  angular
    .module('bloggerApp')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', '$location'];
  function homeCtrl ($scope, $location) {
    var vm = this;
    vm.pageHeader = {
      title: 'blogger',
      strapline: 'Blogs'
    };
    vm.sidebar = {
      content: "Blogger"
    };

    vm.viewBlog = function (blogId) {
      $location.path('/blogs/' + blogId);
    };

    vm.goToAddBlog = function () {
      $location.path('/blogs/add');
    };
  }
  angular
  .module('bloggerApp')
  .controller('blogCtrl', blogCtrl);

blogCtrl.$inject = ['$scope', '$location', 'blogService'];
function blogCtrl ($scope, $location, blogService) {
  var vm = this;
  vm.blogs = [];
  vm.blog = {};
  vm.editing = false;
  vm.pageHeader = {
    title: 'Blog',
    strapline: 'Blog List'
  };
  vm.sidebar = {
    content: 'Blog List'
  };

  vm.addBlog = function () {
    blogService.addBlog(vm.blog).then(function (blog) {
      vm.blogs.unshift(blog);
      vm.blog = {};
    });
  };

  vm.editBlog = function (blog) {
    vm.blog = blog;
    vm.editing = true;
  };

  vm.updateBlog = function (blog) {
    blogService.updateBlog(blog._id, blog).then(function (updatedBlog) {
      var index = vm.blogs.findIndex(function (item) {
        return item._id === updatedBlog._id;
      });
      vm.blogs[index] = updatedBlog;
      vm.blog = {};
      vm.editing = false;
    });
  };

  vm.deleteBlog = function (blogId) {
    blogService.deleteBlog(blogId).then(function () {
      vm.blogs = vm.blogs.filter(function (blog) {
        return blog._id !== blogId;
      });
    });
  };

  vm.loadBlogs = function () {
    blogService.getBlogs().then(function (blogs) {
      vm.blogs = blogs;
    });
  };

  vm.loadBlogs();
}
})();