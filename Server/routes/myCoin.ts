import { myCoinAuthenticate } from './../middlewares/myCoinAuthen';
import * as myCoinController from './../controllers/myCoinController';
import express from 'express';

const router = express.Router();

router.get('/blocks', myCoinController.getBlocks);

// create-wallet
router.post('/wallets', myCoinController.createWallet)

// start mining
router.post('/mining', myCoinAuthenticate, myCoinController.mining)

// get wallet information
router.get('/wallets', myCoinAuthenticate, myCoinController.getWalletInfo);

// create transaction
router.post('/transactions', myCoinAuthenticate, myCoinController.createTransaction);

// get transactions in pool
router.get('/transactions', myCoinController.getTransactionsInPool)

// get history
router.get('/history', myCoinController.getHistory);

export default router;
