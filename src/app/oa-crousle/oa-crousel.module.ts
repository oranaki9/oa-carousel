import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CrouselComponent } from './components/crousel/crousel.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    CrouselComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  ],
  exports: [CrouselComponent],
  providers: []
})
export class OaCrousleModule { }
