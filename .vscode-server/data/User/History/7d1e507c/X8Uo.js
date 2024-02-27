exports.add = (req, res) => {
    res.render('addBlog', { title: 'Add Blog' });
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
