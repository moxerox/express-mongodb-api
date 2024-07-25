const Item = require('../models/itemModel');

const getAllItems = async (page, limit, searchQuery) => {
    const skip = (page - 1) * limit;
    const query = searchQuery ? { name: new RegExp(searchQuery, 'i') } : {};
    const totalItems = await Item.countDocuments(query);
    const items = await Item.find(query).skip(skip).limit(limit);
    return { items, totalItems };
};

const getItemById = async (id) => {
    return await Item.findById(id);
};

const createItem = async (itemData) => {
    const item = new Item(itemData);
    return await item.save();
};

const updateItem = async (id, itemData) => {
    return await Item.findByIdAndUpdate(id, itemData, { new: true });
};

const deleteItem = async (id) => {
    return await Item.findByIdAndDelete(id);
};

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
};