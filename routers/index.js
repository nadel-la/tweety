const Controller = require("../controllers/controller");
const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.get('/', (req, res) => {
    res.send('Hi! tweeny!')
})

router.get('/register',UserController.getRegister)
router.post('/register',UserController.postRegister)

router.get('/login',UserController.getLogin)
router.post('/login',UserController.postLogin)

router.use('/user',require('./user'))
router.use('/userDetail',require('./userDetail'))
router.use('/tweets',require('./tweets'))

module.exports = router