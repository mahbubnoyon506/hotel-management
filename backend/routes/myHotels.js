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
        const uploadPromises = req.files.map(async (file) => {
            const result = await cloudinary.uploader.upload(file.path);
            return result.secure_url;
        });
        const imageUrls = await Promise.all(uploadPromises);

        const newHotel = new Hotel({
            city: req.body.city,
            name: req.body.name,
            country: req.body.country,
            description: req.body.description,
            pricePerNight: req.body.pricePerNight,
            startRating: req.body.startRating,
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

module.exports = router