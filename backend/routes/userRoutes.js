const express = require('express')
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../schemas/userSchema');

const User = mongoose.model("User", userSchema);

const router = express.Router();

// "/api/user/register"
router.post("/register", async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        });
        newUser.save();
        const token = jwt.sign({ userId: req.body.id }, process.env.JWT_SECTRET_KEY, {
            expiresIn: "1d"
        });
        res.status(200).send({ message: "User registered successfully", token })
    } catch (error) {
        res.status(500).send({ message: "Something went wrong" })
    }
})

module.exports = router;