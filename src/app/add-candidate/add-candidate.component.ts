import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/candidate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css']
})
export class AddCandidateComponent implements OnInit {

  constructor(private candidateService: CandidateService, private router: Router) { }

  ngOnInit(): void {
  }

  candidate = {
    name : "",
    numChallenge :0,
    expertise: null,
    expLevel:0,
    votes:0
  };

  submitted = false;

  saveCandidate() {
    const newCandidate = {
      name :  this.candidate.name,
      numChallenge : this.candidate.numChallenge,
      expertise: this.candidate.expertise,
      expLevel:this.candidate.expLevel,
      votes:this.candidate.votes
    }

    this.candidateService.create(newCandidate)
          .subscribe( response => {
            console.log(response);
            this.submitted = true;
          }, 
          error =>{
            console.log(error);
          })
  }

  newCandidate() {
    this.candidate.name = "";
    this.candidate.expertise.clear();
    this.candidate.numChallenge = 0;
    this.candidate.expLevel = 0;
    this.candidate.votes = 0;
    this.submitted = false;
  }

  candidateList() {
    this.router.navigate(['/candidates']);
  }

}
