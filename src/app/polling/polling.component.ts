import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../candidate.service';
import { CookieService } from "ngx-cookie-service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-polling',
  templateUrl: './polling.component.html',
  styleUrls: ['./polling.component.css']
})
export class PollingComponent implements OnInit {

  constructor(private candidateService: CandidateService, 
              private cookieService: CookieService, 
              private router: Router) { }


  candidates: any;
  currentCandidate = null;
  currentIndex = -1;
  name = '';
  isVoted = false;
  message = "You vote has been registered successfully. Thank You for visit."


  ngOnInit(): void {
    
    if(this.cookieService.check("user")) {
      this.isVoted = true;
    } else {
      this.getCandidates();
    }
  }
  getCandidates() {
    this.candidateService.getAll()
        .subscribe( 
          data => {
            this.candidates = data;
            console.log(data);
          }, 
          error => {
            console.log(error);
        });
  }

  refreshList() {
    this.getCandidates();
    this.currentCandidate = null;
    this.currentIndex = -1;
  }

  setActiveCandidate(candidate, index) {
    this.currentCandidate = candidate;
    this.currentIndex = index;
  }

  removeAllCandidates() {
    this.candidateService.deleteAll()
      .subscribe( response => {
        this.refreshList();
      },
      error => {
        console.log(error);
      })
  }

  searchName() {
    this.candidateService.findByName(this.name)
      .subscribe( data=>{
        this.candidates = data;
        console.log(data);
      },
      error => {
        console.log(error);
      })
  }

  updateCandidate(candidate) {

    candidate.votes = candidate.votes+1;
    this.candidateService.update(candidate.id, candidate)
      .subscribe(
        response => {
          console.log(response);
          this.cookieService.set("user","voted");
          this.ngOnInit(); 
        },
        error => {
          console.log(error);
        });
  }

}
