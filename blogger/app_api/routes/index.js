var express = require('express');
var router = express.Router();
var ctrlBlogs = require('../controllers/blogs');

router.post('/blogs', crtlBlogs.blogCreate);
router.get('/blogs', crtlBlogs.blogsReadOne);
router.put('/blogs/:blogid', crtlBlogs.blogsUpdateOne);
router.delete('/blogs/:blogid', crtlBlogs.blogsDeleteOne);

module.exports = router;
