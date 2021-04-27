import { NextFunction } from "express";
import { Response } from "express";
import Wallet from "../../Wallet";

export const myCoinAuthenticate = (
  req: any,
  res: Response,
  next: NextFunction
) => {

  const privateKey: string = req.headers.authorization;

  if (!privateKey) {
    return res.status(404).json({
      message: 'private key not found',
    })
  }

  if (privateKey.length != 64) {
    return res.status(400).json({
      message: 'private key wrong format',
    })
  }
  
  const myWallet = new Wallet(privateKey);

  req.myWallet = myWallet;
  next();
};
