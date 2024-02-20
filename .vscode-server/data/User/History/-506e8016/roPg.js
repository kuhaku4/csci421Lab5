var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({ 
    blog-title: {type: String, required: true},
    blog-text: String
});


mongoose.model('Blog', blogSchema);