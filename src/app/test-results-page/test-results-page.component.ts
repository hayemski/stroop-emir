import { Component } from '@angular/core';
import { StroopService } from '../stroop-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-results-page',
  templateUrl: './test-results-page.component.html',
  styleUrl: './test-results-page.component.scss',
})
export class TestResultsPageComponent {
  constructor(private stroopService: StroopService, private router: Router) {
    debugger;

    if (!this.stroopService.participantForm) {
      this.router.navigate(['/']);
    }
  }
}
