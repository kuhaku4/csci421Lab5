const db = require('../../app_api/db/blogs');

exports.getBlogs = () => {
  return db.getBlogs();
};

exports.getBlog = (id) => {
  return db.getBlog(id);
};

exports.addBlog = (blog) => {
  return db.addBlog(blog);
};

exports.updateBlog = (id, blog) => {
  return db.updateBlog(id, blog);
};

exports.deleteBlog = (id) => {
  return db.deleteBlog(id);
};