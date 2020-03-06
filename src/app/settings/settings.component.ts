/**
 * Settings component implements the initial
 * session durations that the user configures 
 * before he begins the pomodoro timer.
 */

import { Component, OnInit } from '@angular/core';
import { SessionSettingsService } from '../session-settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
  	public sessionSettings: SessionSettingsService
  ) { }

  ngOnInit(): void {
  }
}
