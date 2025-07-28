import registerComponent, { ComponentMeta } from "@plasmicapp/host/registerComponent";
import { SplideSlider, SplideSliderProps } from "./SplideSlider";

export const splideSliderMeta: ComponentMeta<SplideSliderProps> = {
  name: "SplideSlider",
  displayName: "Splide Slider",
  importName: "SplideSlider",
  importPath: "./components/SplideSlider",
  isAttachment: true,
  props: {
    children: {
      type: "slot",
      defaultValue: [
        {
          type: "img",
          src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
        },
        {
          type: "img", 
          src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=400&fit=crop"
        },
        {
          type: "img",
          src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=400&fit=crop"
        }
      ]
    },
    className: {
      type: "string",
      displayName: "CSS Class",
      description: "CSS class name for styling"
    },
    ariaLabel: {
      type: "string",
      displayName: "Aria Label",
      description: "Accessibility label for the slider",
      defaultValue: "Image slider"
    },
    ariaLabelledBy: {
      type: "string",
      displayName: "Aria Labelled By",
      description: "ID of element that labels this slider"
    },
    
    // Layout options
    perPage: {
      type: "number",
      displayName: "Slides Per Page",
      description: "Number of slides to show at once",
      defaultValue: 1,
      min: 1,
      max: 10
    },
    perMove: {
      type: "number", 
      displayName: "Slides Per Move",
      description: "Number of slides to move at once",
      defaultValue: 1,
      min: 1,
      max: 10
    },
    gap: {
      type: "string",
      displayName: "Gap",
      description: "Gap between slides (e.g., '1rem', '20px')",
      defaultValue: "1rem"
    },
    width: {
      type: "string",
      displayName: "Width",
      description: "Slider width (e.g., '100%', '800px')"
    },
    height: {
      type: "string",
      displayName: "Height", 
      description: "Slider height (e.g., '400px', '50vh')"
    },
    fixedWidth: {
      type: "string",
      displayName: "Fixed Width",
      description: "Fixed width for each slide"
    },
    fixedHeight: {
      type: "string",
      displayName: "Fixed Height",
      description: "Fixed height for each slide"
    },
    
    // Navigation options
    arrows: {
      type: "boolean",
      displayName: "Show Arrows",
      description: "Show navigation arrows",
      defaultValue: true
    },
    pagination: {
      type: "boolean", 
      displayName: "Show Pagination",
      description: "Show pagination dots",
      defaultValue: true
    },
    
    // Behavior options
    rewind: {
      type: "boolean",
      displayName: "Rewind",
      description: "Rewind to first slide after last slide",
      defaultValue: true
    },
    loop: {
      type: "boolean",
      displayName: "Loop",
      description: "Enable infinite loop",
      defaultValue: false
    },
    autoplay: {
      type: "boolean",
      displayName: "Autoplay",
      description: "Enable autoplay",
      defaultValue: false
    },
    interval: {
      type: "number",
      displayName: "Autoplay Interval",
      description: "Autoplay interval in milliseconds",
      defaultValue: 3000,
      min: 1000,
      max: 10000,
      hidden: (props) => !props.autoplay
    },
    pauseOnHover: {
      type: "boolean",
      displayName: "Pause on Hover", 
      description: "Pause autoplay on hover",
      defaultValue: true,
      hidden: (props) => !props.autoplay
    },
    pauseOnFocus: {
      type: "boolean",
      displayName: "Pause on Focus",
      description: "Pause autoplay on focus",
      defaultValue: true,
      hidden: (props) => !props.autoplay
    },
    speed: {
      type: "number",
      displayName: "Transition Speed",
      description: "Transition speed in milliseconds",
      defaultValue: 400,
      min: 100,
      max: 2000
    },
    
    // Interaction options
    keyboard: {
      type: "boolean",
      displayName: "Keyboard Navigation",
      description: "Enable keyboard navigation",
      defaultValue: true
    },
    wheel: {
      type: "boolean",
      displayName: "Mouse Wheel",
      description: "Enable mouse wheel navigation",
      defaultValue: false
    },
    drag: {
      type: "boolean",
      displayName: "Drag/Swipe",
      description: "Enable drag and swipe",
      defaultValue: true
    },
    snap: {
      type: "boolean",
      displayName: "Snap",
      description: "Snap slides to grid",
      defaultValue: false
    },
    
    // Advanced options
    direction: {
      type: "choice",
      displayName: "Direction",
      description: "Slider direction",
      options: ["ltr", "rtl", "ttb"],
      defaultValue: "ltr"
    },
    easing: {
      type: "string",
      displayName: "Easing",
      description: "CSS easing function (e.g., 'ease', 'ease-in-out')"
    },
    cover: {
      type: "boolean",
      displayName: "Cover Mode",
      description: "Enable cover mode for images",
      defaultValue: false
    },
    focus: {
      type: "choice",
      displayName: "Focus",
      description: "Which slide to focus on",
      options: [
        { label: "First", value: 0 },
        { label: "Center", value: "center" }
      ],
      defaultValue: 0
    },
    trimSpace: {
      type: "boolean",
      displayName: "Trim Space",
      description: "Trim empty space",
      defaultValue: true
    }
  }
};

export function registerSplideSlider(
  loader?: {
    registerComponent: typeof registerComponent;
  },
  customMeta?: ComponentMeta<SplideSliderProps>
) {
  const doRegisterComponent: typeof registerComponent = (...args) =>
    loader ? loader.registerComponent(...args) : registerComponent(...args);
  
  doRegisterComponent(SplideSlider, customMeta ?? splideSliderMeta);
}
