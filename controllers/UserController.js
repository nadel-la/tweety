const { User } = require('../models')
const bcrypt = require('bcryptjs')

class UserController {

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
                        return res.redirect('/')
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
}

module.exports = UserController