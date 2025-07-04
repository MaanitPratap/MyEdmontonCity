const express = require('express');
const router = express.Router();
const apiRoutes = require('./api');

// Import controller functions
const { getHome, createItem, updateItem, deleteItem, createUser } = require('../controllers');

// Define routes
router.get('/', getHome);
router.post('/items', createItem);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);
router.post('/users', createUser);

// Use API routes
router.use('/api', apiRoutes);

module.exports = router;