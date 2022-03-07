require('dotenv').config({path: '../.env'});
const passport = require('passport');
const jwt = require('jsonwebtoken');

const generatedAccessToken = (user) => {
    return new Promise((resolve, reject) => {
        const payload = {
            username: user.username,
            name: user.name,
            role: user.role,
            resDiv: user.resDiv,
        };
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const options = { expiresIn: "30m" };
        const jwt_access_token = jwt.sign(payload, secret, options, (err, token) => {
            if(err) return reject(err)
            resolve(token)
        })
    })
};

const generatedRefreshToken = (user) => {
    return new Promise((resolve, reject) => {
        const payload = {
            username: user.username,
            name: user.name,
            role: user.role,
            resDiv: user.resDiv,
        };
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const options = { expiresIn: "7d" };
        const jwt_access_token = jwt.sign(payload, secret, options, (err, token) => {
            if(err) return reject(err)
            return resolve(token)
        })
    })
}

const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        const secret = process.env.REFRESH_TOKEN_SECRET;
        jwt.verify(refreshToken, secret, (err, payload) => {
            if(err) return reject(res.status(403))
            const refreshPayload = { 
                username: payload.username,
                name: payload.name,
                role: payload.role,
                resDiv: payload.resDiv,
            }
            return resolve(refreshPayload)
        })
    })
}

const userAuth = passport.authenticate("jwt", { session: false });

const roleAuth = roles => (req, res, next) => {
    !roles.includes(req.user.role) ? res.status(401).json({message: `${req.user.role} role is not authorized to use this function`}) : next()
};

const serializeUser = user => {
    return {
        _id: user._id,
        username: user.username,
        name: user.name,
        role: user.role,
        scope: user.role,
        resDiv: user.resDiv,
        tel: user.tel,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
};

module.exports = {userAuth, roleAuth, serializeUser, generatedAccessToken, generatedRefreshToken, verifyRefreshToken}