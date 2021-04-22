import { v1 as uuidv1 } from "uuid";
import { ec as EC } from "elliptic";
import SHA256 from "crypto-js/sha256";
import UnspentTxOut from "../Transaction/UnspentTxOut";
import Transaction from "../Transaction";
import TxIn from "../Transaction/TxIn";

const ec = new EC("secp256k1");

export const generateKeyPair = (): EC.KeyPair => {
  return ec.genKeyPair();
};

export const getKeyPairFromPrivateKey = (privateKey: string): EC.KeyPair => {
  return ec.keyFromPrivate(privateKey, "hex");
};

export const generateId = (): string => {
  return uuidv1();
};

export const hash = (data: string): string => {
  return SHA256(data).toString();
};

export const verifySignature = (publicKey, signature, dataHash): boolean => {
  return ec.keyFromPublic(publicKey, "hex").verify(dataHash, signature);
};

export const verifyUnspentTxOut = (
  id: string,
  address: string,
  unspentTxOuts: Map<string, UnspentTxOut>
): boolean => {
  if (unspentTxOuts.get(id)?.address === address) return true;
  return false;
};

export const updateInPoolValueTransaction = (
  transaction: Transaction,
  unSpentTxOuts: Map<string, UnspentTxOut>
) => {

  transaction?.txIns?.forEach((txIn: TxIn) => {
    if (unSpentTxOuts.has(txIn.txOutId))
      unSpentTxOuts.get(txIn.txOutId).inPool = true;
  })
};
