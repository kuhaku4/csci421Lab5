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
        createdDate: console.log(new Date(8.64e15).toString())
      },
    {
      blogtitle: 'Nah I\'d Win',
      blogtext: 'Didn\'t Win',
      createdDate: console.log(new Date(8.64e15).toString())
    },
    {
      blogtitle: 'My First Blog',
      blogtext: 'This is a boring blog',
      createdDate: console.log(new Date(8.64e15).toString())
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