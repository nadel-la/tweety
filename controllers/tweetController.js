const { Tweet, User, Comment, UserDetail } = require('../models')
const { getMinutes } = require('../helpers/formattedData')

class TweetController {
    static tweetyHome(req, res) {
        // console.log(req.session.userId);
        Tweet.findAll({
            include: {
                model: User,
                include : UserDetail
            }
        })
            .then((data) => {
                res.send(data)
                // res.render('tweety', { data, getMinutes })
            })
            .catch(err => {
                console.log(err);
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
}

module.exports = TweetController
