var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/homepage');
var ctrlBlogs = require('../controllers/blog');

router.get('/', ctrlHome.home);
router.get('/list', ctrlBlogs.blogList);
router.get('/blog/add', ctrlBlogs.blogNew);
router.post('/blog/add', ctrlBlogs.blogCreate)
router.get('/blog/:blogid/edit', ctrlBlogs.blogEdit);
router.post('/blog/:blogid/save', ctrlBlogs.blogsUpdateOne);
router.get('/blog/:blogid/delete', ctrlBlogs.blogEdit);
router.post('/blog/:blogid/delete', ctrlBlogs.blogDelete);

module.exports = router;
