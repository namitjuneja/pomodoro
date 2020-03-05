import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionSettingsService {

  constructor() { }

  sessionDurations = {'pomodoro':0.1, 'short_break': 0.1, 'long_break':0.15};

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
  	this.sessionDurations = {'pomodoro':0.1, 'short_break':0.1, 'long_break':0.15};
  }
}
