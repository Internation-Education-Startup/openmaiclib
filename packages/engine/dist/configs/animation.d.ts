import { TurningMode } from '../lib/types/slides';
export declare const ANIMATION_DEFAULT_DURATION = 1000;
export declare const ANIMATION_DEFAULT_TRIGGER = "click";
export declare const ANIMATION_CLASS_PREFIX = "animate__";
export declare const ENTER_ANIMATIONS: {
    type: string;
    name: string;
    children: {
        name: string;
        value: string;
    }[];
}[];
export declare const EXIT_ANIMATIONS: {
    type: string;
    name: string;
    children: {
        name: string;
        value: string;
    }[];
}[];
export declare const ATTENTION_ANIMATIONS: {
    type: string;
    name: string;
    children: {
        name: string;
        value: string;
    }[];
}[];
interface SlideAnimation {
    label: string;
    value: TurningMode;
}
export declare const SLIDE_ANIMATIONS: SlideAnimation[];
export {};
