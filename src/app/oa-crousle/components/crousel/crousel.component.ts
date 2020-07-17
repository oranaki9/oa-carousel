import { INITIAL_CAROUSEL_INTERVAL } from './../../utils';
import { Component, OnInit, Input, OnDestroy, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { INITIAL_CAROUSEL_INDEX } from '../../utils';
import { interval, Subject } from 'rxjs';
import { takeWhile, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'oa-crousel',
  templateUrl: './crousel.component.html',
  styleUrls: ['./crousel.component.less']
})
export class CrouselComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('carouselContainer', { static: true }) carouselContainer: ElementRef;
  @ViewChild('carouselItem', { static: true }) carouselItem: ElementRef;
  @Input() images: string[];
  @Input() set startAt(index: number) {
    this.index = index < 0 ? this.images.length + index : index ? index : INITIAL_CAROUSEL_INDEX;
  }
  @Input() interval: number;
  @Input() autoPlay: boolean;
  @Input() containerClasses: string[];
  @Input() itemClasses: string[];
  carouselSliders: Array<number> = new Array(3);
  index: number;
  private destroy: Subject<boolean> = new Subject<boolean>();
  constructor(private renderer: Renderer2) { }
  ngAfterViewInit(): void {
    // Add your own custom class to the crousel wrapper.
    if (this.containerClasses) {
      this.containerClasses.forEach(className => {
        this.renderer.addClass(this.carouselContainer.nativeElement, className);
      });
    }
    if (this.itemClasses) {
      // Add your own custom class to the crousel item.
      this.itemClasses.forEach(className => {
        this.renderer.addClass(this.carouselItem.nativeElement, className);
      });
    }

  }
  ngOnInit() {
    interval(this.interval ? this.interval : INITIAL_CAROUSEL_INTERVAL)
      .pipe(
        takeWhile(() => this.autoPlay),
        takeUntil(this.destroy)
      )
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
  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
