import { INITIAL_CAROUSEL_INDEX, INITIAL_CAROUSEL_INTERVAL, CarouselTemplateContext, unsubscribe } from './../../utils/utils';
import {
  Component, OnInit, Input, OnDestroy, AfterViewInit, ViewChild,
  ElementRef, Renderer2, ContentChild, TemplateRef, Output, EventEmitter
} from '@angular/core';
import { interval, Subscription } from 'rxjs';

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
  @Input() items: any[];
  @Input() interval: number;
  @Input() autoPlay: boolean;
  @Input() containerStyles: string[];
  @Input() itemStyles: string[];
  @Input() set startAt(index: number) { this.index = index < 0 ? this.items.length + index : index; }
  @Input() set sliders(isSlidesOn: boolean) { this._sliders = isSlidesOn; }
  @ContentChild(TemplateRef) customeCarouselTemplate: TemplateRef<CarouselTemplateContext>;
  carouselSliders: Array<number>;
  index: number = INITIAL_CAROUSEL_INDEX;
  private _sliders: boolean = true;
  private intervalSub: Subscription = new Subscription();

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.carouselSliders = new Array(this.items.length);
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }

  ngAfterViewInit(): void {

    // Add your own custom class to the carousel wrapper.
    if (this.containerStyles) {
      this.addClassToElement(this.containerStyles, this.carouselContainer);
    }
    if (this.itemStyles) {
    // Add your own custom class to the carousel item.
      this.addClassToElement(this.itemStyles, this.carouselItem);
    }

  }

  ngOnDestroy() {
    unsubscribe(this.intervalSub);
  }

  private startAutoPlay(): void {
    this.intervalSub = interval(this.interval ? this.interval : INITIAL_CAROUSEL_INTERVAL)
      .subscribe((interval: number) => this.next());

  }

  next(): void {
    this.index++;
    if (this.index === this.items.length) {
      this.index = INITIAL_CAROUSEL_INDEX;
    }
    this.onNextClicked.emit(this.index);

  }

  prev(): void {
    this.index--;
    if (this.index < 0) {
      this.index = this.items.length - 1;
    }
    this.onPrevClicked.emit(this.index);
  }

  private addClassToElement(classes: string[], el: ElementRef) {
    classes.forEach(className => {
      this.renderer.addClass(el.nativeElement, className);
    });
  }
  get slides(): boolean {
    return this._sliders;
  }
}
