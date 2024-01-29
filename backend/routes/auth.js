const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = require("../schemas/userSchema");
const jwt = require("jsonwebtoken");

const router = express.Router();
const User = mongoose.model("User", userSchema);

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            return res.status(400).send("Invalid credentials")
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch)
        if (!isMatch) {
            return res.status(400).send({ message: "Invalid credentials" })
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECTRET_KEY, { expiresIn: "1d" });

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV,
            maxAge: 86400000
        })
        res.status(200).json({ userId: user._id })

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Something went wrong" })
    }
})

module.exports = router;