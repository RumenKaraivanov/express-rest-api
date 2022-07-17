const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ACCESS_TOKEN_SECRET = 's1231fasasdae23fdaasad22e';
const REFRESH_TOKEN_SECRET = 'asidjaidj838jaiwd;';
const blacklist = [];

async function register(email, password, res) {
    const existing = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    if (existing) {
        throw new Error('User with that email already exists.')
    };
    const user = new User({
        email,
        hashedPassword: await bcrypt.hash(password, 10)
    });
    await user.save();
    return createSession(user, res);
};
async function login(email, password, res) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    if (!user) {
        throw new Error('Incorrect email or password.');
    };
    const match = await bcrypt.compare(password, user.hashedPassword);
    if (!match) {
        throw new Error('Incorrect email or password.');
    };

    return createSession(user, res);
};
function logout(token) {
    blacklist.push(token);
};
function createSession(user, res) {
    const refreshToken = jwt.sign({
        email: user.email,
        _id: user._id
    }, REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

    // Assigning refresh token in http-only cookie 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, sameSite: 'None', secure: true,
        maxAge: 24 * 60 * 60 * 1000
    });
    return {
        email: user.email,
        _id: user._id,
        accessToken: jwt.sign({
            email: user.email,
            _id: user._id
        }, ACCESS_TOKEN_SECRET)
    };
};
function verifySession(token) {
    if (blacklist.includes(token)) {
        throw new Error('Token is invalidated.')
    };
    const data = jwt.verify(token, ACCESS_TOKEN_SECRET);
    return {
        email: data.email,
        _id: data._id,
        token
    };
};
module.exports = {
    register,
    login,
    logout,
    verifySession
};