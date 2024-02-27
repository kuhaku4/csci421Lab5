var mongoose = require('mongoose');
var Blogger = mongoose.model('Blog')

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

// Get list of blogs
exports.blogsList = function(req, res) {
    Blogger
      .find()
      .exec(function(err, blogs) {
        if (err) {
          sendJSONresponse(res, 404, err);
        } else {
          sendJSONresponse(res, 200, blogs);
        }
      });
  };
  
  // Create a new blog
  exports.blogsCreate = function(req, res) {
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
  exports.blogsReadOne = function(req, res) {
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
  exports.blogsUpdate = function(req, res) {
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
  exports.blogsDelete = function(req, res) {
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