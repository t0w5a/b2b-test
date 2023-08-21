export interface Transaction {
  id: string;
  int: number;
  float: number;
  color: string;
  child: TransactionChild;
}


export interface TransactionChild {
  id: string;
  color: string;
}
