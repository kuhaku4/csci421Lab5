var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/homepage');
var ctrlBlog = require('../controllers/blogs');

router.get('/', ctrlHome.home);
router.get('/blog', ctrlBlog.blogList);
router.get('/blog/add', ctrlBlog.blogNew);
router.post('/blog/add', ctrlBlog.blogAdd)
router.get('/blog/:blogId/edit', ctrlBlog.blogEdit);
router.post('/blog/:blogId/save', ctrlBlog.doBlogEdit);
router.get('/blog/:blogId/delete', ctrlBlog.blogDelete);
router.post('/blog/:blogId/delete', ctrlBlog.doBlogDelete);

module.exports = router;
