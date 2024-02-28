var mongoose = require('mongoose');
var Blogger = mongoose.model('Blogs')

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

// Get list of blogs
module.exports.blogsList = function(req, res) {
  console.log ("Blog Lister")
  Blogger
  .find()
      .then(function(blogs) {
          if (!blogs.length) {
              sendJSONresponse (res, 204, blogs)
          } else {
              sendJSONresponse (res, 200, blogs)
          }
      })
      .catch(function(err) {
          console.log(err);
          sendJSONresponse (res, 400, err)
      })
}
  
  // var buildBlogList = function(req, res, results) {
  //   var blogs = [];
  //   results.forEach(function(obj) {
  //     blogs.push({
  //       blogtitle: obj.blogtitle,
  //       blogtext: obj.blogtext,
  //       _id: obj._id
  //     });
  //   });
  //   return blogs;
  // };

  // Read a single blog
  module.exports.blogsReadOne = function(req, res) {
    console.log('Finding blog details', req.params);
    if (req.params && req.params.blogid) {
        Blogger
          .findById(req.params.blogid)
          .exec(function(err, blog) {
            if (!blog) {
              sendJSONresponse(res, 404, {
                "message": "blogid not found"
              });
              return;
            } else if (err) {
              console.log(err);
              sendJSONresponse(res, 404, err);
              return;
            }
            console.log(blog);
            sendJSONresponse(res, 200, blog);
          });
      } else {
        console.log('No blogid specified');
        sendJSONresponse(res, 404, {
          "message": "No blogid in request"
        });
      }
    };
  
  // Create a new blog
  module.exports.blogsCreate = function(req, res) {
    console.log(req.body);
    Blogger
     .create({
        blogtitle: req.body.blogtitle,
        blogtext: req.body.blogtext,
       }, function(err, blog) {
         if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
         } else {
            console.log(blog);
            sendJSONresponse(res, 201, blog);
         }
       }
     );
  }; 
  
  // Update a single blog
  module.exports.blogsUpdate = function(req, res) {
    console.log("Updating a blog entry with id of " + req.params.blogid);
    console.log(req.body);
    Blogger
  	  .findOneAndUpdate(
	     { _id: req.params.blogid },
 	     { $set: {"blogtitle": req.body.blogtitle, "blogtext": req.body.blogtext}},
	     function(err, response) {
	         if (err) {
	  	         sendJSONresponse(res, 400, err);
	         } else {
		        sendJSONresponse(res, 201, response);
	        }
	    }
    );
}; 
  
  // Delete a single blog
  module.exports.blogsDelete = function(req, res) {
    console.log("Deleting blog entry with id of " + req.params.blogid);
    console.log(req.body);
    Blogger
        .findByIdAndRemove(req.params.blogid)
        .exec (
            function(err, response) {
                if (err) {
                            sendJSONresponse(res, 404, err);
                } else {
                            sendJSONresponse(res, 204, null);
                }
            }
        );
};  