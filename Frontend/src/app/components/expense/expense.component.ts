import {  Component, OnInit } from '@angular/core';
import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CategoryService } from '../../services/category.service';
import { ExpenseCategory } from '../../models/expense-category.model';
import {MatSelectModule} from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
    selector: 'app-expense',
    standalone: true,
    templateUrl: './expense.component.html',
    styleUrl: './expense.component.scss',
    imports: [CommonModule, FormsModule, HttpClientModule, MatCardModule, MatButtonModule,
        MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
        MatSelectModule, RouterLink, NavbarComponent]
})
export class ExpenseComponent implements OnInit {

  displayedColumns: string[] = ['name', 'category', 'amount', 'date','Action'];



  categories:ExpenseCategory[]=[
    {
      cid: 0,
      name: ""
    }
  ]

  expenses: Expense[]=[{
    id:1,
    name: '',
    amount: 0,
    date: new Date(),
    category:{
      cid: 0,
      name: ''
    }
  }];
  newExpense: Expense = {
    id: 1,
    name: '',
    amount: 0,
    date: new Date(),
    category: {
      cid: 0,
      name: ''
    }
  };
  totalAmount: number=0;
  categoryId: number = 1;
  expenseId:number=1;


  constructor(private expenseService: ExpenseService,private categoryService:CategoryService,private router:Router) { }

  ngOnInit(): void {
    this.loadExpenses();
    this.getTotalAmount();
   this.categoryService.getAllCategories().subscribe((data:any)=>{
        this.categories=data;
    },
    (error)=>{
      console.log(error);
    }
    )
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
        amount: 0,
    date: new Date(),
    category:{
      cid: 0,
      name: ''
    }
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

  getExpensesByCategory(categoryId: number): void {
    this.expenseService.getExpensesByCategory(categoryId)
      .subscribe(data => {
        this.expenses = data;
      });
  }

  updateExpense(id: number, updatedExpense: Expense): void {
    this.expenseService.updateExpense(id, updatedExpense).subscribe(
      (data: Expense) => {
        const index = this.expenses.findIndex(expense => expense.id === id);
        if (index !== -1) {
          this.expenses[index] = data;
        }
        this.router.navigate(['/update-expense',id]); 
      },
      (error) => {
        console.error('Error updating expense: ', error);
      }
    );
  }
  
}