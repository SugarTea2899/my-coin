import { generateKeyPair, generateId, convertTransactionFromChain, convertTransactionInPool, getMyTransactions } from "./../../utils/commonUtils";
import { blockchain, pool, unSpentTxOuts } from "./../data/index";
import { ec as EC } from "elliptic";
import { NextFunction, Request, Response } from "express";
import fs from "fs";
import UnspentTxOut from "../../Transaction/UnspentTxOut";
import Wallet from "../../Wallet";
import Transaction from "../../Transaction";
import Block from "../../BlockChain/Block";

const ec = new EC("secp256k1");

export const getBlocks = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "OK",
    payload: blockchain.chain,
  });
};

export const createWallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const keyPair: EC.KeyPair = generateKeyPair();
  const privateKey: string = keyPair.getPrivate().toString(16);

  fs.writeFileSync(process.env.PRIVATE_KEY_PATH, privateKey);

  res.download(process.env.PRIVATE_KEY_PATH);
};

export const mining = (req: any, res: Response, next: NextFunction) => {
  const validTransactions = pool.getValidTransactions();
  const wallet: Wallet = req.myWallet
  try {
    const newBlock = blockchain.addBlock(validTransactions, wallet.address);
    //reward miner
    const unSpentTxOut: UnspentTxOut = new UnspentTxOut(
      generateId(),
      req.myWallet.address,
      Number.parseInt(process.env.MINER_REWARD)
    );
    unSpentTxOuts.set(unSpentTxOut.txOutId, unSpentTxOut);

    pool.clearTransaction(unSpentTxOuts);

    res.status(200).json({
      message: 'OK',
      payload: {
        newBlock
      }
    })
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: error.message
    })
  }
};

export const getWalletInfo = (req: any, res: Response, next: NextFunction) => {
  const wallet: Wallet = req.myWallet;
  return res.status(200).json({
    message: 'OK',
    payload: {
      address: wallet.address,
      balance: wallet.getBalance(unSpentTxOuts),
    }
  })
}

export const createTransaction = (req: any, res: Response, next: NextFunction) => {
  try {
    const wallet: Wallet = req.myWallet;
    const receiptAddress = req.body.receiptAddress;
    let amount = req.body.amount;

    if (!receiptAddress || !amount) {
      return res.status(404).json({
        message: 'Receipt Address or Amount are not found.'
      });
    }

    amount = Number.parseInt(amount);

    if (isNaN(amount)) {
      return res.status(400).json({
        message: 'Amount must be a number'
      });
    }

    const transaction: Transaction = wallet.createTransaction(receiptAddress, amount, unSpentTxOuts);
    wallet.signTransaction(transaction, unSpentTxOuts);

    pool.addTransaction(transaction, unSpentTxOuts);

    res.status(200).json({
      message: 'OK'
    });
  } catch (error) {
    console.log(error.message);
    
    return res.status(500).json({
      message: error.message
    });
  }
}

export const getTransactionsInPool = (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = pool.transactions.map((transaction: Transaction) => {
      return {
        sender: transaction.senderAddress,
        receipt: transaction.txOuts[0].address,
        amount: transaction.txOuts[0].amount,
      }
    })

    res.status(200).json({
      message: 'OK',
      payload
    })
  } catch (error) {
    console.log(error.message);
    
    res.status(500).json({
      message: error.message
    })
  }

}

export const getHistory = (req: Request, res: Response, next: NextFunction) => {
  try {
    const blocks: Block[] = blockchain.chain;
    
    const transactions = [...convertTransactionFromChain(blocks), ...convertTransactionInPool(pool.transactions)];

    return res.status(200).json({
      message: 'OK',
      payload: {
        blocks,
        transactions
      }
    })
  } catch (error) {
    console.log(error.message);
    
    res.status(500).json({
      message: error.message
    })
  }
}

export const getTransactionsByPrivateKey = (req: any, res: Response, NextFunction) => {
  try {
    const wallet: Wallet = req.myWallet;

    const transactions = getMyTransactions(wallet.address, blockchain.chain, pool);

    res.status(200).json({
      message: 'OK',
      payload: {
        transactions
      }
    })
  } catch (error) {
    console.log(error.message);
    
    res.status(500).json({
      message: error.message
    })
  }
}

export const getBlockByIndex = (req: Request, res: Response, next: NextFunction) => {
  try {
    const {index} = req.params;
    const indexNumber = Number.parseInt(index);

    if (indexNumber >= blockchain.chain.length) {
      return res.status(400).json({
        message: 'index is not valid.'
      })
    }

    return res.status(200).json({
      message: 'OK',
      payload: blockchain.chain[indexNumber]
    })
  } catch (error) {
    console.log(error.message);
    
    res.status(500).json({
      message: error.message
    })
  }
}