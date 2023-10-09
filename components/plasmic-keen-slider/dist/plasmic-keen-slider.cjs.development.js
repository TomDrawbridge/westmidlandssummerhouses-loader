'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var registerComponent = _interopDefault(require('@plasmicapp/host/registerComponent'));
var antd = require('antd');
var React = require('react');
var React__default = _interopDefault(React);
var react = require('keen-slider/react');
var composeRefs = _interopDefault(require('@seznam/compose-react-refs'));

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
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

var _excluded = ["editingSlide", "children", "className", "setControlContextData"];
var Option = antd.Select.Option;
var ResizePlugin = function ResizePlugin(slider) {
  var observer = new ResizeObserver(function () {
    slider.update();
  });
  slider.on("created", function () {
    observer.observe(slider.container);
  });
  slider.on("destroyed", function () {
    observer.unobserve(slider.container);
  });
};
function CurrentSlideDropdown(_ref) {
  var _componentProps$editi, _componentProps$child;
  var componentProps = _ref.componentProps,
    studioOps = _ref.studioOps;
  var editingSlide = (_componentProps$editi = componentProps.editingSlide) != null ? _componentProps$editi : 0;
  var slidesCnt = (_componentProps$child = componentProps.children.length) != null ? _componentProps$child : componentProps.children.type === "img" ? 1 : 0;
  var options = Array.from({
    length: slidesCnt
  }, function (_, i) {
    return i;
  }).map(function (i) {
    return React__default.createElement(Option, {
      value: i.toString()
    }, "Slide ", i + 1);
  });
  var handleChange = function handleChange(value) {
    var slideIdx = Number(value);
    studioOps.updateProps({
      editingSlide: slideIdx % slidesCnt
    });
  };
  return React__default.createElement("div", {
    style: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      gap: "10px",
      justifyContent: "space-between"
    }
  }, React__default.createElement("div", null, "Current slide:"), React__default.createElement(antd.Select, {
    defaultValue: editingSlide.toString(),
    style: {
      width: "100%"
    },
    onChange: handleChange,
    value: editingSlide.toString()
  }, options));
}
function NavigateSlides(_ref2) {
  var _componentProps$editi2;
  var componentProps = _ref2.componentProps,
    studioOps = _ref2.studioOps;
  var slidesCnt = componentProps.children.length;
  var editingSlide = (_componentProps$editi2 = componentProps.editingSlide) != null ? _componentProps$editi2 : 0;
  return React__default.createElement("div", {
    style: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      gap: "10px",
      justifyContent: "space-between"
    }
  }, React__default.createElement(antd.Button, {
    style: {
      width: "100%"
    },
    onClick: function onClick() {
      var prevSlide = (editingSlide - 1 + slidesCnt) % slidesCnt;
      studioOps.updateProps({
        editingSlide: prevSlide
      });
    }
  }, "Prev slide"), React__default.createElement(antd.Button, {
    style: {
      width: "100%"
    },
    onClick: function onClick() {
      var nextSlide = (editingSlide + 1) % slidesCnt;
      studioOps.updateProps({
        editingSlide: nextSlide
      });
    }
  }, "Next slide"));
}
function OutlineMessage() {
  return React__default.createElement("div", null, "* To re-arrange slides, use the Outline panel");
}
var sliderMeta = {
  name: "hostless-slider-custom",
  displayName: "Slider",
  importName: "Slider",
  importPath: "keen-slider",
  actions: [{
    type: "custom-action",
    control: CurrentSlideDropdown
  }, {
    type: "custom-action",
    control: NavigateSlides
  }, {
    type: "button-action",
    label: "Append new slide",
    onClick: function onClick(_ref3) {
      var componentProps = _ref3.componentProps,
        studioOps = _ref3.studioOps;
      var slidesCnt = componentProps.children.length;
      studioOps.appendToSlot({
        type: "img",
        src: ""
      }, "children");
      studioOps.updateProps({
        editingSlide: slidesCnt
      });
    }
  }, {
    type: "button-action",
    label: "Delete current slide",
    onClick: function onClick(_ref4) {
      var _contextData$editingS;
      var componentProps = _ref4.componentProps,
        contextData = _ref4.contextData,
        studioOps = _ref4.studioOps;
      var editingSlide = (_contextData$editingS = contextData.editingSlide) != null ? _contextData$editingS : 0;
      studioOps.removeFromSlotAt(editingSlide, "children");
      var slidesCnt = componentProps.children.length - 1;
      studioOps.updateProps({
        editingSlide: (editingSlide - 1 + slidesCnt) % slidesCnt
      });
    }
  }, {
    type: "custom-action",
    control: OutlineMessage
  }],
  props: {
    children: {
      type: "slot",
      defaultValue: /*#__PURE__*/[0, 1, 2].map(function (i) {
        return {
          type: "vbox",
          children: {
            type: "img",
            src: "https://static1.plasmic.app/components/react-slick/slide" + (i + 1) + ".png",
            styles: {
              maxWidth: "100%"
            }
          }
        };
      })
    },
    editingSlide: {
      displayName: "Currently edited slide",
      type: "number",
      description: "Switch to the specified slide (first is 0). Only affects the editor, not the final page.",
      defaultValueHint: 0,
      editOnly: true,
      hidden: function hidden() {
        return true;
      }
    },
    disabled: {
      displayName: "Disabled",
      type: "boolean",
      description: "Disable or enable slider",
      defaultValueHint: false
    },
    drag: {
      displayName: "Drag",
      type: "boolean",
      description: "Enables or disables mouse and touch control",
      defaultValueHint: true
    },
    dragSpeed: {
      displayName: "Drag Speed",
      type: "number",
      description: "Set the speed that is applied to the slider when dragging it.",
      defaultValueHint: 1
    },
    initial: {
      displayName: "Initial slide",
      type: "number",
      description: "Sets the index of initially visible slide",
      defaultValueHint: 1
    },
    loop: {
      displayName: "Loop",
      type: "boolean",
      description: "Enable or disables carousel/loop functionality of the slider",
      defaultValueHint: false
    },
    mode: {
      displayName: "Carousel mode",
      type: "choice",
      options: ["snap", "free", "free-snap"],
      description: "Sets the animation that is applied after a drag ends",
      defaultValueHint: "snap"
    },
    renderMode: {
      displayName: "Render mode",
      type: "choice",
      options: ["precision", "performance", "custom"],
      description: "It is possible that the render performance of the browser slows down, if you have slides with some complexity in markup and CSS. To counteract this problem, you can set this option to 'performance'. If you want to create your own renderer, you can set this options to 'custom'. Default is 'precision'.",
      defaultValueHint: "precision"
    },
    rtl: {
      displayName: "Reverse",
      type: "boolean",
      description: "Reverses the slide order",
      defaultValueHint: false
    },
    rubberband: {
      displayName: "Rubberband ",
      type: "boolean",
      description: "Enables or disables rubberband behavior for dragging and animation after a drag.",
      defaultValueHint: true
    },
    slides: {
      displayName: "Number of slides",
      type: "number",
      description: "Specifies number of slider "
    },
    vertical: {
      displayName: "Vertical",
      type: "boolean",
      description: "Vertical slide mode",
      defaultValueHint: false,
      helpText: "(Note: The height of the container must be defined if vertical is true)"
    }
  },
  defaultStyles: {
    width: "stretch",
    maxWidth: "100%",
    flexDirection: "column"
  }
};
var SliderWrapper = /*#__PURE__*/React.forwardRef(function SliderWrapper_(_ref5, userRef) {
  var editingSlide = _ref5.editingSlide,
    children = _ref5.children,
    className = _ref5.className,
    setControlContextData = _ref5.setControlContextData,
    props = _objectWithoutPropertiesLoose(_ref5, _excluded);
  setControlContextData == null || setControlContextData({
    editingSlide: editingSlide
  });
  var _useKeenSlider = react.useKeenSlider(_extends({}, props), [ResizePlugin]),
    sliderRef = _useKeenSlider[0],
    instanceRef = _useKeenSlider[1];
  React.useEffect(function () {
    if (editingSlide !== undefined) {
      instanceRef.current.moveToIdx(editingSlide);
    }
  }, [editingSlide]);
  return React__default.createElement("div", {
    className: className
  }, React__default.createElement("div", Object.assign({
    ref: composeRefs(sliderRef, userRef),
    className: "keen-slider"
  }, props, {
    style: {
      height: "100%"
    }
  }), React__default.Children.map(children, function (child) {
    return React__default.cloneElement(child, {
      className: "keen-slider__slide " + className
    });
  }), children));
});
function registerSlider(loader, customSliderMeta) {
  if (loader) {
    loader.registerComponent(SliderWrapper, customSliderMeta != null ? customSliderMeta : sliderMeta);
  } else {
    registerComponent(SliderWrapper, customSliderMeta != null ? customSliderMeta : sliderMeta);
  }
}

exports.SliderWrapper = SliderWrapper;
exports.registerSlider = registerSlider;
exports.sliderMeta = sliderMeta;
//# sourceMappingURL=plasmic-keen-slider.cjs.development.js.map
