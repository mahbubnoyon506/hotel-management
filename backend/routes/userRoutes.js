const express = require('express')
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { query, validationResult } = require('express-validator');
const userSchema = require('../schemas/userSchema');

const User = mongoose.model("User", userSchema);

const router = express.Router();

// "/api/user/signup"
router.post("/signup", query('email').notEmpty(), async (req, res) => {
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
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
        })
        res.sendStatus(200)
    } catch (error) {
        res.status(500).send({ error: "Something went wrong" })
    }
})

module.exports = router;