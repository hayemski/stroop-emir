import { Component } from '@angular/core';
import { StroopService } from '../stroop-service.service';
import { Router } from '@angular/router';
import { stroopTestQuestions } from './stroop-test-questions';
import { ParticipantForm } from '../intro/intro.component';

@Component({
  selector: 'app-stroop-exam',
  templateUrl: './stroop-exam.component.html',
  styleUrl: './stroop-exam.component.scss',
})
export class StroopExamComponent {
  // participantName?: string;

  participantForm?: ParticipantForm;

  questionNumber: number = 1;
  maxQuestions: number = 20;

  stroopQuestions = stroopTestQuestions;
  seconds: number = 45;
  private intervalId: any;

  activeQuestion!: (typeof stroopTestQuestions)[0];
  answers: any = [];

  constructor(private stroopService: StroopService, private router: Router) {
    this.participantForm = this.stroopService.participantForm;

    if (!this.participantForm) {
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

  nextQuestion(
    currentQuestion: (typeof stroopTestQuestions)[0],
    answer: boolean | undefined
  ) {
    this.answers.push({
      questionId: currentQuestion.questionId,
      answer: currentQuestion.trueAnswer === answer ? 'correct' : 'incorrect',
      // time: 10 - this.seconds,
    });

    if (this.questionNumber === this.maxQuestions) {
      this.finishTest();
      return;
    }

    this.questionNumber++;

    this.selectRandomObject();
  }

  startTimer(): void {
    this.intervalId = setInterval(() => {
      this.seconds--;

      if (this.seconds <= 0) {
        this.finishTest();
      }
    }, 1000);
  }

  finishTest() {
    this.stroopService.stroopResults = this.answers;
    this.stroopService.finishTime = 45 - this.seconds;

    this.router.navigate(['/multiple-meaning']);
  }

  resetTimer(): void {
    clearInterval(this.intervalId);
    this.seconds = 10;
    this.startTimer();
  }
}
