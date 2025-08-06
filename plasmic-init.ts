/** @format */

import 'dotenv/config'
require('dotenv').config()

import { ScrollProvider } from "./components/ScrollContext";
import { 
  DynamicParallax as Parallax,
  DynamicVerticalSlider as VerticalSlider,
  DynamicOptimizedVideo as OptimizedVideo,
  DynamicYouTube as YouTube
} from "./components/DynamicPlasmicComponents";
import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

const isDevelopment = process.env.NODE_ENV === 'development';
console.log("Plasmic preview mode:", isDevelopment);

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: process.env.NEXT_PUBLIC_PLASMIC_ID!,
      token: process.env.NEXT_PUBLIC_PLASMIC_TOKEN!,
    },
  ],

  // By default Plasmic will use the last published version of your project.
  // For development, you can set preview to true, which will use the unpublished
  // project, allowing you to see your designs without publishing.  Please
  // only use this for development, as this is significantly slower.
  preview: isDevelopment,
});

// You can register any code components that you want to use here; see
// https://docs.plasmic.app/learn/code-components-ref/
// And configure your Plasmic project to use the host url pointing at
// the /plasmic-host page of your nextjs app (for example,
// http://localhost:3000/plasmic-host).  See
// https://docs.plasmic.app/learn/app-hosting/#set-a-plasmic-project-to-use-your-app-host

// Register all components from plasmic-chakra-ui



PLASMIC.registerGlobalContext(ScrollProvider, {
  name: "ScrollProvider",
  providesData: true,
  props: {},
});


PLASMIC.registerComponent(Parallax, {
  name: "Parallax",
  props: {
    children: "slot",
    className: 'string',
    from: "number",
    to: "number",
    stiffness: "number",
    damping: "number",
  },
  providesData: true,
});

PLASMIC.registerComponent(VerticalSlider, {
  name: "Vertical Slider",
  props: {
    children: {
      type: "slot",
      allowedComponents: ["text", "img", "video", "div", "span", "p", "h1", "h2", "h3", "h4", "h5", "h6"],
      description: "Child elements to slide between"
    },
    delayTime: {
      type: "number",
      defaultValue: 3000,
      description: "Delay between slides (ms)",
      helpText: "Time in milliseconds between slide transitions"
    },
    animationDuration: {
      type: "number",
      defaultValue: 800,
      description: "Animation duration (ms)",
      helpText: "Duration of each slide transition in milliseconds"
    },
    height: {
      type: "string",
      defaultValue: "auto",
      description: "Height of the slider",
      helpText: "CSS height value (e.g., '300px', '50vh', '100%') or 'auto' to match first element height"
    },
    className: {
      type: "string",
      defaultValue: "",
      description: "Additional CSS classes"
    }
  }
});

PLASMIC.registerComponent(OptimizedVideo, {
  name: "Optimized Video",
  props: {
    src: {
      type: "string",
      defaultValue: "",
      description: "Video URL",
      helpText: "URL of the video file"
    },
    poster: {
      type: "string",
      defaultValue: "",
      description: "Poster image URL",
      helpText: "Optional poster image URL to display before video loads"
    },
    autoPlay: {
      type: "boolean",
      defaultValue: true,
      description: "Auto play",
      helpText: "Start playing automatically (recommended for header videos)"
    },
    loop: {
      type: "boolean",
      defaultValue: true,
      description: "Loop video",
      helpText: "Loop the video continuously"
    },
    muted: {
      type: "boolean",
      defaultValue: true,
      description: "Muted",
      helpText: "Start muted (required for autoplay)"
    },
    controls: {
      type: "boolean",
      defaultValue: false,
      description: "Show controls",
      helpText: "Show video playback controls"
    },
    lazy: {
      type: "boolean",
      defaultValue: false,
      description: "Lazy load",
      helpText: "Load video only when visible (use for videos below the fold)"
    },
    preload: {
      type: "choice",
      options: ["none", "metadata", "auto"],
      defaultValue: "metadata",
      description: "Preload strategy",
      helpText: "How much video data to preload"
    },
    width: {
      type: "string",
      defaultValue: "100%",
      description: "Width",
      helpText: "CSS width value"
    },
    height: {
      type: "string",
      defaultValue: "auto",
      description: "Height",
      helpText: "CSS height value"
    },
    className: {
      type: "string",
      defaultValue: "",
      description: "CSS classes"
    }
  }
});

import FramerMotionComponent from './components/FramerMotionComponent';

PLASMIC.registerComponent(FramerMotionComponent, {
  name: "Framer Motion",
  isAttachment: true,
  props: {
    className: "string",
    children: 'slot',
    duration: "number",
    bounce: "number",
    delay: "number",
    initialX: {
      displayName: "Initial X",
      type: "number",
    },
    initialY: {
      displayName: "Initial Y",
      type: "number",
    },
    initialRotate: {
      displayName: "Initial Rotation",
      type: "number",
    },
    initialOpacity: {
      displayName: "Initial Opacity",
      type: "number",
      control: "slider",
      min: 0,
      max: 1
    },

  },
});

import schemaArticle from './components/schema_article';

PLASMIC.registerComponent(schemaArticle, {
  name: "Article Schema/Markdown",
  props: {
    headline: 'string',
    image: 'string',
    authorType: 'string',
    authorName: 'string',
    publisherName: 'string',
    publisherLogoUrl: 'string',
    datePublished: 'string',
  },
});



import LightGalleryComponent from "./components/LightGalleryLazy";

