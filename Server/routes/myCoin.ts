import { myCoinAuthenticate } from './../middlewares/myCoinAuthen';
import * as myCoinController from './../controllers/myCoinController';
import express from 'express';

const router = express.Router();

router.get('/blocks', myCoinController.getBlocks);

// create-wallet
router.post('/wallets', myCoinController.createWallet)

export default router;
