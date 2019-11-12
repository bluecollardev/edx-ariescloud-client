import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProofsComponent } from './proofs.component';
import { RelationshipProofsComponent } from './components/relationship-proofs/relationship-proofs.component';
import { ViewProofComponent } from './components/view-proof/view-proof.component';
import { IssueProofComponent } from './components/issue-proof/issue-proof.component';
import { FindCredsCardComponent } from './components/find-creds-card/find-creds-card.component';

const routes: Routes = [
  {
    path: 'verify-credentials',
    component: ProofsComponent,
  },
  {
    path: 'verify-credentials/view',
    component: ViewProofComponent,
  },
  {
    path: 'verify-credentials/issue/:id',
    component: IssueProofComponent,
  },
  {
    path: 'verify-credentials/group/:did',
    component: RelationshipProofsComponent,
  },
  {
    path: 'verify-credentials/view/:id',
    component: ViewProofComponent,
  },
  {
    path: 'verify-credentials/claims/:id',
    component: FindCredsCardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProofsRoutingModule {}
