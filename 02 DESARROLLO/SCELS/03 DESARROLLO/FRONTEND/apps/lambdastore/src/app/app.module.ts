import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '@frontend/users';

import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import {AccordionModule} from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component'; 
import { ProductsModule } from '@frontend/products';
import { UiModule } from '@frontend/ui';

import { OrdersModule } from '../../../../libs/orders/src/lib/orders.module';
import { MessagesComponent } from './shared/messages/messages.component';
import { MessageService } from 'primeng/api';
import { UsersModule } from '../../../../libs/users/src/lib/users.module';
import { ToastModule } from 'primeng/toast';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


const routes: Routes = [
  { path: '', component: HomePageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    MessagesComponent,
  ],
  imports: [BrowserModule,BrowserAnimationsModule ,RouterModule.forRoot(routes),
            HttpClientModule, StoreModule.forRoot({}), EffectsModule.forRoot([]) ,AccordionModule, ProductsModule, 
            UiModule, OrdersModule,ToastModule ,UsersModule],
  providers: [MessageService, {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
