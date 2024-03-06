import { Component, OnInit } from '@angular/core';
import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule,MatCardModule,MatButtonModule,MatFormFieldModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent implements OnInit {
  expenses: Expense[]=[{
    id:1,
    name: '',
    expenseType: '',
    amount: 0,
    date: new Date(),
    creationDate: new Date()
  }];
  newExpense: Expense = {
    id:1,
    name: '',
    expenseType: '',
    amount: 0,
    date: new Date(),
    creationDate: new Date()
  };
  totalAmount: number=0;

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.loadExpenses();
    this.getTotalAmount();
  }

  loadExpenses(): void {
    this.expenseService.getAllExpenses().subscribe(expenses => {
      this.expenses = expenses;
    });
  }

  addExpense(): void {
    this.expenseService.saveExpense(this.newExpense).subscribe(() => {
      this.loadExpenses();
      this.getTotalAmount();
      this.newExpense = {
        id:1,
        name: '',
        expenseType: '',
        amount: 0,
    date: new Date(),
    creationDate: new Date()
      };
    });
  }

  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id).subscribe(() => {
      this.loadExpenses();
      this.getTotalAmount();
    });
  }

  getTotalAmount(): void {
    this.expenseService.getTotalAmount().subscribe(total => {
      this.totalAmount = total;
    });
  }
  filterExpensesByYearMonthAndType(year: number, month: number, expenseType: string): void {
    this.expenseService.getExpensesByYearMonthAndType(year, month, expenseType).subscribe(expenses => {
      this.expenses = expenses;
    });
  }

  filterExpensesByYearMonth(year: number, month: number): void {
    this.expenseService.getExpensesByYearMonth(year, month).subscribe(expenses => {
      this.expenses = expenses;
    });
  }

  filterExpensesByType(expenseType: string): void {
    this.expenseService.getExpensesByType(expenseType).subscribe(expenses => {
      this.expenses = expenses;
    });
  }
}