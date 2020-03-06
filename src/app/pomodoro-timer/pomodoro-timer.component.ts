/**
 * PomodoroTimer component implements the pomodoro
 * timer logic to count the time spent per session
 * and to transition from one session to another.
 */



import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionSettingsService } from '../session-settings.service';
import { ding } from '../constants';

@Component({
  selector: 'app-pomodoro-timer',
  templateUrl: './pomodoro-timer.component.html',
  styleUrls: ['./pomodoro-timer.component.css']
})
export class PomodoroTimerComponent implements OnInit, OnDestroy {

  constructor(
    public sessionSettings: SessionSettingsService
  ) { }

  sessionList = ['pomodoro', 'short_break', 'pomodoro', 'short_break', 'pomodoro', 'short_break', 'pomodoro', 'long_break'];
  sessionPointer = 0;
  sessionName;
  sessionDuration;
  sessionCount = {pomodoro: 0, short_break: 0};

  running = false;

  startButtonText = 'Stop';
  startTime;
  sessionInterval;
  fastForwardInterval;
  sessionLabel;
  counter;
  minutes;
  seconds;

  ngOnInit(): void {
  	this.setSessionVariables();
  	this.startSession();
  }

  // set initial variables for the layout and pomodoro timer
  setSessionVariables() {
	  this.sessionName = this.sessionList[this.sessionPointer % 8];
	  this.sessionDuration = this.sessionSettings.getSessionDuration(this.sessionName) * 60 * 1000;
	  this.sessionCount[this.sessionName] ++;
    this.counter = this.sessionDuration;
	  console.log('Updated session details: ', this.sessionName, this.sessionDuration, this.sessionCount);

    if (this.sessionName == 'pomodoro') {
      this.sessionLabel = 'Pomodoro Session #' + this.sessionCount.pomodoro;
    } else if (this.sessionName == 'short_break') {
      this.sessionLabel = 'Short Break # ' +  (((this.sessionCount.short_break - 1) % 3) + 1).toString() + ' of 3';
    } else {
      this.sessionLabel = 'Long Break';
    }
  }


  // binds to the stop/resume button
  // stops or pauses the timer
  startSession() {
  	if (this.running == false) {
  		// This is session init or session resume case
  		this.running = true;
  		this.startButtonText = 'Stop';
  		this.startTime = Date.now() - (this.sessionDuration - this.counter);
  		this.sessionInterval = setInterval(() => {
          // session has ended
          if (Math.floor(this.counter / 1000) <= 0) {
            this.sessionPointer ++;
            this.startTime = Date.now();
            this.ding();
            this.setSessionVariables();
          } else {  // session is still in progress
        	this.counter = this.sessionDuration - Date.now() + this.startTime;
        	this.seconds = Math.floor(this.counter / 1000 % 60);
    		   this.minutes = Math.floor(this.counter / 1000 / 60);
          }
      	}, 1000);
  	} else {
  		// This is session stop case
  		this.running = false;
  		this.startButtonText = 'Resume';
  		clearInterval(this.sessionInterval);
      clearInterval(this.fastForwardInterval);
      this.fastForwardInterval = null;
  	}
  }

  // ngOnDestroy is called when the user resets the timer
  // this life cycle hook clears the existing timer and resets timer durations
  ngOnDestroy() {
  	clearInterval(this.sessionInterval);
    clearInterval(this.fastForwardInterval);
    this.sessionSettings.resetSessionDurations();
  }

  // formatting the seconds time string
  secondsString(number) {
    if (typeof number == 'undefined') {
      return '-';
    }
    return (number < 10 ? '0' : '') + number;
  }

  // formatting the minutes time string
  minutesString(number) {
    if (typeof number == 'undefined') {
      return '-';
    }
    return number;
  }

  ding() {
      const sound = new  Audio(ding);
      sound.play();
  }

  // used to fastforward counter 
  // for easier evaluation
  fastForwardCounter() {
    if (!this.fastForwardInterval) {
      console.log('Fast and Furious');

      if (!this.running){this.startSession();}
      clearInterval(this.sessionInterval);
      this.fastForwardInterval = setInterval(() => {
        if (this.counter >= 6000) {
          this.counter = this.counter - 1000 + 2;
          this.seconds = Math.floor(this.counter / 1000 % 60);
          this.minutes = Math.floor(this.counter / 1000 / 60);
        } else {
          clearInterval(this.fastForwardInterval);
          this.fastForwardInterval = null;
          this.running = false;
          this.startSession();
        }
      }, 1);
    } else {
      clearInterval(this.fastForwardInterval);
      this.fastForwardInterval = null;
      this.running = false;
      this.startSession();
      console.log('Slow and Steady');
    }
  }


}
