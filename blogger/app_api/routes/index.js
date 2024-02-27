var express = require('express');
var router = express.Router();

var ctrlBlogs = require('../controllers/blogs');

router.get('/list', ctrlBlogs.blogsList);
router.post('/blog/add', ctrlBlogs.blogsCreate);
router.get('/blog/:blogid', ctrlBlogs.blogsReadOne);
router.put('/blog/:blogid', ctrlBlogs.blogsUpdateOne);
router.delete('/blog/:blogid', ctrlBlogs.blogsDeleteOne);

module.exports = router;
