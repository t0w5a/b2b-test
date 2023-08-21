import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {SettingsService} from '../../services/settings.service';
import {Settings} from '../../types/settings';

@Component({
  selector: 'app-settings-controls',
  templateUrl: './settings-controls.component.html',
  styleUrls: ['./settings-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsControlsComponent implements OnInit, OnDestroy {
  timerInput: number | undefined;
  arraySizeInput: number | undefined;
  additionalIdsInput: string | undefined;

  private settingsSubscription: Subscription | undefined;

  constructor(private readonly settingsService: SettingsService) { }

  ngOnInit(): void {
    this.listenSettingsChanges();
  }

  ngOnDestroy(): void {
    this.removeSettingsListener();
  }

  updateTimer() {
    this.settingsService.setSettings({ timer: this.timerInput })
  }

  updateArraySize() {
    this.settingsService.setSettings({ arraySize: this.arraySizeInput })
  }

  updateAdditionalIds() {
    this.settingsService.setSettings({ additionalIds: this.additionalIdsInput })
  }

  private listenSettingsChanges(): void {
    this.settingsSubscription = this.settingsService.getSettings().subscribe((settings: Settings) => {
      this.timerInput = settings.timer;
      this.arraySizeInput = settings.arraySize;
      this.additionalIdsInput = settings.additionalIds;
    });
  }

  private removeSettingsListener(): void {
    if (this.settingsSubscription) {
      this.settingsSubscription.unsubscribe();
    }
  }
}
