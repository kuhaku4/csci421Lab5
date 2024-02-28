var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/homepage');
var ctrlBlog = require('../controllers/blog');

/* GET home page. */
router.get('/', ctrlHome.home);

/* GET blogs lists */
router.get('/blogs', ctrlBlog.list);

/* Blog Edit */
router.get('/blogs/edit/:blogid', ctrlBlog.edit);

/* Blog Edit Post */
router.put('/blogs/save/:blogid', ctrlBlog.editPost);

/* Blog Add */
router.get('/blogs/add', ctrlBlog.add);

/* Blog Add Post */
router.post('/blogs/add', ctrlBlog.addPost);

/* Blog Delete */
router.get('/blogs/delete/:blogid', ctrlBlog.del);

/* Blog Delete Post */
router.delete('/blogs/delete/:blogid', ctrlBlog.deletePost);

module.exports = router;
