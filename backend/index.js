import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import commentRoutes from './routes/comments.routes.js'
import cookieParser from 'cookie-parser';

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGODB)
.then(() => console.log('Mongo DB Connected...'))
.catch((err) => console.log(err))

app.listen(3000, () => {
    console.log('Server Running on port 3000..');
})

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes)


//middleware for error handling
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error..'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})


//pratikMernBlog