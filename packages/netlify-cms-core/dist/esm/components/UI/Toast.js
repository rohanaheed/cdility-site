"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _css2 = _interopRequireDefault(require("@emotion/css"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@emotion/core");

var _reactPolyglot = require("react-polyglot");

var _styles = _interopRequireDefault(require("redux-notifications/lib/styles.css"));

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line no-unused-vars
const ReduxNotificationsGlobalStyles = () => (0, _core.jsx)(_core.Global, {
  styles: /*#__PURE__*/(0, _core.css)(_styles.default, ";.notif__container{z-index:", _netlifyCmsUiDefault.zIndex.zIndex10000, ";white-space:pre-wrap;};label:ReduxNotificationsGlobalStyles;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1VJL1RvYXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVVlIiwiZmlsZSI6Ii4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1VJL1RvYXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNzcywgR2xvYmFsIH0gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5pbXBvcnQgeyB0cmFuc2xhdGUgfSBmcm9tICdyZWFjdC1wb2x5Z2xvdCc7XG5pbXBvcnQgcmVkdXhOb3RpZmljYXRpb25zU3R5bGVzIGZyb20gJ3JlZHV4LW5vdGlmaWNhdGlvbnMvbGliL3N0eWxlcy5jc3MnO1xuaW1wb3J0IHsgc2hhZG93cywgY29sb3JzLCBsZW5ndGhzLCB6SW5kZXggfSBmcm9tICduZXRsaWZ5LWNtcy11aS1kZWZhdWx0JztcblxuY29uc3QgUmVkdXhOb3RpZmljYXRpb25zR2xvYmFsU3R5bGVzID0gKCkgPT4gKFxuICA8R2xvYmFsXG4gICAgc3R5bGVzPXtjc3NgXG4gICAgICAke3JlZHV4Tm90aWZpY2F0aW9uc1N0eWxlc307XG5cbiAgICAgIC5ub3RpZl9fY29udGFpbmVyIHtcbiAgICAgICAgei1pbmRleDogJHt6SW5kZXguekluZGV4MTAwMDB9O1xuICAgICAgICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG4gICAgICB9XG4gICAgYH1cbiAgLz5cbik7XG5cbmNvbnN0IHN0eWxlcyA9IHtcbiAgdG9hc3Q6IGNzc2BcbiAgICAke3NoYWRvd3MuZHJvcH07XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcnMuYmFja2dyb3VuZH07XG4gICAgY29sb3I6ICR7Y29sb3JzLnRleHRMaWdodH07XG4gICAgYm9yZGVyLXJhZGl1czogJHtsZW5ndGhzLmJvcmRlclJhZGl1c307XG4gICAgbWFyZ2luOiAxMHB4O1xuICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYCxcbiAgaW5mbzogY3NzYFxuICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLmluZm9CYWNrZ3JvdW5kfTtcbiAgICBjb2xvcjogJHtjb2xvcnMuaW5mb1RleHR9O1xuICBgLFxuICBzdWNjZXNzOiBjc3NgXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcnMuc3VjY2Vzc0JhY2tncm91bmR9O1xuICAgIGNvbG9yOiAke2NvbG9ycy5zdWNjZXNzVGV4dH07XG4gIGAsXG4gIHdhcm5pbmc6IGNzc2BcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9ycy53YXJuQmFja2dyb3VuZH07XG4gICAgY29sb3I6ICR7Y29sb3JzLndhcm5UZXh0fTtcbiAgYCxcbiAgZGFuZ2VyOiBjc3NgXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcnMuZXJyb3JCYWNrZ3JvdW5kfTtcbiAgICBjb2xvcjogJHtjb2xvcnMuZXJyb3JUZXh0fTtcbiAgYCxcbn07XG5cbmNvbnN0IFRvYXN0ID0gKHsga2luZCwgbWVzc2FnZSwgdCB9KSA9PiAoXG4gIDxkaXYgY3NzPXtbc3R5bGVzLnRvYXN0LCBzdHlsZXNba2luZF1dfT5cbiAgICA8UmVkdXhOb3RpZmljYXRpb25zR2xvYmFsU3R5bGVzIC8+XG4gICAge3QobWVzc2FnZS5rZXksIHsgZGV0YWlsczogbWVzc2FnZS5kZXRhaWxzIH0pfVxuICA8L2Rpdj5cbik7XG5cblRvYXN0LnByb3BUeXBlcyA9IHtcbiAga2luZDogUHJvcFR5cGVzLm9uZU9mKFsnaW5mbycsICdzdWNjZXNzJywgJ3dhcm5pbmcnLCAnZGFuZ2VyJ10pLmlzUmVxdWlyZWQsXG4gIG1lc3NhZ2U6IFByb3BUeXBlcy5vYmplY3QsXG4gIHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2xhdGUoKShUb2FzdCk7XG4iXX0= */"))
});

