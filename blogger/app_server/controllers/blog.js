var request = require('request');
//const { response } = require('express');
var apiOptions = {
  server : "http://localhost:"+process.env.PORT,
  uri: {
    blog: {
      add: "api/blog/add",
      all: "api/blog",
      one: "/api/blog/"
    }
  }
};

/* GET blogs lists */      
module.exports.list = function(req, res){
  var requestOptions, path;
  //path = '/blogs';
  path = apiOptions.uri.blog.all;
  requestOptions = { 
      url : apiOptions.server + path,
      method : "GET",
      json : {},
      qs : {} 
      };
  request(
      requestOptions,
      function(err, response, body) {
          renderListPage(req, res, body);
      }
  );
};

/* Render the blog list page */
var renderListPage = function(req, res, responseBody){
  res.render('blogList', {
      title: 'Blog List',
      pageHeader: {
          title: 'Blog List'
      },
      blogs: responseBody
  });
};


/* Blog Show */
module.exports.edit = function(req, res) {
  var requestOptions, path;
  var blogid = req.params.blogid;
  path = apiOptions.uri.blog.one + blogid;
  //path = "/blogs" + req.params.id;
  requestOptions = {
      url : apiOptions.server + path,
      method : "GET",
      json : {}
  }; 
  request(
      requestOptions,
      function(err, response, body) {
              renderEditPage(req, res, body);
    }
  );
};

/* Render the Blog edit page */
var renderEditPage = function(req, res, responseBody){
  res.render('blogEdit', {
      title: 'Blog Edit',
      pageHeader: {
          title: 'Blog Edit'
      },
      blog: responseBody
  });
};


/* Blog Edit Post */
module.exports.editPost = function(req, res){
  var requestOptions, path, postdata;
  var blogid = req.params.blogid;
  //path = '/blogs' + id;
  path = apiOptions.uri.blog.one + blogid;

  postdata = {
      blogtitle: req.body.blogtitle,
      blogtext: req.body.blogtext
  };

  requestOptions = {
      url : apiOptions.server + path,
      method : "PUT",
      json : postdata
  };

  request(
requestOptions,
      function(err, response, body) {
          if (response.statusCode === 201) {
              res.redirect('/blogs');
          } else {
              _showError(req, res, response.statusCode);
          }
      }
  );
};

/* Blog Add */
module.exports.add = function(req, res) {
  res.render('addBlog', { title: 'Add Blog' });
};    

/* Blog Add Post */
module.exports.addPost = function(req, res){
  var requestOptions, path, postdata;
  //path = '/blogs/add';
  path = apiOptions.uri.blog.add;

  postdata = {
      blogtitle: req.body.blogtitle,
      blogtext: req.body.blogtext
  }; 

  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : postdata
  };
  
  request(
    requestOptions,
    function(err, response, body) {
       if (response.statusCode === 201) {
            res.redirect('/blogs');
       } else {
            _showError(req, res, response.statusCode);
       } 
    }
  ); 
};

/* Blog Delete */
module.exports.del = function(req, res) {
  var requestOptions, path;
  //path = "/blogs" + req.params.id;

  requestOptions = {
      url : apiOptions.server + path,
      method : "GET",
      json : {}
  };
  request(
requestOptions,
      function(err, response, body) {
          renderDeletePage(req, res, body);
      }
  );
};

/* Render the blook delete page */
var renderDeletePage = function(req, res, responseBody){
      res.render('deleteBlog', {
      title: 'Blog Delete',
      pageHeader: {
              title: 'blog Delete'
      },
      blog: responseBody
  });
};

/* Blog Delete Post */
module.exports.deletePost = function(req, res){
  var requestOptions, path, postdata;
  var blogid = req.params.blogid;
  //path = '/blogs' + blogid;
  path = apiOptions.uri.blog.one + blogid;

  requestOptions = {
url : apiOptions.server + path,
      method : "DELETE",
      json : {}
  };

  request(
      requestOptions,
      function(err, response, body) {
          if (response.statusCode === 204) {
              res.redirect('/blogs');
          } else {
              _showError(req, res, response.statusCode);
          }
      }
  );
};
