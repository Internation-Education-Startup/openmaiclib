import { PPTElementOutline, PPTElementShadow } from '../lib/types/slides';
export interface PresetTheme {
    background: string;
    fontColor: string;
    fontname: string;
    colors: string[];
    borderColor?: string;
    outline?: PPTElementOutline;
    shadow?: PPTElementShadow;
}
export declare const PRESET_THEMES: PresetTheme[];
