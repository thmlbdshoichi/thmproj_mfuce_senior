const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Questions = require('../../models/questions_db') //Schema  

router.get('/', (req, res, next) => {
    Questions.find().sort({divTag: 1, qId: 1}).exec()
    .then(data => {data ? res.status(200).json(data) : res.status(400).json({message: `Data not found.`, errorDetails: data})})
    .catch(err => {res.status(500).json({message: 'An error occurred while retrieving All Questions.',errorDetails: err})});
});

router.get('/:divTag', (req, res, next) => {
    const divTag = req.params.divTag;
    Questions.find({ divTag : divTag }).sort({qId: 1}).exec()
    .then(data => {data ? res.status(200).json(data) : res.status(400).json({message: `Question from division ${divTag} not found.`,errorDetails: data})})
    .catch(err => {res.status(500).json({message: `An error occurred while retrieving Question of Division ${divTag}.`,errorDetails: err})});
});

router.get('/:divTag/:qSequence', (req, res, next) => {
    const divTag = req.params.divTag;
    const qSequence = req.params.qSequence;
    Questions.find({ divTag: divTag, qSequence: qSequence }).exec()
    .then(data => {data ? res.status(200).json(data) : res.status(400).json({message: `Division ${divTag} doesn't have Question ${qSequence}`,errorDetails: data})})
    .catch(err => {res.status(500).json({message: 'An error occurred while finding Question.',errorDetails: err})});
});

router.post('/', (req, res, next) => {

    const question = new Questions({
        _id: new mongoose.Types.ObjectId(),
        qSequence: req.body.qSequence,
        qName: req.body.qName,
        divTag: req.body.divTag
    });

    question.save()
    .then(data => {res.status(201).json({message: 'Question has been successfully created',createdUser: question})})
    .catch(err => {res.status(500).json({message: 'An error occurred while creating Question.',errorDetails: err})});
});

router.patch('/:divTag/:qSequence', (req, res, next) => {
    const divTag = req.params.divTag;
    const qSequence = req.params.qSequence; // Problem with wroung update
    Questions.findOneAndUpdate({divTag: divTag, qSequence: qSequence}, { $set: req.body }, { new: true }).exec()
    .then(data => data ? res.status(200).json(data) : res.status(400).json({message: `Can't Update, Question ${qSequence} of Division ${divTag} doesn't exist`, errorDetails: data}))
    .catch(err => res.status(500).json({message: 'An error occurred while updating Question.',errorDetails: err}));
});

router.delete('/:divTag/:qSequence', (req, res, next) => {
    const divTag = req.params.divTag;
    const qSequence = req.params.qSequence;
    Questions.findOneAndDelete({divTag: divTag, qSequence: qSequence}).exec()
    .then(data => data ? res.status(200).json({message: 'Question has been successfully deleted',deletedQuestion: {divTag: data.divTag,Question: data.qName }}) : res.status(400).json({message: `Can't delete question ${qSequence} of Division ${divTag} doesn't exist`, errorDetails: data}))
    .catch(err => res.status(500).json({message: 'An error occurred while deleting Question.',errorDetails: err}));
})


module.exports = router;
