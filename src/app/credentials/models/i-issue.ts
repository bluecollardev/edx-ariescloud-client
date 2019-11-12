export interface IIssueResponse {
  _id: string;
  connectionId: string;
  proposal: IProposal;
  created: string;
  updated: string;
  state: string;
}
export interface IProposal {
  '@type': string;
  '@id': string;
  comment: string;
  schema_id: string;
  cred_def_id: string;
  credential_proposal: ICredentialProposal;
}
export interface ICredentialProposal {
  '@type': string;
  attributes?: IAttributesEntity[] | null;
}
export interface IAttributesEntity {
  name: string;
  value: string;
}
