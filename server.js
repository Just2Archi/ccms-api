// Main Packages

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

// Config

const cfg = require('./config/cfg')

// App

app.use(cors())

app.set('superSecret', cfg.secret)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan('dev'))

// Database

const port = process.env.PORT || 8000

mongoose.connect(cfg.database, { useMongoClient: true }, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes') (app, mongoose)
  app.listen(port)
})
