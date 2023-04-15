const { User } = require('../models')
const bcrypt = require('bcryptjs')
const session = require('express-session')

class UserController {

    static home(req,res) {
        res.render('home')
    }
        
    static getRegister(req, res) {
        res.render('registerForm')
    }

    static postRegister(req, res) {
        let { firstName, lastName, email, password } = req.body
        User.create({ firstName, lastName, email, password })
            .then((data) => {
                res.redirect('/login')
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static getLogin(req, res) {
        const { error } = req.query
        
        res.render('loginForm',{error})
    }

    static postLogin(req, res) {
        const { email, password } = req.body
        User.findOne({ where: { email } })
            .then((user) => {
                if (user) {
                    const isValidPass = bcrypt.compareSync(password, user.password);

                    if (isValidPass) {

                        req.session.userEmail = user.email
                        req.session.userId = user.id
                        return res.redirect(`/tweety/home`)
                    } else {
                        const error = "invalid email/password"
                        return res.redirect(`/login?error=${error}`)
                    }
                } else {
                    const error = "There's no account with that email/password"
                    return res.redirect(`/login?error=${error}`)
                }
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static landingPage(req, res) {
        res.render('')
    }
}

module.exports = UserController