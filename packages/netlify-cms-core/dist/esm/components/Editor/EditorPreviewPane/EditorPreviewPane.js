"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PreviewPane = void 0;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _immutable = require("immutable");

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _reactFrameComponent = _interopRequireWildcard(require("react-frame-component"));

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

var _registry = require("../../../lib/registry");

var _UI = require("../../UI");

var _collections = require("../../../reducers/collections");

var _reactRedux = require("react-redux");

var _media = require("../../../actions/media");

var _medias = require("../../../reducers/medias");

var _fieldInference = require("../../../constants/fieldInference");

var _EditorPreviewContent = _interopRequireDefault(require("./EditorPreviewContent.js"));

var _PreviewHOC = _interopRequireDefault(require("./PreviewHOC"));

var _EditorPreview = _interopRequireDefault(require("./EditorPreview"));

var _core = require("@emotion/core");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const PreviewPaneFrame = ( /*#__PURE__*/0, _styledBase.default)(_reactFrameComponent.default, {
  target: "e6emspu0",
  label: "PreviewPaneFrame"
})("width:100%;height:100%;border:none;background:#fff;border-radius:", _netlifyCmsUiDefault.lengths.borderRadius, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0VkaXRvci9FZGl0b3JQcmV2aWV3UGFuZS9FZGl0b3JQcmV2aWV3UGFuZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFrQnNDIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0VkaXRvci9FZGl0b3JQcmV2aWV3UGFuZS9FZGl0b3JQcmV2aWV3UGFuZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgTGlzdCwgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgRnJhbWUsIHsgRnJhbWVDb250ZXh0Q29uc3VtZXIgfSBmcm9tICdyZWFjdC1mcmFtZS1jb21wb25lbnQnO1xuaW1wb3J0IHsgbGVuZ3RocyB9IGZyb20gJ25ldGxpZnktY21zLXVpLWRlZmF1bHQnO1xuaW1wb3J0IHsgcmVzb2x2ZVdpZGdldCwgZ2V0UHJldmlld1RlbXBsYXRlLCBnZXRQcmV2aWV3U3R5bGVzIH0gZnJvbSAnTGliL3JlZ2lzdHJ5JztcbmltcG9ydCB7IEVycm9yQm91bmRhcnkgfSBmcm9tICdVSSc7XG5pbXBvcnQgeyBzZWxlY3RUZW1wbGF0ZU5hbWUsIHNlbGVjdEluZmVyZWRGaWVsZCwgc2VsZWN0RmllbGQgfSBmcm9tICdSZWR1Y2Vycy9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgYm91bmRHZXRBc3NldCB9IGZyb20gJ0FjdGlvbnMvbWVkaWEnO1xuaW1wb3J0IHsgc2VsZWN0SXNMb2FkaW5nQXNzZXQgfSBmcm9tICdSZWR1Y2Vycy9tZWRpYXMnO1xuaW1wb3J0IHsgSU5GRVJBQkxFX0ZJRUxEUyB9IGZyb20gJ0NvbnN0YW50cy9maWVsZEluZmVyZW5jZSc7XG5pbXBvcnQgRWRpdG9yUHJldmlld0NvbnRlbnQgZnJvbSAnLi9FZGl0b3JQcmV2aWV3Q29udGVudC5qcyc7XG5pbXBvcnQgUHJldmlld0hPQyBmcm9tICcuL1ByZXZpZXdIT0MnO1xuaW1wb3J0IEVkaXRvclByZXZpZXcgZnJvbSAnLi9FZGl0b3JQcmV2aWV3JztcblxuY29uc3QgUHJldmlld1BhbmVGcmFtZSA9IHN0eWxlZChGcmFtZSlgXG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgYm9yZGVyLXJhZGl1czogJHtsZW5ndGhzLmJvcmRlclJhZGl1c307XG5gO1xuXG5leHBvcnQgY2xhc3MgUHJldmlld1BhbmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBnZXRXaWRnZXQgPSAoZmllbGQsIHZhbHVlLCBtZXRhZGF0YSwgcHJvcHMsIGlkeCA9IG51bGwpID0+IHtcbiAgICBjb25zdCB7IGdldEFzc2V0LCBlbnRyeSB9ID0gcHJvcHM7XG4gICAgY29uc3Qgd2lkZ2V0ID0gcmVzb2x2ZVdpZGdldChmaWVsZC5nZXQoJ3dpZGdldCcpKTtcbiAgICBjb25zdCBrZXkgPSBpZHggPyBmaWVsZC5nZXQoJ25hbWUnKSArICdfJyArIGlkeCA6IGZpZWxkLmdldCgnbmFtZScpO1xuICAgIGNvbnN0IHZhbHVlSXNJbk1hcCA9IHZhbHVlICYmICF3aWRnZXQuYWxsb3dNYXBWYWx1ZSAmJiBNYXAuaXNNYXAodmFsdWUpO1xuXG4gICAgLyoqXG4gICAgICogVXNlIGFuIEhPQyB0byBwcm92aWRlIGNvbmRpdGlvbmFsIHVwZGF0ZXMgZm9yIGFsbCBwcmV2aWV3cy5cbiAgICAgKi9cbiAgICByZXR1cm4gIXdpZGdldC5wcmV2aWV3ID8gbnVsbCA6IChcbiAgICAgIDxQcmV2aWV3SE9DXG4gICAgICAgIHByZXZpZXdDb21wb25lbnQ9e3dpZGdldC5wcmV2aWV3fVxuICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgZmllbGQ9e2ZpZWxkfVxuICAgICAgICBnZXRBc3NldD17Z2V0QXNzZXR9XG4gICAgICAgIHZhbHVlPXt2YWx1ZUlzSW5NYXAgPyB2YWx1ZS5nZXQoZmllbGQuZ2V0KCduYW1lJykpIDogdmFsdWV9XG4gICAgICAgIGVudHJ5PXtlbnRyeX1cbiAgICAgICAgZmllbGRzTWV0YURhdGE9e21ldGFkYXRhfVxuICAgICAgICByZXNvbHZlV2lkZ2V0PXtyZXNvbHZlV2lkZ2V0fVxuICAgICAgLz5cbiAgICApO1xuICB9O1xuXG4gIGluZmVyZWRGaWVsZHMgPSB7fTtcblxuICBpbmZlckZpZWxkcygpIHtcbiAgICBjb25zdCB0aXRsZUZpZWxkID0gc2VsZWN0SW5mZXJlZEZpZWxkKHRoaXMucHJvcHMuY29sbGVjdGlvbiwgJ3RpdGxlJyk7XG4gICAgY29uc3Qgc2hvcnRUaXRsZUZpZWxkID0gc2VsZWN0SW5mZXJlZEZpZWxkKHRoaXMucHJvcHMuY29sbGVjdGlvbiwgJ3Nob3J0VGl0bGUnKTtcbiAgICBjb25zdCBhdXRob3JGaWVsZCA9IHNlbGVjdEluZmVyZWRGaWVsZCh0aGlzLnByb3BzLmNvbGxlY3Rpb24sICdhdXRob3InKTtcblxuICAgIHRoaXMuaW5mZXJlZEZpZWxkcyA9IHt9O1xuICAgIGlmICh0aXRsZUZpZWxkKSB0aGlzLmluZmVyZWRGaWVsZHNbdGl0bGVGaWVsZF0gPSBJTkZFUkFCTEVfRklFTERTLnRpdGxlO1xuICAgIGlmIChzaG9ydFRpdGxlRmllbGQpIHRoaXMuaW5mZXJlZEZpZWxkc1tzaG9ydFRpdGxlRmllbGRdID0gSU5GRVJBQkxFX0ZJRUxEUy5zaG9ydFRpdGxlO1xuICAgIGlmIChhdXRob3JGaWVsZCkgdGhpcy5pbmZlcmVkRmllbGRzW2F1dGhvckZpZWxkXSA9IElORkVSQUJMRV9GSUVMRFMuYXV0aG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHdpZGdldCBjb21wb25lbnQgZm9yIGEgbmFtZWQgZmllbGQsIGFuZCBtYWtlcyByZWN1cnNpdmUgY2FsbHNcbiAgICogdG8gcmV0cmlldmUgY29tcG9uZW50cyBmb3IgbmVzdGVkIGFuZCBkZWVwbHkgbmVzdGVkIGZpZWxkcywgd2hpY2ggb2NjdXIgaW5cbiAgICogb2JqZWN0IGFuZCBsaXN0IHR5cGUgZmllbGRzLiBVc2VkIGludGVybmFsbHkgdG8gcmV0cmlldmUgd2lkZ2V0cywgYW5kIGFsc29cbiAgICogZXhwb3NlZCBmb3IgdXNlIGluIGN1c3RvbSBwcmV2aWV3IHRlbXBsYXRlcy5cbiAgICovXG4gIHdpZGdldEZvciA9IChcbiAgICBuYW1lLFxuICAgIGZpZWxkcyA9IHRoaXMucHJvcHMuZmllbGRzLFxuICAgIHZhbHVlcyA9IHRoaXMucHJvcHMuZW50cnkuZ2V0KCdkYXRhJyksXG4gICAgZmllbGRzTWV0YURhdGEgPSB0aGlzLnByb3BzLmZpZWxkc01ldGFEYXRhLFxuICApID0+IHtcbiAgICAvLyBXZSByZXRyaWV2ZSB0aGUgZmllbGQgYnkgbmFtZSBzbyB0aGF0IHRoaXMgZnVuY3Rpb24gY2FuIGFsc28gYmUgdXNlZCBpblxuICAgIC8vIGN1c3RvbSBwcmV2aWV3IHRlbXBsYXRlcywgd2hlcmUgdGhlIGZpZWxkIG9iamVjdCBjYW4ndCBiZSBwYXNzZWQgaW4uXG4gICAgbGV0IGZpZWxkID0gZmllbGRzICYmIGZpZWxkcy5maW5kKGYgPT4gZi5nZXQoJ25hbWUnKSA9PT0gbmFtZSk7XG4gICAgbGV0IHZhbHVlID0gdmFsdWVzICYmIHZhbHVlcy5nZXQoZmllbGQuZ2V0KCduYW1lJykpO1xuICAgIGlmIChmaWVsZC5nZXQoJ21ldGEnKSkge1xuICAgICAgdmFsdWUgPSB0aGlzLnByb3BzLmVudHJ5LmdldEluKFsnbWV0YScsIGZpZWxkLmdldCgnbmFtZScpXSk7XG4gICAgfVxuICAgIGNvbnN0IG5lc3RlZEZpZWxkcyA9IGZpZWxkLmdldCgnZmllbGRzJyk7XG4gICAgY29uc3Qgc2luZ2xlRmllbGQgPSBmaWVsZC5nZXQoJ2ZpZWxkJyk7XG4gICAgY29uc3QgbWV0YWRhdGEgPSBmaWVsZHNNZXRhRGF0YSAmJiBmaWVsZHNNZXRhRGF0YS5nZXQoZmllbGQuZ2V0KCduYW1lJyksIE1hcCgpKTtcblxuICAgIGlmIChuZXN0ZWRGaWVsZHMpIHtcbiAgICAgIGZpZWxkID0gZmllbGQuc2V0KCdmaWVsZHMnLCB0aGlzLmdldE5lc3RlZFdpZGdldHMobmVzdGVkRmllbGRzLCB2YWx1ZSwgbWV0YWRhdGEpKTtcbiAgICB9XG5cbiAgICBpZiAoc2luZ2xlRmllbGQpIHtcbiAgICAgIGZpZWxkID0gZmllbGQuc2V0KCdmaWVsZCcsIHRoaXMuZ2V0U2luZ2xlTmVzdGVkKHNpbmdsZUZpZWxkLCB2YWx1ZSwgbWV0YWRhdGEpKTtcbiAgICB9XG5cbiAgICBjb25zdCBsYWJlbGxlZFdpZGdldHMgPSBbJ3N0cmluZycsICd0ZXh0JywgJ251bWJlciddO1xuICAgIGNvbnN0IGluZmVyZWRGaWVsZCA9IE9iamVjdC5lbnRyaWVzKHRoaXMuaW5mZXJlZEZpZWxkcylcbiAgICAgIC5maWx0ZXIoKFtrZXldKSA9PiB7XG4gICAgICAgIGNvbnN0IGZpZWxkVG9NYXRjaCA9IHNlbGVjdEZpZWxkKHRoaXMucHJvcHMuY29sbGVjdGlvbiwga2V5KTtcbiAgICAgICAgcmV0dXJuIGZpZWxkVG9NYXRjaCA9PT0gZmllbGQ7XG4gICAgICB9KVxuICAgICAgLm1hcCgoWywgdmFsdWVdKSA9PiB2YWx1ZSlbMF07XG5cbiAgICBpZiAoaW5mZXJlZEZpZWxkKSB7XG4gICAgICB2YWx1ZSA9IGluZmVyZWRGaWVsZC5kZWZhdWx0UHJldmlldyh2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHZhbHVlICYmXG4gICAgICBsYWJlbGxlZFdpZGdldHMuaW5kZXhPZihmaWVsZC5nZXQoJ3dpZGdldCcpKSAhPT0gLTEgJiZcbiAgICAgIHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoIDwgNTBcbiAgICApIHtcbiAgICAgIHZhbHVlID0gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxzdHJvbmc+e2ZpZWxkLmdldCgnbGFiZWwnLCBmaWVsZC5nZXQoJ25hbWUnKSl9Ojwvc3Ryb25nPiB7dmFsdWV9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWUgPyB0aGlzLmdldFdpZGdldChmaWVsZCwgdmFsdWUsIG1ldGFkYXRhLCB0aGlzLnByb3BzKSA6IG51bGw7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB3aWRnZXRzIGZvciBuZXN0ZWQgZmllbGRzIChjaGlsZHJlbiBvZiBvYmplY3QvbGlzdCBmaWVsZHMpXG4gICAqL1xuICBnZXROZXN0ZWRXaWRnZXRzID0gKGZpZWxkcywgdmFsdWVzLCBmaWVsZHNNZXRhRGF0YSkgPT4ge1xuICAgIC8vIEZpZWxkcyBuZXN0ZWQgd2l0aGluIGEgbGlzdCBmaWVsZCB3aWxsIGJlIHBhaXJlZCB3aXRoIGEgTGlzdCBvZiB2YWx1ZSBNYXBzLlxuICAgIGlmIChMaXN0LmlzTGlzdCh2YWx1ZXMpKSB7XG4gICAgICByZXR1cm4gdmFsdWVzLm1hcCh2YWx1ZSA9PiB0aGlzLndpZGdldHNGb3JOZXN0ZWRGaWVsZHMoZmllbGRzLCB2YWx1ZSwgZmllbGRzTWV0YURhdGEpKTtcbiAgICB9XG4gICAgLy8gRmllbGRzIG5lc3RlZCB3aXRoaW4gYW4gb2JqZWN0IGZpZWxkIHdpbGwgYmUgcGFpcmVkIHdpdGggYSBzaW5nbGUgTWFwIG9mIHZhbHVlcy5cbiAgICByZXR1cm4gdGhpcy53aWRnZXRzRm9yTmVzdGVkRmllbGRzKGZpZWxkcywgdmFsdWVzLCBmaWVsZHNNZXRhRGF0YSk7XG4gIH07XG5cbiAgZ2V0U2luZ2xlTmVzdGVkID0gKGZpZWxkLCB2YWx1ZXMsIGZpZWxkc01ldGFEYXRhKSA9PiB7XG4gICAgaWYgKExpc3QuaXNMaXN0KHZhbHVlcykpIHtcbiAgICAgIHJldHVybiB2YWx1ZXMubWFwKCh2YWx1ZSwgaWR4KSA9PlxuICAgICAgICB0aGlzLmdldFdpZGdldChmaWVsZCwgdmFsdWUsIGZpZWxkc01ldGFEYXRhLmdldChmaWVsZC5nZXQoJ25hbWUnKSksIHRoaXMucHJvcHMsIGlkeCksXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nZXRXaWRnZXQoZmllbGQsIHZhbHVlcywgZmllbGRzTWV0YURhdGEuZ2V0KGZpZWxkLmdldCgnbmFtZScpKSwgdGhpcy5wcm9wcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFVzZSB3aWRnZXRGb3IgYXMgYSBtYXBwaW5nIGZ1bmN0aW9uIGZvciByZWN1cnNpdmUgd2lkZ2V0IHJldHJpZXZhbFxuICAgKi9cbiAgd2lkZ2V0c0Zvck5lc3RlZEZpZWxkcyA9IChmaWVsZHMsIHZhbHVlcywgZmllbGRzTWV0YURhdGEpID0+IHtcbiAgICByZXR1cm4gZmllbGRzLm1hcChmaWVsZCA9PiB0aGlzLndpZGdldEZvcihmaWVsZC5nZXQoJ25hbWUnKSwgZmllbGRzLCB2YWx1ZXMsIGZpZWxkc01ldGFEYXRhKSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gZXhpc3RzIGVudGlyZWx5IHRvIGV4cG9zZSBuZXN0ZWQgd2lkZ2V0cyBmb3Igb2JqZWN0IGFuZCBsaXN0XG4gICAqIGZpZWxkcyB0byBjdXN0b20gcHJldmlldyB0ZW1wbGF0ZXMuXG4gICAqXG4gICAqIFRPRE86IHNlZSBpZiB3aWRnZXRGb3IgY2FuIG5vdyBwcm92aWRlIHRoaXMgZnVuY3Rpb25hbGl0eSBmb3IgcHJldmlldyB0ZW1wbGF0ZXNcbiAgICovXG4gIHdpZGdldHNGb3IgPSBuYW1lID0+IHtcbiAgICBjb25zdCB7IGZpZWxkcywgZW50cnksIGZpZWxkc01ldGFEYXRhIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGZpZWxkID0gZmllbGRzLmZpbmQoZiA9PiBmLmdldCgnbmFtZScpID09PSBuYW1lKTtcbiAgICBjb25zdCBuZXN0ZWRGaWVsZHMgPSBmaWVsZCAmJiBmaWVsZC5nZXQoJ2ZpZWxkcycpO1xuICAgIGNvbnN0IHZhbHVlID0gZW50cnkuZ2V0SW4oWydkYXRhJywgZmllbGQuZ2V0KCduYW1lJyldKTtcbiAgICBjb25zdCBtZXRhZGF0YSA9IGZpZWxkc01ldGFEYXRhLmdldChmaWVsZC5nZXQoJ25hbWUnKSwgTWFwKCkpO1xuXG4gICAgaWYgKExpc3QuaXNMaXN0KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLm1hcCh2YWwgPT4ge1xuICAgICAgICBjb25zdCB3aWRnZXRzID1cbiAgICAgICAgICBuZXN0ZWRGaWVsZHMgJiZcbiAgICAgICAgICBNYXAoXG4gICAgICAgICAgICBuZXN0ZWRGaWVsZHMubWFwKChmLCBpKSA9PiBbXG4gICAgICAgICAgICAgIGYuZ2V0KCduYW1lJyksXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtpfT57dGhpcy5nZXRXaWRnZXQoZiwgdmFsLCBtZXRhZGF0YS5nZXQoZi5nZXQoJ25hbWUnKSksIHRoaXMucHJvcHMpfTwvZGl2PixcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICk7XG4gICAgICAgIHJldHVybiBNYXAoeyBkYXRhOiB2YWwsIHdpZGdldHMgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gTWFwKHtcbiAgICAgIGRhdGE6IHZhbHVlLFxuICAgICAgd2lkZ2V0czpcbiAgICAgICAgbmVzdGVkRmllbGRzICYmXG4gICAgICAgIE1hcChcbiAgICAgICAgICBuZXN0ZWRGaWVsZHMubWFwKGYgPT4gW1xuICAgICAgICAgICAgZi5nZXQoJ25hbWUnKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0V2lkZ2V0KGYsIHZhbHVlLCBtZXRhZGF0YS5nZXQoZi5nZXQoJ25hbWUnKSksIHRoaXMucHJvcHMpLFxuICAgICAgICAgIF0pLFxuICAgICAgICApLFxuICAgIH0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGVudHJ5LCBjb2xsZWN0aW9uLCBjb25maWcgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoIWVudHJ5IHx8ICFlbnRyeS5nZXQoJ2RhdGEnKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgcHJldmlld0NvbXBvbmVudCA9XG4gICAgICBnZXRQcmV2aWV3VGVtcGxhdGUoc2VsZWN0VGVtcGxhdGVOYW1lKGNvbGxlY3Rpb24sIGVudHJ5LmdldCgnc2x1ZycpKSkgfHwgRWRpdG9yUHJldmlldztcblxuICAgIHRoaXMuaW5mZXJGaWVsZHMoKTtcblxuICAgIGNvbnN0IHByZXZpZXdQcm9wcyA9IHtcbiAgICAgIC4uLnRoaXMucHJvcHMsXG4gICAgICB3aWRnZXRGb3I6IHRoaXMud2lkZ2V0Rm9yLFxuICAgICAgd2lkZ2V0c0ZvcjogdGhpcy53aWRnZXRzRm9yLFxuICAgIH07XG5cbiAgICBjb25zdCBzdHlsZUVscyA9IGdldFByZXZpZXdTdHlsZXMoKS5tYXAoKHN0eWxlLCBpKSA9PiB7XG4gICAgICBpZiAoc3R5bGUucmF3KSB7XG4gICAgICAgIHJldHVybiA8c3R5bGUga2V5PXtpfT57c3R5bGUudmFsdWV9PC9zdHlsZT47XG4gICAgICB9XG4gICAgICByZXR1cm4gPGxpbmsga2V5PXtpfSBocmVmPXtzdHlsZS52YWx1ZX0gdHlwZT1cInRleHQvY3NzXCIgcmVsPVwic3R5bGVzaGVldFwiIC8+O1xuICAgIH0pO1xuXG4gICAgaWYgKCFjb2xsZWN0aW9uKSB7XG4gICAgICA8UHJldmlld1BhbmVGcmFtZSBpZD1cInByZXZpZXctcGFuZVwiIGhlYWQ9e3N0eWxlRWxzfSAvPjtcbiAgICB9XG5cbiAgICBjb25zdCBpbml0aWFsQ29udGVudCA9IGBcbjwhRE9DVFlQRSBodG1sPlxuPGh0bWw+XG4gIDxoZWFkPjxiYXNlIHRhcmdldD1cIl9ibGFua1wiLz48L2hlYWQ+XG4gIDxib2R5PjxkaXY+PC9kaXY+PC9ib2R5PlxuPC9odG1sPlxuYDtcblxuICAgIHJldHVybiAoXG4gICAgICA8RXJyb3JCb3VuZGFyeSBjb25maWc9e2NvbmZpZ30+XG4gICAgICAgIDxQcmV2aWV3UGFuZUZyYW1lIGlkPVwicHJldmlldy1wYW5lXCIgaGVhZD17c3R5bGVFbHN9IGluaXRpYWxDb250ZW50PXtpbml0aWFsQ29udGVudH0+XG4gICAgICAgICAgPEZyYW1lQ29udGV4dENvbnN1bWVyPlxuICAgICAgICAgICAgeyh7IGRvY3VtZW50LCB3aW5kb3cgfSkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxFZGl0b3JQcmV2aWV3Q29udGVudFxuICAgICAgICAgICAgICAgICAgey4uLnsgcHJldmlld0NvbXBvbmVudCwgcHJldmlld1Byb3BzOiB7IC4uLnByZXZpZXdQcm9wcywgZG9jdW1lbnQsIHdpbmRvdyB9IH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPC9GcmFtZUNvbnRleHRDb25zdW1lcj5cbiAgICAgICAgPC9QcmV2aWV3UGFuZUZyYW1lPlxuICAgICAgPC9FcnJvckJvdW5kYXJ5PlxuICAgICk7XG4gIH1cbn1cblxuUHJldmlld1BhbmUucHJvcFR5cGVzID0ge1xuICBjb2xsZWN0aW9uOiBJbW11dGFibGVQcm9wVHlwZXMubWFwLmlzUmVxdWlyZWQsXG4gIGZpZWxkczogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgZW50cnk6IEltbXV0YWJsZVByb3BUeXBlcy5tYXAuaXNSZXF1aXJlZCxcbiAgZmllbGRzTWV0YURhdGE6IEltbXV0YWJsZVByb3BUeXBlcy5tYXAuaXNSZXF1aXJlZCxcbiAgZ2V0QXNzZXQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiB7XG4gIGNvbnN0IGlzTG9hZGluZ0Fzc2V0ID0gc2VsZWN0SXNMb2FkaW5nQXNzZXQoc3RhdGUubWVkaWFzKTtcbiAgcmV0dXJuIHsgaXNMb2FkaW5nQXNzZXQsIGNvbmZpZzogc3RhdGUuY29uZmlnIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgYm91bmRHZXRBc3NldDogKGNvbGxlY3Rpb24sIGVudHJ5KSA9PiBib3VuZEdldEFzc2V0KGRpc3BhdGNoLCBjb2xsZWN0aW9uLCBlbnRyeSksXG4gIH07XG59O1xuXG5jb25zdCBtZXJnZVByb3BzID0gKHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMsIG93blByb3BzKSA9PiB7XG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGVQcm9wcyxcbiAgICAuLi5kaXNwYXRjaFByb3BzLFxuICAgIC4uLm93blByb3BzLFxuICAgIGdldEFzc2V0OiBkaXNwYXRjaFByb3BzLmJvdW5kR2V0QXNzZXQob3duUHJvcHMuY29sbGVjdGlvbiwgb3duUHJvcHMuZW50cnkpLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWVyZ2VQcm9wcykoUHJldmlld1BhbmUpO1xuIl19 */"));

class PreviewPane extends _react.default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "getWidget", (field, value, metadata, props, idx = null) => {
      const {
        getAsset,
        entry
      } = props;
      const widget = (0, _registry.resolveWidget)(field.get('widget'));
      const key = idx ? field.get('name') + '_' + idx : field.get('name');

      const valueIsInMap = value && !widget.allowMapValue && _immutable.Map.isMap(value);
      /**
       * Use an HOC to provide conditional updates for all previews.
       */


      return !widget.preview ? null : (0, _core.jsx)(_PreviewHOC.default, {
        previewComponent: widget.preview,
        key: key,
        field: field,
        getAsset: getAsset,
        value: valueIsInMap ? value.get(field.get('name')) : value,
        entry: entry,
        fieldsMetaData: metadata,
        resolveWidget: _registry.resolveWidget
      });
    });

    _defineProperty(this, "inferedFields", {});

    _defineProperty(this, "widgetFor", (name, fields = this.props.fields, values = this.props.entry.get('data'), fieldsMetaData = this.props.fieldsMetaData) => {
      // We retrieve the field by name so that this function can also be used in
      // custom preview templates, where the field object can't be passed in.
      let field = fields && fields.find(f => f.get('name') === name);
      let value = values && values.get(field.get('name'));

      if (field.get('meta')) {
        value = this.props.entry.getIn(['meta', field.get('name')]);
      }

      const nestedFields = field.get('fields');
      const singleField = field.get('field');
      const metadata = fieldsMetaData && fieldsMetaData.get(field.get('name'), (0, _immutable.Map)());

      if (nestedFields) {
        field = field.set('fields', this.getNestedWidgets(nestedFields, value, metadata));
      }

      if (singleField) {
        field = field.set('field', this.getSingleNested(singleField, value, metadata));
      }

      const labelledWidgets = ['string', 'text', 'number'];
      const inferedField = Object.entries(this.inferedFields).filter(([key]) => {
        const fieldToMatch = (0, _collections.selectField)(this.props.collection, key);
        return fieldToMatch === field;
      }).map(([, value]) => value)[0];

      if (inferedField) {
        value = inferedField.defaultPreview(value);
      } else if (value && labelledWidgets.indexOf(field.get('widget')) !== -1 && value.toString().length < 50) {
        value = (0, _core.jsx)("div", null, (0, _core.jsx)("strong", null, field.get('label', field.get('name')), ":"), " ", value);
      }

      return value ? this.getWidget(field, value, metadata, this.props) : null;
    });

    _defineProperty(this, "getNestedWidgets", (fields, values, fieldsMetaData) => {
      // Fields nested within a list field will be paired with a List of value Maps.
      if (_immutable.List.isList(values)) {
        return values.map(value => this.widgetsForNestedFields(fields, value, fieldsMetaData));
      } // Fields nested within an object field will be paired with a single Map of values.


      return this.widgetsForNestedFields(fields, values, fieldsMetaData);
    });

    _defineProperty(this, "getSingleNested", (field, values, fieldsMetaData) => {
      if (_immutable.List.isList(values)) {
        return values.map((value, idx) => this.getWidget(field, value, fieldsMetaData.get(field.get('name')), this.props, idx));
      }

      return this.getWidget(field, values, fieldsMetaData.get(field.get('name')), this.props);
    });

    _defineProperty(this, "widgetsForNestedFields", (fields, values, fieldsMetaData) => {
      return fields.map(field => this.widgetFor(field.get('name'), fields, values, fieldsMetaData));
    });

    _defineProperty(this, "widgetsFor", name => {
      const {
        fields,
        entry,
        fieldsMetaData
      } = this.props;
      const field = fields.find(f => f.get('name') === name);
      const nestedFields = field && field.get('fields');
      const value = entry.getIn(['data', field.get('name')]);
      const metadata = fieldsMetaData.get(field.get('name'), (0, _immutable.Map)());

      if (_immutable.List.isList(value)) {
        return value.map(val => {
          const widgets = nestedFields && (0, _immutable.Map)(nestedFields.map((f, i) => [f.get('name'), (0, _core.jsx)("div", {
            key: i
          }, this.getWidget(f, val, metadata.get(f.get('name')), this.props))]));
          return (0, _immutable.Map)({
            data: val,
            widgets
          });
        });
      }

      return (0, _immutable.Map)({
        data: value,
        widgets: nestedFields && (0, _immutable.Map)(nestedFields.map(f => [f.get('name'), this.getWidget(f, value, metadata.get(f.get('name')), this.props)]))
      });
    });
  }

  inferFields() {
    const titleField = (0, _collections.selectInferedField)(this.props.collection, 'title');
    const shortTitleField = (0, _collections.selectInferedField)(this.props.collection, 'shortTitle');
    const authorField = (0, _collections.selectInferedField)(this.props.collection, 'author');
    this.inferedFields = {};
    if (titleField) this.inferedFields[titleField] = _fieldInference.INFERABLE_FIELDS.title;
    if (shortTitleField) this.inferedFields[shortTitleField] = _fieldInference.INFERABLE_FIELDS.shortTitle;
    if (authorField) this.inferedFields[authorField] = _fieldInference.INFERABLE_FIELDS.author;
  }
  /**
   * Returns the widget component for a named field, and makes recursive calls
   * to retrieve components for nested and deeply nested fields, which occur in
   * object and list type fields. Used internally to retrieve widgets, and also
   * exposed for use in custom preview templates.
   */


  render() {
    const {
      entry,
      collection,
      config
    } = this.props;

    if (!entry || !entry.get('data')) {
      return null;
    }

    const previewComponent = (0, _registry.getPreviewTemplate)((0, _collections.selectTemplateName)(collection, entry.get('slug'))) || _EditorPreview.default;

    this.inferFields();

    const previewProps = _objectSpread(_objectSpread({}, this.props), {}, {
      widgetFor: this.widgetFor,
      widgetsFor: this.widgetsFor
    });

    const styleEls = (0, _registry.getPreviewStyles)().map((style, i) => {
      if (style.raw) {
        return (0, _core.jsx)("style", {
          key: i
        }, style.value);
      }

      return (0, _core.jsx)("link", {
        key: i,
        href: style.value,
        type: "text/css",
        rel: "stylesheet"
      });
    });

    if (!collection) {
      (0, _core.jsx)(PreviewPaneFrame, {
        id: "preview-pane",
        head: styleEls
      });
    }

    const initialContent = `
<!DOCTYPE html>
<html>
  <head><base target="_blank"/></head>
  <body><div></div></body>
</html>
`;
    return (0, _core.jsx)(_UI.ErrorBoundary, {
      config: config
    }, (0, _core.jsx)(PreviewPaneFrame, {
      id: "preview-pane",
      head: styleEls,
      initialContent: initialContent
    }, (0, _core.jsx)(_reactFrameComponent.FrameContextConsumer, null, ({
      document,
      window
    }) => {
      return (0, _core.jsx)(_EditorPreviewContent.default, {
        previewComponent,
        previewProps: _objectSpread(_objectSpread({}, previewProps), {}, {
          document,
          window
        })
      });
    })));
  }

}

exports.PreviewPane = PreviewPane;
PreviewPane.propTypes = {
  collection: _reactImmutableProptypes.default.map.isRequired,
  fields: _reactImmutableProptypes.default.list.isRequired,
  entry: _reactImmutableProptypes.default.map.isRequired,
  fieldsMetaData: _reactImmutableProptypes.default.map.isRequired,
  getAsset: _propTypes.default.func.isRequired
};

const mapStateToProps = state => {
  const isLoadingAsset = (0, _medias.selectIsLoadingAsset)(state.medias);
  return {
    isLoadingAsset,
    config: state.config
  };
};

const mapDispatchToProps = dispatch => {
  return {
    boundGetAsset: (collection, entry) => (0, _media.boundGetAsset)(dispatch, collection, entry)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, stateProps), dispatchProps), ownProps), {}, {
    getAsset: dispatchProps.boundGetAsset(ownProps.collection, ownProps.entry)
  });
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, mergeProps)(PreviewPane);

exports.default = _default;