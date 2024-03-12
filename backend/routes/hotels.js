const express = require("express");
const mongoose = require("mongoose");
const hotelSchema = require("../schemas/hotelSchema");

const Hotel = mongoose.model('Hotels', hotelSchema);

const router = express.Router();

// /api/hotels/search
router.get("/search", async (req, res) => {
    try {
        const pageSize = 5;
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1")
        const skip = (pageNumber - 1) * pageSize;
        const hotels = await Hotel.find()
        const total = await Hotel.countDocuments();
        const response = {
            data: hotels,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize)
            }
        }
        res.json(hotels)
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
})

module.exports = router