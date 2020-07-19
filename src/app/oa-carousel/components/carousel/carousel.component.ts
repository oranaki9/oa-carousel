import { INITIAL_CAROUSEL_INDEX } from './../../utils/utils';
import { INITIAL_CAROUSEL_INTERVAL } from '../../utils/utils';
import { Component, OnInit, Input, OnDestroy, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'oa-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less']
})
export class CarouselComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('carouselContainer', { static: true }) carouselContainer: ElementRef;
  @ViewChild('carouselItem', { static: true }) carouselItem: ElementRef;
  @Input() images: string[];
  @Input() interval: number;
  @Input() autoPlay: boolean;
  @Input() containerStyles: string[];
  @Input() itemStyles: string[];
  @Input() set startAt(index: number) { this.index = index < 0 ? this.images.length + index : index; }
  @Input() set slides(isSlidesOn: boolean) { this._slides = isSlidesOn; }
  carouselSliders: Array<number>;
  index: number = INITIAL_CAROUSEL_INDEX;
  _slides: boolean = true;
  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.carouselSliders = new Array(this.images.length);
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
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  private startAutoPlay(): void {
    interval(this.interval ? this.interval : INITIAL_CAROUSEL_INTERVAL)
      .pipe(takeUntil(this.destroy))
      .subscribe((interval: number) => this.next());
  }

  next(): void {
    this.index++;
    if (this.index === this.images.length) {
      this.index = INITIAL_CAROUSEL_INDEX;
    }

  }

  prev(): void {
    this.index--;
    if (this.index < 0) {
      this.index = this.images.length - 1;
    }

  }

  private addClassToElement(classes: string[], el: ElementRef) {
    classes.forEach(className => {
      this.renderer.addClass(el.nativeElement, className);
    });
  }

}
