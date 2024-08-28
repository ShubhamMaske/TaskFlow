import express from 'express';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000;
app.use(express.json())
app.use('/api/auth',authRoutes)
app.use('/api/task',taskRoutes)

mongoose.connect(process.env.DB_URL,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
.then(result => {
    console.log('Connected...');
})
.catch(err => {
    console.log(" database connection error");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})