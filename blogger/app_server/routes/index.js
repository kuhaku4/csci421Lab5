var express = require('express');
var router = express.Router();
var crtlHome = require('../controllers/homepage');
var crtlBlog = require('../controllers/blog');

/* GET home page. */
router.get('/', crtlHome.home);
router.post('/complete/:id', crtlBlog.commitComplete);
router.get('/list', crtlBlog.list);
router.get('/add', crtlBlog.addBlog);
router.post('/add', crtlBlog.saveBlog);
router.get('/delete/:id',crtlBlog.deleteTask);
router.post('/delete/:id',crtlBlog.confirmDelete);
router.get('/edit/:id',crtlBlog.blogEdit);
router.post('/edit/:id',crtlBlog.commitEdit);

router.get('/add')
/* TEST7*/
module.exports = router;
