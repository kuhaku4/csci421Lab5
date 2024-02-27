var express = require('express');
var router = express.Router();
var ctrlBlogs = require('../controllers/blogs');

router.post('/add', ctrlBlogs.blogsCreate);
router.get('/edit', ctrlBlogs.blogsReadOne);
router.put('/list/:blogid', ctrlBlogs.blogsUpdateOne);
router.delete('/delete/:blogid', ctrlBlogs.blogsDeleteOne);

module.exports = router;
