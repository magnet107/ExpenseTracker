import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ExpenseCategory } from '../../models/expense-category.model';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";



@Component({
    selector: 'app-update-category',
    standalone: true,
    templateUrl: './update-category.component.html',
    styleUrl: './update-category.component.scss',
    imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule,
        MatDatepickerModule, MatNativeDateModule, RouterLink, NavbarComponent]
})
export class UpdateCategoryComponent implements OnInit {

  categoryId: number=0;

  categories: ExpenseCategory[] =[ {
    cid: 0,
    name: ''
  }];

  category:ExpenseCategory={
    cid:0,
    name:''
  }

  constructor(private route: ActivatedRoute, private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.params['cid'];
    this.loadCategory();
  }

  loadCategory(): void {
    this.categoryService.getAllCategories().subscribe(
      (data: ExpenseCategory[]) => {
        this.categories = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateCategory(): void {
    this.categoryService.updateCategory(this.categoryId, this.category).subscribe(
      (data: ExpenseCategory) => {
        console.log('Category updated successfully: ', data);
        this.router.navigate(['/category']);
      },
      (error) => {
        console.error('Error updating category: ', error);
      }
    );
  }

}