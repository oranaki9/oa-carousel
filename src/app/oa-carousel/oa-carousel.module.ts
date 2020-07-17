import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CarouselComponent } from './components/carousel/carousel.component';
import { CommonModule } from '@angular/common';
import { NavigationDirective } from './directives/navigation.directive';
import { NavTemplatesComponent } from './components/nav-templates/nav-templates.component';

@NgModule({
  declarations: [
    CarouselComponent,
    NavigationDirective,
    NavTemplatesComponent 
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
