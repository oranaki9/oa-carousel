import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2,
  TemplateRef,
  Output,
  EventEmitter,
  ViewContainerRef,
  ComponentFactory,
  ComponentRef,
  ComponentFactoryResolver,
  Injector,
  ChangeDetectorRef,
} from "@angular/core";
import { interval, Subscription } from "rxjs";
import { CarouselTemplatesComponent } from "../carousel-templates/carousel-templates.component";
import {
  INITIAL_CAROUSEL_INDEX,
  INITIAL_CAROUSEL_INTERVAL,
  CarouselTemplateContext,
  unsubscribe,
  INITIAL_CAROUSEL_HEIGHT,
  INITIAL_CAROUSEL_WIDTH,
  CarouselIndicatorsTemplateContext,
} from "./../../utils/utils";
export interface IndicatorseTepmlentContext {
  array: number[];
  index: number;
  setIndex: (index: number) => void;
}
@Component({
  selector: "oa-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.less"],
})
export class CarouselComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() onNextClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output() onPrevClicked: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild("carouselContainer", { static: true })
  carouselContainer: ElementRef;
  @ViewChild("carouselItem", { static: true }) carouselItem: ElementRef;

  @Input() height: string = INITIAL_CAROUSEL_HEIGHT;
  @Input() width: string = INITIAL_CAROUSEL_WIDTH;
  @Input() items: any[];
  @Input() interval: number;
  @Input() autoPlay: boolean;
  @Input() containerStyles: string[];
  @Input() itemStyles: string[];
  @Input() sliders: boolean = true;
  @Input() itemIndicators: boolean = true;
  @Input() set startAt(index: number) {
    this.index = index < 0 ? this.items.length + index : index;
  }

  @Input() customCarouselTemplate: TemplateRef<CarouselTemplateContext>;
  @Input() customCarouselNavTemplate: TemplateRef<CarouselTemplateContext>;
  @Input() customCarouselIndicatorsTemplate: TemplateRef<IndicatorseTepmlentContext>;

  public carouselSliders: Array<number>;

  private _index = INITIAL_CAROUSEL_INDEX;
  private intervalSub: Subscription = new Subscription();
  private carouselTemplateFactory: ComponentFactory<CarouselTemplatesComponent>;
  private carouselTemplatesInstance: ComponentRef<CarouselTemplatesComponent>;

  public defaultCarousel: TemplateRef<CarouselTemplateContext>;
  public defaultCarouselNav: TemplateRef<CarouselTemplateContext>;
  public defaultIndicatorsNav: TemplateRef<IndicatorseTepmlentContext>;
  public navigationContext: CarouselTemplateContext;
  public navigationIndicatorsContext: CarouselIndicatorsTemplateContext;
  constructor(
    private renderer: Renderer2,
    private cfr: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  ngOnInit() {
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }

  ngAfterViewInit(): void {
    this.carouselTemplateFactory = this.cfr.resolveComponentFactory<
      CarouselTemplatesComponent
    >(CarouselTemplatesComponent);
    this.carouselTemplatesInstance = this.carouselTemplateFactory.create(
      this.injector
    );
    this.getAllDefaultsTemplates();
    this.initialCarouselItemsContext();
    this.setContainerCustomeStyles();
    this.setItemCustomeStyles();
  }

  ngOnDestroy() {
    unsubscribe(this.intervalSub);
  }

  private startAutoPlay(): void {
    this.intervalSub = interval(
      this.interval ? this.interval : INITIAL_CAROUSEL_INTERVAL
    ).subscribe((interval: number) => this.next());
  }
  public prev(): void {
    this.index--;
    if (this.index < 0) {
      this.index = this.items.length - 1;
    }
    this.onPrevClicked.emit(this.index);
  }
  public next(): void {
    this.index++;
    if (this.index === this.items.length) {
      this.index = INITIAL_CAROUSEL_INDEX;
    }
    this.onNextClicked.emit(this.index);
  }

  private getAllDefaultsTemplates(): void {
    this.defaultCarousel = this.carouselTemplatesInstance.instance.defaultCarouselItem;
    this.defaultCarouselNav = this.carouselTemplatesInstance.instance.defaultCarouselNav;
    this.defaultIndicatorsNav = this.carouselTemplatesInstance.instance.carouselDefaultIndicators;
  }
  private initialCarouselItemsContext(): void {
    this.navigationContext = {
      $implicit: { next: () => this.next(), prev: () => this.prev() },
    };
    this.navigationIndicatorsContext = {
      array: new Array(this.items.length),
      index: this.index,
      setIndex: (i: number) => {
        this.setIndex(i);
      },
    };
  }

  setIndex(index: number): void {
    this.index = index;
  }
  set index(idx: number) {
    if (this.navigationIndicatorsContext) {
      this.navigationIndicatorsContext.index = idx;
    }
    this._index = idx;
  }
  get index() {
    return this._index;
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
    classes.forEach((className) => {
      this.renderer.addClass(el.nativeElement, className);
    });
  }
}
