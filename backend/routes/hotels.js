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
        console.log(req.query.page);
        const skip = (pageNumber - 1) * pageSize;
        const hotels = await Hotel.find().skip(skip).limit(pageSize)
        const total = await Hotel.countDocuments();
        const response = {
            results: hotels,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize)
            }
        }
        res.json(response)
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
})

// /api/hotels/search/:id
router.get("/search/:id", async (req, res) => {
    const id = req.params.id.toString();
    try {
        const hotel = await Hotel.findOne({ _id: id })
        res.status(201).json({ results: hotel })
    } catch (error) {
        res.status(501).json({ message: "Something went wrong!" })
    }
})

module.exports = router