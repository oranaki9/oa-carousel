import { Directive } from '@angular/core';

@Directive({
  selector: '[oaCustomCarousel]'
})
export class OaCustomCarouselDirective {
  constructor() { 
    console.log("oaCustomCarousel");
    
  }
  
}
