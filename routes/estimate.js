const express = require('express')
const router = express.Router()
const {estimate} = require('../controller/estimate')


router.post('/estimate', estimate)

module.exports  = router