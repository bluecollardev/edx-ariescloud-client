export interface IInvitation {
  '@type': string;
  '@id': string;
  recipientKeys: string[];
  label: string;
  serviceEndpoint: string;
}
