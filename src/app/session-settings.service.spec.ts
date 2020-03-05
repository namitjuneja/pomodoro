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
});
