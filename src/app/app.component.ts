import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {SettingsService} from './services/settings.service';
import {WorkerService} from './services/worker.service';
import {Settings} from './types/settings';
import {WorkerSettings} from './types/worker-settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  private transactionWorker: Worker | undefined;
  private settingsSubscription: Subscription | undefined;

  constructor(private readonly settingsService: SettingsService,
              private readonly workerService: WorkerService) {
  }

  ngOnInit(): void {
    this.initWebWorker();
    this.listenSettingsChanges();
  }

  ngOnDestroy(): void {
    this.destroyWebWorker();
    this.removeSettingsListener();
  }

  private initWebWorker(): void {
    this.transactionWorker = this.workerService.initTransactionWebWorker()
  }

  private destroyWebWorker(): void {
    if (this.transactionWorker) {
      this.transactionWorker.terminate();
    }
  }

  private listenSettingsChanges(): void {
    this.settingsSubscription = this.settingsService.getSettings().subscribe((settings: Settings) => {
      this.setWorkerSettings({
        timer: settings.timer,
        arraySize: settings.arraySize,
      });
    });
  }

  private removeSettingsListener(): void {
    if (this.settingsSubscription) {
      this.settingsSubscription.unsubscribe();
    }
  }

  private setWorkerSettings(settings: WorkerSettings): void {
    if (this.transactionWorker) {
      this.transactionWorker.postMessage(settings);
    }
  }
}
