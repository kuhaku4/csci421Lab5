var express = require('express');
var router = express.Router();
var ctrlBlogs = require('../controllers/blogs');

router.post('/blogs', ctrlBlogs.blogCreate);
router.get('/blogs', ctrlBlogs.blogsReadOne);
router.put('/blogs/:blogid', ctrlBlogs.blogsUpdateOne);
router.delete('/blogs/:blogid', ctrlBlogs.blogsDeleteOne);

module.exports = router;
