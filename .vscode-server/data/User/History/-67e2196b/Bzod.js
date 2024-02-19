var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost/blogger';
mongoose.connect(dbURI);


// Monitor and report when database is connected                      
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
  });
  
  // Monitor and report error connecting to database
  mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
  });
  
  // Monitor and report when database is disconnected
  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
  });    