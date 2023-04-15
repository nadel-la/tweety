const { Tweet, User, Comment, UserDetail } = require('../models')
const { getMinutes } = require('../helpers/formattedData')

class TweetController {
    static tweetyHome(req, res) {
        let UserId = req.session.userId
        Tweet.findAll({
            include: {
                model: User,
                include: UserDetail
            }
        })
            .then((data) => {
                // res.send(data)
                // console.log(`${data} <<<<<<<< iNI YA`);
                res.render('tweety', { data, UserId, getMinutes })
            })
            .catch(err => {
                // console.log(err);
                res.send(err)
            })
    }

    static postTweety(req, res) {
        let { tweet } = req.body
        const UserId = req.session.userId
        Tweet.create({ tweet, UserId })
            .then((data) => {
                res.redirect('/tweety/home')
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static deleteTweety(req, res) {
        const id = req.params
        console.log(req.params);
        Tweet.destroy({
            where: id
        })
            .then((data) => {
                res.redirect('/tweety/home')
            })
            .catch((err) => {
                res.send(err)
            })

    }

    static editProfile(req, res) {
        const id = req.session.userId
        User.findByPk(id)
            .then((data) => {
                // res.send(data)
                res.render('editId', { data, id })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static postEditProfile(req, res) {
        const UserId = req.params.id
        console.log(req.body, "<<<<<<");
        let { username, bio, location } = req.body
        UserDetail.create({ username, bio, location, UserId })
            .then((data) => {
                res.redirect('/tweety/home')
            })
            .catch((err) => {
                console.log(err);
                res.send(err)
            })

    }
}

module.exports = TweetController
