const jwt = require('jsonwebtoken');

const fetchUser = (req, res, next) => {
    //Get the user from jwt Taken and Send ID

    const token = req.header('auth-token');
    if (!token) {
        res.status(401).json({ error: 'Invalid token' });
    }

    try {
        const data = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = data.user;
        next()
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }

}

module.exports = fetchUser;