"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.mergeMediaConfig = void 0;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _debounce2 = _interopRequireDefault(require("lodash/debounce"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _immutable = require("immutable");

var _core = require("@emotion/core");

var _slate = require("slate");

var _slateReact = require("slate-react");

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

var _styles = require("../styles");

var _serializers = require("../serializers");

var _Toolbar = _interopRequireDefault(require("../MarkdownControl/Toolbar"));

var _renderers = require("./renderers");

var _visual = _interopRequireDefault(require("./plugins/visual"));

var _schema = _interopRequireDefault(require("./schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

const visualEditorStyles = ({
  minimal
}) => `
  position: relative;
  overflow: hidden;
  overflow-x: auto;
  font-family: ${_netlifyCmsUiDefault.fonts.primary};
  min-height: ${minimal ? 'auto' : _netlifyCmsUiDefault.lengths.richTextEditorMinHeight};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top: 0;
  margin-top: -${_styles.editorStyleVars.stickyDistanceBottom};
  padding: 0;
  display: flex;
  flex-direction: column;
  z-index: ${_netlifyCmsUiDefault.zIndex.zIndex100};
`;

const InsertionPoint = (0, _styledBase.default)("div", {
  target: "evezps90",
  label: "InsertionPoint"
})(process.env.NODE_ENV === "production" ? {
  name: "b2d31m",
  styles: "flex:1 1 auto;cursor:text;"
} : {
  name: "b2d31m",
  styles: "flex:1 1 auto;cursor:text;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9NYXJrZG93bkNvbnRyb2wvVmlzdWFsRWRpdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWlDaUMiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL01hcmtkb3duQ29udHJvbC9WaXN1YWxFZGl0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgeyBmcm9tSlMgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgY3NzIGFzIGNvcmVDc3MsIENsYXNzTmFtZXMgfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbmltcG9ydCB7IGdldCwgaXNFbXB0eSwgZGVib3VuY2UgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgVmFsdWUsIERvY3VtZW50LCBCbG9jaywgVGV4dCB9IGZyb20gJ3NsYXRlJztcbmltcG9ydCB7IEVkaXRvciBhcyBTbGF0ZSB9IGZyb20gJ3NsYXRlLXJlYWN0JztcbmltcG9ydCB7IGxlbmd0aHMsIGZvbnRzLCB6SW5kZXggfSBmcm9tICduZXRsaWZ5LWNtcy11aS1kZWZhdWx0JztcbmltcG9ydCB7IGVkaXRvclN0eWxlVmFycywgRWRpdG9yQ29udHJvbEJhciB9IGZyb20gJy4uL3N0eWxlcyc7XG5pbXBvcnQgeyBzbGF0ZVRvTWFya2Rvd24sIG1hcmtkb3duVG9TbGF0ZSB9IGZyb20gJy4uL3NlcmlhbGl6ZXJzJztcbmltcG9ydCBUb29sYmFyIGZyb20gJy4uL01hcmtkb3duQ29udHJvbC9Ub29sYmFyJztcbmltcG9ydCB7IHJlbmRlckJsb2NrLCByZW5kZXJJbmxpbmUsIHJlbmRlck1hcmsgfSBmcm9tICcuL3JlbmRlcmVycyc7XG5pbXBvcnQgcGx1Z2lucyBmcm9tICcuL3BsdWdpbnMvdmlzdWFsJztcbmltcG9ydCBzY2hlbWEgZnJvbSAnLi9zY2hlbWEnO1xuXG5jb25zdCB2aXN1YWxFZGl0b3JTdHlsZXMgPSAoeyBtaW5pbWFsIH0pID0+IGBcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBvdmVyZmxvdy14OiBhdXRvO1xuICBmb250LWZhbWlseTogJHtmb250cy5wcmltYXJ5fTtcbiAgbWluLWhlaWdodDogJHttaW5pbWFsID8gJ2F1dG8nIDogbGVuZ3Rocy5yaWNoVGV4dEVkaXRvck1pbkhlaWdodH07XG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDA7XG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAwO1xuICBib3JkZXItdG9wOiAwO1xuICBtYXJnaW4tdG9wOiAtJHtlZGl0b3JTdHlsZVZhcnMuc3RpY2t5RGlzdGFuY2VCb3R0b219O1xuICBwYWRkaW5nOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB6LWluZGV4OiAke3pJbmRleC56SW5kZXgxMDB9O1xuYDtcblxuY29uc3QgSW5zZXJ0aW9uUG9pbnQgPSBzdHlsZWQuZGl2YFxuICBmbGV4OiAxIDEgYXV0bztcbiAgY3Vyc29yOiB0ZXh0O1xuYDtcblxuY29uc3QgY3JlYXRlRW1wdHlSYXdEb2MgPSAoKSA9PiB7XG4gIGNvbnN0IGVtcHR5VGV4dCA9IFRleHQuY3JlYXRlKCcnKTtcbiAgY29uc3QgZW1wdHlCbG9jayA9IEJsb2NrLmNyZWF0ZSh7IG9iamVjdDogJ2Jsb2NrJywgdHlwZTogJ3BhcmFncmFwaCcsIG5vZGVzOiBbZW1wdHlUZXh0XSB9KTtcbiAgcmV0dXJuIHsgbm9kZXM6IFtlbXB0eUJsb2NrXSB9O1xufTtcblxuY29uc3QgY3JlYXRlU2xhdGVWYWx1ZSA9IChyYXdWYWx1ZSwgeyB2b2lkQ29kZUJsb2NrIH0pID0+IHtcbiAgY29uc3QgcmF3RG9jID0gcmF3VmFsdWUgJiYgbWFya2Rvd25Ub1NsYXRlKHJhd1ZhbHVlLCB7IHZvaWRDb2RlQmxvY2sgfSk7XG4gIGNvbnN0IHJhd0RvY0hhc05vZGVzID0gIWlzRW1wdHkoZ2V0KHJhd0RvYywgJ25vZGVzJykpO1xuICBjb25zdCBkb2N1bWVudCA9IERvY3VtZW50LmZyb21KU09OKHJhd0RvY0hhc05vZGVzID8gcmF3RG9jIDogY3JlYXRlRW1wdHlSYXdEb2MoKSk7XG4gIHJldHVybiBWYWx1ZS5jcmVhdGUoeyBkb2N1bWVudCB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBtZXJnZU1lZGlhQ29uZmlnID0gKGVkaXRvckNvbXBvbmVudHMsIGZpZWxkKSA9PiB7XG4gIC8vIG1lcmdlIGVkaXRvciBtZWRpYSBsaWJyYXJ5IGNvbmZpZyB0byBpbWFnZSBjb21wb25lbnRzXG4gIGlmIChlZGl0b3JDb21wb25lbnRzLmhhcygnaW1hZ2UnKSkge1xuICAgIGNvbnN0IGltYWdlQ29tcG9uZW50ID0gZWRpdG9yQ29tcG9uZW50cy5nZXQoJ2ltYWdlJyk7XG4gICAgY29uc3QgZmllbGRzID0gaW1hZ2VDb21wb25lbnQ/LmZpZWxkcztcblxuICAgIGlmIChmaWVsZHMpIHtcbiAgICAgIGltYWdlQ29tcG9uZW50LmZpZWxkcyA9IGZpZWxkcy51cGRhdGUoXG4gICAgICAgIGZpZWxkcy5maW5kSW5kZXgoZiA9PiBmLmdldCgnd2lkZ2V0JykgPT09ICdpbWFnZScpLFxuICAgICAgICBmID0+IHtcbiAgICAgICAgICAvLyBtZXJnZSBgbWVkaWFfbGlicmFyeWAgY29uZmlnXG4gICAgICAgICAgaWYgKGZpZWxkLmhhcygnbWVkaWFfbGlicmFyeScpKSB7XG4gICAgICAgICAgICBmID0gZi5zZXQoXG4gICAgICAgICAgICAgICdtZWRpYV9saWJyYXJ5JyxcbiAgICAgICAgICAgICAgZmllbGQuZ2V0KCdtZWRpYV9saWJyYXJ5JykubWVyZ2VEZWVwKGYuZ2V0KCdtZWRpYV9saWJyYXJ5JykpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gbWVyZ2UgJ21lZGlhX2ZvbGRlcidcbiAgICAgICAgICBpZiAoZmllbGQuaGFzKCdtZWRpYV9mb2xkZXInKSAmJiAhZi5oYXMoJ21lZGlhX2ZvbGRlcicpKSB7XG4gICAgICAgICAgICBmID0gZi5zZXQoJ21lZGlhX2ZvbGRlcicsIGZpZWxkLmdldCgnbWVkaWFfZm9sZGVyJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBtZXJnZSAncHVibGljX2ZvbGRlcidcbiAgICAgICAgICBpZiAoZmllbGQuaGFzKCdwdWJsaWNfZm9sZGVyJykgJiYgIWYuaGFzKCdwdWJsaWNfZm9sZGVyJykpIHtcbiAgICAgICAgICAgIGYgPSBmLnNldCgncHVibGljX2ZvbGRlcicsIGZpZWxkLmdldCgncHVibGljX2ZvbGRlcicpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGY7XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc3QgZWRpdG9yQ29tcG9uZW50cyA9IHByb3BzLmdldEVkaXRvckNvbXBvbmVudHMoKTtcbiAgICB0aGlzLnNob3J0Y29kZUNvbXBvbmVudHMgPSBlZGl0b3JDb21wb25lbnRzLmZpbHRlcigoeyB0eXBlIH0pID0+IHR5cGUgPT09ICdzaG9ydGNvZGUnKTtcbiAgICB0aGlzLmNvZGVCbG9ja0NvbXBvbmVudCA9IGZyb21KUyhlZGl0b3JDb21wb25lbnRzLmZpbmQoKHsgdHlwZSB9KSA9PiB0eXBlID09PSAnY29kZS1ibG9jaycpKTtcbiAgICB0aGlzLmVkaXRvckNvbXBvbmVudHMgPVxuICAgICAgdGhpcy5jb2RlQmxvY2tDb21wb25lbnQgfHwgZWRpdG9yQ29tcG9uZW50cy5oYXMoJ2NvZGUtYmxvY2snKVxuICAgICAgICA/IGVkaXRvckNvbXBvbmVudHNcbiAgICAgICAgOiBlZGl0b3JDb21wb25lbnRzLnNldCgnY29kZS1ibG9jaycsIHsgbGFiZWw6ICdDb2RlIEJsb2NrJywgdHlwZTogJ2NvZGUtYmxvY2snIH0pO1xuXG4gICAgbWVyZ2VNZWRpYUNvbmZpZyh0aGlzLmVkaXRvckNvbXBvbmVudHMsIHRoaXMucHJvcHMuZmllbGQpO1xuICAgIHRoaXMucmVuZGVyQmxvY2sgPSByZW5kZXJCbG9jayh7XG4gICAgICBjbGFzc05hbWVXcmFwcGVyOiBwcm9wcy5jbGFzc05hbWUsXG4gICAgICByZXNvbHZlV2lkZ2V0OiBwcm9wcy5yZXNvbHZlV2lkZ2V0LFxuICAgICAgY29kZUJsb2NrQ29tcG9uZW50OiB0aGlzLmNvZGVCbG9ja0NvbXBvbmVudCxcbiAgICB9KTtcbiAgICB0aGlzLnJlbmRlcklubGluZSA9IHJlbmRlcklubGluZSgpO1xuICAgIHRoaXMucmVuZGVyTWFyayA9IHJlbmRlck1hcmsoKTtcbiAgICB0aGlzLnNjaGVtYSA9IHNjaGVtYSh7IHZvaWRDb2RlQmxvY2s6ICEhdGhpcy5jb2RlQmxvY2tDb21wb25lbnQgfSk7XG4gICAgdGhpcy5wbHVnaW5zID0gcGx1Z2lucyh7XG4gICAgICBnZXRBc3NldDogcHJvcHMuZ2V0QXNzZXQsXG4gICAgICByZXNvbHZlV2lkZ2V0OiBwcm9wcy5yZXNvbHZlV2lkZ2V0LFxuICAgICAgdDogcHJvcHMudCxcbiAgICB9KTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmFsdWU6IGNyZWF0ZVNsYXRlVmFsdWUodGhpcy5wcm9wcy52YWx1ZSwgeyB2b2lkQ29kZUJsb2NrOiAhIXRoaXMuY29kZUJsb2NrQ29tcG9uZW50IH0pLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG9uQWRkQXNzZXQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZ2V0QXNzZXQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25Nb2RlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZpZWxkOiBJbW11dGFibGVQcm9wVHlwZXMubWFwLmlzUmVxdWlyZWQsXG4gICAgZ2V0RWRpdG9yQ29tcG9uZW50czogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBpc1Nob3dNb2RlVG9nZ2xlOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgY29uc3QgcmF3ID0gbmV4dFN0YXRlLnZhbHVlLmRvY3VtZW50LnRvSlMoKTtcbiAgICBjb25zdCBtYXJrZG93biA9IHNsYXRlVG9NYXJrZG93bihyYXcsIHsgdm9pZENvZGVCbG9jazogdGhpcy5jb2RlQmxvY2tDb21wb25lbnQgfSk7XG4gICAgcmV0dXJuICF0aGlzLnN0YXRlLnZhbHVlLmVxdWFscyhuZXh0U3RhdGUudmFsdWUpIHx8IG5leHRQcm9wcy52YWx1ZSAhPT0gbWFya2Rvd247XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5wZW5kaW5nRm9jdXMpIHtcbiAgICAgIHRoaXMuZWRpdG9yLmZvY3VzKCk7XG4gICAgICB0aGlzLnByb3BzLnBlbmRpbmdGb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICBpZiAocHJldlByb3BzLnZhbHVlICE9PSB0aGlzLnByb3BzLnZhbHVlKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdmFsdWU6IGNyZWF0ZVNsYXRlVmFsdWUodGhpcy5wcm9wcy52YWx1ZSwgeyB2b2lkQ29kZUJsb2NrOiAhIXRoaXMuY29kZUJsb2NrQ29tcG9uZW50IH0pLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlTWFya0NsaWNrID0gdHlwZSA9PiB7XG4gICAgdGhpcy5lZGl0b3IudG9nZ2xlTWFyayh0eXBlKS5mb2N1cygpO1xuICB9O1xuXG4gIGhhbmRsZUJsb2NrQ2xpY2sgPSB0eXBlID0+IHtcbiAgICB0aGlzLmVkaXRvci50b2dnbGVCbG9jayh0eXBlKS5mb2N1cygpO1xuICB9O1xuXG4gIGhhbmRsZUxpbmtDbGljayA9ICgpID0+IHtcbiAgICB0aGlzLmVkaXRvci50b2dnbGVMaW5rKCgpID0+XG4gICAgICB3aW5kb3cucHJvbXB0KHRoaXMucHJvcHMudCgnZWRpdG9yLmVkaXRvcldpZGdldHMubWFya2Rvd24ubGlua1Byb21wdCcpKSxcbiAgICApO1xuICB9O1xuXG4gIGhhc01hcmsgPSB0eXBlID0+IHRoaXMuZWRpdG9yICYmIHRoaXMuZWRpdG9yLmhhc01hcmsodHlwZSk7XG4gIGhhc0lubGluZSA9IHR5cGUgPT4gdGhpcy5lZGl0b3IgJiYgdGhpcy5lZGl0b3IuaGFzSW5saW5lKHR5cGUpO1xuICBoYXNCbG9jayA9IHR5cGUgPT4gdGhpcy5lZGl0b3IgJiYgdGhpcy5lZGl0b3IuaGFzQmxvY2sodHlwZSk7XG5cbiAgaGFuZGxlVG9nZ2xlTW9kZSA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uTW9kZSgncmF3Jyk7XG4gIH07XG5cbiAgaGFuZGxlSW5zZXJ0U2hvcnRjb2RlID0gcGx1Z2luQ29uZmlnID0+IHtcbiAgICB0aGlzLmVkaXRvci5pbnNlcnRTaG9ydGNvZGUocGx1Z2luQ29uZmlnKTtcbiAgfTtcblxuICBoYW5kbGVDbGlja0JlbG93RG9jdW1lbnQgPSAoKSA9PiB7XG4gICAgdGhpcy5lZGl0b3IubW92ZVRvRW5kT2ZEb2N1bWVudCgpO1xuICB9O1xuXG4gIGhhbmRsZURvY3VtZW50Q2hhbmdlID0gZGVib3VuY2UoZWRpdG9yID0+IHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHJhdyA9IGVkaXRvci52YWx1ZS5kb2N1bWVudC50b0pTKCk7XG4gICAgY29uc3QgbWFya2Rvd24gPSBzbGF0ZVRvTWFya2Rvd24ocmF3LCB7IHZvaWRDb2RlQmxvY2s6IHRoaXMuY29kZUJsb2NrQ29tcG9uZW50IH0pO1xuICAgIG9uQ2hhbmdlKG1hcmtkb3duKTtcbiAgfSwgMTUwKTtcblxuICBoYW5kbGVDaGFuZ2UgPSBlZGl0b3IgPT4ge1xuICAgIGlmICghdGhpcy5zdGF0ZS52YWx1ZS5kb2N1bWVudC5lcXVhbHMoZWRpdG9yLnZhbHVlLmRvY3VtZW50KSkge1xuICAgICAgdGhpcy5oYW5kbGVEb2N1bWVudENoYW5nZShlZGl0b3IpO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IGVkaXRvci52YWx1ZSB9KTtcbiAgfTtcblxuICBwcm9jZXNzUmVmID0gcmVmID0+IHtcbiAgICB0aGlzLmVkaXRvciA9IHJlZjtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBvbkFkZEFzc2V0LCBnZXRBc3NldCwgY2xhc3NOYW1lLCBmaWVsZCwgaXNTaG93TW9kZVRvZ2dsZSwgdCwgaXNEaXNhYmxlZCB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjc3M9e2NvcmVDc3NgXG4gICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBgfVxuICAgICAgPlxuICAgICAgICA8RWRpdG9yQ29udHJvbEJhcj5cbiAgICAgICAgICA8VG9vbGJhclxuICAgICAgICAgICAgb25NYXJrQ2xpY2s9e3RoaXMuaGFuZGxlTWFya0NsaWNrfVxuICAgICAgICAgICAgb25CbG9ja0NsaWNrPXt0aGlzLmhhbmRsZUJsb2NrQ2xpY2t9XG4gICAgICAgICAgICBvbkxpbmtDbGljaz17dGhpcy5oYW5kbGVMaW5rQ2xpY2t9XG4gICAgICAgICAgICBvblRvZ2dsZU1vZGU9e3RoaXMuaGFuZGxlVG9nZ2xlTW9kZX1cbiAgICAgICAgICAgIHBsdWdpbnM9e3RoaXMuZWRpdG9yQ29tcG9uZW50c31cbiAgICAgICAgICAgIG9uU3VibWl0PXt0aGlzLmhhbmRsZUluc2VydFNob3J0Y29kZX1cbiAgICAgICAgICAgIG9uQWRkQXNzZXQ9e29uQWRkQXNzZXR9XG4gICAgICAgICAgICBnZXRBc3NldD17Z2V0QXNzZXR9XG4gICAgICAgICAgICBidXR0b25zPXtmaWVsZC5nZXQoJ2J1dHRvbnMnKX1cbiAgICAgICAgICAgIGVkaXRvckNvbXBvbmVudHM9e2ZpZWxkLmdldCgnZWRpdG9yX2NvbXBvbmVudHMnKX1cbiAgICAgICAgICAgIGhhc01hcms9e3RoaXMuaGFzTWFya31cbiAgICAgICAgICAgIGhhc0lubGluZT17dGhpcy5oYXNJbmxpbmV9XG4gICAgICAgICAgICBoYXNCbG9jaz17dGhpcy5oYXNCbG9ja31cbiAgICAgICAgICAgIGlzU2hvd01vZGVUb2dnbGU9e2lzU2hvd01vZGVUb2dnbGV9XG4gICAgICAgICAgICB0PXt0fVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2lzRGlzYWJsZWR9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9FZGl0b3JDb250cm9sQmFyPlxuICAgICAgICA8Q2xhc3NOYW1lcz5cbiAgICAgICAgICB7KHsgY3NzLCBjeCB9KSA9PiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIGNzc2BcbiAgICAgICAgICAgICAgICAgICR7dmlzdWFsRWRpdG9yU3R5bGVzKHsgbWluaW1hbDogZmllbGQuZ2V0KCdtaW5pbWFsJykgfSl9XG4gICAgICAgICAgICAgICAgYCxcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFNsYXRlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjc3NgXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nOiAxNnB4IDIwcHggMDtcbiAgICAgICAgICAgICAgICBgfVxuICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfVxuICAgICAgICAgICAgICAgIHJlbmRlckJsb2NrPXt0aGlzLnJlbmRlckJsb2NrfVxuICAgICAgICAgICAgICAgIHJlbmRlcklubGluZT17dGhpcy5yZW5kZXJJbmxpbmV9XG4gICAgICAgICAgICAgICAgcmVuZGVyTWFyaz17dGhpcy5yZW5kZXJNYXJrfVxuICAgICAgICAgICAgICAgIHNjaGVtYT17dGhpcy5zY2hlbWF9XG4gICAgICAgICAgICAgICAgcGx1Z2lucz17dGhpcy5wbHVnaW5zfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgICByZWY9e3RoaXMucHJvY2Vzc1JlZn1cbiAgICAgICAgICAgICAgICBzcGVsbENoZWNrXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxJbnNlcnRpb25Qb2ludCBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrQmVsb3dEb2N1bWVudH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQ2xhc3NOYW1lcz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});

const createEmptyRawDoc = () => {
  const emptyText = _slate.Text.create('');

  const emptyBlock = _slate.Block.create({
    object: 'block',
    type: 'paragraph',
    nodes: [emptyText]
  });

  return {
    nodes: [emptyBlock]
  };
};

const createSlateValue = (rawValue, {
  voidCodeBlock
}) => {
  const rawDoc = rawValue && (0, _serializers.markdownToSlate)(rawValue, {
    voidCodeBlock
  });
  const rawDocHasNodes = !(0, _isEmpty2.default)((0, _get2.default)(rawDoc, 'nodes'));

  const document = _slate.Document.fromJSON(rawDocHasNodes ? rawDoc : createEmptyRawDoc());

  return _slate.Value.create({
    document
  });
};

const mergeMediaConfig = (editorComponents, field) => {
  // merge editor media library config to image components
  if (editorComponents.has('image')) {
    const imageComponent = editorComponents.get('image');
    const fields = imageComponent === null || imageComponent === void 0 ? void 0 : imageComponent.fields;

    if (fields) {
      imageComponent.fields = fields.update(fields.findIndex(f => f.get('widget') === 'image'), f => {
        // merge `media_library` config
        if (field.has('media_library')) {
          f = f.set('media_library', field.get('media_library').mergeDeep(f.get('media_library')));
        } // merge 'media_folder'


        if (field.has('media_folder') && !f.has('media_folder')) {
          f = f.set('media_folder', field.get('media_folder'));
        } // merge 'public_folder'


        if (field.has('public_folder') && !f.has('public_folder')) {
          f = f.set('public_folder', field.get('public_folder'));
        }

        return f;
      });
    }
  }
};

exports.mergeMediaConfig = mergeMediaConfig;

var _ref = process.env.NODE_ENV === "production" ? {
  name: "t5h4ts-Editor",
  styles: "position:relative;;label:Editor;"
} : {
  name: "t5h4ts-Editor",
  styles: "position:relative;;label:Editor;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9NYXJrZG93bkNvbnRyb2wvVmlzdWFsRWRpdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVNb0IiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL01hcmtkb3duQ29udHJvbC9WaXN1YWxFZGl0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgeyBmcm9tSlMgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgY3NzIGFzIGNvcmVDc3MsIENsYXNzTmFtZXMgfSBmcm9tICdAZW1vdGlvbi9jb3JlJztcbmltcG9ydCB7IGdldCwgaXNFbXB0eSwgZGVib3VuY2UgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgVmFsdWUsIERvY3VtZW50LCBCbG9jaywgVGV4dCB9IGZyb20gJ3NsYXRlJztcbmltcG9ydCB7IEVkaXRvciBhcyBTbGF0ZSB9IGZyb20gJ3NsYXRlLXJlYWN0JztcbmltcG9ydCB7IGxlbmd0aHMsIGZvbnRzLCB6SW5kZXggfSBmcm9tICduZXRsaWZ5LWNtcy11aS1kZWZhdWx0JztcbmltcG9ydCB7IGVkaXRvclN0eWxlVmFycywgRWRpdG9yQ29udHJvbEJhciB9IGZyb20gJy4uL3N0eWxlcyc7XG5pbXBvcnQgeyBzbGF0ZVRvTWFya2Rvd24sIG1hcmtkb3duVG9TbGF0ZSB9IGZyb20gJy4uL3NlcmlhbGl6ZXJzJztcbmltcG9ydCBUb29sYmFyIGZyb20gJy4uL01hcmtkb3duQ29udHJvbC9Ub29sYmFyJztcbmltcG9ydCB7IHJlbmRlckJsb2NrLCByZW5kZXJJbmxpbmUsIHJlbmRlck1hcmsgfSBmcm9tICcuL3JlbmRlcmVycyc7XG5pbXBvcnQgcGx1Z2lucyBmcm9tICcuL3BsdWdpbnMvdmlzdWFsJztcbmltcG9ydCBzY2hlbWEgZnJvbSAnLi9zY2hlbWEnO1xuXG5jb25zdCB2aXN1YWxFZGl0b3JTdHlsZXMgPSAoeyBtaW5pbWFsIH0pID0+IGBcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBvdmVyZmxvdy14OiBhdXRvO1xuICBmb250LWZhbWlseTogJHtmb250cy5wcmltYXJ5fTtcbiAgbWluLWhlaWdodDogJHttaW5pbWFsID8gJ2F1dG8nIDogbGVuZ3Rocy5yaWNoVGV4dEVkaXRvck1pbkhlaWdodH07XG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDA7XG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAwO1xuICBib3JkZXItdG9wOiAwO1xuICBtYXJnaW4tdG9wOiAtJHtlZGl0b3JTdHlsZVZhcnMuc3RpY2t5RGlzdGFuY2VCb3R0b219O1xuICBwYWRkaW5nOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB6LWluZGV4OiAke3pJbmRleC56SW5kZXgxMDB9O1xuYDtcblxuY29uc3QgSW5zZXJ0aW9uUG9pbnQgPSBzdHlsZWQuZGl2YFxuICBmbGV4OiAxIDEgYXV0bztcbiAgY3Vyc29yOiB0ZXh0O1xuYDtcblxuY29uc3QgY3JlYXRlRW1wdHlSYXdEb2MgPSAoKSA9PiB7XG4gIGNvbnN0IGVtcHR5VGV4dCA9IFRleHQuY3JlYXRlKCcnKTtcbiAgY29uc3QgZW1wdHlCbG9jayA9IEJsb2NrLmNyZWF0ZSh7IG9iamVjdDogJ2Jsb2NrJywgdHlwZTogJ3BhcmFncmFwaCcsIG5vZGVzOiBbZW1wdHlUZXh0XSB9KTtcbiAgcmV0dXJuIHsgbm9kZXM6IFtlbXB0eUJsb2NrXSB9O1xufTtcblxuY29uc3QgY3JlYXRlU2xhdGVWYWx1ZSA9IChyYXdWYWx1ZSwgeyB2b2lkQ29kZUJsb2NrIH0pID0+IHtcbiAgY29uc3QgcmF3RG9jID0gcmF3VmFsdWUgJiYgbWFya2Rvd25Ub1NsYXRlKHJhd1ZhbHVlLCB7IHZvaWRDb2RlQmxvY2sgfSk7XG4gIGNvbnN0IHJhd0RvY0hhc05vZGVzID0gIWlzRW1wdHkoZ2V0KHJhd0RvYywgJ25vZGVzJykpO1xuICBjb25zdCBkb2N1bWVudCA9IERvY3VtZW50LmZyb21KU09OKHJhd0RvY0hhc05vZGVzID8gcmF3RG9jIDogY3JlYXRlRW1wdHlSYXdEb2MoKSk7XG4gIHJldHVybiBWYWx1ZS5jcmVhdGUoeyBkb2N1bWVudCB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBtZXJnZU1lZGlhQ29uZmlnID0gKGVkaXRvckNvbXBvbmVudHMsIGZpZWxkKSA9PiB7XG4gIC8vIG1lcmdlIGVkaXRvciBtZWRpYSBsaWJyYXJ5IGNvbmZpZyB0byBpbWFnZSBjb21wb25lbnRzXG4gIGlmIChlZGl0b3JDb21wb25lbnRzLmhhcygnaW1hZ2UnKSkge1xuICAgIGNvbnN0IGltYWdlQ29tcG9uZW50ID0gZWRpdG9yQ29tcG9uZW50cy5nZXQoJ2ltYWdlJyk7XG4gICAgY29uc3QgZmllbGRzID0gaW1hZ2VDb21wb25lbnQ/LmZpZWxkcztcblxuICAgIGlmIChmaWVsZHMpIHtcbiAgICAgIGltYWdlQ29tcG9uZW50LmZpZWxkcyA9IGZpZWxkcy51cGRhdGUoXG4gICAgICAgIGZpZWxkcy5maW5kSW5kZXgoZiA9PiBmLmdldCgnd2lkZ2V0JykgPT09ICdpbWFnZScpLFxuICAgICAgICBmID0+IHtcbiAgICAgICAgICAvLyBtZXJnZSBgbWVkaWFfbGlicmFyeWAgY29uZmlnXG4gICAgICAgICAgaWYgKGZpZWxkLmhhcygnbWVkaWFfbGlicmFyeScpKSB7XG4gICAgICAgICAgICBmID0gZi5zZXQoXG4gICAgICAgICAgICAgICdtZWRpYV9saWJyYXJ5JyxcbiAgICAgICAgICAgICAgZmllbGQuZ2V0KCdtZWRpYV9saWJyYXJ5JykubWVyZ2VEZWVwKGYuZ2V0KCdtZWRpYV9saWJyYXJ5JykpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gbWVyZ2UgJ21lZGlhX2ZvbGRlcidcbiAgICAgICAgICBpZiAoZmllbGQuaGFzKCdtZWRpYV9mb2xkZXInKSAmJiAhZi5oYXMoJ21lZGlhX2ZvbGRlcicpKSB7XG4gICAgICAgICAgICBmID0gZi5zZXQoJ21lZGlhX2ZvbGRlcicsIGZpZWxkLmdldCgnbWVkaWFfZm9sZGVyJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBtZXJnZSAncHVibGljX2ZvbGRlcidcbiAgICAgICAgICBpZiAoZmllbGQuaGFzKCdwdWJsaWNfZm9sZGVyJykgJiYgIWYuaGFzKCdwdWJsaWNfZm9sZGVyJykpIHtcbiAgICAgICAgICAgIGYgPSBmLnNldCgncHVibGljX2ZvbGRlcicsIGZpZWxkLmdldCgncHVibGljX2ZvbGRlcicpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGY7XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc3QgZWRpdG9yQ29tcG9uZW50cyA9IHByb3BzLmdldEVkaXRvckNvbXBvbmVudHMoKTtcbiAgICB0aGlzLnNob3J0Y29kZUNvbXBvbmVudHMgPSBlZGl0b3JDb21wb25lbnRzLmZpbHRlcigoeyB0eXBlIH0pID0+IHR5cGUgPT09ICdzaG9ydGNvZGUnKTtcbiAgICB0aGlzLmNvZGVCbG9ja0NvbXBvbmVudCA9IGZyb21KUyhlZGl0b3JDb21wb25lbnRzLmZpbmQoKHsgdHlwZSB9KSA9PiB0eXBlID09PSAnY29kZS1ibG9jaycpKTtcbiAgICB0aGlzLmVkaXRvckNvbXBvbmVudHMgPVxuICAgICAgdGhpcy5jb2RlQmxvY2tDb21wb25lbnQgfHwgZWRpdG9yQ29tcG9uZW50cy5oYXMoJ2NvZGUtYmxvY2snKVxuICAgICAgICA/IGVkaXRvckNvbXBvbmVudHNcbiAgICAgICAgOiBlZGl0b3JDb21wb25lbnRzLnNldCgnY29kZS1ibG9jaycsIHsgbGFiZWw6ICdDb2RlIEJsb2NrJywgdHlwZTogJ2NvZGUtYmxvY2snIH0pO1xuXG4gICAgbWVyZ2VNZWRpYUNvbmZpZyh0aGlzLmVkaXRvckNvbXBvbmVudHMsIHRoaXMucHJvcHMuZmllbGQpO1xuICAgIHRoaXMucmVuZGVyQmxvY2sgPSByZW5kZXJCbG9jayh7XG4gICAgICBjbGFzc05hbWVXcmFwcGVyOiBwcm9wcy5jbGFzc05hbWUsXG4gICAgICByZXNvbHZlV2lkZ2V0OiBwcm9wcy5yZXNvbHZlV2lkZ2V0LFxuICAgICAgY29kZUJsb2NrQ29tcG9uZW50OiB0aGlzLmNvZGVCbG9ja0NvbXBvbmVudCxcbiAgICB9KTtcbiAgICB0aGlzLnJlbmRlcklubGluZSA9IHJlbmRlcklubGluZSgpO1xuICAgIHRoaXMucmVuZGVyTWFyayA9IHJlbmRlck1hcmsoKTtcbiAgICB0aGlzLnNjaGVtYSA9IHNjaGVtYSh7IHZvaWRDb2RlQmxvY2s6ICEhdGhpcy5jb2RlQmxvY2tDb21wb25lbnQgfSk7XG4gICAgdGhpcy5wbHVnaW5zID0gcGx1Z2lucyh7XG4gICAgICBnZXRBc3NldDogcHJvcHMuZ2V0QXNzZXQsXG4gICAgICByZXNvbHZlV2lkZ2V0OiBwcm9wcy5yZXNvbHZlV2lkZ2V0LFxuICAgICAgdDogcHJvcHMudCxcbiAgICB9KTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmFsdWU6IGNyZWF0ZVNsYXRlVmFsdWUodGhpcy5wcm9wcy52YWx1ZSwgeyB2b2lkQ29kZUJsb2NrOiAhIXRoaXMuY29kZUJsb2NrQ29tcG9uZW50IH0pLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG9uQWRkQXNzZXQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgZ2V0QXNzZXQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25Nb2RlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZpZWxkOiBJbW11dGFibGVQcm9wVHlwZXMubWFwLmlzUmVxdWlyZWQsXG4gICAgZ2V0RWRpdG9yQ29tcG9uZW50czogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBpc1Nob3dNb2RlVG9nZ2xlOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgY29uc3QgcmF3ID0gbmV4dFN0YXRlLnZhbHVlLmRvY3VtZW50LnRvSlMoKTtcbiAgICBjb25zdCBtYXJrZG93biA9IHNsYXRlVG9NYXJrZG93bihyYXcsIHsgdm9pZENvZGVCbG9jazogdGhpcy5jb2RlQmxvY2tDb21wb25lbnQgfSk7XG4gICAgcmV0dXJuICF0aGlzLnN0YXRlLnZhbHVlLmVxdWFscyhuZXh0U3RhdGUudmFsdWUpIHx8IG5leHRQcm9wcy52YWx1ZSAhPT0gbWFya2Rvd247XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5wZW5kaW5nRm9jdXMpIHtcbiAgICAgIHRoaXMuZWRpdG9yLmZvY3VzKCk7XG4gICAgICB0aGlzLnByb3BzLnBlbmRpbmdGb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICBpZiAocHJldlByb3BzLnZhbHVlICE9PSB0aGlzLnByb3BzLnZhbHVlKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdmFsdWU6IGNyZWF0ZVNsYXRlVmFsdWUodGhpcy5wcm9wcy52YWx1ZSwgeyB2b2lkQ29kZUJsb2NrOiAhIXRoaXMuY29kZUJsb2NrQ29tcG9uZW50IH0pLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlTWFya0NsaWNrID0gdHlwZSA9PiB7XG4gICAgdGhpcy5lZGl0b3IudG9nZ2xlTWFyayh0eXBlKS5mb2N1cygpO1xuICB9O1xuXG4gIGhhbmRsZUJsb2NrQ2xpY2sgPSB0eXBlID0+IHtcbiAgICB0aGlzLmVkaXRvci50b2dnbGVCbG9jayh0eXBlKS5mb2N1cygpO1xuICB9O1xuXG4gIGhhbmRsZUxpbmtDbGljayA9ICgpID0+IHtcbiAgICB0aGlzLmVkaXRvci50b2dnbGVMaW5rKCgpID0+XG4gICAgICB3aW5kb3cucHJvbXB0KHRoaXMucHJvcHMudCgnZWRpdG9yLmVkaXRvcldpZGdldHMubWFya2Rvd24ubGlua1Byb21wdCcpKSxcbiAgICApO1xuICB9O1xuXG4gIGhhc01hcmsgPSB0eXBlID0+IHRoaXMuZWRpdG9yICYmIHRoaXMuZWRpdG9yLmhhc01hcmsodHlwZSk7XG4gIGhhc0lubGluZSA9IHR5cGUgPT4gdGhpcy5lZGl0b3IgJiYgdGhpcy5lZGl0b3IuaGFzSW5saW5lKHR5cGUpO1xuICBoYXNCbG9jayA9IHR5cGUgPT4gdGhpcy5lZGl0b3IgJiYgdGhpcy5lZGl0b3IuaGFzQmxvY2sodHlwZSk7XG5cbiAgaGFuZGxlVG9nZ2xlTW9kZSA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uTW9kZSgncmF3Jyk7XG4gIH07XG5cbiAgaGFuZGxlSW5zZXJ0U2hvcnRjb2RlID0gcGx1Z2luQ29uZmlnID0+IHtcbiAgICB0aGlzLmVkaXRvci5pbnNlcnRTaG9ydGNvZGUocGx1Z2luQ29uZmlnKTtcbiAgfTtcblxuICBoYW5kbGVDbGlja0JlbG93RG9jdW1lbnQgPSAoKSA9PiB7XG4gICAgdGhpcy5lZGl0b3IubW92ZVRvRW5kT2ZEb2N1bWVudCgpO1xuICB9O1xuXG4gIGhhbmRsZURvY3VtZW50Q2hhbmdlID0gZGVib3VuY2UoZWRpdG9yID0+IHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHJhdyA9IGVkaXRvci52YWx1ZS5kb2N1bWVudC50b0pTKCk7XG4gICAgY29uc3QgbWFya2Rvd24gPSBzbGF0ZVRvTWFya2Rvd24ocmF3LCB7IHZvaWRDb2RlQmxvY2s6IHRoaXMuY29kZUJsb2NrQ29tcG9uZW50IH0pO1xuICAgIG9uQ2hhbmdlKG1hcmtkb3duKTtcbiAgfSwgMTUwKTtcblxuICBoYW5kbGVDaGFuZ2UgPSBlZGl0b3IgPT4ge1xuICAgIGlmICghdGhpcy5zdGF0ZS52YWx1ZS5kb2N1bWVudC5lcXVhbHMoZWRpdG9yLnZhbHVlLmRvY3VtZW50KSkge1xuICAgICAgdGhpcy5oYW5kbGVEb2N1bWVudENoYW5nZShlZGl0b3IpO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IGVkaXRvci52YWx1ZSB9KTtcbiAgfTtcblxuICBwcm9jZXNzUmVmID0gcmVmID0+IHtcbiAgICB0aGlzLmVkaXRvciA9IHJlZjtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBvbkFkZEFzc2V0LCBnZXRBc3NldCwgY2xhc3NOYW1lLCBmaWVsZCwgaXNTaG93TW9kZVRvZ2dsZSwgdCwgaXNEaXNhYmxlZCB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjc3M9e2NvcmVDc3NgXG4gICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBgfVxuICAgICAgPlxuICAgICAgICA8RWRpdG9yQ29udHJvbEJhcj5cbiAgICAgICAgICA8VG9vbGJhclxuICAgICAgICAgICAgb25NYXJrQ2xpY2s9e3RoaXMuaGFuZGxlTWFya0NsaWNrfVxuICAgICAgICAgICAgb25CbG9ja0NsaWNrPXt0aGlzLmhhbmRsZUJsb2NrQ2xpY2t9XG4gICAgICAgICAgICBvbkxpbmtDbGljaz17dGhpcy5oYW5kbGVMaW5rQ2xpY2t9XG4gICAgICAgICAgICBvblRvZ2dsZU1vZGU9e3RoaXMuaGFuZGxlVG9nZ2xlTW9kZX1cbiAgICAgICAgICAgIHBsdWdpbnM9e3RoaXMuZWRpdG9yQ29tcG9uZW50c31cbiAgICAgICAgICAgIG9uU3VibWl0PXt0aGlzLmhhbmRsZUluc2VydFNob3J0Y29kZX1cbiAgICAgICAgICAgIG9uQWRkQXNzZXQ9e29uQWRkQXNzZXR9XG4gICAgICAgICAgICBnZXRBc3NldD17Z2V0QXNzZXR9XG4gICAgICAgICAgICBidXR0b25zPXtmaWVsZC5nZXQoJ2J1dHRvbnMnKX1cbiAgICAgICAgICAgIGVkaXRvckNvbXBvbmVudHM9e2ZpZWxkLmdldCgnZWRpdG9yX2NvbXBvbmVudHMnKX1cbiAgICAgICAgICAgIGhhc01hcms9e3RoaXMuaGFzTWFya31cbiAgICAgICAgICAgIGhhc0lubGluZT17dGhpcy5oYXNJbmxpbmV9XG4gICAgICAgICAgICBoYXNCbG9jaz17dGhpcy5oYXNCbG9ja31cbiAgICAgICAgICAgIGlzU2hvd01vZGVUb2dnbGU9e2lzU2hvd01vZGVUb2dnbGV9XG4gICAgICAgICAgICB0PXt0fVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2lzRGlzYWJsZWR9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9FZGl0b3JDb250cm9sQmFyPlxuICAgICAgICA8Q2xhc3NOYW1lcz5cbiAgICAgICAgICB7KHsgY3NzLCBjeCB9KSA9PiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIGNzc2BcbiAgICAgICAgICAgICAgICAgICR7dmlzdWFsRWRpdG9yU3R5bGVzKHsgbWluaW1hbDogZmllbGQuZ2V0KCdtaW5pbWFsJykgfSl9XG4gICAgICAgICAgICAgICAgYCxcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFNsYXRlXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjc3NgXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nOiAxNnB4IDIwcHggMDtcbiAgICAgICAgICAgICAgICBgfVxuICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfVxuICAgICAgICAgICAgICAgIHJlbmRlckJsb2NrPXt0aGlzLnJlbmRlckJsb2NrfVxuICAgICAgICAgICAgICAgIHJlbmRlcklubGluZT17dGhpcy5yZW5kZXJJbmxpbmV9XG4gICAgICAgICAgICAgICAgcmVuZGVyTWFyaz17dGhpcy5yZW5kZXJNYXJrfVxuICAgICAgICAgICAgICAgIHNjaGVtYT17dGhpcy5zY2hlbWF9XG4gICAgICAgICAgICAgICAgcGx1Z2lucz17dGhpcy5wbHVnaW5zfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgICByZWY9e3RoaXMucHJvY2Vzc1JlZn1cbiAgICAgICAgICAgICAgICBzcGVsbENoZWNrXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxJbnNlcnRpb25Qb2ludCBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrQmVsb3dEb2N1bWVudH0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQ2xhc3NOYW1lcz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};

class Editor extends _react.default.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleMarkClick", type => {
      this.editor.toggleMark(type).focus();
    });

    _defineProperty(this, "handleBlockClick", type => {
      this.editor.toggleBlock(type).focus();
    });

    _defineProperty(this, "handleLinkClick", () => {
      this.editor.toggleLink(() => window.prompt(this.props.t('editor.editorWidgets.markdown.linkPrompt')));
    });

    _defineProperty(this, "hasMark", type => this.editor && this.editor.hasMark(type));

    _defineProperty(this, "hasInline", type => this.editor && this.editor.hasInline(type));

    _defineProperty(this, "hasBlock", type => this.editor && this.editor.hasBlock(type));

    _defineProperty(this, "handleToggleMode", () => {
      this.props.onMode('raw');
    });

    _defineProperty(this, "handleInsertShortcode", pluginConfig => {
      this.editor.insertShortcode(pluginConfig);
    });

    _defineProperty(this, "handleClickBelowDocument", () => {
      this.editor.moveToEndOfDocument();
    });

    _defineProperty(this, "handleDocumentChange", (0, _debounce2.default)(editor => {
      const {
        onChange
      } = this.props;
      const raw = editor.value.document.toJS();
      const markdown = (0, _serializers.slateToMarkdown)(raw, {
        voidCodeBlock: this.codeBlockComponent
      });
      onChange(markdown);
    }, 150));

    _defineProperty(this, "handleChange", editor => {
      if (!this.state.value.document.equals(editor.value.document)) {
        this.handleDocumentChange(editor);
      }

      this.setState({
        value: editor.value
      });
    });

    _defineProperty(this, "processRef", ref => {
      this.editor = ref;
    });

    const editorComponents = props.getEditorComponents();
    this.shortcodeComponents = editorComponents.filter(({
      type
    }) => type === 'shortcode');
    this.codeBlockComponent = (0, _immutable.fromJS)(editorComponents.find(({
      type
    }) => type === 'code-block'));
    this.editorComponents = this.codeBlockComponent || editorComponents.has('code-block') ? editorComponents : editorComponents.set('code-block', {
      label: 'Code Block',
      type: 'code-block'
    });
    mergeMediaConfig(this.editorComponents, this.props.field);
    this.renderBlock = (0, _renderers.renderBlock)({
      classNameWrapper: props.className,
      resolveWidget: props.resolveWidget,
      codeBlockComponent: this.codeBlockComponent
    });
    this.renderInline = (0, _renderers.renderInline)();
    this.renderMark = (0, _renderers.renderMark)();
    this.schema = (0, _schema.default)({
      voidCodeBlock: !!this.codeBlockComponent
    });
    this.plugins = (0, _visual.default)({
      getAsset: props.getAsset,
      resolveWidget: props.resolveWidget,
      t: props.t
    });
    this.state = {
      value: createSlateValue(this.props.value, {
        voidCodeBlock: !!this.codeBlockComponent
      })
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const raw = nextState.value.document.toJS();
    const markdown = (0, _serializers.slateToMarkdown)(raw, {
      voidCodeBlock: this.codeBlockComponent
    });
    return !this.state.value.equals(nextState.value) || nextProps.value !== markdown;
  }

  componentDidMount() {
    if (this.props.pendingFocus) {
      this.editor.focus();
      this.props.pendingFocus();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: createSlateValue(this.props.value, {
          voidCodeBlock: !!this.codeBlockComponent
        })
      });
    }
  }

  render() {
    const {
      onAddAsset,
      getAsset,
      className,
      field,
      isShowModeToggle,
      t,
      isDisabled
    } = this.props;
    return (0, _core.jsx)("div", {
      css: _ref
    }, (0, _core.jsx)(_styles.EditorControlBar, null, (0, _core.jsx)(_Toolbar.default, {
      onMarkClick: this.handleMarkClick,
      onBlockClick: this.handleBlockClick,
      onLinkClick: this.handleLinkClick,
      onToggleMode: this.handleToggleMode,
      plugins: this.editorComponents,
      onSubmit: this.handleInsertShortcode,
      onAddAsset: onAddAsset,
      getAsset: getAsset,
      buttons: field.get('buttons'),
      editorComponents: field.get('editor_components'),
      hasMark: this.hasMark,
      hasInline: this.hasInline,
      hasBlock: this.hasBlock,
      isShowModeToggle: isShowModeToggle,
      t: t,
      disabled: isDisabled
    })), (0, _core.jsx)(_core.ClassNames, null, ({
      css,
      cx
    }) => (0, _core.jsx)("div", {
      className: cx(className, css`
                  ${visualEditorStyles({
        minimal: field.get('minimal')
      })}
                `)
    }, (0, _core.jsx)(_slateReact.Editor, {
      className: css`
                  padding: 16px 20px 0;
                `,
      value: this.state.value,
      renderBlock: this.renderBlock,
      renderInline: this.renderInline,
      renderMark: this.renderMark,
      schema: this.schema,
      plugins: this.plugins,
      onChange: this.handleChange,
      ref: this.processRef,
      spellCheck: true
    }), (0, _core.jsx)(InsertionPoint, {
      onClick: this.handleClickBelowDocument
    }))));
  }

}

exports.default = Editor;

_defineProperty(Editor, "propTypes", {
  onAddAsset: _propTypes.default.func.isRequired,
  getAsset: _propTypes.default.func.isRequired,
  onChange: _propTypes.default.func.isRequired,
  onMode: _propTypes.default.func.isRequired,
  className: _propTypes.default.string.isRequired,
  value: _propTypes.default.string,
  field: _reactImmutableProptypes.default.map.isRequired,
  getEditorComponents: _propTypes.default.func.isRequired,
  isShowModeToggle: _propTypes.default.bool.isRequired,
  t: _propTypes.default.func.isRequired
});