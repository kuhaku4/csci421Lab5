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

const { MongoClient, ObjectId } = require('mongodb');

var renderBlogList = function (req, res, responseBody) {
    var message;
    if (!(responseBody instanceof Array)) {
        message = "API lookup error";
        responseBody = [];
    } else if (!responseBody.length) {
        message = "No blogs to display."
    }

    res.render('/list', {
        title: "Blog List",
        blogs: responseBody.blogs,
        message: responseBody.message,
        error: responseBody.error
    })
}

var renderBlogEdit = function (req, res, responseBody) {
    var message = null;
    var error = null;
    if (!responseBody) {
        message = "API lookup error";
        responseBody = {}
    }

    res.render('edit', {
        title:"Blog Edit",
        blog: responseBody.blog,
        message: responseBody.message,
        error: responseBody.error
    })
}

var renderBlogDelete = function (req, res, responseBody) {
    var message = null;
    var error = null;
    if (!responseBody) {
        message = "API lookup error";
        responseBody = {}
    }

    res.render('delete', {
        title:"Blog Delete",
        blog: responseBody,
        message: message,
        error: error
    })
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
            if (response.statusCode === 200 && data.length) {
                renderBlogList (req, res, data);
            }
        }
    )
}

module.exports.blogNew = function (req, res) {
    console.log("New Blog");
    res.render('blog/blog-add', {title:"New Blog"});
}

module.exports.blogAdd = function(req, res) {
    console.log("Post Blog");
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
                res.redirect('/', response.statusCode);
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
    console.log("Put Blog");
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
        json: {
            blogtitle: req.body.blogtitle,
            blogtext: req.body.blogtext
        }
    };

    request(
        requestOptions,
        function (err, response, body) {
            var data;
            data = body;
            if (response.statusCode === 200) {
                console.log(body);
                res.redirect('/');
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
                res.redirect('/')
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
