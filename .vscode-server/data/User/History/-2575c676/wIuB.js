var express = require('express');
var router = express.Router();

var ctrlBlogs = require('../controllers/blog');

router.get('/list', ctrlBlogs.blogList);
router.post('/add', ctrlBlogs.blogAdd);
router.get('/:blogId', ctrlBlogs.blogFindOne);
router.put('/:blogId', ctrlBlogs.blogEdit);
router.delete('/:blogId', ctrlBlogs.blogDelete);

module.exports = router;
