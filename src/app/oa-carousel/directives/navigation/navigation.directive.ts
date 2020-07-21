import { CarouselTemplatesComponent } from './../../components/carousel-templates/carousel-templates.component';
import { Directive, ViewContainerRef, Injector, ComponentFactoryResolver, Input, ComponentRef, OnInit, ComponentFactory } from '@angular/core';
import { NavigationTypes } from '../../utils/enums/carousel-navigation';

@Directive({
  selector: '[oaNavigation]'
})
export class NavigationDirective implements OnInit {
  @Input('oaNavigation') oaNavigation: NavigationTypes;


  constructor(
    private viewContainer: ViewContainerRef,
    private injector: Injector,
    private cfr: ComponentFactoryResolver,
  ) {

  }
  ngOnInit() {
    console.log(this.oaNavigation);
    const cfr: ComponentFactory<CarouselTemplatesComponent> = this.cfr.resolveComponentFactory<CarouselTemplatesComponent>(CarouselTemplatesComponent);
    const navigationCompRef = cfr.create(this.injector);
    this.renderTemplate(navigationCompRef);
  }
  next(): void {
    alert('next');
  }
  prev(): void {
    alert('prev');

  }
  private renderTemplate(templateComp: ComponentRef<CarouselTemplatesComponent>) {
    switch (this.oaNavigation) {
      case NavigationTypes.WORDS:
        this.viewContainer.createEmbeddedView(templateComp.instance.wordsNavigation,
          { $implicit: { next: () => this.next(), prev: () => this.prev() } });
        break;
      case NavigationTypes.PRIMARY_ARROWS:
        this.viewContainer.createEmbeddedView(templateComp.instance.primaryArrow,
          { $implicit: { next: () => this.next(), prev: () => this.prev() } });
        break;

    }
  }
}
