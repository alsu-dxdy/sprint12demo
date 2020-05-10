const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/users');
const { JWT_SECRET } = require('../config');

class ErrorForbiden extends Error {
    constructor(message) {
        super(message);
        this.status = 403;
    }
}

class ErrorNotFound extends Error {
    constructor(message) {
        super(message);
        status = 404;
    }
}

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, data) => {
            if (err){
                reject(err)
            }

            resolve(data);
        })
    })
}

module.exports.authenticate = async (req, res, next) => {
    try{
        const data = await verifyToken(req.cookies.jwt);
        const user = await userModel.findById(data._id);
        if (!user){
            throw ErrorNotFound();
        }
        req.user = user;
        next()
    }
    catch(err){
        next(err);
    }

}


module.exports.signIn = async (req, res, next) => {
    const { email, password } = req.body;

    try{
        const user = await userModel.findOne({ email }).select('+password');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new ErrorForbiden('UNAUTHORIZE')
        }
    
        const token = jwt.sign(user.toJSON(), JWT_SECRET, { expiresIn: '7d' })
        res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: true,
        })
        res.json({ token })    
    }
    catch(err){
        next(err);
    }
}

module.exports.signUp = (req, res, next) => {
    const { email, password } = req.body;

    bcrypt.hash(password, 10)
        .then(hash => {
            return userModel.create({ email, password: hash })
        })
        .then(user => {
            return userModel.findOne({ email })
        })
        .then(user =>
            res.json(user)
        )
        .catch(err => {
            next(err);
        })
}
