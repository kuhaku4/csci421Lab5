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

var blogFindOne = function (req, res, callback) {
  console.log("blogFindOne: " + req.params.blogid)
  var requestOptions, path, blogid;
  var blogid = req.params.blogId;
  path = '/blogs/'+blogid;

  requestOptions = {
      url: apiOptions.server + path,
      method: "GET",
      json: {}
  }

  request(
      requestOptions,
      function (err, response, body) {
          var data = {};
          if (ERROR_STATUS_CODES.includes(response.statusCode)) {
              data.blog = null;
              data.error = apiOptions.status.blog[response.statusCode]
              data.message = null;
          } else {
              data.blog = body;
              data.error = null;
              data.message = apiOptions.status.blog[response.statusCode]
              console.log(body);
          }
          callback(req, res, data)
      }
  )
}


/* Blog Show */
module.exports.edit = function(req, res) {

  blogFindOne(req, res, renderBlogEdit)
}

/* Render the Blog edit page */
var renderEditPage = function(req, res, responseBody){
  responseBody.title = "Blog Edit";
    res.render('blogEdit', responseBody);
};


/* Blog Edit Post */
module.exports.editPost = function(req, res){
  console.log("blogEdit: " + req.params.blogid)
  console.log("Edit Blog");
  var requestOptions, path, blogid, blogData;
  blogid = req.params.blogid;
  path = '/blogs/'+blogid;

  blogData = {
      blogTitle: req.body.blogTitle,
      blogText: req.body.blogText
  };

  requestOptions = {
      url: apiOptions.server + path,
      method: "PUT",
      json: {
          blogTitle: req.body.blogTitle,
          blogText: req.body.blogText
      }
  };

  request(
      requestOptions,
      function (err, response, body) {
          var data;
          data = body;
          if (response.statusCode === 200) {
              console.log(body);
              res.redirect('/blog?status='+response.statusCode);
          }
      }
  )
};

/* Blog Add */
module.exports.add = function(req, res) {
  console.log("Add Blog")
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
            res.redirect('/blogs');
       } else {
            _showError(req, res, response.statusCode);
       } 
    }
  ); 
};

/* Blog Delete */
module.exports.del = function(req, res) {
  console.log("blogEdit: " + req.params.blogid)
  blogFindOne(req, res, renderDeletePage)
}

/* Render the blook delete page */
var renderDeletePage = function(req, res, responseBody){
  responseBody.title = "Blog Delete";
  res.render('deleteBlog', responseBody)
}

/* Blog Delete Post */
module.exports.deletePost = function(req, res){
  console.log("deleteBlog: " + req.params.blogid)
  var requestOptions, path, blogid;
  blogid = req.params.blogid;
  path = '/blogs/'+blogid;

  requestOptions = {
      url: apiOptions.server + path,
      method: "DELETE",
      json: {}
  };
  request(
      requestOptions,
      function (err, response, body) {
          if (response.statusCode === 204) {
              res.redirect('/blog?status='+response.statusCode)
          } else {
              console.log(err)
          }
      }
  )
}