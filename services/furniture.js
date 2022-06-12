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
async function update(id, item) {
    const existing = await Furniture.findById(id);

    existing.make = item.make;
    existing.model = item.model;
    existing.year = item.year;
    existing.description = item.description;
    existing.price = item.price;
    existing.img = item.img;
    existing.material = item.material;

    await existing.save();
    return existing;
}
module.exports = {
    create,
    getAll,
    getOneById,
    update
};