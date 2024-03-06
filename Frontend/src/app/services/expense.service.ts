import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private baseUrl = 'http://localhost:8080/api/expenses';

  constructor(private http: HttpClient) { }

  getAllExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.baseUrl}/`);
  }

  saveExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${this.baseUrl}/`, expense);
  }

  deleteExpense(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getTotalAmount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/totalAmount`);
  }

  getExpensesByYearMonthAndType(year: number, month: number, expenseType: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.baseUrl}/filter/year/${year}/month/${month}/type/${expenseType}`);
  }

  getExpensesByYearMonth(year: number, month: number): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.baseUrl}/filter/year/${year}/month/${month}`);
  }

  getExpensesByType(expenseType: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.baseUrl}/filter/type/${expenseType}`);
  }
}