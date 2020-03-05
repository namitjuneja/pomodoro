import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-pomodoro-timer',
  templateUrl: './pomodoro-timer.component.html',
  styleUrls: ['./pomodoro-timer.component.css']
})
export class PomodoroTimerComponent implements OnInit, OnDestroy {

  constructor() { }

  sessionList = ['pomodoro', 'short_break', 'pomodoro', 'short_break', 'pomodoro', 'short_break', 'pomodoro', 'long_break'];
  sessionPointer = 0;
  sessionName;
  sessionDuration;
  sessionCount = {'pomodoro': 0, 'short_break': 0}

  running = false;

  startButtonText = 'Stop';
  startTime;
  sessionInterval;
  counter = 0;
  minutes = 0;
  seconds = 0;

  ngOnInit(): void {
  	this.setSessionVariables();
  	this.startSession();
  }

  setSessionVariables(){
	this.sessionName = this.sessionList[this.sessionPointer%8];
	this.sessionDuration = 5000;
	this.sessionCount[this.sessionName] ++;

	console.log("Updated session details: ",this.sessionName, this.sessionDuration, this.sessionCount);
  }


  startSession(){
  	if (this.running==false){
  		// This is session init or session resume case

  		this.running = true;
  		this.startButtonText = 'Stop';
  		this.startTime = Date.now() - (this.counter)
  		this.sessionInterval = setInterval(() => {
  			console.log("Counter: ", this.counter, this.seconds);
        	this.counter = this.sessionDuration - Date.now() + this.startTime;
        	this.seconds = Math.floor(this.counter / 1000 % 60);
    		this.minutes = Math.floor(this.counter / 1000 / 60);

    		if (Math.floor(this.counter/1000)==0){
    			this.sessionPointer ++;
    			this.startTime = Date.now();
    			this.counter = 0;

    			this.setSessionVariables();
    		}
      	}, 1000);
  	}
  	else{
  		// This is session ptop case
  		this.running = false;
  		this.startButtonText = 'Resume';
  		clearInterval(this.sessionInterval);
  	}
  }

  ngOnDestroy() {
  	clearInterval(this.sessionInterval);
  }

}
