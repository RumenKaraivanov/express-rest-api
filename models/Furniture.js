const { Schema, model } = require('mongoose');

const schema = new Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    material: { type: String }
});

module.exports = model('Furniture', schema);