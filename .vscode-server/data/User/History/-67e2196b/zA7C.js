var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost:27017/blogger';
mongoose.connect(dbURI);   

// BRING IN YOUR SCHEMAS & MODELS
require('./blogs');