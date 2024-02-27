var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/homepage');
var ctrlBlog = require('../controllers/blog');

/* GET home page. */
router.get('/', ctrlHome.home);

/* GET blogs lists */
router.get('/', ctrlBlog.list);

/* Blog Show */
router.get('/blogs/:id', ctrlBlog.edit);

/* Blog Edit Post */
router.put('/blogs/:id', ctrlBlog.editPost);

/* Blog Add */
router.get('/blogs/add', ctrlBlog.add);

/* Blog Add Post */
router.post('/blogs/add', ctrlBlog.addPost);

/* Blog Delete */
router.get('/blogs/:id/delete', ctrlBlog.del);

/* Blog Delete Post */
router.delete('/blogs/:id/delete', ctrlBlog.deletePost);

module.exports = router;
