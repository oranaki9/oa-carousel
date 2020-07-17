import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CarouselComponent } from './components/carousel/carousel.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    CarouselComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  ],
  exports: [CarouselComponent],
  providers: []
})
export class OaCarouselModule { }
