import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsChildComponent } from './transactions-child.component';

describe('TransactionsChildComponent', () => {
  let component: TransactionsChildComponent;
  let fixture: ComponentFixture<TransactionsChildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionsChildComponent]
    });
    fixture = TestBed.createComponent(TransactionsChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
