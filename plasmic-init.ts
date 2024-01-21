/** @format */

import 'dotenv/config'
require('dotenv').config() 

import { ScrollProvider } from "./components/ScrollContext";
import { registerAll } from '@plasmicpkgs/plasmic-chakra-ui';
import { Parallax } from "./components/ParallaxText";
import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import { CaisyRichText } from "./components/Caisy/CaisyRichText";
import { registerReveal	 } from "./components/react-awesome-reveal";
import { registerSlider } from "./components/plasmic-keen-slider";
import { TrainerizeProvider } from "./components/TrainerizeProvider";
import NextScript from "./components/NextScript";



const isDevelopment = process.env.NODE_ENV === 'development';
const enableTrainerize = process.env.ENABLE_TRAINERIZE === 'true';
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
registerAll(PLASMIC);

registerReveal(PLASMIC);
registerSlider(PLASMIC);

PLASMIC.registerGlobalContext(ScrollProvider, {
  name: "ScrollProvider",
  providesData: true,
  props: {},
});

if (enableTrainerize) {
  PLASMIC.registerGlobalContext(TrainerizeProvider, {
    name: "Trainerize Provider",
    providesData: true,
    props: {},
  });
}

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

PLASMIC.registerComponent(NextScript, {
  name: "NextScript",
  props: {
    src: "string",
  },
});


import FeatherIcon from "./components/FeatherIcon";

PLASMIC.registerComponent(FeatherIcon, {
  name: "FeatherIcon",
  props: {
    name: 'string',
    color: 'string',  // use string type for color
    size: 'string',
    strokeWidth: 'number',
  },
});

PLASMIC.registerComponent(CaisyRichText, {
  name: "CaisyRichText",
  props: {
    node: 'object',
className: 'string',
    connections: 'object', // This should allow you to set connections from Plasmic
    themeResetClass: {
      type: 'themeResetClass',
      targetAllTags: true,
    },
  },
});


import ReactMarkdownComponent from "./components/ReactMarkdown";

PLASMIC.registerComponent(ReactMarkdownComponent, {
  name: "ReactMarkdown",
  props: {
    children: {
      type: "slot",
    },
  },
});

import CustomHead from './components/CustomHead';

PLASMIC.registerComponent(CustomHead, {
  name: "Head Inject",
  props: {
    mycodehere: {
displayName: "Other Code",
      type: "code",
      lang: "html",
    },
    measurementId: {
displayName: "Google Analytics ID",
      type: "string",
    },
  },
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