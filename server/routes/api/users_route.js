const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mongoose = require('mongoose');
const Users = require('../../models/users_db'); //Schema 
const {userAuth, roleAuth, serializeUser, generatedAccessToken, generatedRefreshToken, verifyRefreshToken} = require('../../middlewares/authorized');
require('dotenv').config({path: '../../../.env'});

// ROUTING USERS API
router.get('/', userAuth, roleAuth(['Admin']), (req, res, next) => {
    Users.find().exec()
    .then(data => {data ? res.status(200).json(data) : res.status(400).json({message: `Data not found`, errorDetails: data})})
    .catch(err => {res.status(500).json({message: 'An error occurred while retrieving User.',errorDetails: err})});
});

router.get('/:userId', userAuth, roleAuth(['Admin']), (req, res, next) => {
    const userId = req.params.userId;
    Users.findById({ _id : userId }).exec()
    .then(data => {data ? res.status(200).json(data) : res.status(400).json({message: `${userId} not found`,errorDetails: data})})
    .catch(err => {res.status(500).json({message: 'An error occurred while finding User.',errorDetails: err})});
});

router.get('/auth/profile', userAuth, (req, res, next) => {
    return res.status(200).json({user: serializeUser(req.user)})
});

router.post('/', userAuth, roleAuth(['Admin']), async (req, res, next) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 1);
    const users = new Users({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: hashedPassword,
        name: req.body.name,
        role: req.body.role,
        tel: req.body.tel,
        resDiv: req.body.resDiv
    });

    await users.save()
    .then(data => {res.status(201).json({message: 'User has been successfully created',createdUser: users})})
    .catch(err => {res.status(500).json({message: 'An error occurred while creating User.',errorDetails: err})});
});

router.post('/auth/login', (req, res, next) => {
    const auth_user = {
        username: req.body.username,
        password: req.body.password,
    }
    Users.findOne({username: auth_user.username}).exec()
    .then(async data => {
        const checkPass = bcrypt.compareSync(auth_user.password, data.password);
        if(data && checkPass){
            const accessToken = await generatedAccessToken(data);
            const refreshToken = await generatedRefreshToken(data);
            const jwtToken = {
                accessToken: `Bearer ${accessToken}`,
                refreshToken: `Bearer ${refreshToken}`,
            };
            const rtAge = 7*24*60*60;
            res.cookie('jwt', {jwt_access: jwtToken.accessToken, jwt_refresh: jwtToken.refreshToken}, { httpOnly: true, maxAge: rtAge * 1000 })
            res.status(200).json({jwtToken, message: 'User has been successfully authenticated'});
            res.send()
        }else{
            res.status(401).json({message: `Credential is invalid`, errorDetails: {username: auth_user.username, password: auth_user.password, checkPass: checkPass}})}
        })
    .catch(err => {res.status(500).json({message: 'An error occured while authenticating user and password.',errorDetails: err})})
});

router.post('/auth/refresh-token', async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken){
            res.status(401).json({message: 'refreshToken has expired, Please login again.'})
        }
        const raw_refreshToken = refreshToken && refreshToken.split(' ')[1]
        const payload = await verifyRefreshToken(raw_refreshToken);
        const newAccessToken = await generatedAccessToken(payload);
        const newRefreshToken = await generatedRefreshToken(payload);
        const newjwtToken = {
            accessToken: `Bearer ${newAccessToken}`,
            refreshToken: `Bearer ${newRefreshToken}`,
        }
        const rtAge = 7*24*60*60;
        res.cookie('jwt', {jwt_access: newjwtToken.accessToken, jwt_refresh: newjwtToken.refreshToken}, { httpOnly: true, maxAge: rtAge * 1000 })
        res.status(200).json({newjwtToken, message: 'User has been successfully refresh for authentication.'})
    } catch(err){
        next(err);
    }

});

router.delete('/auth/logout', async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken){
            res.status(401).json({message: 'refreshToken has expired, Please login again.'})
        }
        const raw_refreshToken = refreshToken && refreshToken.split(' ')[1]
        const payload = await verifyRefreshToken(raw_refreshToken);

        //await localStorage.removeItem('payload');
        res.cookie('jwt', '', { maxAge: 1 });
        res.status(200).json({message: 'User has been successfully logout.'})
    }
        catch(err){
        next(err);
    }
})

router.delete('/:userId', userAuth, roleAuth(['Admin']), (req, res, next) => {
    const userId = req.params.userId;
    Users.findOneAndDelete({ _id : userId }).exec()
    .then(data => data ? res.status(200).json({message: 'User has been successfully deleted',deletedUser: userId}) : res.status(400).json({message: `Can't delete, ${userId} doesn't exist`, errorDetails: data}))
    .catch(err => res.status(500).json({message: 'An error occurred while deleting User.',errorDetails: err}));
});

router.patch('/:userId', userAuth, roleAuth(['Admin']), (req, res, next) => {
    const userId = req.params.userId;
    Users.findByIdAndUpdate(userId, { $set: req.body }, { new: true }).exec()
    .then(data => data ? res.status(200).json(data) : res.status(400).json({message: `Can't Update, ${userId} doesn't exist`, errorDetails: data}))
    .catch(err => res.status(500).json({message: 'An error occurred while updating User.',errorDetails: err}));
});

/*router.patch('/resDivPush/:userId', (req, res, next) => {
    const userId = req.params.userId;
    Users.findByIdAndUpdate(userId, { $addToSet: { resDiv: req.body.resDiv }}, { new: true }).exec()
    .then(data => data ? res.status(200).json(data) : res.status(400).json({message: `Can't Add responsible division to, ${userId} doesn't exist`, errorDetails: data}))
    .catch(err => res.status(500).json({message: 'An error occurred while updating responsible division to User.',errorDetails: err}));
});

router.patch('/resDivPull/:userId', (req, res, next) => {
    const userId = req.params.userId;
    Users.findByIdAndUpdate(userId, { $pull: { resDiv: req.body.resDiv }}, { new: true }).exec()
    .then(data => data ? res.status(200).json(data) : res.status(400).json({message: `Can't remove responsible division to, ${userId} doesn't exist`, errorDetails: data}))
    .catch(err => res.status(500).json({message: 'An error occurred while updating responsible division to User.',errorDetails: err}));
});*/

module.exports = router;
