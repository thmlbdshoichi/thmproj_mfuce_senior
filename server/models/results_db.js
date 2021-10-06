const mongoose = require('mongoose');

const resultSchema = mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId },
        divTag: { type: Number, required: true },
        divName: { type: String, required: true },
        evaluate_score = [ { type: Number } ], 
        comment: { type: String },
    },
    {
        timestamps: true,
        strict: false,
    }
);

module.exports = mongoose.model('Results', resultSchema);