const itemService = require('../services/itemService');

const getAllItems = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const searchQuery = req.query.q || '';
        const { items, totalItems } = await itemService.getAllItems(page, limit, searchQuery);

        const totalPages = Math.ceil(totalItems / limit);
        const results = items.length;

        const meta = {
            totalItems,
            totalPages,
            currentPage: page,
            pageSize: limit,
            results
        };

        res.json({ items, meta });
    } catch (error) {
        next(error);
    }
};

const getItemById = async (req, res, next) => {
    try {
        const item = await itemService.getItemById(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        next(error);
    }
};

const createItem = async (req, res, next) => {
    try {
        const newItem = await itemService.createItem(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        next(error);
    }
};

const updateItem = async (req, res, next) => {
    try {
        const updatedItem = await itemService.updateItem(req.params.id, req.body);
        if (!updatedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(updatedItem);
    } catch (error) {
        next(error);
    }
};

const deleteItem = async (req, res, next) => {
    try {
        const deletedItem = await itemService.deleteItem(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json({ message: 'Item successfully deleted' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
};