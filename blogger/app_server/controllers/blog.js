const response = require('express');
var request = require('request');

var apiOptions = {
  server : "http://52.91.47.28:80",
    uri: {
        blog: {
            add: "/api/blog/add",
            all: "/api/blog",
            one: "/api/blog/"
        }
    }
};

var renderBlogList = function (req, res, responseBody) {
    var requestOptions, path;
    path = '/api/blog';
    requestOptions = {
      url : apiOptions.server + path,
      method : "GET",
      json : {},
      qs : {
        lng : -0.7992599,
        lat : 51.378091,
        maxDistance : 20
      }
    };
    request(
      requestOptions,
      function(err, response, body) {
        var i, data;
        data = body;
        if (response.statusCode === 200 && data.length) {
          for (i=0; i<data.length; i++) {
            data[i].distance = _formatDistance(data[i].distance);
          }
        }
        renderHomepage(req, res, data);
      }
    );
  };

module.exports.blogList = function(req, res) {
    var requestOptions, path;
    path = apiOptions.uri.blog.all;
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };

    request(
        requestOptions,
        function (err, response, body) {
            var data;
            data = {
                blogs: body,
                message: null,
                error: null
            };
            if (response.statusCode === 200 && data.blogs.length) {
                renderBlogList (req, res, data);
            }
        }
    )
}

var renderBlogEdit = function (req, res, responseBody) {
    responseBody.title = "Blog Edit";
    res.render('blog/blog-edit', responseBody);
}

var renderBlogDelete = function (req, res, responseBody) {
    responseBody.title = "Blog Delete";
    res.render('blog/blog-delete', responseBody)
}

var blogFindOne = function (req, res, callback) {
    console.log("blogFindOne: " + req.params.blogId)
    var requestOptions, path, blogId;
    var blogId = req.params.blogId;
    path = apiOptions.uri.blog.one + blogId;

    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    }

    request(
        requestOptions,
        function (err, response, body) {
            if (response.statusCode == 200) {
                var data = {
                    blog: body,
                    error: null,
                    message: null
                }
                data.message = apiOptions.status.blog[response.statusCode]
                console.log(body);
                callback(req, res, data)
            }
        }
    )
}

module.exports.blogNew = function (req, res) {
    console.log("***** GET New Blog Form *****");
    res.render('blog/blog-add', {title:"New Blog"});
}

module.exports.blogCreate = function(req, res) {
    console.log("***** POST New Blog Form *****");
    var requestOptions, path, blogData;
    path = apiOptions.uri.blog.add;

    blogData = {
        blogtitle: req.body.blogtitle,
        blogtext: req.body.blogtext
    };

    requestOptions = {
        url: apiOptions.server + path,
        method: "POST",
        json: blogData
    };

    request(
        requestOptions,
        function (err, response, body) {
            var data;
            data = body;
            if (response.statusCode === 201) {
                console.log(res.body);
                res.redirect('/blog');
            }
        }
    )
}

module.exports.blogEdit = function(req, res) {
    console.log("blogEdit: " + req.params.blogId)
    blogFindOne(req, res, renderBlogEdit)
}

module.exports.doBlogEdit = function(req, res) {
    console.log("doBlogEdit: " + req.params.blogId)
    console.log("***** PUT Edit Blog Form *****");
    var requestOptions, path, blogId, blogData;
    blogId = req.params.blogId;
    path = apiOptions.uri.blog.one + blogId;

    blogData = {
        blogtitle: req.body.blogtitle,
        blogtext: req.body.blogtext
    };

    requestOptions = {
        url: apiOptions.server + path,
        method: "PUT",
        json: blogData
    };

    request(
        requestOptions,
        function (err, response, body) {
            var data;
            data = body;
            if (response.statusCode === 200) {
                console.log(body);
                res.redirect('/blog');
            }
        }
    )
}

module.exports.doBlogDelete = function(req, res) {
    console.log("blogDelete: " + req.params.blogid)
    var requestOptions, path, blogId;
    blogId = req.params.blogId;
    path = apiOptions.uri.blog.one + blogId;

    requestOptions = {
        url: apiOptions.server + path,
        method: "DELETE",
        json: {}
    };
    request(
        requestOptions,
        function (err, response, body) {
            if (response.statusCode === 204) {
                res.redirect('/blog')
            } else {
                console.log(err)
            }
        }
    )
}

module.exports.blogDelete = function (req, res) {
    console.log("blogEdit: " + req.params.blogId)
    blogFindOne(req, res, renderBlogDelete)
}
