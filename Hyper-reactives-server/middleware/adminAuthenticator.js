const jwt = require('jsonwebtoken');

module.exports.authenticate = function (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.SECRET, (err, user) => {
        console.log(err)
        if (err || user._id != '62f0402cd5000147691e1881') return res.sendStatus(403)
        req.user = user
        next()
    })
}

