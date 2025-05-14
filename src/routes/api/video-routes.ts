import express from 'express';
import { getVidSrcMovie, getVidSrcTV } from '../../controllers/video-controllers.js';


const router = express.Router();

router.get('/movie/:id', getVidSrcMovie);
router.get('/tv/:series_id/:season_number/:episode_number', getVidSrcTV);

export { router as videoRouter };
