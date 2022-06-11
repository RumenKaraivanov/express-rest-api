const Furniture = require('../models/Furniture');

async function create(data) {
    const furniture = new Furniture(data);
    await furniture.save();
    return furniture;
};
async function getAll() {
    return await Furniture.find({});
};

module.exports = {
    create,
    getAll
}