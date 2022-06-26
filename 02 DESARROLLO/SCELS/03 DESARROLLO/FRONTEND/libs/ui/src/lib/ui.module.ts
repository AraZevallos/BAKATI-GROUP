import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import {ButtonModule} from 'primeng/button';

@NgModule({
  imports: [CommonModule,ButtonModule],
  declarations: [
    BannerComponent
  ],
  exports: [
    BannerComponent
  ],
})
export class UiModule {}
