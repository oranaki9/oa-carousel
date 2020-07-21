import { Subscription } from 'rxjs';
import { useAnimation } from '@angular/animations';
export const INITIAL_CAROUSEL_INDEX: number = 0;
export const INITIAL_CAROUSEL_INTERVAL: number = 4000;


export interface CarouselTemplateContext {
    $implicit: any;
}
export function unsubscribe(sub: Subscription) {
    if (sub) {
        sub.unsubscribe();
    }
}
