import Transaction from "../../Transaction";

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public timeStamp: number;
  public data: Transaction[];
  public difficultly: number;
  public nonce: number;

  public miner: string;
  
  constructor(
    index: number,
    hash: string,
    previousHash: string,
    timeStamp: number,
    data: Transaction[],
    difficultly: number,
    nonce: number,
    miner?: string,
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.timeStamp = timeStamp;
    this.data = data;
    this.difficultly = difficultly;
    this.nonce = nonce;
    this.miner = miner || '';
  }
}

export default Block;
