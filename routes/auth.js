const express = require('express')
const router = express.Router()
const {login, register} = require('../controller/auth')
const {registerUserValidator} = require('../validators/auth')
const {runValidation} = require('../validators')

router.post('/login', login)
router.post('/register', registerUserValidator, runValidation, register)

module.exports  = router