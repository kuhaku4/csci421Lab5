var mongoose = require('mongoose');
var gracefulShutdown;
var dbURI = 'mongodb://localhost/blogger';

mongoose.connect(dbURI);

// BRING IN YOUR SCHEMAS & MODELS
require('./blogs');