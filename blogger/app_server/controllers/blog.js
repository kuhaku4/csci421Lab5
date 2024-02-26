exports.add = (req, res) => {
    res.render('addBlog', { title: 'Add Blog' });
  };

exports.list = (req, res) => {

  let currentTime = new Date();
  localStorage.setItem('currentTime', currentTime.toString());
  let storedTime = localStorage.getItem('currentTime');
  let storedTimeAsDate = new Date(storedTime);
    res.render('blogList', {
      title: 'Blog List',
      pageHeader:{
        title: "Add Blogs",
        strapline: 'Read cool blogs'
      },
      blogs: [{
        blogtitle: 'test',
        blogtext: 'test text',
        createdDate: storedTimeAsDate
      },
    {
      blogtitle: 'Nah I\'d Win',
      blogtext: 'Didn\'t Win',
      createdDate: storedTimeAsDate
    },
    {
      blogtitle: 'My First Blog',
      blogtext: 'This is a boring blog',
      createdDate: storedTimeAsDate
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
