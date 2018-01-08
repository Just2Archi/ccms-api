const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const db = require('./config/db')

const app = express()
const port = process.env.PORT || 8000

app.use(bodyParser.json())

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
});
