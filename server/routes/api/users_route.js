const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Users = require('../../models/users_db') //Schema  

router.get('/', (req, res, next) => {
    Users.find().exec()
    .then(data => {data ? res.status(200).json(data) : res.status(400).json({message: `Data not found`, errorDetails: data})})
    .catch(err => {res.status(500).json({message: 'An error occurred while retrieving User.',errorDetails: err})});
});

router.get('/:userId', (req, res, next) => {
    const userId = req.params.userId;
    Users.findById({ _id : userId }).exec()
    .then(data => {data ? res.status(200).json(data) : res.status(400).json({message: `${userId} not found`,errorDetails: data})})
    .catch(err => {res.status(500).json({message: 'An error occurred while finding User.',errorDetails: err})});
});

router.post('/', (req, res, next) => {

    const users = new Users({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        role: req.body.role,
        tel: req.body.tel,
        resDiv: req.body.resDiv
    });

    users.save()
    .then(data => {res.status(201).json({message: 'User has been successfully created',createdUser: users})})
    .catch(err => {res.status(500).json({message: 'An error occurred while creating User.',errorDetails: err})});
});

router.patch('/:userId', (req, res, next) => {
    const userId = req.params.userId;
    Users.findByIdAndUpdate(userId, { $set: req.body }, { new: true }).exec()
    .then(data => data ? res.status(200).json(data) : res.status(400).json({message: `Can't Update, ${userId} doesn't exist`, errorDetails: data}))
    .catch(err => res.status(500).json({message: 'An error occurred while updating User.',errorDetails: err}));
});

router.patch('/resDivPush/:userId', (req, res, next) => {
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
});

router.delete('/:userId', (req, res, next) => {
    const userId = req.params.userId;
    Users.findOneAndDelete({ _id : userId }).exec()
    .then(data => data ? res.status(200).json({message: 'User has been successfully deleted',deletedUser: userId}) : res.status(400).json({message: `Can't delete, ${userId} doesn't exist`, errorDetails: data}))
    .catch(err => res.status(500).json({message: 'An error occurred while deleting User.',errorDetails: err}));
})


module.exports = router;
