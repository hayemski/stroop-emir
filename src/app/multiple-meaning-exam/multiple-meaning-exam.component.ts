import { Component } from '@angular/core';
import { multipleMeaningTestQuestions } from './exam-questions';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-multiple-meaning-exam',
  templateUrl: './multiple-meaning-exam.component.html',
  styleUrl: './multiple-meaning-exam.component.scss',
})
export class MultipleMeaningExamComponent {
  examQuestions = multipleMeaningTestQuestions;
  examForm: FormGroup;

  constructor(private fb: FormBuilder) {
    //Randomize the order of the questions
    this.examQuestions = this.shuffle(this.examQuestions);

    this.examForm = this.fb.group({
      questions: this.fb.array(
        this.examQuestions.map(() => this.createAnswerControls())
      ),
    });
  }

  createAnswerControls(): FormArray {
    return this.fb.array(
      this.examQuestions[0].answers.map(() => new FormControl(false))
    );
  }

  getAnswerControl(questionIndex: number, answerIndex: number): FormControl {
    const formArray = this.examForm.get('questions') as FormArray;
    const questionFormArray = formArray.controls[questionIndex] as FormArray;
    return questionFormArray.controls[answerIndex] as FormControl;
  }

  onCheckboxChange(questionIndex: number) {
    const formArray = this.examForm.get('questions') as FormArray;
    const selectedAnswers = formArray.controls[questionIndex] as FormArray;
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

  submitForm() {
    return;
  }
}
