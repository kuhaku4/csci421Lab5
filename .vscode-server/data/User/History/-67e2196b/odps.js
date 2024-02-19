var mongoose = require('mongoose');
var dbURI = 'mongodb://127.0.0.1/blogger78987';

mongoose.connect(dbURI);

// BRING IN YOUR SCHEMAS & MODELS
require('./blogs');