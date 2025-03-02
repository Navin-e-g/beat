// userRoute.js

import express from 'express';
import { signUp, login } from '../controllers/userController.js';  // Ensure correct import
const router = express.Router();

// Signup route
router.post('/signup', signUp);

// Login route
router.post('/login', login);

export default router;

