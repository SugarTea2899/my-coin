import { DIFFICULTLY } from "./environment";
import Block from "../BlockChain/Block";
import Transaction from "../Transaction";
import {MINE_RATE} from "../utils/environment";
import { hash } from "./commonUtils";

export const getGenesisBlock = (): Block => {
  const hashValue = hashBlock(0, "0", Date.now(), [], DIFFICULTLY, 0);
  return new Block(0, hashValue, "0", Date.now(), [], DIFFICULTLY, 0);
};

export const hashBlock = (
  index: number,
  previousHash: string,
  timeStamp: number,
  data: Transaction[],
  difficultly: number,
  nonce: number
): string => {
  return hash(
    `${index}${previousHash}${timeStamp}${data}${difficultly}${nonce}`
  );
};

const adjustDifficultly = (previousBlock: Block, curTime: number): number => {
  let difficultly = previousBlock.difficultly;

  if (previousBlock.timeStamp + MINE_RATE > curTime)
    return difficultly + 1;
  
  return difficultly - 1;
};

export const mineBlock = (previousBlock: Block, data: Transaction[]): Block => {
  let hash: string;
  let index: number = previousBlock.index + 1;
  let difficultly = previousBlock.difficultly;
  let nonce = 0;
  let timeStamp = Date.now();
  const previousHash = previousBlock.hash;

  while (true) {
    timeStamp = Date.now();
    difficultly = adjustDifficultly(previousBlock, timeStamp);
    hash = hashBlock(index, previousHash, timeStamp, data, difficultly, nonce);

    console.log(hash);
    
    if (hash.substring(0, difficultly) === "0".repeat(difficultly))
      return new Block(index, hash, previousHash, timeStamp, data, difficultly, nonce);

    nonce++;
  }
};
