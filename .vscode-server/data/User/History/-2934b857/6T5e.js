var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlBlog = require('../controllers/blog');

router.get('/', ctrlHome.home);

router.get('/', ctrlBlog.blogList);
router.get('/add', ctrlBlog.blogNew);
router.post('/add', ctrlBlog.blogAdd)
router.get('/edit/:blogId', ctrlBlog.blogEdit);
router.post('/save/:blogId', ctrlBlog.doBlogEdit);
router.get('/delete/:blogId', ctrlBlog.blogDelete);
router.post('/delete/:blogId', ctrlBlog.doBlogDelete);

module.exports = router;
