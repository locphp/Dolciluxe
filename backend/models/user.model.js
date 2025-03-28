const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleID: { type: String, default: null},
    profilePicture: { type: String, default: null},
    name: { type: String, required: true},
    password: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    phone: { type: String, required: true},
    address: {
        street: {type: String},
        city: {type: String},
        country: { type: String},
    },
    isAdmin: {type: Boolean, default: false},
    roleId: { type: String, default: null},
    createdAt: {type: Date, default: Date.now},
    updatedAt: { type: Date, default: null},
},
{timestamp: true}
);
module.exports = mongoose.model('User', userSchema);