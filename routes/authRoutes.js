import express from 'express';
const router = express.Router();

import { registerUser, loginUser } from '../controllers/authControllers.js';

// Register User
router.post('/register', registerUser)

// Login User
router.post('/login', loginUser)

export default router;