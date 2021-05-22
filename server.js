const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const app = express()

// ROUTES
const authRoutes = require('./routes/auth')
const salesRoutes = require('./routes/estimate')

// MIDDELWARE
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({credentials: true, origin: process.env.CLIENT_URL}))

// API
app.use('/api/', salesRoutes)
app.use('/api/auth', authRoutes)
app.use('/test', (req, res) => {
  console.log('Hello')
  console.log(req)
  console.log(req.body)
  res.send('Hello')
})

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))