const Controller = require("../controllers/controller");
const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('Hello World')
})


router.use('/user',require('./user'))
router.use('/userDetail',require('./userDetail'))
router.use('/tweets',require('./tweets'))

module.exports = router