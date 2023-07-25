/** @format */
import { ScrollProvider } from "./components/ScrollContext";
import { registerAll } from '@plasmicpkgs/plasmic-chakra-ui';
import { ParallaxText } from "./components/ParallaxText";
import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import { CaisyRichText } from "./components/Caisy/CaisyRichText";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "vNPK12bNdeKVkTRg7i686D",
      token: "R4aDiK1PFGEn53gDYEzT0RUiKjSTXb6zLBAy9l6AgEmF3mJFVYsTuxpOMElf4azbIa2Ka6RPSWjdZICcgOA",
    },
  ],

  // By default Plasmic will use the last published version of your project.
  // For development, you can set preview to true, which will use the unpublished
  // project, allowing you to see your designs without publishing.  Please
  // only use this for development, as this is significantly slower.
  preview: true,
});

// You can register any code components that you want to use here; see
// https://docs.plasmic.app/learn/code-components-ref/
// And configure your Plasmic project to use the host url pointing at
// the /plasmic-host page of your nextjs app (for example,
// http://localhost:3000/plasmic-host).  See
// https://docs.plasmic.app/learn/app-hosting/#set-a-plasmic-project-to-use-your-app-host

// Register all components from plasmic-chakra-ui
registerAll(PLASMIC);

PLASMIC.registerGlobalContext(ScrollProvider, {
  name: "ScrollProvider",
  providesData: true,
  props: {},
});

PLASMIC.registerComponent(ParallaxText, {
  name: "ParallaxText",
  props: {
    children: "slot",
    from: "number", 
    to: "number",
    stiffness: "number",
    damping: "number",
  },
  providesData: true,
});

import FeatherIcon from "./components/FeatherIcon";

PLASMIC.registerComponent(FeatherIcon, {
  name: "FeatherIcon",
  props: {
    name: 'string',
    color: 'color',
    size: 'string',
    strokeWidth: 'number',
  },
});

PLASMIC.registerComponent(CaisyRichText, {
  name: "CaisyRichText",
  props: {
    node: 'object',
    themeResetClass: {
      type: 'themeResetClass',
      targetAllTags: true,
      options: {
        targetAllTags: true
      }
    },
    documentId: 'string',
    src: 'string',
    height: 'number',
  },
});

