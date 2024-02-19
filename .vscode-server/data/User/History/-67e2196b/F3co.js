const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/blogger');
}


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