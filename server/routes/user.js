import express from 'express';
import { signin, signup } from '../controllers/user.js';

const router = express.Router();


router.post('/signin', signin);
router.post('/signup', signup);
// router.post('/google', googleSignIn);
// router.post('/google/refresh-token', refreshToken)

export default router;