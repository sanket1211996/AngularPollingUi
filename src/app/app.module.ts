import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PollingComponent } from './polling/polling.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCandidateComponent,
    CandidateListComponent,
    CandidateDetailsComponent,
    PollingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
