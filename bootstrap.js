const mongoose = require("mongoose")
require('dotenv').config()

let connectionString

if (process.env.NODE_ENV == "development") {
  connectionString = process.env.MONGODBATLAS_CONNECTION_STRING
} else {
  connectionString = process.env.MONGODB_CONNECTION_STRING
}

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('we are connected to mongoDB!!!🤪')
})

