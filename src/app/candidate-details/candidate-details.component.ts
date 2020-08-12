import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from '../candidate.service';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})
export class CandidateDetailsComponent implements OnInit {

  constructor(private candidateService: CandidateService,
              private route: ActivatedRoute,
              private router: Router) { }

  currentCandidate = null;
  message = '';
  ngOnInit(): void {
    this.message = '';
    this.getCandidate(this.route.snapshot.paramMap.get('id'));
  }

  getCandidate(id) {
    this.candidateService.get(id)
      .subscribe( 
        data => {
          this.currentCandidate = data;
          console.log(data)
      },
        error => {
          console.log(error)
      })
  }

  updatePublished(status) {
    const newCandidate = {
      name :  this.currentCandidate.name,
      numChallenge : this.currentCandidate.numChallenge,
      expertise: this.currentCandidate.expertise,
      expLevel:this.currentCandidate.expLevel
    }

    this.candidateService.update(this.currentCandidate.id, newCandidate)
      .subscribe(
        data =>{
          console.log(data);
        },
        error => {
          console.log(error);
        })

  }

  updateCandidate() {
    this.candidateService.update(this.currentCandidate.id, this.currentCandidate)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The Candidate was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteCandidate() {
    this.candidateService.delete(this.currentCandidate.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/candidates']);
        },
        error => {
          console.log(error);
        });
  }

  candidateList() {
    this.router.navigate(['/candidates']);
  }

}
