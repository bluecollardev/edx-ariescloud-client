import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import {
  ICertificateOfProof,
  IProof,
  IProofResponse,
} from 'src/app/credentials/services/credential-state.service';
import { ProverCred } from '../components/find-creds-card/find-creds-card.component';

@Injectable({
  providedIn: 'root',
})
export class ProofActionService {
  constructor(private httpSvc: HttpService) {}

  getProofs() {
    return this.httpSvc.get<IProofResponse[]>('proofs');
  }

  postProof(params: any) {
    return this.httpSvc.post<{ _id: string }>('proofs', params);
  }
  postProofById(params: any, id: string) {
    return this.httpSvc.postById<{ _id: string }>('proofs', id, params);
  }

  getProof(id: string) {
    return this.httpSvc.getById<IProof>('proofs', id);
  }

  getProofCred(id: string) {
    return this.httpSvc.getById<ProverCred[]>('proofs/creds', id);
  }

  getProposal(params: { credId: string; relId: string; schemaId: string }) {
    return this.httpSvc.post<IProofProposal>(
      'proofs/presentation/attributes',
      params,
    );
  }
}

export interface IProofProposal {
  proofProposal: ProofProposal;
  data?: DataEntity[] | null;
}
export interface ProofProposal {
  comment: string;
  connection_id: string;
  proof_request: ProofRequest;
}
export interface ProofRequest {
  version: string;
  name: string;
  nonce: string;
  requested_predicates: RequestedPredicates;
  requested_attributes: RequestedAttributes;
}
export interface RequestedPredicates {}
export interface RequestedAttributes {
  [key: string]: Restrictions;
}
export interface Restrictions {
  restrictions?: RestrictionsEntity[] | null;
  non_revoked: NonRevoked;
  name: string;
}
export interface RestrictionsEntity {
  schema_version: string;
  schema_id: string;
  cred_def_id: string;
  schema_name: string;
}
export interface NonRevoked {
  from_epoch: number;
  to_epoch: number;
}
export interface DataEntity {
  credential_definition?: CredentialDefinition | null;
  schema_json?: SchemaJson | null;
  their_label?: string | null;
  my_did?: string | null;
  state?: string | null;
  routing_state?: string | null;
  created_at?: string | null;
  invitation_mode?: string | null;
  invitation_key?: string | null;
  connection_id?: string | null;
  initiator?: string | null;
  updated_at?: string | null;
  their_did?: string | null;
  accept?: string | null;
}
export interface CredentialDefinition {
  ver: string;
  id: string;
  schemaId: string;
  type: string;
  tag: string;
  value: Value;
}
export interface Value {
  primary: Primary;
}
export interface Primary {
  n: string;
  s: string;
  r: R;
  rctxt: string;
  z: string;
}
export interface R {
  data: string;
  master_secret: string;
}
export interface SchemaJson {
  ver: string;
  id: string;
  name: string;
  version: string;
  attrNames?: string[] | null;
  seqNo: number;
}
