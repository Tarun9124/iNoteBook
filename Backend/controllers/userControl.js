const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// POST - /api/auth/createuser
const createUser = asyncHandler(async (req, res) => {
    let success = false;
    try {
        //fetch data which are passed
        const { name, email, password } = req.body;

        //Valodation data
        if (!name || !email || !password) {
            success = false;
            res.status(400).json({ success, error: "All Fields are must be Required!!" });
        }

        //check if the user already exists
        let checkuser = await User.findOne({ success, email: email });

        if (checkuser) {
            success = false;
            return res.status(400).json({ success, error: 'Email Already Exists' });
        }

        //Hashing of Password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        //create a new user
        const user = await User.create({
            name,
            email,
            password: passwordHash
        });

        const data = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(data, process.env.JWT_TOKEN);
        success = true;
        res.json({ success, token }); // return response in thunderclient(for now all object is returned)
    }
    catch (err) {
        res.status(500).json({ error: "Something Went Wrong, Sorry!", err });
    }
})

// POST - /api/auth/login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    let success = false;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            success = false;
            return res.status(404).json({ success, error: "Please enter Valid Detail" });
        }

        //compare password
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(404).json({ success, error: "Please enter Valid Detail" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(data, process.env.JWT_TOKEN);
        success = true;
        res.json({ success, token }); // return response in thunderclient(for now all obj
    }
    catch (err) {
        res.status(500).json({ error: "Something Went Wrong, Sorry!", err });
    }
})

// POST - /api/auth/getuser
const getUser = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(userId);
        const user = await User.findById(userId).select("-password");
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ error: "Something Went Wrong, Sorry!", err });
    }
})
module.exports = { createUser, loginUser, getUser };