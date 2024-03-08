import { Routes } from '@angular/router';
import { ExpenseComponent } from './components/expense/expense.component';
import { CategoryComponent } from './components/category/category.component';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';
import { UpdateExpenseComponent } from './components/update-expense/update-expense.component';

export const routes: Routes = [
    {
        path:'expense',
        component:ExpenseComponent,
        pathMatch:'full'
    },
    {
        path:"category",
        component:CategoryComponent,
        pathMatch:'full'
    },
    {
        path:"update-category/:cid",
        component:UpdateCategoryComponent,
        pathMatch:'full'
    },
    {
        path:"update-expense/:id",
        component:UpdateExpenseComponent,
        pathMatch:'full'
    }
];
