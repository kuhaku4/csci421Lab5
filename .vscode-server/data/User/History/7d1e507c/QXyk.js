exports.add = (req, res) => {
    res.render('addBlog', { title: 'Add Blog' });
  };

var request = require('request');
var apiOptions = {
  server : "http://52.91.47.28:80"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "http://52.91.47.28";
}

module.exports.addBlog = function(req,res){
  res.render('blog-add-form',{
    title:'Add a blog',
    pageHeader:{
      title: 'blog adder'
    }
  })
};
