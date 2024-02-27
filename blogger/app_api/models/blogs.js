var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({ 
    blogtitle: {type: String, required: true},
    blogtext: String,
    createdDate: {type: Date, "default": Date.now}
});


mongoose.model('Blog', blogSchema);
