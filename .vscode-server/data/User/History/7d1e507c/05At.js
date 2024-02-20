exports.add = (req, res) => {
    res.render('addBlog', { title: 'Add Blog' });
  };

exports.list = (req, res) => {
    res.render('blogList', {title: 'Blog List',
      blogs: [{
        blogtitle: 'test',
        blogtext: 'test text',
        createdDate: Date
      },
    {
      blogtitle: 'Nah I\'d Win',
      blogtext: 'Didn\'t Win',
      createdDate: Date
    }]
})
};