require('dotenv').config();
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
const cloudinary = require('cloudinary').v2

const userRoute = require('./routes/userRoutes')
const authRoute = require('./routes/auth')
const myhotelRoutes = require('./routes/myHotels')
const hotelsRoutes = require('./routes/hotels')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/user', userRoute)
app.use('/api/user', authRoute)
app.use('/api/my-hotels', myhotelRoutes)
app.use('/api/hotels', hotelsRoutes)

// connect to db
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.ts2x6xa.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        // listen to port
        app.listen(5000, () => {
            console.log('Server requests on port 5000')
        })
    })
    .catch((err) => {
        console.log(err)
    }) 