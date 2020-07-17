import { OaCrousleModule } from './oa-crousle/oa-crousel.module';
import { CrouselComponent } from './oa-crousle/components/crousel/crousel.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    OaCrousleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
