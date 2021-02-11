const express = require('express')
const history = require('connect-history-api-fallback')
const path = require('path')
const serveStatic = require('serve-static')

const port = process.env.PORT || 5000

const app = express()

app.use(history())
app.use(serveStatic(path.join(__dirname, '/dist/pwa')))
app.listen(port)
console.log(`[SERVER] Running on port ${port}`)
