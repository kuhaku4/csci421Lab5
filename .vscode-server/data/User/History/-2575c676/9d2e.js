var express = require('express');
var router = express.Router();
var ctrlBlogs = require('../controllers/blogs');

router.post('/blog', ctrlBlogs.blogCreate);
router.get('/blog', ctrlBlogs.blogsReadOne);
router.put('/blog/:blogid', ctrlBlogs.blogsUpdateOne);
router.delete('/blog/:blogid', ctrlBlogs.blogsDeleteOne);

module.exports = router;
