var mongoose = require('mongoose');
var Blog = mongoose.model('Blog')

var sendJSONresponse = function (res, status, content) {
    res.status (status);
    res.json (content);
  };

var instantiateBlog = function (body) {
    return {
        blogTitle: body.blogTitle,
        blogText: body.blogText
    }
}

module.exports.blogList = function (req, res) {
    console.log ("List Blogs")
    Blog.find()
        .then(function(blogs) {
            if (!blogs.length) {
                sendJSONresponse (res, 204, blogs)
            } else {
                sendJSONresponse (res, 200, blogs)
            }
        })
        .catch(function(err) {
            console.log(err);
            sendJSONresponse (res, 400, err)
        })
}

module.exports.blogFindOne = function (req, res) {
    var blogId = req.params.blogId;
    console.log("Find Blog: "+blogId)
    Blog.findOne({_id:blogId})
    .then(function(blog) {
        console.log("API: "+blog)
        if (blog) {
            sendJSONresponse (res, 200, blog);
        } else {
            sendJSONresponse (res, 404, blog);
        }
    })
    .catch(function(err) {
        console.log(err);
        sendJSONresponse (res, 400, err);

    })
}

module.exports.blogAdd = function (req, res) {
    console.log ("Adding Blog")
    var blog = instantiateBlog (req.body)
    Blog.create (blog)
        .then(function (newBlog) {
            console.log("Blog Created\n"+newBlog)
            sendJSONresponse (res, 201, newBlog)
        })
        .catch(function(err) {
            console.log(err)
            sendJSONresponse (res, 400, err)
        })
}

module.exports.blogEdit = function (req, res) {
    console.log("Edit Blog");
    var blogId = req.params.blogId;
    var updates = {$set: {  
        "blogTitle": req.body.blogTitle,
        "blogText": req.body.blogText
    }}

    Blog.findByIdAndUpdate(blogId, updates)
        .then(function(blog) {
            console.log("Update Blog: "+ blogId);
            sendJSONresponse (res, 200, blog);
        })
        .catch(function(err) {
            console.log(err);
            sendJSONresponse (res, 404 ,err);
        })

}

module.exports.blogDelete = function (req, res) {
    console.log("Delete Blog");
    var blogId = req.params.blogId;

    Blog.findByIdAndDelete(blogId)
        .then(() => sendJSONresponse (res, 204, null))
        .catch((err) => sendJSONresponse (res, 404, err))
}