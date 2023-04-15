const session = require("express-session");
const router = require('express').Router()
const UserController = require('../controllers/UserController')
const TweetController = require('../controllers/tweetController')



router.use(function (req, res, next) {
    console.log(req.session);
    console.log('Time:', Date.now(), '<< <middleware global inii')
    if (!req.session.userId) {
        
    }
    next()
})
router.get('/', UserController.home)

router.get('/register',UserController.getRegister)
router.post('/register',UserController.postRegister)

router.get('/login',UserController.getLogin)
router.post('/login', UserController.postLogin)

router.use(function (req, res, next) {
    // console.log(req.session);
    console.log('Time:', Date.now(), '<< <middleware global inii')
    if (!req.session.userId) {
        const error = `Please login first`
        res.redirect(`/login?error=${error}`)
    }
    next()
})

router.get('/tweety/home',TweetController.tweetyHome)
router.post('/tweety/home', TweetController.postTweety)

router.get('/edit/profile/:id', TweetController.editProfile)
router.post('/edit/profile/:id', TweetController.postEditProfile)

router.get('/tweety/home/delete/:id',TweetController.deleteTweety)

// router.use('/userDetail',require('./userDetail'))
// router.use('/userDetail',require('./userDetail'))
// router.use('/tweets',require('./tweets'))

module.exports = router