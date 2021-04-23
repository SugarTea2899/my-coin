import { getBlocks } from './../controllers/myCoinController';
import express from 'express';

const router = express.Router();

router.get('/blocks', getBlocks)

export default router;
