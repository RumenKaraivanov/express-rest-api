const Furniture = require('../models/Furniture');

async function create(data) {
    const furniture = new Furniture(data);
    await furniture.save();
    return furniture;
};
async function getAll() {
    return await Furniture.find({});
};
async function getOneById(id) {
    return await Furniture.findById(id);
};
module.exports = {
    create,
    getAll,
    getOneById
}