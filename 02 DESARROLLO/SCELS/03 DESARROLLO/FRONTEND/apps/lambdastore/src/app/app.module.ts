import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import { HttpClientModule } from '@angular/common/http';
import { OrdersModule } from '../../../../libs/orders/src/lib/orders.module';
import { MessagesComponent } from './shared/messages/messages.component';
import { MessageService } from 'primeng/api';

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
            HttpClientModule, AccordionModule, ProductsModule, 
            UiModule, OrdersModule],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
