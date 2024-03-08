import { Component, OnInit } from '@angular/core';
import { Expense } from '../../models/expense.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { CategoryService } from '../../services/category.service';
import { ExpenseCategory } from '../../models/expense-category.model';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";



@Component({
    selector: 'app-update-expense',
    standalone: true,
    templateUrl: './update-expense.component.html',
    styleUrl: './update-expense.component.scss',
    imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule,
        CommonModule, FormsModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule,
        RouterLink, NavbarComponent]
})
export class UpdateExpenseComponent implements OnInit {

  expenseId: number=0;
  expense: Expense={
    id:1,
    name: '',
    amount: 0,
    date: new Date(),
    category:{
      cid: 0,
      name: ''
    }
  };

  categories:ExpenseCategory[]=[
{
  cid:0,
  name:""
}
  ]

  categoryId: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private expenseService: ExpenseService,
    private categoryService:CategoryService
  ) { }

  ngOnInit(): void {
    this.expenseId = this.route.snapshot.params['id'];
    this.getExpenseDetails(this.expenseId);
    this.getCategories();
  }


  getCategories(){
    this.categoryService.getAllCategories().subscribe((data)=>{
      this.categories=data;
    },
    (error)=>{
      console.log(error);
    }
    )
  }

  getExpenseDetails(id: number): void {
    this.expenseService.getExpense(id).subscribe(
      (expense: Expense) => {
        this.expense = expense;
      },
      (error) => {
        console.error('Error fetching expense details: ', error);
      }
    );
  }

  updateExpense(): void {
    this.expenseService.updateExpense(this.expenseId, this.expense).subscribe(
      (updatedExpense: Expense) => {
        console.log('Expense updated successfully: ', updatedExpense);
        this.router.navigate(['/expense']);
      },
      (error) => {
        console.error('Error updating expense: ', error);
      }
    );
  }

}
