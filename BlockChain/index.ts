import { isValidChain } from './../utils/chainUtils';
import Block from "./Block";
import * as blockUtil from "../utils/blockUtils";
import Transaction from "../Transaction";

class BlockChain {
  public chain: Block[];

  constructor() {
    this.chain = [blockUtil.getGenesisBlock()];
  }

  addBlock(data: Transaction[], miner: string): Block {
    const block = blockUtil.mineBlock(this, data);

    if (!this.verifyNewBlock(block))
      throw Error('New block is invalid');
    
    block.miner = miner;
    this.chain.push(block);

    console.log(block);
    return block;
  }

  replaceChain (newChain: Block[]): boolean {
    if (this.chain.length < newChain.length && isValidChain(newChain)) {
      this.chain = newChain; 
      return true;
    }

    return false;
  }

  verifyNewBlock (newBlock: Block): boolean {
    return this.chain[this.chain.length - 1].hash === newBlock.previousHash;
  }
}

export default BlockChain;
