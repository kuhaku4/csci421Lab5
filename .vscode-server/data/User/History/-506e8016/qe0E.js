var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({ 
    name: {type: String, required: true},
    blog: String
});




var blogModel = mongoose.model('Blog', blogSchema);

var blogs = new blogModel(req.body);

blogs.save(function(){});