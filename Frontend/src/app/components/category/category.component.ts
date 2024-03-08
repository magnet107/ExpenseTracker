import { Component, OnInit } from '@angular/core';
import { ExpenseCategory } from '../../models/expense-category.model';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
    selector: 'app-category',
    standalone: true,
    templateUrl: './category.component.html',
    styleUrl: './category.component.scss',
    imports: [FormsModule, CommonModule, MatCardModule, MatButtonModule, MatFormFieldModule,
        MatInputModule, RouterLink, NavbarComponent]
})
export class CategoryComponent implements OnInit{

  categories:string[]=["Name","Actions"];

  newCategoryName:ExpenseCategory={
    cid:0,
    name:""
  }

  expenseCategories: ExpenseCategory[]=[{
    cid:0,
    name:""
  }];

  constructor(private expenseCategoryService: CategoryService,private router: Router) { }

  ngOnInit(): void {
    this.loadExpenseCategories();
  }

  loadExpenseCategories() {
    this.expenseCategoryService.getAllCategories().subscribe(
      (data: ExpenseCategory[]) => {
        this.expenseCategories = data;
      },
      (error) => {
        console.error('Error fetching expense categories: ', error);
      }
    );
  }

  addCategory(categoryName: string) {
    const newCategory: ExpenseCategory = { cid: 0, name: categoryName };
    this.expenseCategoryService.addCategory(newCategory).subscribe(
      (data: ExpenseCategory) => {
        this.expenseCategories.push(data);
      },
      (error) => {
        console.error('Error adding expense category: ', error);
      }
    );
  }

  deleteCategory(id: number) {
    this.expenseCategoryService.deleteCategory(id).subscribe(
      () => {
        this.expenseCategories = this.expenseCategories.filter(category => category.cid !== id);
      },
      (error) => {
        console.error('Error deleting expense category: ', error);
      }
    );
  }

  updateCategory(id: number, updatedCategoryName: string) {
    const updatedCategory: ExpenseCategory = { cid: id, name: updatedCategoryName };
    this.expenseCategoryService.updateCategory(id, updatedCategory).subscribe(
      (data: ExpenseCategory) => {
        const index = this.expenseCategories.findIndex(category => category.cid === id);
        if (index !== -1) {
          this.expenseCategories[index] = data;
        }
      },
      (error) => {
        console.error('Error updating expense category: ', error);
      }
    );
    this.router.navigate(['/update-category', id]);
  }


}
