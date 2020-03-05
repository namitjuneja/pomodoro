import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { PomodoroTimerComponent } from './pomodoro-timer/pomodoro-timer.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    PomodoroTimerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
