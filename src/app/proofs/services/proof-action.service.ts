import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { ICertificateOfProof } from 'src/app/credentials/services/credential-state.service';

@Injectable({
  providedIn: 'root'
})
export class ProofActionService {
  constructor(private httpSvc: HttpService) {}

  getProofs() {
    return this.httpSvc.get<ICertificateOfProof[]>('proofs');
  }

  postProof(params: any) {
    return this.httpSvc.post('proofs', params);
  }
}
