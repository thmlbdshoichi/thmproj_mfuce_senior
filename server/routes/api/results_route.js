const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');
const EvalResults = require('../../models/results_db') //Schema 

router.get('/', (req, res, next) => {
    EvalResults.find().sort({divTag: 1}).exec()
    .then(data => {data ? res.status(200).json(data) : res.status(400).json({message: `Data not found.`, errorDetails: data})})
    .catch(err => {res.status(500).json({message: 'An error occurred while retrieving All Results.',errorDetails: err})});
});

router.get('/:divTag', (req, res, next) => {
    const divTag = req.params.divTag;
    EvalResults.find({ divTag : divTag }).sort({createdAt: 1}).exec()
    .then(data => {data ? res.status(200).json(data) : res.status(400).json({message: `Results from division ${divTag} not found.`,errorDetails: data})})
    .catch(err => {res.status(500).json({message: `An error occurred while retrieving Evaluation results from Division ${divTag}.`,errorDetails: err})});
});

router.get('/:divTag/:startDate&:endDate', (req, res, next) => {
    const divTag = req.params.divTag;
    const startDate = moment(req.params.startDate).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ"); //Format on request parameters
    const endDate = moment(req.params.endDate).utcOffset('+0700').format("YYYY-MM-DDTHH:mm:ss.SSSZ");    //2021-10-16 16:53:00
    console.log(startDate);
    console.log(endDate);
    EvalResults.find({ divTag : divTag, createdAt: {$gt: startDate, $lt: endDate} }).exec()
    .then(data => {data ? res.status(200).json(data) : res.status(400).json({message: `Results from division ${divTag} not found.`,errorDetails: data})})
    .catch(err => {res.status(500).json({message: `An error occurred while retrieving Evaluation results from Division ${divTag}.`,errorDetails: err})});
    
});

router.post('/', (req, res, next) => {

    const evalResults = new EvalResults({
        _id: new mongoose.Types.ObjectId(),
        divTag: req.body.divTag,
        divName: req.body.divName,
        evaluate_score: req.body.evaluate_score,
        comment: req.body.comment
    });

    evalResults.save()
    .then(data => {res.status(201).json({message: 'Evaluation has been successfully saved',evalResult: evalResults})})
    .catch(err => {res.status(500).json({message: 'An error occurred while saving result.',errorDetails: err})});
});

router.delete('/:divTag', (req, res, next) => {
    const divTag = req.params.divTag;
    EvalResults.deleteMany({divTag: divTag}).exec()
    .then(data => data ? res.status(200).json({message: `Evaluation Result of Division ${divTag} has been successfully deleted`,deletedResult: data}) : res.status(400).json({message: `Can't delete result of Division ${divTag} is already empty`, errorDetails: data}))
    .catch(err => res.status(500).json({message: `An error occurred while resetting result from Division ${divTag}.`,errorDetails: err}));
})

router.delete('/:divTag/:resultId', (req, res, next) => {
    const divTag = req.params.divTag;
    const resultId = req.params.resultId;
    EvalResults.findOneAndDelete({divTag: divTag, _id: resultId}).exec()
    .then(data => data ? res.status(200).json({message: `Evaluation Result ID ${resultId} of Division ${divTag} has been successfully deleted`,deletedResult: data}) : res.status(400).json({message: `Can't delete, result ID ${resultId} of Division ${divTag} doesn't exist`, errorDetails: data}))
    .catch(err => res.status(500).json({message: `An error occurred while resetting result ${resultId} from Division ${divTag}`,errorDetails: err}));
})

module.exports = router;

// Todo - CRUD -> READ WITH TIMESTAMP!?