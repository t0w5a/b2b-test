import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TransactionChild} from '../../types/transaction';

@Component({
  selector: 'app-transactions-child',
  templateUrl: './transactions-child.component.html',
  styleUrls: ['./transactions-child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsChildComponent {
 @Input() child: TransactionChild | undefined;
}
