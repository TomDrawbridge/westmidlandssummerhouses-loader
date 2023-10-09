import registerComponent, { CodeComponentMeta } from "@plasmicapp/host/registerComponent";
import React from "react";
import { KeenSliderOptions } from "keen-slider";
interface KeenSliderProps extends KeenSliderOptions {
}
export declare const sliderMeta: CodeComponentMeta<KeenSliderProps>;
export declare const SliderWrapper: React.ForwardRefExoticComponent<KeenSliderProps & {
    className?: string | undefined;
    editingSlide?: number | undefined;
    children?: any;
    setControlContextData?: ((data: {
        editingSlide: number | undefined;
    }) => void) | undefined;
} & React.RefAttributes<HTMLDivElement>>;
export declare function registerSlider(loader?: {
    registerComponent: typeof registerComponent;
}, customSliderMeta?: CodeComponentMeta<KeenSliderOptions>): void;
export {};
