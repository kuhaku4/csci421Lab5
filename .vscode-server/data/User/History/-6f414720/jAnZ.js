const { MongoClient, ObjectId } = require('mongodb');
const util = require('./utilController');
const debug = require('debug')('app:addController');

exports.home = (req, res) => {
    res.render('homePage', { title: 'Welcome to my blog site.' });
  };