import { blockchain } from "./../data/index";
import { NextFunction, Request, Response } from "express";

export const getBlocks = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "OK",
    payload: blockchain.chain,
  });
};
