"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledBase = _interopRequireDefault(require("@emotion/styled-base"));

var _debounce2 = _interopRequireDefault(require("lodash/debounce"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactImmutableProptypes = _interopRequireDefault(require("react-immutable-proptypes"));

var _core = require("@emotion/core");

var _slate = require("slate");

var _slateReact = require("slate-react");

var _slatePlainSerializer = _interopRequireDefault(require("slate-plain-serializer"));

var _isHotkey = _interopRequireDefault(require("is-hotkey"));

var _netlifyCmsUiDefault = require("netlify-cms-ui-default");

var _serializers = require("../serializers");

var _styles = require("../styles");

var _Toolbar = _interopRequireDefault(require("./Toolbar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

const rawEditorStyles = ({
  minimal
}) => `
  position: relative;
  overflow: hidden;
  overflow-x: auto;
  min-height: ${minimal ? 'auto' : _netlifyCmsUiDefault.lengths.richTextEditorMinHeight};
  font-family: ${_netlifyCmsUiDefault.fonts.mono};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top: 0;
  margin-top: -${_styles.editorStyleVars.stickyDistanceBottom};
`;

const RawEditorContainer = (0, _styledBase.default)("div", {
  target: "er7tv020",
  label: "RawEditorContainer"
})(process.env.NODE_ENV === "production" ? {
  name: "79elbk",
  styles: "position:relative;"
} : {
  name: "79elbk",
  styles: "position:relative;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9NYXJrZG93bkNvbnRyb2wvUmF3RWRpdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTJCcUMiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL01hcmtkb3duQ29udHJvbC9SYXdFZGl0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBDbGFzc05hbWVzIH0gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBWYWx1ZSB9IGZyb20gJ3NsYXRlJztcbmltcG9ydCB7IEVkaXRvciBhcyBTbGF0ZSwgc2V0RXZlbnRUcmFuc2ZlciB9IGZyb20gJ3NsYXRlLXJlYWN0JztcbmltcG9ydCBQbGFpbiBmcm9tICdzbGF0ZS1wbGFpbi1zZXJpYWxpemVyJztcbmltcG9ydCBpc0hvdGtleSBmcm9tICdpcy1ob3RrZXknO1xuaW1wb3J0IHsgbGVuZ3RocywgZm9udHMgfSBmcm9tICduZXRsaWZ5LWNtcy11aS1kZWZhdWx0JztcbmltcG9ydCB7IG1hcmtkb3duVG9IdG1sIH0gZnJvbSAnLi4vc2VyaWFsaXplcnMnO1xuaW1wb3J0IHsgZWRpdG9yU3R5bGVWYXJzLCBFZGl0b3JDb250cm9sQmFyIH0gZnJvbSAnLi4vc3R5bGVzJztcbmltcG9ydCBUb29sYmFyIGZyb20gJy4vVG9vbGJhcic7XG5cbmNvbnN0IHJhd0VkaXRvclN0eWxlcyA9ICh7IG1pbmltYWwgfSkgPT4gYFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIG92ZXJmbG93LXg6IGF1dG87XG4gIG1pbi1oZWlnaHQ6ICR7bWluaW1hbCA/ICdhdXRvJyA6IGxlbmd0aHMucmljaFRleHRFZGl0b3JNaW5IZWlnaHR9O1xuICBmb250LWZhbWlseTogJHtmb250cy5tb25vfTtcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMDtcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDA7XG4gIGJvcmRlci10b3A6IDA7XG4gIG1hcmdpbi10b3A6IC0ke2VkaXRvclN0eWxlVmFycy5zdGlja3lEaXN0YW5jZUJvdHRvbX07XG5gO1xuXG5jb25zdCBSYXdFZGl0b3JDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYXdFZGl0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmFsdWU6IFBsYWluLmRlc2VyaWFsaXplKHRoaXMucHJvcHMudmFsdWUgfHwgJycpLFxuICAgIH07XG4gIH1cblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgIXRoaXMuc3RhdGUudmFsdWUuZXF1YWxzKG5leHRTdGF0ZS52YWx1ZSkgfHxcbiAgICAgIG5leHRQcm9wcy52YWx1ZSAhPT0gUGxhaW4uc2VyaWFsaXplKG5leHRTdGF0ZS52YWx1ZSlcbiAgICApO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIGlmIChwcmV2UHJvcHMudmFsdWUgIT09IHRoaXMucHJvcHMudmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogUGxhaW4uZGVzZXJpYWxpemUodGhpcy5wcm9wcy52YWx1ZSkgfSk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMucGVuZGluZ0ZvY3VzKSB7XG4gICAgICB0aGlzLmVkaXRvci5mb2N1cygpO1xuICAgICAgdGhpcy5wcm9wcy5wZW5kaW5nRm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVDb3B5ID0gKGV2ZW50LCBlZGl0b3IpID0+IHtcbiAgICBjb25zdCB7IGdldEFzc2V0LCByZXNvbHZlV2lkZ2V0IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG1hcmtkb3duID0gUGxhaW4uc2VyaWFsaXplKFZhbHVlLmNyZWF0ZSh7IGRvY3VtZW50OiBlZGl0b3IudmFsdWUuZnJhZ21lbnQgfSkpO1xuICAgIGNvbnN0IGh0bWwgPSBtYXJrZG93blRvSHRtbChtYXJrZG93biwgeyBnZXRBc3NldCwgcmVzb2x2ZVdpZGdldCB9KTtcbiAgICBzZXRFdmVudFRyYW5zZmVyKGV2ZW50LCAndGV4dCcsIG1hcmtkb3duKTtcbiAgICBzZXRFdmVudFRyYW5zZmVyKGV2ZW50LCAnaHRtbCcsIGh0bWwpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH07XG5cbiAgaGFuZGxlQ3V0ID0gKGV2ZW50LCBlZGl0b3IsIG5leHQpID0+IHtcbiAgICB0aGlzLmhhbmRsZUNvcHkoZXZlbnQsIGVkaXRvciwgbmV4dCk7XG4gICAgZWRpdG9yLmRlbGV0ZSgpO1xuICB9O1xuXG4gIGhhbmRsZVBhc3RlID0gKGV2ZW50LCBlZGl0b3IsIG5leHQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGRhdGEgPSBldmVudC5jbGlwYm9hcmREYXRhO1xuICAgIGlmIChpc0hvdGtleSgnc2hpZnQnLCBldmVudCkpIHtcbiAgICAgIHJldHVybiBuZXh0KCk7XG4gICAgfVxuXG4gICAgY29uc3QgdmFsdWUgPSBQbGFpbi5kZXNlcmlhbGl6ZShkYXRhLmdldERhdGEoJ3RleHQvcGxhaW4nKSk7XG4gICAgcmV0dXJuIGVkaXRvci5pbnNlcnRGcmFnbWVudCh2YWx1ZS5kb2N1bWVudCk7XG4gIH07XG5cbiAgaGFuZGxlQ2hhbmdlID0gZWRpdG9yID0+IHtcbiAgICBpZiAoIXRoaXMuc3RhdGUudmFsdWUuZG9jdW1lbnQuZXF1YWxzKGVkaXRvci52YWx1ZS5kb2N1bWVudCkpIHtcbiAgICAgIHRoaXMuaGFuZGxlRG9jdW1lbnRDaGFuZ2UoZWRpdG9yKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiBlZGl0b3IudmFsdWUgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFdoZW4gdGhlIGRvY3VtZW50IHZhbHVlIGNoYW5nZXMsIHNlcmlhbGl6ZSBmcm9tIFNsYXRlJ3MgQVNUIGJhY2sgdG8gcGxhaW5cbiAgICogdGV4dCAod2hpY2ggaXMgTWFya2Rvd24pIGFuZCBwYXNzIHRoYXQgdXAgYXMgdGhlIG5ldyB2YWx1ZS5cbiAgICovXG4gIGhhbmRsZURvY3VtZW50Q2hhbmdlID0gZGVib3VuY2UoZWRpdG9yID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IFBsYWluLnNlcmlhbGl6ZShlZGl0b3IudmFsdWUpO1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2UodmFsdWUpO1xuICB9LCAxNTApO1xuXG4gIGhhbmRsZVRvZ2dsZU1vZGUgPSAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbk1vZGUoJ3JpY2hfdGV4dCcpO1xuICB9O1xuXG4gIHByb2Nlc3NSZWYgPSByZWYgPT4ge1xuICAgIHRoaXMuZWRpdG9yID0gcmVmO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNsYXNzTmFtZSwgZmllbGQsIGlzU2hvd01vZGVUb2dnbGUsIHQgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxSYXdFZGl0b3JDb250YWluZXI+XG4gICAgICAgIDxFZGl0b3JDb250cm9sQmFyPlxuICAgICAgICAgIDxUb29sYmFyXG4gICAgICAgICAgICBvblRvZ2dsZU1vZGU9e3RoaXMuaGFuZGxlVG9nZ2xlTW9kZX1cbiAgICAgICAgICAgIGJ1dHRvbnM9e2ZpZWxkLmdldCgnYnV0dG9ucycpfVxuICAgICAgICAgICAgZGlzYWJsZWRcbiAgICAgICAgICAgIHJhd01vZGVcbiAgICAgICAgICAgIGlzU2hvd01vZGVUb2dnbGU9e2lzU2hvd01vZGVUb2dnbGV9XG4gICAgICAgICAgICB0PXt0fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvRWRpdG9yQ29udHJvbEJhcj5cbiAgICAgICAgPENsYXNzTmFtZXM+XG4gICAgICAgICAgeyh7IGNzcywgY3ggfSkgPT4gKFxuICAgICAgICAgICAgPFNsYXRlXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIGNzc2BcbiAgICAgICAgICAgICAgICAgICR7cmF3RWRpdG9yU3R5bGVzKHsgbWluaW1hbDogZmllbGQuZ2V0KCdtaW5pbWFsJykgfSl9XG4gICAgICAgICAgICAgICAgYCxcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgb25QYXN0ZT17dGhpcy5oYW5kbGVQYXN0ZX1cbiAgICAgICAgICAgICAgb25DdXQ9e3RoaXMuaGFuZGxlQ3V0fVxuICAgICAgICAgICAgICBvbkNvcHk9e3RoaXMuaGFuZGxlQ29weX1cbiAgICAgICAgICAgICAgcmVmPXt0aGlzLnByb2Nlc3NSZWZ9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQ2xhc3NOYW1lcz5cbiAgICAgIDwvUmF3RWRpdG9yQ29udGFpbmVyPlxuICAgICk7XG4gIH1cbn1cblxuUmF3RWRpdG9yLnByb3BUeXBlcyA9IHtcbiAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uTW9kZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBmaWVsZDogSW1tdXRhYmxlUHJvcFR5cGVzLm1hcC5pc1JlcXVpcmVkLFxuICBpc1Nob3dNb2RlVG9nZ2xlOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICB0OiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});

class RawEditor extends _react.default.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleCopy", (event, editor) => {
      const {
        getAsset,
        resolveWidget
      } = this.props;

      const markdown = _slatePlainSerializer.default.serialize(_slate.Value.create({
        document: editor.value.fragment
      }));

      const html = (0, _serializers.markdownToHtml)(markdown, {
        getAsset,
        resolveWidget
      });
      (0, _slateReact.setEventTransfer)(event, 'text', markdown);
      (0, _slateReact.setEventTransfer)(event, 'html', html);
      event.preventDefault();
    });

    _defineProperty(this, "handleCut", (event, editor, next) => {
      this.handleCopy(event, editor, next);
      editor.delete();
    });

    _defineProperty(this, "handlePaste", (event, editor, next) => {
      event.preventDefault();
      const data = event.clipboardData;

      if ((0, _isHotkey.default)('shift', event)) {
        return next();
      }

      const value = _slatePlainSerializer.default.deserialize(data.getData('text/plain'));

      return editor.insertFragment(value.document);
    });

    _defineProperty(this, "handleChange", editor => {
      if (!this.state.value.document.equals(editor.value.document)) {
        this.handleDocumentChange(editor);
      }

      this.setState({
        value: editor.value
      });
    });

    _defineProperty(this, "handleDocumentChange", (0, _debounce2.default)(editor => {
      const value = _slatePlainSerializer.default.serialize(editor.value);

      this.props.onChange(value);
    }, 150));

    _defineProperty(this, "handleToggleMode", () => {
      this.props.onMode('rich_text');
    });

    _defineProperty(this, "processRef", ref => {
      this.editor = ref;
    });

    this.state = {
      value: _slatePlainSerializer.default.deserialize(this.props.value || '')
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !this.state.value.equals(nextState.value) || nextProps.value !== _slatePlainSerializer.default.serialize(nextState.value);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: _slatePlainSerializer.default.deserialize(this.props.value)
      });
    }
  }

  componentDidMount() {
    if (this.props.pendingFocus) {
      this.editor.focus();
      this.props.pendingFocus();
    }
  }

  render() {
    const {
      className,
      field,
      isShowModeToggle,
      t
    } = this.props;
    return (0, _core.jsx)(RawEditorContainer, null, (0, _core.jsx)(_styles.EditorControlBar, null, (0, _core.jsx)(_Toolbar.default, {
      onToggleMode: this.handleToggleMode,
      buttons: field.get('buttons'),
      disabled: true,
      rawMode: true,
      isShowModeToggle: isShowModeToggle,
      t: t
    })), (0, _core.jsx)(_core.ClassNames, null, ({
      css,
      cx
    }) => (0, _core.jsx)(_slateReact.Editor, {
      className: cx(className, css`
                  ${rawEditorStyles({
        minimal: field.get('minimal')
      })}
                `),
      value: this.state.value,
      onChange: this.handleChange,
      onPaste: this.handlePaste,
      onCut: this.handleCut,
      onCopy: this.handleCopy,
      ref: this.processRef
    })));
  }

}

exports.default = RawEditor;
RawEditor.propTypes = {
  onChange: _propTypes.default.func.isRequired,
  onMode: _propTypes.default.func.isRequired,
  className: _propTypes.default.string.isRequired,
  value: _propTypes.default.string,
  field: _reactImmutableProptypes.default.map.isRequired,
  isShowModeToggle: _propTypes.default.bool.isRequired,
  t: _propTypes.default.func.isRequired
};