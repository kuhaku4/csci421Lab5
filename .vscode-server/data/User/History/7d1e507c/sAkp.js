exports.add = (req, res) => {
    res.render('addBlog', { title: 'Add Blog' });
  };

exports.list = (req, res) => {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth();
  var day = d.getDate();
  var c = new Date(year + 1, month, day);
    res.render('blogList', {
      title: 'Blog List',
      pageHeader:{
        title: "Add Blogs",
        strapline: 'Read cool blogs'
      },
      blogs: [{
        blogtitle: 'test',
        blogtext: 'test text',
        createdDate: c
      },
    {
      blogtitle: 'Nah I\'d Win',
      blogtext: 'Didn\'t Win',
      createdDate: c
    },
    {
      blogtitle: 'My First Blog',
      blogtext: 'This is a boring blog',
      createdDate: c
    }]
})
};

module.exports.addBlog = function(req,res){
  res.render('blog-add-form',{
    title:'Add a blog',
    pageHeader:{
      title: 'blog adder'
    }
  })
};