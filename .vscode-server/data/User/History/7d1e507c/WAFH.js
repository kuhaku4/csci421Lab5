exports.add = (req, res) => {
    res.render('addBlog', { title: 'Add Blog' });
  };

exports.list = (req, res) => {
    res.render('blogList', {title: 'Blog List',
      pageHeader: {
        blogtitle: 'test',
        blogtext: 'test text',
        createdDate: Date
      }});
};