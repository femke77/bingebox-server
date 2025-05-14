import { Router } from 'express';
import { videoRouter } from './video-routes.js';

const router = Router();


router.use('/video', videoRouter);


export default router;
