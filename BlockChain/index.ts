import { isValidChain } from './../utils/chainUtils';
import Block from "./Block";
import * as blockUtil from "../utils/blockUtils";
import Transaction from "../Transaction";

class BlockChain {
  public chain: Block[];

  constructor() {
    this.chain = [blockUtil.getGenesisBlock()];
  }

  addBlock(data: Transaction[]): Block {
    const block = blockUtil.mineBlock(this.chain[this.chain.length - 1], data);
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

}

export default BlockChain;