PLASMIC.registerComponent(LightGalleryComponent, {
  name: "LightGalleryComponent",
  props: {
    images: {
      type: "object",
      defaultValue: [],
      description: "Array of image objects",
      helpText: "Array of objects with id, src, thumb, alt, size, and subHtml properties"
    },
    imageUrls: {
      type: "string",
      defaultValue: "",
      description: "JSON string of image URLs",
      helpText: "JSON array of image URLs as a string, e.g., '[\"url1.jpg\", \"url2.jpg\"]'"
    },
    video: {
      type: "object",
      defaultValue: undefined, // Changed from null to undefined
      description: "Optional video object",
      helpText: "Video object with id, src, thumb, alt, title, poster, and subHtml properties. Will be shown first in gallery."
    },
    className: {
      type: "string",
      defaultValue: "",
      description: "Additional CSS classes"
    },
    maxItemsPerRow: {
      type: "number",
      defaultValue: 3,
      description: "Maximum items per row",
      helpText: "Number of images to show per row on desktop"
    },
    maxRows: {
      type: "number",
      defaultValue: undefined,
      description: "Maximum number of rows",
      helpText: "Limit the number of rows displayed. Leave empty for unlimited rows."
    },
    galleryId: {
      type: "string",
      defaultValue: "lightgallery",
      description: "Unique gallery ID",
      helpText: "Unique identifier for this gallery instance"
    },
    generateVideoThumbnail: {
      type: "boolean",
      defaultValue: false,
      description: "Auto-generate video thumbnails",
      helpText: "Automatically extract a frame from the video to use as thumbnail"
    },
    showThumbnails: {
      type: "boolean",
      defaultValue: true,
      description: "Show thumbnails",
      helpText: "Display thumbnail navigation at the bottom"
    },
    imageHeight: {
      type: "choice",
      options: ["small", "medium", "large", "extra-large"],
      defaultValue: "medium",
      description: "Image height size",
      helpText: "Control how tall the images appear in the grid"
    },
    enableZoom: {
      type: "boolean",
      defaultValue: true,
      description: "Enable zoom functionality",
      helpText: "Allow users to zoom in/out of images"
    },
    fadeMode: {
      type: "boolean",
      defaultValue: true,
      description: "Use fade transition",
      helpText: "Use fade effect instead of slide transition"
    },
    animateThumb: {
      type: "boolean",
      defaultValue: true,
      description: "Animate thumbnails",
      helpText: "Enable animated thumbnail transitions"
    },
    onInit: {
      type: "eventHandler",
      argTypes: [{ name: "detail", type: "object" }],
      description: "Gallery initialized event"
    },
    onBeforeSlide: {
      type: "eventHandler",
      argTypes: [{ name: "detail", type: "object" }],
      description: "Before slide change event"
    },
    onAfterSlide: {
      type: "eventHandler",
      argTypes: [{ name: "detail", type: "object" }],
      description: "After slide change event"
    },
    showCaptions: {
      type: "boolean",
      defaultValue: false,
      description: "Show image captions",
      helpText: "Display captions/filenames when viewing images in the lightbox"
    }
  },
});

PLASMIC.registerComponent(YouTube, {
  name: "YouTube Player",
  props: {
    videoId: {
      type: "string",
      defaultValue: "",
      description: "YouTube Video ID",
      helpText: "The YouTube video ID (e.g., 'dQw4w9WgXcQ' from https://youtube.com/watch?v=dQw4w9WgXcQ)"
    },
    title: {
      type: "string",
      defaultValue: "YouTube Video",
      description: "Video Title",
      helpText: "Title for accessibility and SEO"
    },
    autoplay: {
      type: "boolean",
      defaultValue: false,
      description: "Autoplay",
      helpText: "Start playing automatically (requires muted for most browsers)"
    },
    muted: {
      type: "boolean",
      defaultValue: false,
      description: "Muted",
      helpText: "Start muted (required for autoplay in most browsers)"
    },
    controls: {
      type: "boolean",
      defaultValue: true,
      description: "Show Controls",
      helpText: "Display YouTube player controls"
    },
    loop: {
      type: "boolean",
      defaultValue: false,
      description: "Loop Video",
      helpText: "Loop the video continuously"
    },
    start: {
      type: "number",
      defaultValue: undefined,
      description: "Start Time (seconds)",
      helpText: "Start playback at specific time in seconds"
    },
    end: {
      type: "number",
      defaultValue: undefined,
      description: "End Time (seconds)",
      helpText: "Stop playback at specific time in seconds"
    },
    loadStrategy: {
      type: "choice",
      options: ["eager", "interaction", "intersection", "idle"],
      defaultValue: "intersection",
      description: "Load Strategy",
      helpText: "When to load the video: eager (immediately), interaction (on user action), intersection (when visible), idle (when browser is idle)"
    },
    aspectRatio: {
      type: "choice",
      options: ["16:9", "4:3", "1:1"],
      defaultValue: "16:9",
      description: "Aspect Ratio",
      helpText: "Video aspect ratio"
    },
    height: {
      type: "number",
      defaultValue: undefined,
      description: "Height (px)",
      helpText: "Video height in pixels (width will be auto-calculated based on aspect ratio, or leave empty for responsive)"
    },
    priority: {
      type: "boolean",
      defaultValue: false,
      description: "High Priority",
      helpText: "Load thumbnail with high priority (use for above-the-fold videos)"
    },
    className: {
      type: "string",
      defaultValue: "",
      description: "CSS Classes",
      helpText: "Additional CSS classes"
    }
  },
});