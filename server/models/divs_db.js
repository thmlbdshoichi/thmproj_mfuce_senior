const mongoose = require('mongoose');

const divSchema = mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId },
        divTag: { type: String, unique: true, required: true },
        divName: { type: String, unique: true, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Divisions', divSchema);