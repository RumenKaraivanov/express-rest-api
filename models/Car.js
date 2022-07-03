const { Schema, model } = require('mongoose');
const URL_PATTERN = /^https?:/;

const schema = new Schema({
    model: { type: String, required: [true, 'Model is required!'] },
    description: { type: String, required: [true, 'Description is required!'] },
    price: { type: Number, required: [true, 'Price is required!'] },
    imageUrl: {
        type: String, required: true, validate: {
            validator(value) {
                return URL_PATTERN.test(value);
            },
            message: 'The image must be valid URL!'
        }
    },
    _ownerId: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = model('Car', schema);