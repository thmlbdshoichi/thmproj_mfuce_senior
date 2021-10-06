const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Users = require('../../models/users_db') //Schema  

/*
Convert and simplified
1. Updated
2. delete
3. Delete All
from Petch controllers file
*/

router.get('/', (req, res, next) => {
    Users.find().exec()
    .then(data => {res.status(200).json(data)})
    .catch(err => {res.status(500).json({message: 'An error occurred while retrieving User.',errorDetails: err})})
});

router.get('/:userId', (req, res, next) => {
    const userId = req.params.userId;
    Users.findById(userId).exec()
    .then(data => {data ? res.status(200).json(data) : res.status(401).json({message: `${userId} not found`,errorDetails: data})})
    .catch(err => {res.status(500).json({message: 'An error occurred while finding User.',errorDetails: err})})
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

module.exports = router;
