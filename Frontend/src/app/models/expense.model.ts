export interface Expense {
    id: number;
    name: string;
    amount: number;
    date: Date;
    category:{
      cid: number;
      name: string;
    }
  }
  