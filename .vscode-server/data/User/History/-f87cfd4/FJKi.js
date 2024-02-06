exports.addBlog = (req, res) => {
    res.render('addBlog', { title: 'Add Blog' });
  };

exports.blogList = (req, res) => {
    res.render('blogList', {title: 'Blog List'})
}