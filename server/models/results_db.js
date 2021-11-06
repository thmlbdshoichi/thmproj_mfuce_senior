const mongoose = require('mongoose');

const resultSchema = mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId },
        divTag: { type: String, required: true },
        evalScore : [{type: Number}], 
        comment: { type: String },
    },
    {
        timestamps: true,
        strict: false,
    }
);

module.exports = mongoose.model('EvalResults', resultSchema);