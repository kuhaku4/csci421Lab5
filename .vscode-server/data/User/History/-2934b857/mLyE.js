var express = require('express');
var router = express.Router();
var crtlHome = require('../controllers/homepage');
var crtlBlog = require('../controllers/blog');

/* GET home page. */
router.get('/', crtlHome.home);
router.get('/list', crtlBlog.list);
router.get('/add', crtlBlog.add);
router.get('/')
/* TEST3*/
module.exports = router;
