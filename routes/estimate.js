const express = require('express')
const router = express.Router()
const {estimate, surveyCancellation, surveySuggestion} = require('../controller/estimate')


router.post('/estimate', estimate)
router.post('/survey-cancellation', surveyCancellation)
router.post('/survey-suggestion', surveySuggestion)

module.exports  = router