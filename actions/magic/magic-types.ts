export interface MetaData {
  issuer: string;
  publicAddress: string;
  email: string;
  oauthProvider: string | undefined;
  phoneNumber: string | undefined;
  wallets: string[] | undefined;
}
