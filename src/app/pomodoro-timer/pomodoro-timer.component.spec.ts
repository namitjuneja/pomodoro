import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PomodoroTimerComponent } from './pomodoro-timer.component';

describe('PomodoroTimerComponent', () => {
  let component: PomodoroTimerComponent;
  let fixture: ComponentFixture<PomodoroTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PomodoroTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PomodoroTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call startSession function when start/stop button is pressed', () => {
    fixture = TestBed.createComponent(PomodoroTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component, 'startSession');

    let button = fixture.debugElement.nativeElement.querySelector('#start-button');
    button.click();

    fixture.whenStable().then(() => {
        expect(component.startSession).toHaveBeenCalled();
    });
  });

  it('should invert running status of timer when start/stop button is pressed', () => {
    fixture = TestBed.createComponent(PomodoroTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const runningStatus = component.running;

    let button = fixture.debugElement.nativeElement.querySelector('#start-button');
    button.click();

    expect(component.running).toBe(!runningStatus );
  });

  it('should start button text as stop when timer is running or Resume when timer is not running', () => {
    fixture = TestBed.createComponent(PomodoroTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const runningStatus = component.running;

    if (runningStatus){
      expect(component.startButtonText).toBe('Stop');
    }
    else{
      expect(component.startButtonText).toBe('Resume');
    }
  });

  it('should destroy timer interval on ngDestroy', () => {
    fixture = TestBed.createComponent(PomodoroTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(window, 'clearInterval');

    component.ngOnDestroy();

    expect(clearInterval).toHaveBeenCalled(); 
  });


});
