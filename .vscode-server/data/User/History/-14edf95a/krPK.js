var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/bio', function(req, res, next) {
  res.render('bio', { title: 'Biography' });
});

module.exports = router;
