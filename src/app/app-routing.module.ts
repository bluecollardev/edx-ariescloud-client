import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

// tslint:disable-next-line: max-line-length
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'relationships',
    loadChildren: `./relationships/relationships.module#RelationshipsModule`
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
