require("dotenv").config()
require("express-async-errors")

const accessLogMiddleware = require("./middlewares/logger.middleware")
const indexRoute = require("./routes")
const nftRoute = require('./routes/nft')

const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())

app.use(express.json())

// Req and Res logger.
app.use(accessLogMiddleware)

app.use("/", indexRoute)
app.use("/api/nft/", nftRoute)

module.exports = app
