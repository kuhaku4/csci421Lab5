var request = require('request');
const { response } = require('express');
// const { render } = require('../../app');
var apiOptions = {
  server : "http://52.91.47.28:80"  // Change as needed
};

/* GET blogs lists */      
module.exports.list = function(req, res){
  var requestOptions, path;
  path = '/blogs';
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
  path = "/blogs" + req.params.id;
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
  var id = req.params.id;
  path = '/blogs' + id;

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
              res.redirect('/list');
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
  path = '/blogs';

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
            res.redirect('/list');
       } else {
            _showError(req, res, response.statusCode);
       } 
    }
  ); 
};

/* Blog Delete */
module.exports.del = function(req, res) {
  var requestOptions, path;
  path = "/blogs" + req.params.id;
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
  var id = req.params.id;
  path = '/blogs' + id;

  requestOptions = {
url : apiOptions.server + path,
      method : "DELETE",
      json : {}
  };

  request(
      requestOptions,
      function(err, response, body) {
          if (response.statusCode === 204) {
              res.redirect('/list');
          } else {
              _showError(req, res, response.statusCode);
          }
      }
  );
};





// exports.add = (req, res) => {
//     res.render('addBlog', { title: 'Add Blog' });
//   };

// exports.list = (req, res) => {
//     res.render('blogList', {title: 'Blog List',
//       blogs: [{
//         blogtitle: 'test',
//         blogtext: 'test text',
//         createdDate: Date.now()
//       },
//     {
//       blogtitle: 'Nah I\'d Win',
//       blogtext: 'Didn\'t Win',
//       createdDate: Date.now()
//     },
//     {
//       blogtitle: 'My First Blog',
//       blogtext: 'This is a boring blog',
//       createdDate: Date.now()
//     }]
// })
// };
