const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firebaseUid: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    displayName: {
        type: String,
        default: null,
    },
    photoURL: {
        type: String,
        default: null,
    },
    provider: {
        type: String,
        default: 'email', // 'email' or 'google'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };