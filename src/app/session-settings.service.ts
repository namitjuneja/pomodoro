import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionSettingsService {

  constructor() { }

  sessionDurations = {'pomodoro':25, 'short_break': 5, 'long_break': 15};

  incrementDuration(sessionName){
  	if (this.sessionDurations[sessionName]<60) {
  		this.sessionDurations[sessionName] ++;
  	}
  }

  decrementDuration(sessionName){
  	if (this.sessionDurations[sessionName]>1) {
  		this.sessionDurations[sessionName] --;
  	}
  }

  getSessionDuration(sessionName){
  	return this.sessionDurations[sessionName];
  }

  resetSessionDurations(){
  	this.sessionDurations = {'pomodoro':25, 'short_break':5, 'long_break': 15};
  }
}
