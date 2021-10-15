const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Divs = require('../../models/divs_db') //Schema  

router.get('/', (req, res, next) => {
    Divs.find().sort({divTag: 1}).exec()
    .then(data => {data ? res.status(200).json(data) : res.status(400).json({message: `Data not found`, errorDetails: data})})
    .catch(err => {res.status(500).json({message: 'An error occurred while retrieving Divisions.',errorDetails: err})});
});

router.get('/:divId', (req, res, next) => {
    const divId = req.params.divId;
    Divs.findById({ _id : divId }).exec()
    .then(data => {data ? res.status(200).json(data) : res.status(400).json({message: `${divId} not found`,errorDetails: data})})
    .catch(err => {res.status(500).json({message: 'An error occurred while finding Division.',errorDetails: err})});
});

router.post('/', (req, res, next) => {

    const divs = new Divs({
        _id: new mongoose.Types.ObjectId(),
        divTag: req.body.divTag,
        divName: req.body.divName,
        tel: req.body.tel
    });

    divs.save()
    .then(data => {res.status(201).json({message: 'Division has been successfully created',createdUser: divs})})
    .catch(err => {res.status(500).json({message: 'An error occurred while creating Division.',errorDetails: err})});
});

router.patch('/:divId', (req, res, next) => {
    const divId = req.params.divId;
    Divs.findByIdAndUpdate(divId, { $set: req.body }, { new: true }).exec()
    .then(data => data ? res.status(200).json(data) : res.status(400).json({message: `Can't Update, ${divId} doesn't exist`, errorDetails: data}))
    .catch(err => res.status(500).json({message: 'An error occurred while updating Division.',errorDetails: err}));
});

router.delete('/:divId', (req, res, next) => {
    const divId = req.params.divId;
    Divs.findOneAndDelete({ _id : divId }).exec()
    .then(data => data ? res.status(200).json({message: 'Division has been successfully deleted',deletedDiv: {divTag: data.divTag,divName: data.divName }}) : res.status(400).json({message: `Can't delete, ${divId} doesn't exist`, errorDetails: data}))
    .catch(err => res.status(500).json({message: 'An error occurred while deleting Division.',errorDetails: err}));
})


module.exports = router;
