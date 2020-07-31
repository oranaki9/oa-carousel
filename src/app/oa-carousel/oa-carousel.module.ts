import { CarouselTemplatesComponent } from './components/carousel-templates/carousel-templates.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CarouselComponent } from './components/carousel/carousel.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CarouselComponent,
    CarouselTemplatesComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  exports: [CarouselComponent],
  providers: [],
})
export class OaCarouselModule { }
