var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status('index', { title: 'Eric Almonrode'}).send;
});

module.exports = router;
