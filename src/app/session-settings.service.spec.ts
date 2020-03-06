import { TestBed } from '@angular/core/testing';

import { SessionSettingsService } from './session-settings.service';

describe('SessionSettingsService', () => {
  let service: SessionSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to get all session durations', () => {
    expect(service.getSessionDuration('pomodoro')).toBeTruthy();
    expect(service.getSessionDuration('short_break')).toBeTruthy();
    expect(service.getSessionDuration('long_break')).toBeTruthy();
  });

  it('should reset to default session timings', () => {
  	service.resetSessionDurations();
   expect(service.getSessionDuration('pomodoro')).toBe(25);
   expect(service.getSessionDuration('short_break')).toBe(5);
   expect(service.getSessionDuration('long_break')).toBe(15);
  });

  it('should increment by 1', () => {
  	const currentPomodoroDuration     = service.getSessionDuration('pomodoro');
  	service.incrementDuration('pomodoro');
  	const incrementedPomodoroDuration = service.getSessionDuration('pomodoro');

  	expect(incrementedPomodoroDuration).toBe(currentPomodoroDuration + 1);
  });

  it('should decrement by 1', () => {
  	const currentPomodoroDuration = service.getSessionDuration('pomodoro');
  	service.decrementDuration('pomodoro');
  	const decrementedPomodoroDuration = service.getSessionDuration('pomodoro');

  	expect(decrementedPomodoroDuration).toBe(currentPomodoroDuration - 1);
  });
});
