exports.add = (req, res) => {
    res.render('addBlog', { title: 'Add Blog' });
  };

exports.list = (req, res) => {
    res.render('blogList', {title: 'Blog List'},
    {
      title: 'blog lists',
      pageHeader {
        blogtitle: 'Test',
        blogtext: 'test text',
        createdDate: Date
      };
    })
}