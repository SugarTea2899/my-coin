import { publicKeys } from "./../data/index";
import { NextFunction } from "express";
import { Response } from "express";
import { Request } from "express";
import Wallet from "../../Wallet";

export const myCoinAuthenticate = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const privateKey: string = req.headers.authorization;

  const myWallet = new Wallet(privateKey);

  if (!publicKeys.has(myWallet.address)) {
    return res.status(401).json({
      message: 'You have not created wallet yet.'
    });
  }

  req.myWallet = myWallet;
  next();
};
