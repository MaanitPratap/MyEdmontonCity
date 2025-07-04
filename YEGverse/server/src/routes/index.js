const express = require('express');
const router = express.Router();

// Import controller functions
const { getHome, createItem, updateItem, deleteItem } = require('../controllers');

// Define routes
router.get('/', getHome);
router.post('/items', createItem);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);

module.exports = router;