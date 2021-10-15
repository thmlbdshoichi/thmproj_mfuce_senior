const mongoose = require('mongoose');

const questionSchema = mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId },
        qSequence: { type: Number, required: true },
        qName: { type: String, required: true },
        divTag: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

questionSchema.index({ qSequence: 1,divTag: 1 }, { unique: true });

module.exports = mongoose.model('Questions', questionSchema);