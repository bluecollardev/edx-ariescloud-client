import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import {
  ICertificateOfProof,
  IProof,
  IProofResponse
} from 'src/app/credentials/services/credential-state.service';

@Injectable({
  providedIn: 'root'
})
export class ProofActionService {
  constructor(private httpSvc: HttpService) {}

  getProofs() {
    return this.httpSvc.get<IProofResponse[]>('proofs');
  }

  postProof(params: any) {
    return this.httpSvc.post('proofs', params);
  }

  getProof(id: string) {
    return this.httpSvc.getById<IProof>('proofs', id);
  }
}
