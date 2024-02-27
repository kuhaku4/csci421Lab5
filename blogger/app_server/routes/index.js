var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/homepage');
var ctrlBlog = require('../controllers/blog');

/* GET home page. */
router.get('/', ctrlHome.home);

/* GET blogs lists */
router.get('/', ctrlBlog.list);

/* Blog Show */
router.get('/blog/:id', ctrlBlog.edit);

/* Blog Edit Post */
router.put('/blog/:id', ctrlBlog.editPost);

/* Blog Add */
router.get('/blog/add', ctrlBlog.add);

/* Blog Add Post */
router.post('/blog/add', ctrlBlog.addPost);

/* Blog Delete */
router.get('/blog/:id/delete', ctrlBlog.del);

/* Blog Delete Post */
router.delete('/blog/:id/delete', ctrlBlog.deletePost);

module.exports = router;
