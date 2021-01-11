import express from 'express'
import history from 'connect-history-api-fallback'
import path from 'path'
import serveStatic from 'serve-static'

const port = process.env.PORT || 5000

const app = express()

app.use(history())
app.use(serveStatic(path.join(__dirname, '/dist/spa')))
app.listen(port)
