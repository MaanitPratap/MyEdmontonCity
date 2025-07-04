// Home controller function
const getHome = (req, res) => {
    res.json({ message: 'Welcome to YEGverse API' });
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
    createItem,
    updateItem,
    deleteItem
};