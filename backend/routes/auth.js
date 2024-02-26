const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = require("../schemas/userSchema");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();
const User = mongoose.model("User", userSchema);

// /api/user/login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("Invalid credentials")
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: "Invalid credentials" })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECTRET_KEY, { expiresIn: "1d" });

        res.status(200).json({ message: "Successfully logged in.", userId: user._id, token })

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Something went wrong" })
    }
})
// /api/user/validate-token
router.get('/validate-token', verifyToken, (req, res) => {
    res.status(200).send({ message: "Authorized", userId: req.userId })
})

// /api/user/logout
router.post('/logout', (req, res) => {
    res.clearCookie('auth_token').status(200).send({ message: "Signed Out" })
})

module.exports = router;