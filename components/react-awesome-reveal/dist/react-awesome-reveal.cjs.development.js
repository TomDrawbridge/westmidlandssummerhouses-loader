'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var registerComponent = _interopDefault(require('@plasmicapp/host/registerComponent'));
var React = _interopDefault(require('react'));
var reactAwesomeReveal = require('react-awesome-reveal');

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

var _excluded = ["effect", "className"];
var effectNameToComponent = {
  bounce: reactAwesomeReveal.Bounce,
  fade: reactAwesomeReveal.Fade,
  flip: reactAwesomeReveal.Flip,
  hinge: reactAwesomeReveal.Hinge,
  jackinthebox: reactAwesomeReveal.JackInTheBox,
  roll: reactAwesomeReveal.Roll,
  rotate: reactAwesomeReveal.Rotate,
  slide: reactAwesomeReveal.Slide,
  zoom: reactAwesomeReveal.Zoom
};
var effects = /*#__PURE__*/Object.keys(effectNameToComponent);
function Reveal(_ref) {
  var _ref$effect = _ref.effect,
    effect = _ref$effect === void 0 ? "fade" : _ref$effect,
    className = _ref.className,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  var Comp = effectNameToComponent[effect];
  if (!Comp) {
    throw new Error("Please specify a valid effect: " + effects.join(", "));
  }
  // Rendering plain strings seems to result in an infinite loop from
  // "react-awesome-reveal" (except for when `cascading` is set).
  // So we create a wrapper `div`.
  var children = props.cascade || !["string", "number", "boolean"].includes(typeof props.children) ? props.children : React.createElement("div", null, " ", props.children, " ");
  return React.createElement(Comp, Object.assign({
    className: className
  }, props, {
    children: children
  }));
}
var revealMeta = {
  name: "hostless-reveal",
  importName: "Reveal",
  displayName: "Reveal",
  importPath: "@plasmicpkgs/react-awesome-reveal",
  isAttachment: true,
  props: {
    big: {
      type: "boolean",
      displayName: "Big",
      description: "Causes the animation to start farther",
      hidden: function hidden(props) {
        return (props.effect || "fade") !== "fade" || !["down", "left", "up", "right"].includes(props.direction);
      }
    },
    cascade: {
      type: "boolean",
      displayName: "Cascade",
      description: "Stagger its children animations"
    },
    children: {
      type: "slot",
      defaultValue: [{
        type: "img",
        src: "https://placekitten.com/300/200"
      }]
    },
    damping: {
      type: "number",
      displayName: "Damping",
      description: "Factor that affects the delay that each animated element in a cascade animation will be assigned",
      defaultValueHint: 0.5
    },
    delay: {
      type: "number",
      displayName: "Delay",
      description: "Initial delay, in milliseconds",
      defaultValueHint: 0
    },
    direction: {
      type: "choice",
      options: function options(props) {
        var effect = props.effect || "fade";
        var maybeAddOptions = function maybeAddOptions(effects, options) {
          return effects.includes(effect) ? options : [];
        };
        return [].concat(maybeAddOptions(["flip"], ["horizontal", "vertical"])).concat(maybeAddOptions(["bounce", "fade", "slide", "zoom"], ["down", "left", "right", "up"])).concat(maybeAddOptions(["fade", "rotate"], ["bottom-left", "bottom-right", "top-left", "top-right"]));
      },
      hidden: function hidden(props) {
        var effect = props.effect || "fade";
        return ["hinge", "jackinthebox", "roll"].includes(effect);
      },
      displayName: "Direction",
      description: "Origin of the animation (the valid values depend on the chosen Effect)"
    },
    duration: {
      type: "number",
      displayName: "Duration",
      description: "Animation duration, in milliseconds",
      defaultValueHint: 1000
    },
    effect: {
      type: "choice",
      options: /*#__PURE__*/effects.map(function (v) {
        return v;
      }),
      displayName: "Effect",
      description: "The Reveal animation effect to be applied",
      defaultValueHint: "fade"
    },
    // `fraction` seems not to be working properly as of `react-awesome-reveal@3.8.1`
    /* fraction: {
      type: "number",
      displayName: "Fraction",
      description:
        "Float number between 0 and 1 indicating how much the element should be in viewport before the animation is triggered",
    }, */
    reverse: {
      type: "boolean",
      displayName: "Reverse",
      description: "Whether the animation should make element(s) disappear",
      hidden: function hidden(props) {
        return ["hinge", "jackinthebox"].includes(props.effect || "fade");
      }
    },
    triggerOnce: {
      type: "boolean",
      displayName: "Trigger Once",
      description: "Whether the animation should run only once, instead of everytime the element enters, exits and re-enters the viewport",
      // Some effects don't work correctly when `false`
      defaultValue: true
    }
  }
};
function registerReveal(loader, customRevealMeta) {
  if (loader) {
    loader.registerComponent(Reveal, customRevealMeta != null ? customRevealMeta : revealMeta);
  } else {
    registerComponent(Reveal, customRevealMeta != null ? customRevealMeta : revealMeta);
  }
}

exports.Reveal = Reveal;
exports.registerReveal = registerReveal;
exports.revealMeta = revealMeta;
//# sourceMappingURL=react-awesome-reveal.cjs.development.js.map
