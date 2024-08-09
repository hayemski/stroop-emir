import { Component } from '@angular/core';
import { StroopService } from '../stroop-service.service';
import { Router } from '@angular/router';
import { stroopTestQuestions } from './stroop-test-questions';

@Component({
  selector: 'app-stroop-exam',
  templateUrl: './stroop-exam.component.html',
  styleUrl: './stroop-exam.component.scss',
})
export class StroopExamComponent {
  participantName?: string;
  questionNumber: number = 1;
  maxQuestions: number = 20;

  stroopQuestions = stroopTestQuestions;
  seconds: number = 0;
  private intervalId: any;

  activeQuestion!: (typeof stroopTestQuestions)[0];
  answers: any = [];

  constructor(private stroopService: StroopService, private router: Router) {
    this.participantName = stroopService.participantName;

    if (!this.participantName) {
      this.router.navigate(['/']);
    }

    this.selectRandomObject();

    this.startTimer();
  }

  selectRandomObject() {
    const randomIndex = Math.floor(Math.random() * this.stroopQuestions.length);
    this.activeQuestion = this.stroopQuestions[randomIndex];
    console.log('Randomly selected object:', this.activeQuestion);
  }

  nextQuestion(currentAnswer: typeof stroopTestQuestions[0], answer: boolean) {
    if (this.questionNumber === this.maxQuestions) {

      // clearInterval(this.intervalId);
      // this.router.navigate(['/stroop-results']);
      return;
    }

    this.questionNumber++;
    this.answers.push({ questionId: currentAnswer.questionId, answer: answer });

    this.selectRandomObject();
  }

  startTimer(): void {
    this.intervalId = setInterval(() => {
      this.seconds++;
    }, 1000);
  }
}
