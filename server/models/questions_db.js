const mongoose = require('mongoose');

const questionSchema = mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId },
        qID: { type: Number, required: true },
        divTag: { type: Number, required: true },
        divName: { type: String, required: true },
        tel: { type: Number },
    },
    {
        timestamps: true,
    }
);