class TxOut {
  public address: string;
  public amount: number;

  constructor (address: string, amount: number) {
    this.address = address;
    this.amount = amount;
  }
}

export default TxOut;
