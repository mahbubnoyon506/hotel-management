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

// const imageSchema = new mongoose.Schema({
//     images: [String] 
// });

// const Image = mongoose.model('Image', imageSchema);

const upload = multer({ dest: 'uploads/' });

// Upload endpoint
// router.post('/upload', upload.array('images'), async (req, res) => {
//     try {
//         const uploadPromises = req.files.map(async (file) => {
//             const result = await cloudinary.uploader.upload(file.path);
//             return result.secure_url;
//         });
//         const imageUrls = await Promise.all(uploadPromises);
//         const newImage = new Image({ images: imageUrls });
//         await newImage.save();
//         res.json({ images: imageUrls });
//     } catch (error) {
//         console.error('Error uploading image:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Get all images endpoint
// router.get('/images', async (req, res) => {
//     try {
//         const images = await Image.find();
//         res.json({ images });
//     } catch (error) {
//         console.error('Error retrieving images:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// /api/my-hotels/add
router.post("/add", upload.array('images'), async (req, res) => {
    try {
        // let newHotel = req.body;
        const uploadPromises = req.files.map(async (file) => {
            const result = await cloudinary.uploader.upload(file.path);
            return result.secure_url;
        });
        const imageUrls = await Promise.all(uploadPromises);
        // newHotel.imageUrls = imageUrls;
        // newHotel.lastUpdated = new Date();
        // newHotel.userId = req.userId;

        // const hotel = new Hotel(newHotel);

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
            // userId: req.userId,
            imageUrls: imageUrls
        });
        console.log(newHotel)
        newHotel.save();
        res.status(201).send({ message: "Hotel added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
    }

})

module.exports = router