import { Component, OnInit } from '@angular/core';
import { StroopService } from '../stroop-service.service';
import { Router } from '@angular/router';
import { stroopTestQuestions } from './stroop-test-questions';
import { ParticipantForm } from '../intro/intro.component';

@Component({
  selector: 'app-stroop-exam',
  templateUrl: './stroop-exam.component.html',
  styleUrl: './stroop-exam.component.scss',
})
export class StroopExamComponent implements OnInit {
  // participantName?: string;

  participantForm?: ParticipantForm;

  questionNumber: number = 1;
  maxQuestions: number = 20;

  stroopQuestions = stroopTestQuestions;
  seconds: number = 45;
  private intervalId: any;

  activeQuestion!: (typeof stroopTestQuestions)[0];
  answers: any = [];

  trueCount: number = 0;
  falseCount: number = 0;

  constructor(private stroopService: StroopService, private router: Router) {
    this.participantForm = this.stroopService.participantForm;

    this.selectRandomObject();

    this.startTimer();
  }

  ngOnInit() {
    if (!this.participantForm) {
      this.router.navigate(['/']);
    }
  }

  selectRandomObject() {
    // Separate questions based on trueAnswer value
    const falseAnswers = this.stroopQuestions.filter(q => q.trueAnswer === false);
    const trueAnswers = this.stroopQuestions.filter(q => q.trueAnswer === true);

    let selectedQuestion: { questionId: number; file: string; trueAnswer: boolean } | undefined;

    // Ensure balanced selection
    if (this.falseCount < 10 && this.trueCount < 10) {
      // Randomly choose between falseAnswers and trueAnswers
      if (Math.random() < 0.5 && falseAnswers.length > 0) {
        const randomIndex = Math.floor(Math.random() * falseAnswers.length);
        selectedQuestion = falseAnswers[randomIndex];
      } else if (trueAnswers.length > 0) {
        const randomIndex = Math.floor(Math.random() * trueAnswers.length);
        selectedQuestion = trueAnswers[randomIndex];
      }
    } else if (this.falseCount < 10 && falseAnswers.length > 0) {
      // Force selection from falseAnswers if trueAnswers are exhausted
      const randomIndex = Math.floor(Math.random() * falseAnswers.length);
      selectedQuestion = falseAnswers[randomIndex];
    } else if (this.trueCount < 10 && trueAnswers.length > 0) {
      // Force selection from trueAnswers if falseAnswers are exhausted
      const randomIndex = Math.floor(Math.random() * trueAnswers.length);
      selectedQuestion = trueAnswers[randomIndex];
    }

    // Handle case where no valid question is found (shouldn't happen in practice)
    if (!selectedQuestion) {
      throw new Error('No valid question found!');
    }

    // Check if the selected question is the same as the previous one
    while (selectedQuestion === this.activeQuestion) {
      const randomIndex = Math.floor(Math.random() * (selectedQuestion.trueAnswer ? trueAnswers.length : falseAnswers.length));
      selectedQuestion = selectedQuestion.trueAnswer ? trueAnswers[randomIndex] : falseAnswers[randomIndex];
    }

    // Assign the selected question and update counts
    this.activeQuestion = selectedQuestion;
    if (selectedQuestion.trueAnswer) {
      this.trueCount++;
    } else {
      this.falseCount++;
    }
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
      this.seconds = Math.round((this.seconds - 0.01) * 100) / 100;

      if (this.seconds <= 0) {
        this.seconds = 0;
        this.finishTest();
        clearInterval(this.intervalId);
      }
    }, 10);
  }

  finishTest() {
    this.stroopService.stroopResults = this.answers;
    this.stroopService.finishTime = 45 - this.seconds;

    clearInterval(this.intervalId);

    this.router.navigate(['/multiple-meaning']);
  }

  resetTimer(): void {
    clearInterval(this.intervalId);
    this.seconds = 10;
    this.startTimer();
  }
}
