const User = require('./../models/user');

let auth = (req, res, next) => {
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
    } else {
        token = '';
    }

    User.findByToken(token, (err, user) => {
        if(err) throw err;

        if (!user) {
            return res.json({ success: false, message: "Login Required"});
        }

        req.token = token;
        req.user  = user;

        next();

    });
}

module.exports = {auth};