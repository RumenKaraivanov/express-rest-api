const { Schema, model } = require('mongoose');

const schema = new Schema({
    email: { type: String, required: true },
    hashedPassword: { type: String, required: true }
});
schema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 1
    }
});
module.exports = model('User', schema);