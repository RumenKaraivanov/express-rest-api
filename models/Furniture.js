const { Schema, model } = require('mongoose');

const schema = new Schema({
    make: { type: String, required: [true, 'Make is required!'] },
    model: { type: String, required: [true, 'Model is required!'] },
    year: {
        type: Number, required: true,
        min: [1980, 'Year must be between 1980 and 2022'],
        max: [2022, 'Year must be between 1980 and 2022']
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    material: { type: String }
});

module.exports = model('Furniture', schema);