const express = require('express')

const User = require('./users-model')
const Post = require('../posts/posts-model')


const { validateUserId, validateUser, validatePost } = require('../middleware/middleware')
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res, next) => {
 // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(next)
});


router.get('/:id', validateUserId , (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  User.insert({name: req.name})
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  User.update(req.params.id, {name: req.name })
  .then(updated => {
    return User.getById(req.params.id)
  })
  .then(user => {
    res.status(200).json(user)
  })
  .catch(next)
});

router.delete('/:id', validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  User.remove(req.params.id)
  .then(user => {
    res.json(req.user)
  })
  .catch(next)
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  User.getUserPosts(req.params.id)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(next)
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const newPost = Post.insert({user_id: req.params.id , text : req.text })
  .then(newPost => {
    res.status(201).json(newPost)
  })
  .catch(next)
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: 'something happened within the posts router',
    message: err.message,
    stack: err.stack,
  })
})

// do not forget to export the router

module.exports = router


