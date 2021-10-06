const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId },
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        role: { type: String, default: 'Observer', required: true },
        resDiv: [{ type: Number }],
        tel: { type: String },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Users', userSchema);