import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OaCarouselModule } from './oa-carousel/oa-carousel.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    OaCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
