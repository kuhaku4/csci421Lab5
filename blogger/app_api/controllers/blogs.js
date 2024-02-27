var mongoose = require('mongoose');
var Blogger = mongoose.model('Blog')

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

// Get list of blogs
module.exports.blogsList = function(req, res) {
    console.log('Getting blogs list');
    Loc
        .find()
        .exec(function(err, results) {
          if (!results) {
            sendJSONresponse(res, 404, {
              "message": "no blogs found"
            });
            return;
          } else if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log(results);
          sendJSONresponse(res, 200, buildBlogList(req, res, results));
        }); 
  };
  
  var buildBlogList = function(req, res, results) {
    var bloggers = [];
    results.forEach(function(obj) {
      bloggers.push({
        blogtitle: obj.blogtitle,
        blogtext: obj.blogtext,
        _id: obj._id
      });
    });
    return blogs;
  };
  
  // Create a new blog
  module.exports.blogsCreate = function(req, res) {
    console.log('Creating New Blog');
    Blogger.create({
      blogtitle: req.body.blogtitle,
      blogtext: req.body.blogtext
    }, function(err, blog) {
      if (err) {
        sendJSONresponse(res, 400, err);
      } else {
        sendJSONresponse(res, 201, blog);
      }
    });
  };
  
  // Read a single blog
  module.exports.blogsReadOne = function(req, res) {
    console
    Blogger
      .findById(req.params.blogid)
      .exec(function(err, blog) {
        if (err) {
          sendJSONresponse(res, 404, err);
        } else {
          sendJSONresponse(res, 200, blog);
        }
      });
  };
  
  // Update a single blog
  module.exports.blogsUpdate = function(req, res) {
    if (!req.params.blogid) {
      sendJSONresponse(res, 404, {
        "message": "blogid required"
      });
      return;
    }
    Blogger
      .findById(req.params.blogid)
      .exec(
        function(err, blog) {
          if (err) {
            sendJSONresponse(res, 400, err);
            return;
          } else if (!blog) {
            sendJSONresponse(res, 404, {
              "message": "blogid not found"
            });
            return;
          }
          blog.blogtitle = req.body.blogtitle;
          blog.blogtext = req.body.blogtext;
  
          blog.save(function(err, blog) {
            if (err) {
              sendJSONresponse(res, 404, err);
            } else {
              sendJSONresponse(res, 200, blog);
            }
          });
        }
      );
  };
  
  // Delete a single blog
  module.exports.blogsDelete = function(req, res) {
    var blogid = req.params.blogid;
    if (blogid) {
      Blogger
        .findByIdAndRemove(blogid)
        .exec(
          function(err, blog) {
            if (err) {
              sendJSONresponse(res, 404, err);
              return;
            }
            sendJSONresponse(res, 204, null);
          }
        );
    } else {
      sendJSONresponse(res, 404, {
        "message": "No blogid"
      });
    }
  };