var express = require('express');
var router = express.Router();
var ctrlBlogs = require('../controllers/blogs');

router.get('/api', ctrlBlogs.blogsList);

router.post('/api', ctrlBlogs.blogsCreate);

router.get('/api/:blogid', ctrlBlogs.blogsReadOne);

router.put('/api/:blogid', ctrlBlogs.blogsUpdate);

router.delete('/api/:blogid', ctrlBlogs.blogsDelete);

module.exports = router;
