import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';
import { PollingComponent } from './polling/polling.component';

const routes: Routes = [
  { path: "", redirectTo: 'candidates', pathMatch: 'full'},
  { path: "candidates", component: CandidateListComponent},
  { path: "candidates/add", component: AddCandidateComponent},
  { path: "candidates/:id", component: CandidateDetailsComponent},
  { path: "polling", component: PollingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
