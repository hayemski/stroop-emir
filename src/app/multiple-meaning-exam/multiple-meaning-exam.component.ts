import { Component } from '@angular/core';
import { multipleMeaningTestQuestions } from './exam-questions';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StroopService } from '../stroop-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multiple-meaning-exam',
  templateUrl: './multiple-meaning-exam.component.html',
  styleUrl: './multiple-meaning-exam.component.scss',
})
export class MultipleMeaningExamComponent {
  examQuestions = multipleMeaningTestQuestions;
  examForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private stroopService: StroopService,
    private router: Router
  ) {
    if (!this.stroopService.participantForm) {
      this.router.navigate(['/']);
    }

    //Randomize the order of the questions
    this.examQuestions = this.shuffle(this.examQuestions);

    this.examForm = this.fb.group({
      questions: this.fb.array(
        this.examQuestions.map((question: any) =>
          this.createQuestionControls(question)
        )
      ),
    });
  }

  createQuestionControls(question: any): FormGroup {
    return this.fb.group({
      questionId: question.questionId,
      answers: this.fb.array(
        question.answers.map(() => new FormControl(false))
      ),
      isFiller: question.filler,
    });
  }

  getAnswerControl(questionIndex: number, answerIndex: number): FormControl {
    const formArray = this.examForm.get('questions') as FormArray;
    const questionFormGroup = formArray.controls[questionIndex] as FormGroup;
    const answersArray = questionFormGroup.get('answers') as FormArray;
    return answersArray.controls[answerIndex] as FormControl;
  }

  onCheckboxChange(questionIndex: number) {
    const formArray = this.examForm.get('questions') as FormArray;
    const questionGroup = formArray.controls[questionIndex] as FormGroup; // Get the FormGroup for the question
    const selectedAnswers = questionGroup.get('answers') as FormArray; // Get the 'answers' FormArray

    const checkedCount = selectedAnswers.controls.filter(
      (control) => control.value
    ).length;

    if (checkedCount > 3) {
      const controlToUncheck = selectedAnswers.controls.find(
        (control) => control.value
      );
      if (controlToUncheck) {
        controlToUncheck.setValue(false);
      }
    }
  }

  shuffle(array: any[]) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  allQuestionsValid(): boolean {
    const formArray = this.examForm.get('questions') as FormArray;
    return formArray.controls.every((questionControl) => {
      const questionGroup = questionControl as FormGroup; // Cast to FormGroup
      const answersArray = questionGroup.get('answers') as FormArray; // Get the 'answers' FormArray
      return answersArray.controls.some((control) => control.value); // Check if at least one answer is selected
    });
  }

  submitForm() {
    const formArray = this.examForm.get('questions') as FormArray;
    const result = formArray.controls.map((control) => {
      const questionGroup = control as FormGroup; // Explicitly cast the control to FormGroup
      const questionId = questionGroup.get('questionId')!.value;
      const isFiller = questionGroup.get('isFiller')!.value;
      const selectedAnswers = (
        questionGroup.get('answers') as FormArray
      ).controls
        .map((answerControl, index) => (answerControl.value ? index : null))
        .filter((index) => index !== null);
      return { questionId, selectedAnswers, isFiller };
    });

    const withoutFillers = result.filter((question) => !question.isFiller);

    let points = 0;
    let negativePoints = 0;

    //for every question, check if the selected answers are correct
    withoutFillers.forEach((question) => {
      // find the question in the original array\
      const originalQuestion = this.examQuestions.find(
        (q) => q.questionId === question.questionId
      );

      question.selectedAnswers.forEach((selectedAnswerIndex) => {
        const selectedAnswer = originalQuestion!.answers[selectedAnswerIndex];
        if (selectedAnswer.value) {
          points++;
        } else {
          negativePoints = negativePoints + 0.25;
        }
      });
    });

    const multipleMeaningResults =
      points - negativePoints < 0 ? 0 : points - negativePoints;
    this.stroopService.multipleMeaningResults = multipleMeaningResults;

    this.router.navigate(['/results']);
  }
}
