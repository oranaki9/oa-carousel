import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
interface CarouselContext {
  $implicit: string;
}
@Component({
  templateUrl: './carousel-templates.component.html',
  styleUrls: ['./carousel-templates.component.less']
})
export class CarouselTemplatesComponent implements OnInit {
  @ViewChild('primaryArrowsNavigation', { static: true }) primaryArrow: TemplateRef<any>;
  @ViewChild('wordsNavigation', { static: true }) wordsNavigation: TemplateRef<any>;
  @ViewChild('carouselItem', { static: true }) carouselItem: TemplateRef<CarouselContext>;

  constructor() { }

  ngOnInit() {
  }

}
