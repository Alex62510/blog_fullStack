import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import cookieParser from 'cookie-parser'


dotenv.config()
mongoose.connect(process.env.MONGO).then(
    () => {
        console.log('MongoDb is connected!!')
    }
).catch((e) => {
    console.log(e)
})

const app = express()
app.use(express.json())
app.use(cookieParser())
app.listen(3000, () => {
    console.log('Server is running on port 3000!')
})
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoute)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})