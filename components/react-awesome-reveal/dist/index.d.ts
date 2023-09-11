import registerComponent, { ComponentMeta } from "@plasmicapp/host/registerComponent";
import React from "react";
import { Fade } from "react-awesome-reveal";
declare const effectNameToComponent: {
    readonly bounce: React.FC<import("react-awesome-reveal").BounceProps>;
    readonly fade: React.FC<import("react-awesome-reveal").FadeProps>;
    readonly flip: React.FC<import("react-awesome-reveal").FlipProps>;
    readonly hinge: React.FC<Pick<import("react-awesome-reveal").RevealProps, "cascade" | "damping" | "delay" | "duration" | "fraction" | "triggerOnce" | "className" | "style" | "childClassName" | "childStyle" | "onVisibilityChange">>;
    readonly jackinthebox: React.FC<Pick<import("react-awesome-reveal").RevealProps, "cascade" | "damping" | "delay" | "duration" | "fraction" | "triggerOnce" | "className" | "style" | "childClassName" | "childStyle" | "onVisibilityChange">>;
    readonly roll: React.FC<import("react-awesome-reveal").RollProps>;
    readonly rotate: React.FC<import("react-awesome-reveal").RotateProps>;
    readonly slide: React.FC<import("react-awesome-reveal").SlideProps>;
    readonly zoom: React.FC<import("react-awesome-reveal").ZoomProps>;
};
declare type Effect = keyof typeof effectNameToComponent;
export interface RevealProps extends React.ComponentProps<typeof Fade> {
    className?: string;
    effect?: Effect;
 distance?: number;  // or number, based on your choice
    children?: React.ReactNode;
}
export declare function Reveal({ effect, className, ...props }: RevealProps): JSX.Element;
export declare const revealMeta: ComponentMeta<RevealProps>;
export declare function registerReveal(loader?: {
    registerComponent: typeof registerComponent;
}, customRevealMeta?: ComponentMeta<RevealProps>): void;
export {};
