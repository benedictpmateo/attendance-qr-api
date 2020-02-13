const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    fullName: { type: String, required: true },
    department: { type: String, required: true },
    position: { type: String, required: true },
    qrCode: { type: String, required: true, unique: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('user', Schema);