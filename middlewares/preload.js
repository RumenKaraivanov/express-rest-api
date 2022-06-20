const { getOneById } = require('../services/furniture');

module.exports = () => async (req, res, next) => {
    const id = req.params.id;
    try {
        const item = await getOneById(id);
        res.locals.item = item;
        next();
    } catch (err) {
        res.status(404).json({ message: 'No such record in Database.' });
    };
};