import { keccak256 } from 'ethereum-cryptography/keccak';
import {
  ecdsaRecover,
  publicKeyConvert,
} from 'ethereum-cryptography/secp256k1-compat';
import {
  utf8ToBytes,
  bytesToHex,
  hexToBytes,
} from 'ethereum-cryptography/utils';

import { MetaData } from './magic-types';

import { env } from '../config';

const parsePublicAddressFromIssuer = (issuer: string) => {
  return issuer.split(':')[2]?.toLowerCase() ?? '';
};

const hashPersonalMessage = (message: Uint8Array): Uint8Array => {
  const prefix = utf8ToBytes(
    `\u0019Ethereum Signed Message:\n${message.length}`
  );
  const totalLength = prefix.length + message.length;

  const output = new Uint8Array(totalLength);
  output.set(prefix);
  output.set(message, prefix.length);

  return keccak256(output);
};

const prepareSignature = (signature: string): string => {
  return signature.slice(2); // strip the `0x` prefix
};

const getRecoveryBit = (signature: Uint8Array): number => {
  const bit = signature[64];
  return bit - 27;
};

const publicKeyToAddress = (publicKey: Uint8Array): string => {
  const address = keccak256(publicKey.slice(1)).slice(-20);
  return `0x${bytesToHex(address)}`;
};

const ecRecover = (data: string, signature: string) => {
  // Use ecdsaRecover on the Proof, to validate if it recovers to the expected
  // Claim, and expected Signer Address.

  const msg = utf8ToBytes(data);
  const sig = hexToBytes(prepareSignature(signature));
  const recovery = getRecoveryBit(sig);
  const hash = hashPersonalMessage(msg);

  const publicKey = ecdsaRecover(sig.slice(0, 64), recovery, hash, false);
  const assertPublicKey = publicKeyConvert(publicKey, false);

  return publicKeyToAddress(assertPublicKey);
};

export const parseDIDToken = (DIDToken: string) => {
  try {
    const [proof, claim] = JSON.parse(atob(DIDToken)) as [string, string];
    const parsedClaim = JSON.parse(claim);

    return { raw: [proof, claim], withParsedClaim: [proof, parsedClaim] };
  } catch {
    throw new Error('Invalid token');
  }
};

export const getIssuer = (did: string) =>
  parseDIDToken(did).withParsedClaim[1].iss;

export const fetchMetadataFromIssuer = async (issuer: string) => {
  const res = await fetch(
    `https://api.magic.link/v1/admin/auth/user/get?issuer=${issuer}&wallet_type=NONE`,
    {
      method: 'GET',
      headers: { 'X-Magic-Secret-key': env.MAGIC_SECRET_KEY },
    }
  );

  const { data, status, message } = await res.json();

  if (status !== 'ok') {
    throw new Error(message);
  }

  return {
    issuer: data.issuer,
    publicAddress: data.public_address,
    email: data.email,
    oauthProvider: data.oauth_provider ?? undefined,
    phoneNumber: data.phone_number ?? undefined,
    wallets: data.wallets ?? undefined,
  } as MetaData;
};

export const validate = (DIDToken: string, attachment = 'none') => {
  let tokenSigner = '';
  let attachmentSigner = '';
  let claimedIssuer = '';
  let parsedClaim;
  let proof: string;
  let claim: string;

  try {
    const tokenParseResult = parseDIDToken(DIDToken);
    [proof, claim] = tokenParseResult.raw;
    parsedClaim = tokenParseResult.withParsedClaim[1];
    claimedIssuer = parsePublicAddressFromIssuer(parsedClaim.iss);
  } catch {
    throw new Error('Invalid token');
  }

  try {
    // Recover the token signer
    tokenSigner = ecRecover(claim, proof).toLowerCase();

    // Recover the attachment signer
    attachmentSigner = ecRecover(attachment, parsedClaim.add).toLowerCase();
  } catch {
    throw new Error('Feiled recovering proof');
  }

  // Assert the expected signer
  if (claimedIssuer !== tokenSigner || claimedIssuer !== attachmentSigner) {
    throw new Error('Incorrect signer address');
  }

  const timeSecs = Math.floor(Date.now() / 1000);
  const nbfLeeway = 300; // 5 min grace period

  // Assert the token is not expired
  if (parsedClaim.ext < timeSecs) {
    throw new Error('Token expired');
  }

  // Assert the token is not used before allowed.
  if (parsedClaim.nbf - nbfLeeway > timeSecs) {
    throw new Error('Token cannot be used yet');
  }
};
