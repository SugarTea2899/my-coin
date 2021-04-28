import BlockChain from "../BlockChain";
import Block from "../BlockChain/Block";
import Transaction from "../Transaction";
import { hash } from "./commonUtils";

export const getGenesisBlock = (): Block => {
  const hashValue = hashBlock(0, "0", Date.now(), [], Number.parseInt(process.env.DIFFICULTLY), 0);
  return new Block(0, hashValue, "0", Date.now(), [], Number.parseInt(process.env.DIFFICULTLY), 0);
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

  if (previousBlock.timeStamp + Number.parseInt(process.env.MINE_RATE) > curTime)
    return difficultly + 1;
  
  return difficultly - 1;
};

export const mineBlock = (blockchain: BlockChain, data: Transaction[]): Block => {
  let hash: string;
  let nonce = 0;

  while (true) {
    const previousBlock = blockchain.chain[blockchain.chain.length - 1];
    const previousHash = previousBlock.hash;
    const index: number = previousBlock.index + 1;
    const timeStamp = Date.now();
    let difficultly = previousBlock.difficultly;

    difficultly = adjustDifficultly(previousBlock, timeStamp);
    
    hash = hashBlock(index, previousHash, timeStamp, data, difficultly, nonce);
    
    console.log(hash);
    
    if (hash.substring(0, difficultly) === "0".repeat(difficultly))
      return new Block(index, hash, previousHash, timeStamp, data, difficultly, nonce);

    nonce++;
  }
};
