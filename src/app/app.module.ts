import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material.module';
import { StroopExamComponent } from './stroop-exam/stroop-exam.component';
import { FormsModule } from '@angular/forms';
import { TimePipe } from './time.pipe';
import { StroopResultsComponent } from './stroop-results/stroop-results.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    StroopExamComponent,
    TimePipe,
    StroopResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
