import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProofsComponent } from './proofs.component';
import { RelationshipProofsComponent } from './components/relationship-proofs/relationship-proofs.component';
import { ViewProofComponent } from './components/view-proof/view-proof.component';

const routes: Routes = [
  {
    path: 'verify-credentials',
    component: ProofsComponent
  },
  {
    path: 'verify-credentials/view',
    component: ViewProofComponent,
  },
  {
    path: 'verify-credentials/group/:id',
    component: RelationshipProofsComponent,
  },
  {
    path: 'verify-credentials/view/:id',
    component: ViewProofComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProofsRoutingModule { }
