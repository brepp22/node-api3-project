const User = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timestamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl
  console.log(`[${timestamp}] ${method} to ${url}`)
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try{
    const user = await User.getById(req.params.id)
    if(user){
      req.user = user
      next()
    } else {
      next({ status: 404 , message: `${req.params.id} not found`})
    }
  } catch(error){
   res.status(500).json({
    message: 'problem finding user'
   })
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  console.log('validateUser middleware')
  next()
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  console.log('validatePost middleware')
  next()
}

// do not forget to expose these functions to other modules

module.exports = {
  logger, 
  validateUserId,
  validateUser,
  validatePost,
}
