var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({ 
    name: {type: String, required: true},
    blog: String
});




mongoose.model('blogs', blogSchema, 'blogs');