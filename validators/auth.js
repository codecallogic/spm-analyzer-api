const {check} = require('express-validator')

exports.registerUserValidator = [
  check('email', 'Email is not valid').isEmail(),
  check('password', 'Password must have a minimum of 8 characters, must contain one uppercase letter, one lowercase letter, a number, and one special character').custom( value => {
    let regex = /^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$.!%*#?&]).*$/g
    if(regex.test(value)){
      return true
    }
    return false
  })
]