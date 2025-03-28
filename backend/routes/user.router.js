const express = require('express');
const user = express.Router();
const {
    getListUser,
    getUserById,
    getUserByEmail,
    updateUser,
    createUser,
    deleteUser
} = require('../controllers/user.controller');

user.get('/', getListUser);

user.get('/:id', getUserById);

user.get('/email/:email', getUserByEmail);

user.put('/:id', updateUser);

user.post('/', createUser);

user.delete('/:id', deleteUser);

module.exports = user;