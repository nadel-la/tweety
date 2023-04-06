const express = require('express')
const session = require('express-session')
const app = express()
const port = 3003
const router = require('./routers')
const TWO_HOURS = 1000 * 60 * 60 * 2
const SESS_LIFETIME = TWO_HOURS


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})