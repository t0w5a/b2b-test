import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {CONFIG} from '../config/config';
import {Settings} from '../types/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private settingsState: Settings = {
    timer: CONFIG.timer,
    arraySize: CONFIG.arraySize,
    additionalIds: CONFIG.additionalIds,
  };
  private readonly settingsSubject: BehaviorSubject<Settings> = new BehaviorSubject<Settings>(this.settingsState);

  constructor() { }

  setSettings(settings: Partial<Settings>): void {
    this.settingsState = {...this.settingsState, ...settings};
    this.settingsSubject.next(this.settingsState);
  }

  getSettings(): Observable<Settings> {
    return this.settingsSubject.asObservable();
  }

  getCurrentState(): Settings {
    return this.settingsState;
  }
}
