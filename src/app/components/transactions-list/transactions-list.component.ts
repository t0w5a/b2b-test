import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {map, Observable} from 'rxjs';
import {SettingsService} from '../../services/settings.service';
import {TransactionsService} from '../../services/transactions.service';
import {Transaction} from '../../types/transaction';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsListComponent implements OnInit {
  transactions$: Observable<Transaction[]> | undefined;
  additionalIds$: Observable<number[]> | undefined;

  constructor(private readonly transactionsService: TransactionsService,
              private readonly settingsService: SettingsService) {
  }

  ngOnInit(): void {
    this.loadData();
    this.loadIds();
  }

  loadData() {
    this.transactions$ = this.transactionsService.getTransactions().pipe(map((transactions: Transaction[]) => transactions.slice(0, 10)));
  }

  loadIds() {
    this.additionalIds$ = this.settingsService.getSettings().pipe(map((settings) => {
      if (settings.additionalIds.trim() === '') {
        return [];
      }

      return settings.additionalIds.split(',').filter((id) => {
        return !(id.trim() === '' || isNaN(parseInt(id.trim(), 10)));
      }).map((id) => parseInt(id.trim(), 10));
    }));
  }

}
