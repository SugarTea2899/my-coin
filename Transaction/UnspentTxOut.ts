class UnspentTxOut {
  public readonly txOutId: string;
  public readonly address: string;
  public readonly amount: number;
  public inPool: boolean;
g
  constructor (txOutId: string, address: string, amount: number) {
    this.txOutId = txOutId;
    this.address = address;
    this.amount = amount;
    this.inPool = false;
  }
}

export default UnspentTxOut;
