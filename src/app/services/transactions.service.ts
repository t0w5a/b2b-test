import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Transaction} from '../types/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private transactionsState: Transaction[] = [];
  private readonly transactionsSubject: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>(this.transactionsState);
  constructor() { }

  setTransactions(transactions: Transaction[]): void {
    this.transactionsState = transactions;
    this.transactionsSubject.next(this.transactionsState);
  }

  getTransactions(): Observable<Transaction[]> {
    return this.transactionsSubject.asObservable();
  }
}
