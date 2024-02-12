var express = require('express');
var router = express.Router();
var crtlHome = require('../controllers/homepage');
var crtlBlog = require('../controllers/blog');

/* GET home page. */
router.get('/', crtlHome.home);
router.get('/list', crtlBlog.list);
router.get('/add', crtlBlog.add);

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>

module.exports = router;
