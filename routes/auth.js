const express = require('express')
const router = express.Router()
const {login, register, changeSubscription, forgotPassword} = require('../controller/auth')
const {registerUserValidator} = require('../validators/auth')
const {runValidation} = require('../validators')

router.post('/login', login)
router.post('/register', register)
router.post('/change-subscription', changeSubscription)
router.post('/forgot-password', forgotPassword)

module.exports  = router