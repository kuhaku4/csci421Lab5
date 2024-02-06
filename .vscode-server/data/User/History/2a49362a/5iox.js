var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('add', { title: 'Eric Almonrode Blog Site' });
});

module.exports = router;
