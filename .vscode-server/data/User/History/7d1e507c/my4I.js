exports.add = (req, res) => {
    res.render('addBlog', { title: 'Add Blog' });
  };

var d = new Date();
console.log(d);

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
        createdDate: d.getDate()
      },
    {
      blogtitle: 'Nah I\'d Win',
      blogtext: 'Didn\'t Win',
      createdDate: d.getDate()
    },
    {
      blogtitle: 'My First Blog',
      blogtext: 'This is a boring blog',
      createdDate: d.getDate()
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