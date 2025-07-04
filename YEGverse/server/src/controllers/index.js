const { User } = require('../models');

// Home controller function
const getHome = (req, res) => {
    res.json({ message: 'Welcome to YEGverse API' });
};

// User controller function
const createUser = async (req, res) => {
    try {
        const { firebaseUid, email, username } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ firebaseUid });
        if (existingUser) {
            return res.status(200).json({ message: 'User already exists', user: existingUser });
        }
        
        // Create new user
        const newUser = new User({
            firebaseUid,
            email,
            username
        });
        
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

// Item controller functions
const createItem = (req, res) => {
    res.json({ message: 'Create item endpoint', data: req.body });
};

const updateItem = (req, res) => {
    res.json({ message: 'Update item endpoint', id: req.params.id, data: req.body });
};

const deleteItem = (req, res) => {
    res.json({ message: 'Delete item endpoint', id: req.params.id });
};

module.exports = {
    getHome,
    createUser,
    createItem,
    updateItem,
    deleteItem
};