const styles = {
  toast: /*#__PURE__*/(0, _core.css)(_netlifyCmsUiDefault.shadows.drop, ";background-color:", _netlifyCmsUiDefault.colors.background, ";color:", _netlifyCmsUiDefault.colors.textLight, ";border-radius:", _netlifyCmsUiDefault.lengths.borderRadius, ";margin:10px;padding:20px;overflow:hidden;;label:toast;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1VJL1RvYXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNCWSIsImZpbGUiOiIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9VSS9Ub2FzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjc3MsIEdsb2JhbCB9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0IHsgdHJhbnNsYXRlIH0gZnJvbSAncmVhY3QtcG9seWdsb3QnO1xuaW1wb3J0IHJlZHV4Tm90aWZpY2F0aW9uc1N0eWxlcyBmcm9tICdyZWR1eC1ub3RpZmljYXRpb25zL2xpYi9zdHlsZXMuY3NzJztcbmltcG9ydCB7IHNoYWRvd3MsIGNvbG9ycywgbGVuZ3RocywgekluZGV4IH0gZnJvbSAnbmV0bGlmeS1jbXMtdWktZGVmYXVsdCc7XG5cbmNvbnN0IFJlZHV4Tm90aWZpY2F0aW9uc0dsb2JhbFN0eWxlcyA9ICgpID0+IChcbiAgPEdsb2JhbFxuICAgIHN0eWxlcz17Y3NzYFxuICAgICAgJHtyZWR1eE5vdGlmaWNhdGlvbnNTdHlsZXN9O1xuXG4gICAgICAubm90aWZfX2NvbnRhaW5lciB7XG4gICAgICAgIHotaW5kZXg6ICR7ekluZGV4LnpJbmRleDEwMDAwfTtcbiAgICAgICAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xuICAgICAgfVxuICAgIGB9XG4gIC8+XG4pO1xuXG5jb25zdCBzdHlsZXMgPSB7XG4gIHRvYXN0OiBjc3NgXG4gICAgJHtzaGFkb3dzLmRyb3B9O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLmJhY2tncm91bmR9O1xuICAgIGNvbG9yOiAke2NvbG9ycy50ZXh0TGlnaHR9O1xuICAgIGJvcmRlci1yYWRpdXM6ICR7bGVuZ3Rocy5ib3JkZXJSYWRpdXN9O1xuICAgIG1hcmdpbjogMTBweDtcbiAgICBwYWRkaW5nOiAyMHB4O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gIGAsXG4gIGluZm86IGNzc2BcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9ycy5pbmZvQmFja2dyb3VuZH07XG4gICAgY29sb3I6ICR7Y29sb3JzLmluZm9UZXh0fTtcbiAgYCxcbiAgc3VjY2VzczogY3NzYFxuICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLnN1Y2Nlc3NCYWNrZ3JvdW5kfTtcbiAgICBjb2xvcjogJHtjb2xvcnMuc3VjY2Vzc1RleHR9O1xuICBgLFxuICB3YXJuaW5nOiBjc3NgXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcnMud2FybkJhY2tncm91bmR9O1xuICAgIGNvbG9yOiAke2NvbG9ycy53YXJuVGV4dH07XG4gIGAsXG4gIGRhbmdlcjogY3NzYFxuICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLmVycm9yQmFja2dyb3VuZH07XG4gICAgY29sb3I6ICR7Y29sb3JzLmVycm9yVGV4dH07XG4gIGAsXG59O1xuXG5jb25zdCBUb2FzdCA9ICh7IGtpbmQsIG1lc3NhZ2UsIHQgfSkgPT4gKFxuICA8ZGl2IGNzcz17W3N0eWxlcy50b2FzdCwgc3R5bGVzW2tpbmRdXX0+XG4gICAgPFJlZHV4Tm90aWZpY2F0aW9uc0dsb2JhbFN0eWxlcyAvPlxuICAgIHt0KG1lc3NhZ2Uua2V5LCB7IGRldGFpbHM6IG1lc3NhZ2UuZGV0YWlscyB9KX1cbiAgPC9kaXY+XG4pO1xuXG5Ub2FzdC5wcm9wVHlwZXMgPSB7XG4gIGtpbmQ6IFByb3BUeXBlcy5vbmVPZihbJ2luZm8nLCAnc3VjY2VzcycsICd3YXJuaW5nJywgJ2RhbmdlciddKS5pc1JlcXVpcmVkLFxuICBtZXNzYWdlOiBQcm9wVHlwZXMub2JqZWN0LFxuICB0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNsYXRlKCkoVG9hc3QpO1xuIl19 */")),
  info: /*#__PURE__*/(0, _core.css)("background-color:", _netlifyCmsUiDefault.colors.infoBackground, ";color:", _netlifyCmsUiDefault.colors.infoText, ";;label:info;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1VJL1RvYXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQStCVyIsImZpbGUiOiIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9VSS9Ub2FzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjc3MsIEdsb2JhbCB9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0IHsgdHJhbnNsYXRlIH0gZnJvbSAncmVhY3QtcG9seWdsb3QnO1xuaW1wb3J0IHJlZHV4Tm90aWZpY2F0aW9uc1N0eWxlcyBmcm9tICdyZWR1eC1ub3RpZmljYXRpb25zL2xpYi9zdHlsZXMuY3NzJztcbmltcG9ydCB7IHNoYWRvd3MsIGNvbG9ycywgbGVuZ3RocywgekluZGV4IH0gZnJvbSAnbmV0bGlmeS1jbXMtdWktZGVmYXVsdCc7XG5cbmNvbnN0IFJlZHV4Tm90aWZpY2F0aW9uc0dsb2JhbFN0eWxlcyA9ICgpID0+IChcbiAgPEdsb2JhbFxuICAgIHN0eWxlcz17Y3NzYFxuICAgICAgJHtyZWR1eE5vdGlmaWNhdGlvbnNTdHlsZXN9O1xuXG4gICAgICAubm90aWZfX2NvbnRhaW5lciB7XG4gICAgICAgIHotaW5kZXg6ICR7ekluZGV4LnpJbmRleDEwMDAwfTtcbiAgICAgICAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xuICAgICAgfVxuICAgIGB9XG4gIC8+XG4pO1xuXG5jb25zdCBzdHlsZXMgPSB7XG4gIHRvYXN0OiBjc3NgXG4gICAgJHtzaGFkb3dzLmRyb3B9O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLmJhY2tncm91bmR9O1xuICAgIGNvbG9yOiAke2NvbG9ycy50ZXh0TGlnaHR9O1xuICAgIGJvcmRlci1yYWRpdXM6ICR7bGVuZ3Rocy5ib3JkZXJSYWRpdXN9O1xuICAgIG1hcmdpbjogMTBweDtcbiAgICBwYWRkaW5nOiAyMHB4O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gIGAsXG4gIGluZm86IGNzc2BcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9ycy5pbmZvQmFja2dyb3VuZH07XG4gICAgY29sb3I6ICR7Y29sb3JzLmluZm9UZXh0fTtcbiAgYCxcbiAgc3VjY2VzczogY3NzYFxuICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLnN1Y2Nlc3NCYWNrZ3JvdW5kfTtcbiAgICBjb2xvcjogJHtjb2xvcnMuc3VjY2Vzc1RleHR9O1xuICBgLFxuICB3YXJuaW5nOiBjc3NgXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcnMud2FybkJhY2tncm91bmR9O1xuICAgIGNvbG9yOiAke2NvbG9ycy53YXJuVGV4dH07XG4gIGAsXG4gIGRhbmdlcjogY3NzYFxuICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLmVycm9yQmFja2dyb3VuZH07XG4gICAgY29sb3I6ICR7Y29sb3JzLmVycm9yVGV4dH07XG4gIGAsXG59O1xuXG5jb25zdCBUb2FzdCA9ICh7IGtpbmQsIG1lc3NhZ2UsIHQgfSkgPT4gKFxuICA8ZGl2IGNzcz17W3N0eWxlcy50b2FzdCwgc3R5bGVzW2tpbmRdXX0+XG4gICAgPFJlZHV4Tm90aWZpY2F0aW9uc0dsb2JhbFN0eWxlcyAvPlxuICAgIHt0KG1lc3NhZ2Uua2V5LCB7IGRldGFpbHM6IG1lc3NhZ2UuZGV0YWlscyB9KX1cbiAgPC9kaXY+XG4pO1xuXG5Ub2FzdC5wcm9wVHlwZXMgPSB7XG4gIGtpbmQ6IFByb3BUeXBlcy5vbmVPZihbJ2luZm8nLCAnc3VjY2VzcycsICd3YXJuaW5nJywgJ2RhbmdlciddKS5pc1JlcXVpcmVkLFxuICBtZXNzYWdlOiBQcm9wVHlwZXMub2JqZWN0LFxuICB0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNsYXRlKCkoVG9hc3QpO1xuIl19 */")),
  success: /*#__PURE__*/(0, _core.css)("background-color:", _netlifyCmsUiDefault.colors.successBackground, ";color:", _netlifyCmsUiDefault.colors.successText, ";;label:success;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1VJL1RvYXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW1DYyIsImZpbGUiOiIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9VSS9Ub2FzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjc3MsIEdsb2JhbCB9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0IHsgdHJhbnNsYXRlIH0gZnJvbSAncmVhY3QtcG9seWdsb3QnO1xuaW1wb3J0IHJlZHV4Tm90aWZpY2F0aW9uc1N0eWxlcyBmcm9tICdyZWR1eC1ub3RpZmljYXRpb25zL2xpYi9zdHlsZXMuY3NzJztcbmltcG9ydCB7IHNoYWRvd3MsIGNvbG9ycywgbGVuZ3RocywgekluZGV4IH0gZnJvbSAnbmV0bGlmeS1jbXMtdWktZGVmYXVsdCc7XG5cbmNvbnN0IFJlZHV4Tm90aWZpY2F0aW9uc0dsb2JhbFN0eWxlcyA9ICgpID0+IChcbiAgPEdsb2JhbFxuICAgIHN0eWxlcz17Y3NzYFxuICAgICAgJHtyZWR1eE5vdGlmaWNhdGlvbnNTdHlsZXN9O1xuXG4gICAgICAubm90aWZfX2NvbnRhaW5lciB7XG4gICAgICAgIHotaW5kZXg6ICR7ekluZGV4LnpJbmRleDEwMDAwfTtcbiAgICAgICAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xuICAgICAgfVxuICAgIGB9XG4gIC8+XG4pO1xuXG5jb25zdCBzdHlsZXMgPSB7XG4gIHRvYXN0OiBjc3NgXG4gICAgJHtzaGFkb3dzLmRyb3B9O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLmJhY2tncm91bmR9O1xuICAgIGNvbG9yOiAke2NvbG9ycy50ZXh0TGlnaHR9O1xuICAgIGJvcmRlci1yYWRpdXM6ICR7bGVuZ3Rocy5ib3JkZXJSYWRpdXN9O1xuICAgIG1hcmdpbjogMTBweDtcbiAgICBwYWRkaW5nOiAyMHB4O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gIGAsXG4gIGluZm86IGNzc2BcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9ycy5pbmZvQmFja2dyb3VuZH07XG4gICAgY29sb3I6ICR7Y29sb3JzLmluZm9UZXh0fTtcbiAgYCxcbiAgc3VjY2VzczogY3NzYFxuICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLnN1Y2Nlc3NCYWNrZ3JvdW5kfTtcbiAgICBjb2xvcjogJHtjb2xvcnMuc3VjY2Vzc1RleHR9O1xuICBgLFxuICB3YXJuaW5nOiBjc3NgXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcnMud2FybkJhY2tncm91bmR9O1xuICAgIGNvbG9yOiAke2NvbG9ycy53YXJuVGV4dH07XG4gIGAsXG4gIGRhbmdlcjogY3NzYFxuICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLmVycm9yQmFja2dyb3VuZH07XG4gICAgY29sb3I6ICR7Y29sb3JzLmVycm9yVGV4dH07XG4gIGAsXG59O1xuXG5jb25zdCBUb2FzdCA9ICh7IGtpbmQsIG1lc3NhZ2UsIHQgfSkgPT4gKFxuICA8ZGl2IGNzcz17W3N0eWxlcy50b2FzdCwgc3R5bGVzW2tpbmRdXX0+XG4gICAgPFJlZHV4Tm90aWZpY2F0aW9uc0dsb2JhbFN0eWxlcyAvPlxuICAgIHt0KG1lc3NhZ2Uua2V5LCB7IGRldGFpbHM6IG1lc3NhZ2UuZGV0YWlscyB9KX1cbiAgPC9kaXY+XG4pO1xuXG5Ub2FzdC5wcm9wVHlwZXMgPSB7XG4gIGtpbmQ6IFByb3BUeXBlcy5vbmVPZihbJ2luZm8nLCAnc3VjY2VzcycsICd3YXJuaW5nJywgJ2RhbmdlciddKS5pc1JlcXVpcmVkLFxuICBtZXNzYWdlOiBQcm9wVHlwZXMub2JqZWN0LFxuICB0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNsYXRlKCkoVG9hc3QpO1xuIl19 */")),
  warning: /*#__PURE__*/(0, _core.css)("background-color:", _netlifyCmsUiDefault.colors.warnBackground, ";color:", _netlifyCmsUiDefault.colors.warnText, ";;label:warning;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1VJL1RvYXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVDYyIsImZpbGUiOiIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9VSS9Ub2FzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjc3MsIEdsb2JhbCB9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0IHsgdHJhbnNsYXRlIH0gZnJvbSAncmVhY3QtcG9seWdsb3QnO1xuaW1wb3J0IHJlZHV4Tm90aWZpY2F0aW9uc1N0eWxlcyBmcm9tICdyZWR1eC1ub3RpZmljYXRpb25zL2xpYi9zdHlsZXMuY3NzJztcbmltcG9ydCB7IHNoYWRvd3MsIGNvbG9ycywgbGVuZ3RocywgekluZGV4IH0gZnJvbSAnbmV0bGlmeS1jbXMtdWktZGVmYXVsdCc7XG5cbmNvbnN0IFJlZHV4Tm90aWZpY2F0aW9uc0dsb2JhbFN0eWxlcyA9ICgpID0+IChcbiAgPEdsb2JhbFxuICAgIHN0eWxlcz17Y3NzYFxuICAgICAgJHtyZWR1eE5vdGlmaWNhdGlvbnNTdHlsZXN9O1xuXG4gICAgICAubm90aWZfX2NvbnRhaW5lciB7XG4gICAgICAgIHotaW5kZXg6ICR7ekluZGV4LnpJbmRleDEwMDAwfTtcbiAgICAgICAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xuICAgICAgfVxuICAgIGB9XG4gIC8+XG4pO1xuXG5jb25zdCBzdHlsZXMgPSB7XG4gIHRvYXN0OiBjc3NgXG4gICAgJHtzaGFkb3dzLmRyb3B9O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLmJhY2tncm91bmR9O1xuICAgIGNvbG9yOiAke2NvbG9ycy50ZXh0TGlnaHR9O1xuICAgIGJvcmRlci1yYWRpdXM6ICR7bGVuZ3Rocy5ib3JkZXJSYWRpdXN9O1xuICAgIG1hcmdpbjogMTBweDtcbiAgICBwYWRkaW5nOiAyMHB4O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gIGAsXG4gIGluZm86IGNzc2BcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9ycy5pbmZvQmFja2dyb3VuZH07XG4gICAgY29sb3I6ICR7Y29sb3JzLmluZm9UZXh0fTtcbiAgYCxcbiAgc3VjY2VzczogY3NzYFxuICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLnN1Y2Nlc3NCYWNrZ3JvdW5kfTtcbiAgICBjb2xvcjogJHtjb2xvcnMuc3VjY2Vzc1RleHR9O1xuICBgLFxuICB3YXJuaW5nOiBjc3NgXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcnMud2FybkJhY2tncm91bmR9O1xuICAgIGNvbG9yOiAke2NvbG9ycy53YXJuVGV4dH07XG4gIGAsXG4gIGRhbmdlcjogY3NzYFxuICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLmVycm9yQmFja2dyb3VuZH07XG4gICAgY29sb3I6ICR7Y29sb3JzLmVycm9yVGV4dH07XG4gIGAsXG59O1xuXG5jb25zdCBUb2FzdCA9ICh7IGtpbmQsIG1lc3NhZ2UsIHQgfSkgPT4gKFxuICA8ZGl2IGNzcz17W3N0eWxlcy50b2FzdCwgc3R5bGVzW2tpbmRdXX0+XG4gICAgPFJlZHV4Tm90aWZpY2F0aW9uc0dsb2JhbFN0eWxlcyAvPlxuICAgIHt0KG1lc3NhZ2Uua2V5LCB7IGRldGFpbHM6IG1lc3NhZ2UuZGV0YWlscyB9KX1cbiAgPC9kaXY+XG4pO1xuXG5Ub2FzdC5wcm9wVHlwZXMgPSB7XG4gIGtpbmQ6IFByb3BUeXBlcy5vbmVPZihbJ2luZm8nLCAnc3VjY2VzcycsICd3YXJuaW5nJywgJ2RhbmdlciddKS5pc1JlcXVpcmVkLFxuICBtZXNzYWdlOiBQcm9wVHlwZXMub2JqZWN0LFxuICB0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNsYXRlKCkoVG9hc3QpO1xuIl19 */")),
  danger: /*#__PURE__*/(0, _core.css)("background-color:", _netlifyCmsUiDefault.colors.errorBackground, ";color:", _netlifyCmsUiDefault.colors.errorText, ";;label:danger;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1VJL1RvYXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTJDYSIsImZpbGUiOiIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9VSS9Ub2FzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjc3MsIEdsb2JhbCB9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0IHsgdHJhbnNsYXRlIH0gZnJvbSAncmVhY3QtcG9seWdsb3QnO1xuaW1wb3J0IHJlZHV4Tm90aWZpY2F0aW9uc1N0eWxlcyBmcm9tICdyZWR1eC1ub3RpZmljYXRpb25zL2xpYi9zdHlsZXMuY3NzJztcbmltcG9ydCB7IHNoYWRvd3MsIGNvbG9ycywgbGVuZ3RocywgekluZGV4IH0gZnJvbSAnbmV0bGlmeS1jbXMtdWktZGVmYXVsdCc7XG5cbmNvbnN0IFJlZHV4Tm90aWZpY2F0aW9uc0dsb2JhbFN0eWxlcyA9ICgpID0+IChcbiAgPEdsb2JhbFxuICAgIHN0eWxlcz17Y3NzYFxuICAgICAgJHtyZWR1eE5vdGlmaWNhdGlvbnNTdHlsZXN9O1xuXG4gICAgICAubm90aWZfX2NvbnRhaW5lciB7XG4gICAgICAgIHotaW5kZXg6ICR7ekluZGV4LnpJbmRleDEwMDAwfTtcbiAgICAgICAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xuICAgICAgfVxuICAgIGB9XG4gIC8+XG4pO1xuXG5jb25zdCBzdHlsZXMgPSB7XG4gIHRvYXN0OiBjc3NgXG4gICAgJHtzaGFkb3dzLmRyb3B9O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLmJhY2tncm91bmR9O1xuICAgIGNvbG9yOiAke2NvbG9ycy50ZXh0TGlnaHR9O1xuICAgIGJvcmRlci1yYWRpdXM6ICR7bGVuZ3Rocy5ib3JkZXJSYWRpdXN9O1xuICAgIG1hcmdpbjogMTBweDtcbiAgICBwYWRkaW5nOiAyMHB4O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gIGAsXG4gIGluZm86IGNzc2BcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9ycy5pbmZvQmFja2dyb3VuZH07XG4gICAgY29sb3I6ICR7Y29sb3JzLmluZm9UZXh0fTtcbiAgYCxcbiAgc3VjY2VzczogY3NzYFxuICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLnN1Y2Nlc3NCYWNrZ3JvdW5kfTtcbiAgICBjb2xvcjogJHtjb2xvcnMuc3VjY2Vzc1RleHR9O1xuICBgLFxuICB3YXJuaW5nOiBjc3NgXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcnMud2FybkJhY2tncm91bmR9O1xuICAgIGNvbG9yOiAke2NvbG9ycy53YXJuVGV4dH07XG4gIGAsXG4gIGRhbmdlcjogY3NzYFxuICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLmVycm9yQmFja2dyb3VuZH07XG4gICAgY29sb3I6ICR7Y29sb3JzLmVycm9yVGV4dH07XG4gIGAsXG59O1xuXG5jb25zdCBUb2FzdCA9ICh7IGtpbmQsIG1lc3NhZ2UsIHQgfSkgPT4gKFxuICA8ZGl2IGNzcz17W3N0eWxlcy50b2FzdCwgc3R5bGVzW2tpbmRdXX0+XG4gICAgPFJlZHV4Tm90aWZpY2F0aW9uc0dsb2JhbFN0eWxlcyAvPlxuICAgIHt0KG1lc3NhZ2Uua2V5LCB7IGRldGFpbHM6IG1lc3NhZ2UuZGV0YWlscyB9KX1cbiAgPC9kaXY+XG4pO1xuXG5Ub2FzdC5wcm9wVHlwZXMgPSB7XG4gIGtpbmQ6IFByb3BUeXBlcy5vbmVPZihbJ2luZm8nLCAnc3VjY2VzcycsICd3YXJuaW5nJywgJ2RhbmdlciddKS5pc1JlcXVpcmVkLFxuICBtZXNzYWdlOiBQcm9wVHlwZXMub2JqZWN0LFxuICB0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNsYXRlKCkoVG9hc3QpO1xuIl19 */"))
};

