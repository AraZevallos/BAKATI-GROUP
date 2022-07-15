import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';

import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import {TableModule} from 'primeng/table';
import { CategoriesService } from '../../../../libs/products/src/lib/services/categories.service';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ColorPickerModule} from 'primeng/colorpicker';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DropdownModule} from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import { TagModule } from 'primeng/tag';
import {FieldsetModule} from 'primeng/fieldset';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import {InputMaskModule} from 'primeng/inputmask';
  const routes: Routes = [
    {
      path:'',
      component: ShellComponent,
      children: [
        {
          path:'dashboard',
          component: DashboardComponent
        },
        {
          path:'categories',
          component: CategoriesListComponent
        },
        {
          path:'categories/form',
          component: CategoriesFormComponent
        },
        {
          path:'categories/form/:id',
          component: CategoriesFormComponent
        },
        {
          path:'products',
          component: ProductsListComponent
        },
        {
          path:'products/form',
          component: ProductsFormComponent
        },
        {
          path:'products/form/:id',
          component: ProductsFormComponent
        },
        {
          path:'users',
          component: UsersListComponent
        },
        {
          path:'users/form',
          component: UsersFormComponent
        },
        {
          path:'users/form/:id',
          component: UsersFormComponent
        },
        {
          path:'orders',
          component: OrdersListComponent
        },
        {
          path:'orders/:id',
          component: OrdersDetailComponent
        }
      ]
    }
  ];

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, DashboardComponent, ShellComponent, SidebarComponent, CategoriesListComponent , CategoriesFormComponent, ProductsListComponent, ProductsFormComponent, OrdersListComponent, OrdersDetailComponent, UsersListComponent, UsersFormComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    CardModule, ToolbarModule, ButtonModule, TableModule, InputTextModule, ToastModule,
    ConfirmDialogModule, ColorPickerModule, InputNumberModule,
    InputTextareaModule,InputSwitchModule, DropdownModule,EditorModule, TagModule,
    FieldsetModule,InputMaskModule],
  providers: [CategoriesService, MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
