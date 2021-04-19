import { v1 as uuidv1 } from "uuid";
import { ec as EC } from "elliptic";
import SHA256 from "crypto-js/sha256";

const ec = new EC("secp256k1");

export const generateKeyPair = (): EC.KeyPair => {
  return ec.genKeyPair();
};

export const getKeyPairFromPrivateKey = (privateKey: string): EC.KeyPair => {
  return ec.keyFromPrivate(privateKey, 'hex');
}

export const getId = (): string => {
  return uuidv1();
};

export const hash = (data: any): string => {
  return SHA256(JSON.stringify(data)).toString();
};

export const recoverPublicKey = (signature: string) => {
  ec.recoverPubKey('aaa', signature, 14);
}

export const verifySignature = (publicKey, signature, dataHash): boolean => {
  return ec.keyFromPublic(publicKey, "hex").verify(dataHash, signature);
};
