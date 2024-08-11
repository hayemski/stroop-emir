import { Component } from '@angular/core';
import { StroopService } from '../stroop-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stroop-results',
  templateUrl: './stroop-results.component.html',
  styleUrl: './stroop-results.component.scss',
})
export class StroopResultsComponent {
  stroopAnswers: any = [];
  stroopAnsweringTime: number = 0;

  constructor(private stroopService: StroopService, private router: Router) {
    this.stroopAnswers = stroopService.stroopResults;
    this.stroopAnsweringTime = stroopService.finishTime;

    // if (!this.stroopResults.length) {
    //   this.router.navigate(['/']);
    // }
  }
}
