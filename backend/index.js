import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js';

dotenv.config()

const app = express()

mongoose.connect(process.env.MONGODB)
.then(() => console.log('Mongo DB Connected...'))
.catch((err) => console.log(err))

app.listen(3000, () => {
    console.log('Server Running on port 3000..');
})

app.use('/api/user', userRoutes)


//pratikMernBlog