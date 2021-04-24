import { generateKeyPair } from './../../utils/commonUtils';
import { blockchain, publicKeys } from "./../data/index";
import { ec as EC } from "elliptic";
import { NextFunction, Request, Response } from "express";
import fs from 'fs';

const ec = new EC("secp256k1");

export const getBlocks = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "OK",
    payload: blockchain.chain,
  });
};


export const createWallet = async (req: Request, res: Response, next: NextFunction) => {
  const keyPair: EC.KeyPair = generateKeyPair();
  const privateKey: string = keyPair.getPrivate().toString(16);

  fs.writeFileSync(process.env.PRIVATE_KEY_PATH, privateKey);
  publicKeys.add(keyPair.getPublic().encode('hex', false));

  res.download(process.env.PRIVATE_KEY_PATH)
}

export const mining = (req: Request, res: Response, next: NextFunction) => {
  
}
