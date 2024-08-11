import { Injectable } from '@angular/core';
import { ParticipantForm } from './intro/intro.component';

@Injectable({
  providedIn: 'root',
})
export class StroopService {
  participantName?: string;

  stroopResults: any = [];
  finishTime: number = 0;

  participantForm?: ParticipantForm;

  constructor() {}
}
