import { Injectable } from '@angular/core';
import { ParticipantForm } from './intro/intro.component';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root',
})
export class StroopService {
  participantName?: string;

  stroopResults: any = [];
  finishTime: number = 0;

  participantForm?: ParticipantForm;

  multipleMeaningResults: number = 0;

  constructor() {}

  async sendResults() {
    await emailjs
      .send(
        'service_oz43jb5',
        'template_hdsnwog',
        {
          age: this.participantForm?.age,
          gender: this.participantForm?.gender,
          motherTongue: this.participantForm?.motherTongue,
          familyLanguageEnvironment:
            this.participantForm?.familyLanguageEnvironment,
          languagesFluent: this.participantForm?.languagesFluent,
          stroopResults: this.stroopResults.filter(
            (result: any) => result.answer === 'correct'
          ).length,
          finishTime: this.finishTime,
          multipleMeaningResults: this.multipleMeaningResults,
        },
        'ePoZ8tpgV3yzFltT0'
      )
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
