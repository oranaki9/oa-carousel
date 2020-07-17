import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CarouselComponent } from './components/carousel/carousel.component';
import { CommonModule } from '@angular/common';
import { NavigationDirective } from './directives/navigation/navigation.directive';
import { NavTemplatesComponent } from './components/nav-templates/nav-templates.component';
import { CarouselDirective } from './directives/carousel/carousel.directive';

@NgModule({
  declarations: [
    CarouselComponent,
    NavigationDirective,
    NavTemplatesComponent,
    CarouselDirective 
  ],
  imports: [
    CommonModule,
    BrowserModule
  ],
  exports: [CarouselComponent],
  providers: [],
  entryComponents:[NavTemplatesComponent]
})
export class OaCarouselModule { }
