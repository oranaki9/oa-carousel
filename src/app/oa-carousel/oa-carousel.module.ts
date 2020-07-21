import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CarouselComponent } from './components/carousel/carousel.component';
import { CommonModule } from '@angular/common';
import { NavigationDirective } from './directives/navigation/navigation.directive';
import { CarouselDirective } from './directives/carousel/carousel.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { OaCustomCarouselDirective } from './directives/customCarousel/oa-custom-carousel.directive';

@NgModule({
  declarations: [
    CarouselComponent,
    NavigationDirective,
    CarouselDirective,
    OaCustomCarouselDirective,
  
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  exports: [CarouselComponent],
  providers: [],
})
export class OaCarouselModule { }
