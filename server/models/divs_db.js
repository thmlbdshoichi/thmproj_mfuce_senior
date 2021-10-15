const mongoose = require('mongoose');

const divSchema = mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId },
        divTag: { type: Number, unique: true, required: true },
        divName: { type: String, unique: true, required: true },
        tel: { type: String },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Divisions', divSchema);