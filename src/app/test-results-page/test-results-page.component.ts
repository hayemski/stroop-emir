import { Component } from '@angular/core';
import { StroopService } from '../stroop-service.service';
import { Router } from '@angular/router';
import { ParticipantForm } from '../intro/intro.component';

@Component({
  selector: 'app-test-results-page',
  templateUrl: './test-results-page.component.html',
  styleUrl: './test-results-page.component.scss',
})
export class TestResultsPageComponent {
  participantForm?: ParticipantForm;
  resultsStroop = 0;
  resultsMultipleMeaning = 0;


  constructor(private stroopService: StroopService, private router: Router) {
    debugger;

    if (!this.stroopService.participantForm) {
      this.router.navigate(['/']);
    }

    this.participantForm = this.stroopService.participantForm;
    this.resultsStroop = this.stroopService.stroopResults.filter(
      (result: any) => result.answer === 'correct'
    ).length;
    this.resultsMultipleMeaning = this.stroopService.multipleMeaningResults;

  }
}
