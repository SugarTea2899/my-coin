import { SUCCESS_TRANSACTION } from './constants';
import { getGenesisBlock, hashBlock } from "./blockUtils";
import Block from "../BlockChain/Block";
import Transaction from "../Transaction";

export const isValidChain = (chain: Block[]): boolean => {
  if (chain && JSON.stringify(chain[0]) !== JSON.stringify(getGenesisBlock()))
    return false;

  for (let i = 1; i < chain.length; i++) {
    const previousBlock = chain[i - 1];
    const curBlock = chain[i];

    if (
      curBlock.previousHash !== previousBlock.hash ||
      curBlock.hash !==
        hashBlock(
          curBlock.index,
          curBlock.previousHash,
          curBlock.timeStamp,
          curBlock.data,
          curBlock.difficultly,
          curBlock.nonce
        )
    )
      return false;
  }

  return true;
};
