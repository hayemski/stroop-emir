import { Component } from '@angular/core';
import { StroopService } from '../stroop-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stroop-disclaimer',
  templateUrl: './stroop-disclaimer.component.html',
  styleUrl: './stroop-disclaimer.component.scss',
})
export class StroopDisclaimerComponent {
  stroopAnswers: any = [];
  stroopAnsweringTime: number = 0;

  constructor(private stroopService: StroopService, private router: Router) {
    this.stroopAnswers = stroopService.stroopResults;
    this.stroopAnsweringTime = stroopService.finishTime;

    // if (!this.stroopResults.length) {
    //   this.router.navigate(['/']);
    // }
  }

  next() {
    this.router.navigate(['/stroop-exam']);
  }
}
