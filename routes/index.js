const router = require('express').Router();
const usersRouter = require('./users.route');
const postsRouter = require('./posts.route.js');
const commentsRouter = require('./comments.route.js');

const defaultRouter = [
  {
    path: '/users',
    route: usersRouter,
  },
  {
    path: '/posts',
    route: postsRouter,
  },
  {
    path: '/comments',
    route: commentsRouter,
  },
];

defaultRouter.forEach((r) => {
  router.use(r.path, r.route);
});

module.exports = router;
