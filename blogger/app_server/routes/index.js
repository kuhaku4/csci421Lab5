var express = require('express');
var router = express.Router();
var crtlHome = require('../controllers/homepage');
var crtlBlog = require('../controllers/blog');

/* GET home page. */
router.get('/', crtlHome.home);

/* GET blogs lists */
router.get('/', blogsCtrl.list);

/* Blog Show */
router.get('/blog/:id', blogsCtrl.edit);

/* Blog Edit Post */
router.put('/blog/:id', blogsCtrl.editPost);

/* Blog Add */
router.get('/blog/add', blogsCtrl.add);

/* Blog Add Post */
router.post('/blog/add', blogsCtrl.addPost);

/* Blog Delete */
router.get('/blog/:id/delete', blogsCtrl.del);

/* Blog Delete Post */
router.delete('/blog/:id/delete', blogsCtrl.deletePost);

module.exports = router;
