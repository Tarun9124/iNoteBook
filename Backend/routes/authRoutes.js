const express = require('express');
const { createUser, loginUser, getUser } = require('../controllers/userControl');
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();

router
    .post('/createuser', createUser);
router
    .post('/login', loginUser);
router
    .post('/getuser', fetchUser, getUser);
module.exports = router;