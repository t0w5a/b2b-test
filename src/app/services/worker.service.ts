import {Injectable} from '@angular/core';
import {SettingsService} from './settings.service';
import {TransactionsService} from './transactions.service';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(private readonly settingsService: SettingsService,
              private readonly transactionsService: TransactionsService) {
  }

  initTransactionWebWorker(): Worker | undefined {
    if (typeof Worker !== 'undefined') {
      const transactionWorker = new Worker(new URL('../modules/web-worker/transactions.worker', import.meta.url));
      transactionWorker.onmessage = ({data}) => {
        this.transactionsService.setTransactions(data.slice(0, 10));
      };

      // init worker settings
      const workerSettings = this.settingsService.getCurrentState();
      transactionWorker.postMessage(workerSettings);

      return transactionWorker;
    } else {
      console.error('Web workers are not supported in this environment.')
    }

    return undefined;
  }
}
