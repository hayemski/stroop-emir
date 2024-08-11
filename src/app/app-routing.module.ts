import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { StroopExamComponent } from './stroop-exam/stroop-exam.component';
import { StroopResultsComponent } from './stroop-results/stroop-results.component';
import { MultipleMeaningExamComponent } from './multiple-meaning-exam/multiple-meaning-exam.component';
import { TestResultsPageComponent } from './test-results-page/test-results-page.component';

const routes: Routes = [
  {
    path: '',
    component: IntroComponent,
  },
  { path: 'stroop-exam', component: StroopExamComponent },
  { path: 'stroop-results', component: StroopResultsComponent },
  { path: 'multiple-meaning', component: MultipleMeaningExamComponent },
  { path: 'results', component: TestResultsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
