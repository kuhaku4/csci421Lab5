var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status.send('index', { title: 'Eric Almonrode'});
});

module.exports = router;
