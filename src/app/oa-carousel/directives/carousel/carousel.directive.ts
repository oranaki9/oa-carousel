import { CarouselTemplatesComponent } from './../../components/carousel-templates/carousel-templates.component';
import {
  Directive, Input, ViewContainerRef, ComponentFactoryResolver,
  Injector, ComponentFactory, ComponentRef, TemplateRef, OnChanges
} from '@angular/core';
import { CarouselTemplateContext } from '../../utils/utils';

@Directive({
  selector: '[oaCarousel]'
})

export class CarouselDirective implements OnChanges {
  @Input('oaCarouselOf') items: any;
  @Input('oaCarouselTmpl') set customeTemplate(customTmpl: TemplateRef<CarouselTemplateContext>) {
    console.log(customTmpl);
    this.carouselTemplate = customTmpl;
  }
  @Input('oaCarouselIndex') set index(idx: number) {
    this._currentIndex = idx;
  }
  private carouselTemplateFactory: ComponentFactory<CarouselTemplatesComponent>;
  private defaultCarouselComp: ComponentRef<CarouselTemplatesComponent>;
  private carouselTemplate: TemplateRef<CarouselTemplateContext>;
  private _currentIndex: number;

  constructor(
    private viewContainer: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
  ) {
    this.carouselTemplateFactory = this.cfr.resolveComponentFactory<CarouselTemplatesComponent>(CarouselTemplatesComponent);
    this.defaultCarouselComp = this.carouselTemplateFactory.create(this.injector);
  }

  ngOnChanges(): void {
    this.viewContainer.clear();
    this.createView(this.carouselTemplate ||
      this.defaultCarouselComp.instance.carouselItem,
      { $implicit: this.items[this.currentIndex] });
  }


  private createView(template: TemplateRef<CarouselTemplateContext>, context: CarouselTemplateContext): void {
    this.viewContainer.createEmbeddedView(template, context);
  }
  get currentIndex(): number {
    return this._currentIndex;
  }
}
