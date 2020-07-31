import { Subscription } from 'rxjs';
export const INITIAL_CAROUSEL_INTERVAL: number = 4000;
export const INITIAL_CAROUSEL_INDEX: number = 0;
export const INITIAL_CAROUSEL_HEIGHT: string = "300px";
export const INITIAL_CAROUSEL_WIDTH: string = "600px";
export interface CarouselTemplateContext {
    index?: number;
    $implicit: any;
}
export function unsubscribe(sub: Subscription) {
if (sub) {
        sub.unsubscribe();
    }
}


