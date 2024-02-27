var express = require('express');
var router = express.Router();

var ctrlBlogs = require('../controllers/blogs');

router.get('/', ctrlBlogs.blogList);
router.post('/add', ctrlBlogs.blogAdd);
router.get('/edit/:blogId', ctrlBlogs.blogFindOne);
router.put('/edit/:blogId', ctrlBlogs.blogEdit);
router.delete('/delete/:blogId', ctrlBlogs.blogDelete);

module.exports = router;
