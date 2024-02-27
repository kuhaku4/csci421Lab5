var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlBlog = require('../controllers/blog');

router.get('/blog', ctrlBlogs.blogList);
router.post('/blog/add', ctrlBlogs.blogAdd);
router.get('/blog/:blogId', ctrlBlogs.blogFindOne);
router.put('/blog/:blogId', ctrlBlogs.blogEdit);
router.delete('/blog/:blogId', ctrlBlogs.blogDelete);

router.post('/blog/:blogId/delete', ctrlBlog.doBlogDelete);

module.exports = router;
