import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import songRouter from './src/routes/songRoute.js';
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import albumRouter from './src/routes/albumRoute.js';
import userRouter from './src/routes/userRoute.js';

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5174', // Replace with your frontend origin
  optionsSuccessStatus: 200, // For legacy browser support
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions)); // Apply CORS with the specified options

// Initialize routes
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);
app.use("/api/user", userRouter);

app.get('/', (req, res) => res.send("API Working"));

app.listen(port, () => console.log(`Server started on ${port}`));
