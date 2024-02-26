var mongoose = require('mongoose');
var Blog = mongoose.model('Blogs');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.blogCreate = function(req, res) {
  if (req.paras.blogid) {
    Blog
      .findById(req.params.blogid)
      .select('blogs')
      .exec(
        function(err, blog) {
          if (err) {
            sendJSONresponse(res, 400, err);
          } else {
            doAddBlog(req, res, blog);
          }
        }
      );
    } else {
      sendJSONresponse(res, 404, {
        "message": "Not found, blogid required"
      });
  }
};

var doAddBlog = function(req, res, blog) {
  if(!blog) {
    sendJSONresponse(res, 404, "blogid not found");
  } else {
    blog.blogs.push({
      blogtitle: req.body.blogtitle,
      blogtext: req.body.blogtext,
      createdDate: req.body.createdDate
    });
    blog.save(function(err, blog) {
      var thisBlog;
      if (err) {
        sendJSONresponse(res, 400, err);
      } else {
        updateBlogText(blog._id);
        thisBlog = blog.blogs[blog.blogs.length - 1];
        sendJSONresponse(res, 201, thisBlog);
      }
    });
  }
};

/* GET a blog by the id */
module.exports.blogsReadOne = function(req, res) {
  console.log('Finding blog details', req.params);
  if (req.params && req.params.blogid) {
    Loc
      .findById(req.params.blogid)
      .exec(function(err, blog) {
        if (!blog) {
          sendJSONresponse(res, 404, {
            "message": "blogid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(blog);
        sendJSONresponse(res, 200, blog);
      });
  } else {
    console.log('No blogid specified');
    sendJSONresponse(res, 404, {
      "message": "No blogid in request"
    });
  }
};

/* POST a new blog */
/* /api/blogs */
module.exports.blogsCreate = function(req, res) {
  console.log(req.body);
  Loc.create({
    blogtitle: req.body.blogtitle,
    blogtext: req.body.blogtext,
    createdDate: req.body.createdDate
  }, function(err, blog) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(blog);
      sendJSONresponse(res, 201, blog);
    }
  });
};

/* PUT /api/blog/:blogid */
module.exports.blogsUpdateOne = function(req, res) {
  if (!req.params.blogid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, blogid is required"
    });
    return;
  }
  Loc
    .findById(req.params.blogid)
    .select('-blogtitle -blogtext')
    .exec(
      function(err, blog) {
        if (!blog) {
          sendJSONresponse(res, 404, {
            "message": "blogid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        blog.blogtitle = req.body.blogtitle;
        blog.blogtext = req.body.blogtext;
        blog.createdDate = req.body.createdDate;
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

/* DELETE /api/blogs/:blogid */
module.exports.blogsDeleteOne = function(req, res) {
  var blogid = req.params.blogid;
  if (blogid) {
    Loc
      .findByIdAndRemove(blogid)
      .exec(
        function(err, blog) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("blog id " + blogid + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No blogid"
    });
  }
};
