import {
  Component, OnInit, Input, OnDestroy, AfterViewInit, ViewChild,
  ElementRef, Renderer2, TemplateRef, Output, EventEmitter, ViewContainerRef,
  ComponentFactory, ComponentRef, ComponentFactoryResolver, Injector, ChangeDetectorRef
} from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { CarouselTemplatesComponent } from '../carousel-templates/carousel-templates.component';
import {
  INITIAL_CAROUSEL_INDEX, INITIAL_CAROUSEL_INTERVAL,
  CarouselTemplateContext, unsubscribe, INITIAL_CAROUSEL_HEIGHT,
  INITIAL_CAROUSEL_WIDTH
} from './../../utils/utils';
export interface IndicatorseTepmlentContext {
  array: number[];
  index: number;
  setIndex: (index: number) => void;
}
@Component({
  selector: 'oa-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less']
})
export class CarouselComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() onNextClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output() onPrevClicked: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('carouselContainer', { static: true }) carouselContainer: ElementRef;
  @ViewChild('carouselItem', { static: true }) carouselItem: ElementRef;

  @Input() set height(h: string) {
    this._height = h;
  }
  @Input() set width(w: string) {
    this._width = w;
  }
  @Input() items: any[];
  @Input() interval: number;
  @Input() autoPlay: boolean;
  @Input() containerStyles: string[];
  @Input() itemStyles: string[];
  @Input() set startAt(index: number) { this.index = index < 0 ? this.items.length + index : index; }
  @Input() set sliders(isSlidesOn: boolean) { this._sliders = isSlidesOn; }
  @Input() customCarouselTemplate: TemplateRef<CarouselTemplateContext>;
  @Input() customCarouselNavTemplate: TemplateRef<CarouselTemplateContext>;
  @Input() customCarouselIndicatorsTemplate: TemplateRef<IndicatorseTepmlentContext>;

  public carouselSliders: Array<number>;
  public index: number = INITIAL_CAROUSEL_INDEX;

  private _sliders: boolean = true;
  private _height: string = INITIAL_CAROUSEL_HEIGHT;
  private _width: string = INITIAL_CAROUSEL_WIDTH;
  private intervalSub: Subscription = new Subscription();
  private carouselTemplateFactory: ComponentFactory<CarouselTemplatesComponent>;
  private carouselTemplatesInstance: ComponentRef<CarouselTemplatesComponent>;

  @ViewChild('itemsContainer', { static: true, read: ViewContainerRef }) itemsContainer: ViewContainerRef;

  constructor(
    private cd: ChangeDetectorRef,
    private renderer: Renderer2,
    private cfr: ComponentFactoryResolver,
    private injector: Injector) { }

  ngOnInit() {

    //this.carouselSliders = new Array(this.items.length);
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }

  ngAfterViewInit(): void {
    this.carouselTemplateFactory = this.cfr.resolveComponentFactory<CarouselTemplatesComponent>(CarouselTemplatesComponent);
    this.carouselTemplatesInstance = this.carouselTemplateFactory.create(this.injector);
    this.renderView();
    this.setContainerCustomeStyles();
    this.setItemCustomeStyles();


  }


  ngOnDestroy() {
    unsubscribe(this.intervalSub);
  }

  private startAutoPlay(): void {
    this.intervalSub = interval(this.interval ? this.interval : INITIAL_CAROUSEL_INTERVAL)
      .subscribe((interval: number) => this.next());

  }

  public next(): void {
    this.index++;
    if (this.index === this.items.length) {
      this.index = INITIAL_CAROUSEL_INDEX;
    }
    this.renderView();
    this.onNextClicked.emit(this.index);
  }

  private renderView(): void {
    const defaultCarousel: TemplateRef<CarouselTemplateContext> = this.carouselTemplatesInstance.instance.defaultCarouselItem;
    const defaultCarouselNav: TemplateRef<CarouselTemplateContext> = this.carouselTemplatesInstance.instance.defaultCarouselNav;
    const defaultIndicatorsNav: TemplateRef<IndicatorseTepmlentContext> = this.carouselTemplatesInstance.instance.carouselDefaultIndicators;

    this.itemsContainer.clear();
    // render carousel template...

    this.itemsContainer.createEmbeddedView(
      this.customCarouselTemplate || defaultCarousel,
      { $implicit: this.items[this.index] });

    // render carousel navigation template...
    this.itemsContainer.createEmbeddedView(
      this.customCarouselNavTemplate || defaultCarouselNav,
      { $implicit: { next: () => this.next(), prev: () => this.prev() } });
    // render carousel navigation template...
    this.itemsContainer.createEmbeddedView(
      this.customCarouselIndicatorsTemplate || defaultIndicatorsNav,
      {
        array: new Array(this.items.length), index: this.index, 
        setIndex: (i) => {
          this.setIndex(i);
        }
      });
  }
  setIndex(index: number): void {
    this.index = index;
    this.cd.markForCheck();
    this.renderView();

  }
  public prev(): void {
    this.index--;
    if (this.index < 0) {
      this.index = this.items.length - 1;
    }
    this.renderView();
    this.onPrevClicked.emit(this.index);
  }

  private setItemCustomeStyles(): void {
    if (this.itemStyles) {
      // Add your own custom class to the carousel item.
      this.addClassToElement(this.itemStyles, this.carouselItem);
    }
  }
  private setContainerCustomeStyles(): void {
    // Add your own custom class to the carousel wrapper.
    if (this.containerStyles) {
      this.addClassToElement(this.containerStyles, this.carouselContainer);
    }
  }
  private addClassToElement(classes: string[], el: ElementRef) {
    classes.forEach(className => {
      this.renderer.addClass(el.nativeElement, className);
    });
  }
  get slides(): boolean {
    return this._sliders;
  }
  get height(): string {
    return this._height;
  }
  get width(): string {
    return this._width;
  }
}
