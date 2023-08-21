import {TestBed} from '@angular/core/testing';
import {Transaction} from '../types/transaction';

import {TransactionsService} from './transactions.service';

describe('TransactionsService', () => {
  let service: TransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionsService);
  });

  it('should set and get transactions', (done) => {
    const transactions: Transaction[] = [{
      id: '1',
      int: 2,
      float: 3.4,
      color: '#FF0000',
      child: {
        id: '1',
        color: '#00FF00'
      }
    }];
    service.setTransactions(transactions);

    service.getTransactions().subscribe((transactions) => {
      expect(transactions).toEqual(transactions);
      done();
    });
  });
});
