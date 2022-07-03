const { Schema, model } = require('mongoose');

const schema = new Schema({
    model: { type: String, required: [true, 'Model is required!'] },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    _ownerId: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = model('Car', schema);