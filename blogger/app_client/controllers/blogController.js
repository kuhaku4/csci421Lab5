const express = require('express');
const router = express.Router();
const blogService = require('../services/blogService');

router.get('/', (req, res) => {
  res.render('homePage', { title: 'Welcome to my blog site.' });
});

router.get('/blogs', (req, res) => {
  blogService.getBlogs().then(blogs => {
    res.render('blogList', {
      title: 'Blog',
      pageHeader: {
        title: 'Blog List'
      },
      blogs: blogs
    });
  });
});

router.get('/blogs/add', (req, res) => {
  res.render('addBlog', { title: 'Add Blog', blog: {} });
});

router.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  blogService.getBlog(id).then(blog => {
    if (blog) {
      res.render('blogView', {
        title: 'Blog',
        pageHeader: {
          title: 'Blog Details'
        },
        blog: blog
      });
    } else {
      res.status(404).send('Blog not found.');
    }
  });
});

router.post('/blogs/add', (req, res) => {
  blogService.addBlog(req.body)
    .then(() => {
      res.redirect('/blogs');
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
});

router.get('/blogs/:id/edit', (req, res) => {
  const id = req.params.id;
  blogService.getBlog(id).then(blog => {
    if (blog) {
      res.render('addBlog', { title: 'Edit Blog', blog: blog });
    } else {
      res.status(404).send('Blog not found.');
    }
  });
});

router.post('/blogs/:id/edit', (req, res) => {
  const id = req.params.id;
  blogService.updateBlog(id, req.body)
    .then(() => {
      res.redirect('/blogs');
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
});

router.get('/blogs/:id/delete', (req, res) => {
  const id = req.params.id;
  blogService.getBlog(id).then(blog => {
    if (blog) {
      res.render('deleteBlog', { title: 'Delete Blog', blog: blog });
    } else {
      res.status(404).send('Blog not found.');
    }
  });
});

router.post('/blogs/:id/delete', (req, res) => {
  const id = req.params.id;
  blogService.deleteBlog(id)
.then(() => {
      res.redirect('/blogs');
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
});

module.exports = router;