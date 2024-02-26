var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({ 
    blogtitle: {type: String, required: true},
    blogtext: String,
    createdDate: Date
});


mongoose.model('Blog', blogSchema);