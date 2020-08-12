import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/candidate.service';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {

  constructor(private candidateService: CandidateService, private cookieService: CookieService) { }

  candidates: any;
  currentCandidate = null;
  currentIndex = -1;
  name = '';
  isAuth =false;


  ngOnInit(): void {
    if(this.cookieService.check('isAuth')){
      this.isAuth = true;
      this.getCandidates();
    }
    else{
      this.checkAdmin()
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

  checkAdmin() {
    const adminCode = prompt("Please enter admin Auth Code");

    this.candidateService.authAdmin(adminCode)
        .subscribe( response=>{
          console.log(response);

          this.cookieService.set('isAuth','true');
          this.isAuth = true;
        },
        error => {
          console.log(error);
        })
  }

  logout() {
    this.isAuth = false;
    this.cookieService.deleteAll();
    this.ngOnInit()
  }

}
