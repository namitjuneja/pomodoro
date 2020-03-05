import { Component, OnInit } from '@angular/core';
import { SessionSettingsService } from '../session-settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
  	public sessionSettings : SessionSettingsService
  ) { }

  ngOnInit(): void {
  }
}
