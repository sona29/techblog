const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    //for comments
    const { count, rows } = await Comment.findAndCountAll({
      where: {
        blog_id: req.params.id,
      },

      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const comments = rows.map((comment) => comment.get({ plain: true }));

    const blog = blogData.get({ plain: true });

    res.render('blog', {
      ...blog,
      comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

//edit post
router.get('/blog/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Blog.findByPk(req.params.id);

    const posts = postData.get({ plain: true });

    res.render('editblog', {
      ...posts,
      logged_in: true,
    });
  } catch (err) {
    res.status(00).json(err);
  }
});

module.exports = router;
