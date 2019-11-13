export interface IRawRel {
  relationship: Relationship;
  proofs?: ProofsEntityOrIssuesEntity[] | null;
  issues?: ProofsEntityOrIssuesEntity[] | null;
}
export interface Relationship {
  their_label: string;
  routing_state: string;
  request_id: string;
  my_did: string;
  initiator: string;
  updated_at: string;
  connection_id: string;
  accept: string;
  created_at: string;
  invitation_key: string;
  state: string;
  their_did: string;
  invitation_mode: string;
}
export interface ProofsEntityOrIssuesEntity {
  initiator: string;
  updated_at: string;
  connection_id: string;
  role: string;
  credential_exchange_id: string;
  credential_request?: CredentialRequest | null;
  credential_offer: CredentialOffer;
  auto_offer: boolean;
  thread_id: string;
  state: string;
  auto_issue: boolean;
  credential_definition_id: string;
  created_at: string;
  credential_proposal_dict: CredentialProposalDict;
  credential_request_metadata?: CredentialRequestMetadata | null;
  schema_id: string;
}
export interface CredentialRequest {
  prover_did: string;
  cred_def_id: string;
  blinded_ms: BlindedMs;
  blinded_ms_correctness_proof: BlindedMsCorrectnessProof;
  nonce: string;
}
export interface BlindedMs {
  u: string;
  ur?: null;
  hidden_attributes?: string[] | null;
  committed_attributes: CommittedAttributesOrRCaps;
}
export interface CommittedAttributesOrRCaps {}
export interface BlindedMsCorrectnessProof {
  c: string;
  v_dash_cap: string;
  m_caps: MCaps;
  r_caps: CommittedAttributesOrRCaps;
}
export interface MCaps {
  master_secret: string;
}
export interface CredentialOffer {
  schema_id: string;
  cred_def_id: string;
  key_correctness_proof: KeyCorrectnessProof;
  nonce: string;
}
export interface KeyCorrectnessProof {
  c: string;
  xz_cap: string;
  xr_cap?: (string[] | null)[] | null;
}
export interface CredentialProposalDict {
  '@type': string;
  '@id': string;
  cred_def_id: string;
  credential_proposal: CredentialProposal;
  comment: string;
  schema_id: string;
}
export interface CredentialProposal {
  '@type': string;
  attributes?: AttributesEntity[] | null;
}
export interface AttributesEntity {
  name: string;
  value: string;
}
export interface CredentialRequestMetadata {
  master_secret_blinding_data: MasterSecretBlindingData;
  nonce: string;
  master_secret_name: string;
}
export interface MasterSecretBlindingData {
  v_prime: string;
  vr_prime?: null;
}
