import express from 'express';
const router = express.Router();

import { enqueueTask, dequeueTask } from '../controllers/taskControllers.js';
import auth from '../middlewares/auth.js';


// enqueue task
router.post('/enqueue', auth, enqueueTask)

// dequeue task
router.get('/dequeue', auth, dequeueTask)


export default router;