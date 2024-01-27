const express = require('express')
const mongoose = require("mongoose");
const userSchema = require('../schemas/userSchema');

const User = mongoose.model("User", userSchema);

const router = express.Router();

// "/api/user/signup"
router.post("/signup", async (req, res) => {
    try {
        const newUser = new User(req.body);
        newUser.save();
        res.status(200).send({ message: "User created" })
    } catch (error) {
        res.status(500).send({ error: "There was a server error" })
    }
})

module.exports = router;