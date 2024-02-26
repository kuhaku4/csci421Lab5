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
      
