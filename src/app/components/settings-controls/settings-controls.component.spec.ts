import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {of} from 'rxjs';
import {SettingsService} from '../../services/settings.service';

import { SettingsControlsComponent } from './settings-controls.component';

describe('SettingsControlsComponent', () => {
  let component: SettingsControlsComponent;
  let fixture: ComponentFixture<SettingsControlsComponent>;
  let settingsService: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsControlsComponent],
      imports: [FormsModule]
    });
    fixture = TestBed.createComponent(SettingsControlsComponent);
    component = fixture.componentInstance;
    settingsService = TestBed.inject(SettingsService);
  });

  it('should initialise input values', () => {
    spyOn(settingsService, 'getSettings').and.returnValue(of({
      timer: 1,
      arraySize: 1,
      additionalIds: '1, 2, 3',
    }));
    fixture.detectChanges();

    expect(settingsService.getSettings).toHaveBeenCalled();
    expect(component.timerInput).toEqual(1);
    expect(component.arraySizeInput).toEqual(1);
    expect(component.additionalIdsInput).toEqual( '1, 2, 3');
  });

  it('should update timer value', () => {
    spyOn(settingsService, 'setSettings').and.returnValue();
    spyOn(settingsService, 'getSettings').and.returnValue(of({
      timer: 1,
      arraySize: 1,
      additionalIds: '1, 2, 3',
    }));
    fixture.detectChanges();

    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('#timer');
    inputElement.dispatchEvent(new Event('blur'));
    expect(settingsService.setSettings).toHaveBeenCalledWith({ timer: 1 });
  });

  it('should update aray size value', () => {
    spyOn(settingsService, 'setSettings').and.returnValue();
    spyOn(settingsService, 'getSettings').and.returnValue(of({
      timer: 1,
      arraySize: 1,
      additionalIds: '1, 2, 3',
    }));
    fixture.detectChanges();

    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('#arraySize');
    inputElement.dispatchEvent(new Event('blur'));
    expect(settingsService.setSettings).toHaveBeenCalledWith({ arraySize: 1 });
  });

  it('should update additional ids value', () => {
    spyOn(settingsService, 'setSettings').and.returnValue();
    spyOn(settingsService, 'getSettings').and.returnValue(of({
      timer: 1,
      arraySize: 1,
      additionalIds: '1, 2, 3',
    }));
    fixture.detectChanges();

    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('#additionalIds');
    inputElement.dispatchEvent(new Event('blur'));
    expect(settingsService.setSettings).toHaveBeenCalledWith({ additionalIds: '1, 2, 3' });
  });
});
