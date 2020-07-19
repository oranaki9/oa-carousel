import { INITIAL_CAROUSEL_INDEX } from './../../utils/utils';
import { Directive, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[oaCarousel]'
})

export class CarouselDirective implements OnInit {
  @Input('oaCarouselOf') items: string[];

  index: number = INITIAL_CAROUSEL_INDEX;
  constructor() { }
  ngOnInit(): void {

    console.table(this.items);
    console.log(this.index);
  }
}