const Toast = ({
  kind,
  message,
  t
}) => (0, _core.jsx)("div", {
  css: /*#__PURE__*/(0, _css2.default)([styles.toast, styles[kind]], ";label:Toast;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1VJL1RvYXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtETyIsImZpbGUiOiIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9VSS9Ub2FzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjc3MsIEdsb2JhbCB9IGZyb20gJ0BlbW90aW9uL2NvcmUnO1xuaW1wb3J0IHsgdHJhbnNsYXRlIH0gZnJvbSAncmVhY3QtcG9seWdsb3QnO1xuaW1wb3J0IHJlZHV4Tm90aWZpY2F0aW9uc1N0eWxlcyBmcm9tICdyZWR1eC1ub3RpZmljYXRpb25zL2xpYi9zdHlsZXMuY3NzJztcbmltcG9ydCB7IHNoYWRvd3MsIGNvbG9ycywgbGVuZ3RocywgekluZGV4IH0gZnJvbSAnbmV0bGlmeS1jbXMtdWktZGVmYXVsdCc7XG5cbmNvbnN0IFJlZHV4Tm90aWZpY2F0aW9uc0dsb2JhbFN0eWxlcyA9ICgpID0+IChcbiAgPEdsb2JhbFxuICAgIHN0eWxlcz17Y3NzYFxuICAgICAgJHtyZWR1eE5vdGlmaWNhdGlvbnNTdHlsZXN9O1xuXG4gICAgICAubm90aWZfX2NvbnRhaW5lciB7XG4gICAgICAgIHotaW5kZXg6ICR7ekluZGV4LnpJbmRleDEwMDAwfTtcbiAgICAgICAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xuICAgICAgfVxuICAgIGB9XG4gIC8+XG4pO1xuXG5jb25zdCBzdHlsZXMgPSB7XG4gIHRvYXN0OiBjc3NgXG4gICAgJHtzaGFkb3dzLmRyb3B9O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLmJhY2tncm91bmR9O1xuICAgIGNvbG9yOiAke2NvbG9ycy50ZXh0TGlnaHR9O1xuICAgIGJvcmRlci1yYWRpdXM6ICR7bGVuZ3Rocy5ib3JkZXJSYWRpdXN9O1xuICAgIG1hcmdpbjogMTBweDtcbiAgICBwYWRkaW5nOiAyMHB4O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gIGAsXG4gIGluZm86IGNzc2BcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9ycy5pbmZvQmFja2dyb3VuZH07XG4gICAgY29sb3I6ICR7Y29sb3JzLmluZm9UZXh0fTtcbiAgYCxcbiAgc3VjY2VzczogY3NzYFxuICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLnN1Y2Nlc3NCYWNrZ3JvdW5kfTtcbiAgICBjb2xvcjogJHtjb2xvcnMuc3VjY2Vzc1RleHR9O1xuICBgLFxuICB3YXJuaW5nOiBjc3NgXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcnMud2FybkJhY2tncm91bmR9O1xuICAgIGNvbG9yOiAke2NvbG9ycy53YXJuVGV4dH07XG4gIGAsXG4gIGRhbmdlcjogY3NzYFxuICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLmVycm9yQmFja2dyb3VuZH07XG4gICAgY29sb3I6ICR7Y29sb3JzLmVycm9yVGV4dH07XG4gIGAsXG59O1xuXG5jb25zdCBUb2FzdCA9ICh7IGtpbmQsIG1lc3NhZ2UsIHQgfSkgPT4gKFxuICA8ZGl2IGNzcz17W3N0eWxlcy50b2FzdCwgc3R5bGVzW2tpbmRdXX0+XG4gICAgPFJlZHV4Tm90aWZpY2F0aW9uc0dsb2JhbFN0eWxlcyAvPlxuICAgIHt0KG1lc3NhZ2Uua2V5LCB7IGRldGFpbHM6IG1lc3NhZ2UuZGV0YWlscyB9KX1cbiAgPC9kaXY+XG4pO1xuXG5Ub2FzdC5wcm9wVHlwZXMgPSB7XG4gIGtpbmQ6IFByb3BUeXBlcy5vbmVPZihbJ2luZm8nLCAnc3VjY2VzcycsICd3YXJuaW5nJywgJ2RhbmdlciddKS5pc1JlcXVpcmVkLFxuICBtZXNzYWdlOiBQcm9wVHlwZXMub2JqZWN0LFxuICB0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgdHJhbnNsYXRlKCkoVG9hc3QpO1xuIl19 */"))
}, (0, _core.jsx)(ReduxNotificationsGlobalStyles, null), t(message.key, {
  details: message.details
}));

Toast.propTypes = {
  kind: _propTypes.default.oneOf(['info', 'success', 'warning', 'danger']).isRequired,
  message: _propTypes.default.object,
  t: _propTypes.default.func.isRequired
};

var _default = (0, _reactPolyglot.translate)()(Toast);

exports.default = _default;