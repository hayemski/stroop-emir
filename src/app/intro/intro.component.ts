import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StroopService } from './../stroop-service.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent {
  participantName?: string;

  constructor(private router: Router, private stroopService: StroopService) {}

  startTest() {
    this.stroopService.participantName = this.participantName;
    this.router.navigate(['/stroop-exam']);
  }
}
