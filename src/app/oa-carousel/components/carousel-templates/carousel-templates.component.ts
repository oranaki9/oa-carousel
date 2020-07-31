import { IndicatorseTepmlentContext } from './../carousel/carousel.component';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
interface CarouselContext {
  $implicit: string;
}
@Component({
  templateUrl: './carousel-templates.component.html',
  styleUrls: ['./carousel-templates.component.less']
})
export class CarouselTemplatesComponent implements OnInit {
  @ViewChild('defaultCarouselNav', { static: true }) defaultCarouselNav: TemplateRef<CarouselContext>;
  @ViewChild('wordsNavigation', { static: true }) wordsNavigation: TemplateRef<CarouselContext>;
  @ViewChild('defaultCarouselItem', { static: true }) defaultCarouselItem: TemplateRef<CarouselContext>;
  @ViewChild('carouselDefaultIndicators', { static: true }) carouselDefaultIndicators: TemplateRef<IndicatorseTepmlentContext>;

  constructor() { }

  ngOnInit() {
  }

}
