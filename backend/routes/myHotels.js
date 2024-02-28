const express = require('express')
const mongoose = require("mongoose");
const multer = require('multer')
const { route } = require('./userRoutes')
const cloudinary = require('cloudinary').v2
const verifyToken = require('../middlewares/verifyToken');
const hotelSchema = require('../schemas/hotelSchema');


const router = express.Router()
const Hotel = mongoose.model('Hotels', hotelSchema);

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 5 * 1024 * 1024 //5mb
    }
})

// /api/my-hotels/add
router.post("/add", async (req, res) => {
    try {
        const imageFiles = req.files
        const newHotel = req.body
        // const imageUrls = await uploadImages(imageFiles);
        // newHotel.imageUrls = imageUrls
        // newHotel.lastUpdated = new Date()
        // newHotel.userId = req.userId
        const hotel = new Hotel(newHotel)
        res.status(201).send(hotel)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
    }

})

async function uploadImages(imageFiles) {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64")
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url
    })
    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}

module.exports = router