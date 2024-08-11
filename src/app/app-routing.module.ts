import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { StroopExamComponent } from './stroop-exam/stroop-exam.component';
import { MultipleMeaningExamComponent } from './multiple-meaning-exam/multiple-meaning-exam.component';
import { TestResultsPageComponent } from './test-results-page/test-results-page.component';
import { StroopDisclaimerComponent } from './stroop-disclaimer/stroop-disclaimer.component';

const routes: Routes = [
  {
    path: '',
    component: IntroComponent,
  },
  { path: 'stroop-exam', component: StroopExamComponent },
  { path: 'multiple-meaning', component: MultipleMeaningExamComponent },
  { path: 'results', component: TestResultsPageComponent },
  { path: 'stroop-disclaimer', component: StroopDisclaimerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
