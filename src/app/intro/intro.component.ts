import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StroopService } from './../stroop-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent {
  participantForm: FormGroup;

  constructor(
    private router: Router,
    private stroopService: StroopService,
    private fb: FormBuilder
  ) {
    this.participantForm = this.fb.group({
      age: [
        null,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      gender: ['', Validators.required],
      motherTongue: ['', Validators.required],
      familyLanguageEnvironment: ['', Validators.required],
      languagesFluent: [[], Validators.required],
    });
  }

  startTest() {
    this.stroopService.participantForm = this.participantForm.getRawValue();
    this.router.navigate(['/stroop-disclaimer']);
  }
}

export interface ParticipantForm {
  age: number | undefined; // Возраст
  gender: 'M' | 'Z' | undefined; // Пол
  motherTongue: 'mkd' | 'alb' | 'tr' | 'bhs' | 'rom' | 'vla' | 'dr' | undefined; // Мајчин/прв јазик
  familyLanguageEnvironment: 'ES' | 'PS' | undefined; // Јазичен амбиент во семејството
  languagesFluent: Array<
    | 'mkd'
    | 'alb'
    | 'tr'
    | 'bhs'
    | 'rom'
    | 'vla'
    | 'eng'
    | 'ger'
    | 'fra'
    | 'ita'
    | 'esp'
    | 'rus'
    | 'pol'
    | 'dr'
    | undefined
  >; // Наведете ги јазиците кои на високо ниво ги владеете
}
