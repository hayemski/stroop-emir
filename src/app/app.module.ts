import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material.module';
import { StroopExamComponent } from './stroop-exam/stroop-exam.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimePipe } from './time.pipe';
import { StroopResultsComponent } from './stroop-results/stroop-results.component';
import { MultipleMeaningExamComponent } from './multiple-meaning-exam/multiple-meaning-exam.component';
import { TestResultsPageComponent } from './test-results-page/test-results-page.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    StroopExamComponent,
    TimePipe,
    StroopResultsComponent,
    MultipleMeaningExamComponent,
    TestResultsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
