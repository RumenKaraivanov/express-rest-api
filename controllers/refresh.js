const router = require('express').Router();
const jwt = require('jsonwebtoken');
const REFRESH_TOKEN_SECRET = 'asidjaidj838jaiwd;';
const ACCESS_TOKEN_SECRET = 's1231fasasdae23fdaasad22e';

router.post('/', (req, res) => {
    if (req.cookies?.jwt) {
        const refreshToken = req.cookies.jwt;

        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {

                    return res.status(406).json({ message: 'Unauthorized' });
                }
                else {
                    const accessToken = jwt.sign({
                        email: decoded.email,
                        _id: decoded._id
                    }, ACCESS_TOKEN_SECRET, {
                        expiresIn: '60m'
                    });
                    return res.json({ accessToken });
                }
            })
    } else {
        return res.status(406).json({ message: 'Unauthorized' });
    }
});
module.exports = router;