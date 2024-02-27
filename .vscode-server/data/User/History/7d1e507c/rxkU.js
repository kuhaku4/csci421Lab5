exports.add = (req, res) => {
    res.render('addBlog', { title: 'Add Blog' });
  };

exports.list = (req, res) => {
    res.render('blogList', {
      title: 'Blog List',
      pageHeader:{
        title: "Add Blogs",
        strapline: 'Read cool blogs'
      },
      blogs: [{
        blogtitle: 'test',
        blogtext: 'test text',
        createdDate: Date.now()
      },
    {
      blogtitle: 'Nah I\'d Win',
      blogtext: 'Didn\'t Win',
      createdDate: Date.now()
    },
    {
      blogtitle: 'My First Blog',
      blogtext: 'This is a boring blog',
      createdDate: Date.now()
    }]
})
};

var request = require('request');
module.exports.addBlog = function(req,res){
  res.render('blog-add-form',{
    title:'Add a blog',
    pageHeader:{
      title: 'blog adder'
    }
  })
};
