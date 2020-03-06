import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionSettingsService } from '../session-settings.service';
import { ding } from "../constants"

@Component({
  selector: 'app-pomodoro-timer',
  templateUrl: './pomodoro-timer.component.html',
  styleUrls: ['./pomodoro-timer.component.css']
})
export class PomodoroTimerComponent implements OnInit, OnDestroy {

  constructor(
    public sessionSettings : SessionSettingsService
  ) { }

  sessionList = ['pomodoro', 'short_break', 'pomodoro', 'short_break', 'pomodoro', 'short_break', 'pomodoro', 'long_break'];
  sessionPointer = 0;
  sessionName;
  sessionDuration;
  sessionCount = {'pomodoro': 0, 'short_break': 0}

  running = false;

  startButtonText = 'Stop';
  startTime;
  sessionInterval;
  sessionLabel;
  counter;
  minutes;
  seconds;

  ngOnInit(): void {
  	this.setSessionVariables();
  	this.startSession();
  }

  setSessionVariables(){
	this.sessionName = this.sessionList[this.sessionPointer%8];
	this.sessionDuration = this.sessionSettings.getSessionDuration(this.sessionName)*60*1000;
	this.sessionCount[this.sessionName] ++;
  this.counter = this.sessionDuration;
	console.log("Updated session details: ",this.sessionName, this.sessionDuration, this.sessionCount);

  if (this.sessionName=='pomodoro'){
    this.sessionLabel = "Pomodoro Session #" + this.sessionCount['pomodoro']
  }
  else if (this.sessionName=='short_break'){
    this.sessionLabel = "Short Break # " +  (((this.sessionCount['short_break']-1)%3)+1).toString() + ' of 4';
  }
  else {
    this.sessionLabel = "Long Break";
  }
  }



  startSession(){
  	if (this.running==false){
  		// This is session init or session resume case

  		this.running = true;
  		this.startButtonText = 'Stop';
  		this.startTime = Date.now() - (this.sessionDuration - this.counter)
  		this.sessionInterval = setInterval(() => {
          if (Math.floor(this.counter/1000)<=0){
            this.sessionPointer ++;
            this.startTime = Date.now();
            this.beep();
            this.setSessionVariables();
          }
          else {
        	this.counter = this.sessionDuration - Date.now() + this.startTime;
        	this.seconds = Math.floor(this.counter / 1000 % 60);
    		  this.minutes = Math.floor(this.counter / 1000 / 60);
          }
      	}, 1000);
  	}
  	else{
  		// This is session stop case
  		this.running = false;
  		this.startButtonText = 'Resume';
  		clearInterval(this.sessionInterval);
  	}
  }

  ngOnDestroy() {
  	clearInterval(this.sessionInterval);
    this.sessionSettings.resetSessionDurations();
    console.log(this.sessionInterval);
  }

secondsString(number) {
  if (typeof number == 'undefined'){
    return '-'
  }
  return (number < 10 ? '0' : '') + number
}

minutesString(number) {
  if (typeof number == 'undefined'){
    return '-'
  }
  return number;
}

beep() {
    var snd = new  Audio(ding);  
    snd.play();
}

}
