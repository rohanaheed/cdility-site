"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactTextareaAutosize = _interopRequireDefault(require("react-textarea-autosize"));

var _core = require("@emotion/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ref = process.env.NODE_ENV === "production" ? {
  name: "1feyfsx-TextControl",
  styles: "font-family:inherit;;label:TextControl;"
} : {
  name: "1feyfsx-TextControl",
  styles: "font-family:inherit;;label:TextControl;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9UZXh0Q29udHJvbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUErQ1EiLCJmaWxlIjoiLi4vLi4vc3JjL1RleHRDb250cm9sLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgVGV4dGFyZWEgZnJvbSAncmVhY3QtdGV4dGFyZWEtYXV0b3NpemUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0Q29udHJvbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZm9ySUQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdmFsdWU6IFByb3BUeXBlcy5ub2RlLFxuICAgIGNsYXNzTmFtZVdyYXBwZXI6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBzZXRBY3RpdmVTdHlsZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBzZXRJbmFjdGl2ZVN0eWxlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgdmFsdWU6ICcnLFxuICB9O1xuXG4gIC8qKlxuICAgKiBBbHdheXMgdXBkYXRlIHRvIGVuc3VyZSBgcmVhY3QtdGV4dGFyZWEtYXV0b3NpemVgIHByb3Blcmx5IGNhbGN1bGF0ZXNcbiAgICogaGVpZ2h0LiBDZXJ0YWluIHNpdHVhdGlvbnMsIHN1Y2ggYXMgdGhpcyB3aWRnZXQgYmVpbmcgbmVzdGVkIGluIGEgbGlzdFxuICAgKiBpdGVtIHRoYXQgZ2V0cyByZWFycmFuZ2VkLCBjYW4gbGVhdmUgdGhlIHRleHRhcmVhIGluIGEgbWluaW1hbCBoZWlnaHRcbiAgICogc3RhdGUuIEFsd2F5cyB1cGRhdGluZyB0aGlzIHBhcnRpY3VsYXIgd2lkZ2V0IHNob3VsZCBnZW5lcmFsbHkgYmUgbG93IGNvc3QsXG4gICAqIGJ1dCB0aGlzIHNob3VsZCBiZSBvcHRpbWl6ZWQgaW4gdGhlIGZ1dHVyZS5cbiAgICovXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBmb3JJRCxcbiAgICAgIHZhbHVlLFxuICAgICAgb25DaGFuZ2UsXG4gICAgICBjbGFzc05hbWVXcmFwcGVyLFxuICAgICAgc2V0QWN0aXZlU3R5bGUsXG4gICAgICBzZXRJbmFjdGl2ZVN0eWxlLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxUZXh0YXJlYVxuICAgICAgICBpZD17Zm9ySUR9XG4gICAgICAgIHZhbHVlPXt2YWx1ZSB8fCAnJ31cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVXcmFwcGVyfVxuICAgICAgICBvbkZvY3VzPXtzZXRBY3RpdmVTdHlsZX1cbiAgICAgICAgb25CbHVyPXtzZXRJbmFjdGl2ZVN0eWxlfVxuICAgICAgICBtaW5Sb3dzPXs1fVxuICAgICAgICBjc3M9e3sgZm9udEZhbWlseTogJ2luaGVyaXQnIH19XG4gICAgICAgIG9uQ2hhbmdlPXtlID0+IG9uQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxufVxuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};

class TextControl extends _react.default.Component {
  /**
   * Always update to ensure `react-textarea-autosize` properly calculates
   * height. Certain situations, such as this widget being nested in a list
   * item that gets rearranged, can leave the textarea in a minimal height
   * state. Always updating this particular widget should generally be low cost,
   * but this should be optimized in the future.
   */
  shouldComponentUpdate() {
    return true;
  }

  render() {
    const {
      forID,
      value,
      onChange,
      classNameWrapper,
      setActiveStyle,
      setInactiveStyle
    } = this.props;
    return (0, _core.jsx)(_reactTextareaAutosize.default, {
      id: forID,
      value: value || '',
      className: classNameWrapper,
      onFocus: setActiveStyle,
      onBlur: setInactiveStyle,
      minRows: 5,
      css: _ref,
      onChange: e => onChange(e.target.value)
    });
  }

}

exports.default = TextControl;

_defineProperty(TextControl, "propTypes", {
  onChange: _propTypes.default.func.isRequired,
  forID: _propTypes.default.string,
  value: _propTypes.default.node,
  classNameWrapper: _propTypes.default.string.isRequired,
  setActiveStyle: _propTypes.default.func.isRequired,
  setInactiveStyle: _propTypes.default.func.isRequired
});

_defineProperty(TextControl, "defaultProps", {
  value: ''
});