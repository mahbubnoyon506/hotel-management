const express = require('express')
const mongoose = require("mongoose");
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const verifyToken = require('../middlewares/verifyToken');
const hotelSchema = require('../schemas/hotelSchema');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const { body, validationResult } = require('express-validator');

const router = express.Router()
const Hotel = mongoose.model('Hotels', hotelSchema);

const upload = multer({ dest: 'uploads/' });

// /api/my-hotels/add
router.post("/add", upload.array('images'), verifyToken, async (req, res) => {
    try {
        const userId = req.userId
        const files = req.files.map(async (file) => {
            const result = await cloudinary.uploader.upload(file.path);
            return result.secure_url;
        });
        const imageUrls = await Promise.all(files);

        const newHotel = new Hotel({
            city: req.body.city,
            name: req.body.name,
            country: req.body.country,
            description: req.body.description,
            pricePerNight: req.body.pricePerNight,
            starRating: req.body.starRating,
            type: req.body.type,
            facilities: req.body.facilities,
            adultCount: req.body.adultCount,
            childCount: req.body.childCount,
            lastUpdated: new Date(),
            userId: userId,
            imageUrls: imageUrls
        });
        newHotel.save();
        res.status(201).send({ message: "Hotel added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
    }

})

// /api/my-hotels/
router.get("/", verifyToken, async (req, res) => {
    const userId = req.userId;
    try {
        const hotels = await Hotel.find({ userId });
        res.status(201).json({ results: hotels })
    } catch (error) {
        res.status(501).json({ message: "Something went wrong" })
    }
})

// /api/my-hotels/id
router.get("/:id", verifyToken, async (req, res) => {
    const id = req.params.id.toString()
    try {
        const hotel = await Hotel.findOne({ _id: id, userId: req.userId });
        res.status(201).json({ results: hotel })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
})

router.patch("/:id", upload.array('images'), verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const hotelId = req.params.id;

        const files = req.files.map(async (file) => {
            const result = await cloudinary.uploader.upload(file.path);
            return result.secure_url;
        });
        const imageUrls = await Promise.all(files);

        const updatedHotelData = {
            city: req.body.city,
            name: req.body.name,
            country: req.body.country,
            description: req.body.description,
            pricePerNight: req.body.pricePerNight,
            starRating: req.body.starRating,
            type: req.body.type,
            facilities: req.body.facilities,
            adultCount: req.body.adultCount,
            childCount: req.body.childCount,
            lastUpdated: new Date(),
            userId: userId,
            imageUrls: imageUrls
        };
        console.log(updatedHotelData, hotelId);
        const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, updatedHotelData, { new: true });

        if (!updatedHotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        res.status(200).json({ message: "Hotel updated successfully", updatedHotel });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
    }

})

module.exports = router