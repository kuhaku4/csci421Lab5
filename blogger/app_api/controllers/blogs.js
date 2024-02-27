var mongoose = require('mongoose');
var Blog = mongoose.model('Blog')

//test
var sendJSONresponse = function (res, status, content) {
    res.status (status);
    res.json (content);
  };

/* GET list of blogs */
// module.exports.blogsList = function(req, res) {
//     var blogtitle = req.query.blogtext;
//     var blogtext = req.query.blogtext;
//     var createdDate = parseFloat(req.query.createdDate);
//     Loc.listBlogger(function(err, results, stats) {
//       var blogs;
//       console.log('Blog Title', results);
//       console.log('Blog Text', stats);
//       if (err) {
//         console.log('listBlogger error:', err);
//         sendJSONresponse(res, 404, err);
//       } else {
//         blogs = buildBlogList(req, res, results, stats);
//         sendJSONresponse(res, 200, blogs);
//       }
//     });
//   };

//   var buildBlogList = function(req, res, results, stats) {
//     var blogs = [];
//     results.forEach(function(doc) {
//       blogs.push({
//         blogtitle: doc.obj.blogtitle,
//         blogtext: doc.obj.blogtext,
//         createdDate: doc.obj.createdDate,
//         _id: doc.obj._id
//       });
//     });
//     return blogs;
//   };
  
  /* GET a blog by the id */
  module.exports.blogsReadOne = function(req, res) {
    console.log('Finding blog details', req.params);
    if (req.params && req.params.blogid) {
      Blog
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
    Blog.create({
      blogtitle: req.body.blogtitle,
      blogtext: req.body.blogtext,
      createdDate: Date.now(),
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
  
  /* PUT /api/blogs/:blogid */
  module.exports.blogsUpdateOne = function(req, res) {
    if (!req.params.blogid) {
      sendJSONresponse(res, 404, {
        "message": "Not found, blogid is required"
      });
      return;
    }
    Blog
      .findById(req.params.blogid)
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
          blog.createdDate = Date.now();
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

  module.exports.blogsDeleteOne = function(req, res) {
    var blogid = req.params.blogid;
    if (blogid) {
      Blog
        .findByIdAndRemove(blogid)
        .exec(
          function(err, blog) {
            if (err) {
              console.log(err);
              sendJSONresponse(res, 404, err);
              return;
            }
            console.log("Blog id " + blogid + " deleted");
            sendJSONresponse(res, 204, null);
          }
      );
    } else {
      sendJSONresponse(res, 404, {
        "message": "No blogid"
      });
    }
  };