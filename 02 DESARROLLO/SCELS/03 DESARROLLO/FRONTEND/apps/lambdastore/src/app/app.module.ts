import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import {AccordionModule} from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component'; 
import { ProductsModule } from '@frontend/products';
import { UiModule } from '@frontend/ui';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'products', component: ProductListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductListComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
  ],
  imports: [BrowserModule,BrowserAnimationsModule ,RouterModule.forRoot(routes), AccordionModule, ProductsModule, UiModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
