const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    fullName: String,
    department: String,
    position: String,
    qrCode: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('user', Schema);