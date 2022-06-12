const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 's1231fasasdae23fdaasad22e';

async function register(email, password) {
    const existing = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

    if (existing) {
        throw new Error('User with that email already exists.')
    };

    const user = new User({
        email,
        hashedPassword: await bcrypt.hash(password, 10)
    });
    await user.save();
    return createSession(user);
};
async function login(email, password) {

};

function createSession(user) {
    return {
        email: user.email,
        _id: user._id,
        accessToken: jwt.sign({
            email: user.email,
            _id: user._id
        }, JWT_SECRET)
    };
};


module.exports = {
    register,
    login
};