const Car = require('../models/Car');

async function create(data) {
    const car = new Car(data);
    await car.save();
    return car;
};
async function getAll() {
    return await Car.find({});
};
async function getOneById(id) {
    return await Car.findById(id);
};
async function update(id, item) {
    const existing = await Car.findById(id);

    existing.model = item.model;
    existing.description = item.description;
    existing.price = item.price;
    existing.imageUrl = item.imageUrl;

    await existing.save();
    return existing;
};
async function deleteById(id) {
    await Car.findByIdAndDelete(id);
};
module.exports = {
    create,
    getAll,
    getOneById,
    update,
    deleteById
};