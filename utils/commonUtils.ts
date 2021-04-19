import { v1 as uuidv1 } from "uuid";
import { ec as EC } from "elliptic";
import SHA256 from "crypto-js/sha256";
import UnspentTxOut from "../Transaction/UnspentTxOut";

const ec = new EC("secp256k1");

export const generateKeyPair = (): EC.KeyPair => {
  return ec.genKeyPair();
};

export const getKeyPairFromPrivateKey = (privateKey: string): EC.KeyPair => {
  return ec.keyFromPrivate(privateKey, "hex");
};

export const getId = (): string => {
  return uuidv1();
};

export const hash = (data: string): string => {
  return SHA256(data).toString();
};

export const recoverPublicKey = (signature: string) => {
  ec.recoverPubKey("aaa", signature, 14);
};

export const verifySignature = (publicKey, signature, dataHash): boolean => {
  return ec.keyFromPublic(publicKey, "hex").verify(dataHash, signature);
};

export const verifyUnspentTxOut = (
  id: string,
  index: number,
  address: string,
  unspentTxOuts: UnspentTxOut[]
): boolean => {
  return (
    unspentTxOuts.filter(
      (unspentTxOut: UnspentTxOut) =>
        unspentTxOut.txOutId === id &&
        unspentTxOut.txOutIndex === index &&
        unspentTxOut.address === address
    ).length !== 0
  );
};
