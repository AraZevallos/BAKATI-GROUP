import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const usersRoutes: Route[] = [];

const routes: Routes=[
{  path:'login',
  component: LoginComponent}
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), InputTextModule,ButtonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    LoginComponent
  ],
})
export class UsersModule {}
