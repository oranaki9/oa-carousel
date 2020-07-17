import { Directive, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[oaCarousel]'
})

export class CarouselDirective implements OnInit {
  @Input('oaCarouselOf') items: string[];
  constructor() { }
  ngOnInit(): void {
    console.log(this.items);
  }
}
