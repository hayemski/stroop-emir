import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { StroopExamComponent } from './stroop-exam/stroop-exam.component';
import { StroopResultsComponent } from './stroop-results/stroop-results.component';

const routes: Routes = [
  {
    path: '',
    component: IntroComponent,
  },
  { path: 'stroop-exam', component: StroopExamComponent },
  { path: 'stroop-results', component: StroopResultsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
