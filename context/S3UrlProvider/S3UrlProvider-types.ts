export interface S3UrlProviderContextType {
  getUrl: (url: string) => string;
  invalidateUrl: (url: string) => void;
}
