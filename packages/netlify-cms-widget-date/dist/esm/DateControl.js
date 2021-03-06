"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _once2 = _interopRequireDefault(require("lodash/once"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@emotion/core");

var _reactDatetime = _interopRequireDefault(require("react-datetime/css/react-datetime.css"));

var _reactDatetime2 = _interopRequireDefault(require("react-datetime"));

var _moment = _interopRequireDefault(require("moment"));

var _commonTags = require("common-tags");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const warnDeprecated = (0, _once2.default)(() => console.warn((0, _commonTags.oneLine)`
  Netlify CMS config: the date widget has been deprecated and will
  be removed in the next major release. Please use the datetime widget instead.
`));
/**
 * `date` widget is deprecated in favor of the `datetime` widget
 */

class DateControl extends _react.default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "formats", this.getFormats());

    _defineProperty(this, "defaultValue", this.getDefaultValue());

    _defineProperty(this, "isValidDate", datetime => _moment.default.isMoment(datetime) || datetime instanceof Date || datetime === '');

    _defineProperty(this, "handleChange", datetime => {
      /**
       * Set the date only if it is valid.
       */
      if (!this.isValidDate(datetime)) {
        return;
      }

      const {
        onChange
      } = this.props;
      const {
        format
      } = this.formats;
      /**
       * Produce a formatted string only if a format is set in the config.
       * Otherwise produce a date object.
       */

      if (format) {
        const formattedValue = datetime ? (0, _moment.default)(datetime).format(format) : '';
        onChange(formattedValue);
      } else {
        const value = _moment.default.isMoment(datetime) ? datetime.toDate() : datetime;
        onChange(value);
      }
    });

    _defineProperty(this, "onBlur", datetime => {
      const {
        setInactiveStyle
      } = this.props;

      if (!this.isValidDate(datetime)) {
        const parsedDate = (0, _moment.default)(datetime);

        if (parsedDate.isValid()) {
          this.handleChange(datetime);
        } else {
          window.alert('The date you entered is invalid.');
        }
      }

      setInactiveStyle();
    });
  }

  getFormats() {
    const {
      field,
      includeTime
    } = this.props;
    const format = field.get('format'); // dateFormat and timeFormat are strictly for modifying
    // input field with the date/time pickers

    const dateFormat = field.get('date_format'); // show time-picker? false hides it, true shows it using default format

    let timeFormat = field.get('time_format');

    if (typeof timeFormat === 'undefined') {
      timeFormat = !!includeTime;
    }

    return {
      format,
      dateFormat,
      timeFormat
    };
  }

  getDefaultValue() {
    const {
      field
    } = this.props;
    const defaultValue = field.get('default');
    return defaultValue;
  }

  componentDidMount() {
    warnDeprecated();
    const {
      value
    } = this.props;
    /**
     * Set the current date as default value if no default value is provided. An
     * empty string means the value is intentionally blank.
     */

    if (value === undefined) {
      setTimeout(() => {
        this.handleChange(this.defaultValue === undefined ? new Date() : this.defaultValue);
      }, 0);
    }
  } // Date is valid if datetime is a moment or Date object otherwise it's a string.
  // Handle the empty case, if the user wants to empty the field.


  render() {
    const {
      forID,
      value,
      classNameWrapper,
      setActiveStyle
    } = this.props;
    const {
      format,
      dateFormat,
      timeFormat
    } = this.formats;
    return (0, _core.jsx)("div", {
      css: /*#__PURE__*/(0, _core.css)(_reactDatetime.default, ";;label:DateControl;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9EYXRlQ29udHJvbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE4SGdCIiwiZmlsZSI6Ii4uLy4uL3NyYy9EYXRlQ29udHJvbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vY29yZSc7XG5pbXBvcnQgcmVhY3REYXRlVGltZVN0eWxlcyBmcm9tICdyZWFjdC1kYXRldGltZS9jc3MvcmVhY3QtZGF0ZXRpbWUuY3NzJztcbmltcG9ydCBEYXRlVGltZSBmcm9tICdyZWFjdC1kYXRldGltZSc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbmltcG9ydCB7IG9uY2UgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgb25lTGluZSB9IGZyb20gJ2NvbW1vbi10YWdzJztcblxuY29uc3Qgd2FybkRlcHJlY2F0ZWQgPSBvbmNlKCgpID0+XG4gIGNvbnNvbGUud2FybihvbmVMaW5lYFxuICBOZXRsaWZ5IENNUyBjb25maWc6IHRoZSBkYXRlIHdpZGdldCBoYXMgYmVlbiBkZXByZWNhdGVkIGFuZCB3aWxsXG4gIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgcmVsZWFzZS4gUGxlYXNlIHVzZSB0aGUgZGF0ZXRpbWUgd2lkZ2V0IGluc3RlYWQuXG5gKSxcbik7XG5cbi8qKlxuICogYGRhdGVgIHdpZGdldCBpcyBkZXByZWNhdGVkIGluIGZhdm9yIG9mIHRoZSBgZGF0ZXRpbWVgIHdpZGdldFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRlQ29udHJvbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZmllbGQ6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBmb3JJRDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjbGFzc05hbWVXcmFwcGVyOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgc2V0QWN0aXZlU3R5bGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgc2V0SW5hY3RpdmVTdHlsZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICB2YWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLm9iamVjdCwgUHJvcFR5cGVzLnN0cmluZ10pLFxuICAgIGluY2x1ZGVUaW1lOiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcblxuICBnZXRGb3JtYXRzKCkge1xuICAgIGNvbnN0IHsgZmllbGQsIGluY2x1ZGVUaW1lIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGZvcm1hdCA9IGZpZWxkLmdldCgnZm9ybWF0Jyk7XG5cbiAgICAvLyBkYXRlRm9ybWF0IGFuZCB0aW1lRm9ybWF0IGFyZSBzdHJpY3RseSBmb3IgbW9kaWZ5aW5nXG4gICAgLy8gaW5wdXQgZmllbGQgd2l0aCB0aGUgZGF0ZS90aW1lIHBpY2tlcnNcbiAgICBjb25zdCBkYXRlRm9ybWF0ID0gZmllbGQuZ2V0KCdkYXRlX2Zvcm1hdCcpO1xuICAgIC8vIHNob3cgdGltZS1waWNrZXI/IGZhbHNlIGhpZGVzIGl0LCB0cnVlIHNob3dzIGl0IHVzaW5nIGRlZmF1bHQgZm9ybWF0XG4gICAgbGV0IHRpbWVGb3JtYXQgPSBmaWVsZC5nZXQoJ3RpbWVfZm9ybWF0Jyk7XG4gICAgaWYgKHR5cGVvZiB0aW1lRm9ybWF0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGltZUZvcm1hdCA9ICEhaW5jbHVkZVRpbWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGZvcm1hdCxcbiAgICAgIGRhdGVGb3JtYXQsXG4gICAgICB0aW1lRm9ybWF0LFxuICAgIH07XG4gIH1cblxuICBnZXREZWZhdWx0VmFsdWUoKSB7XG4gICAgY29uc3QgeyBmaWVsZCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSBmaWVsZC5nZXQoJ2RlZmF1bHQnKTtcbiAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICB9XG5cbiAgZm9ybWF0cyA9IHRoaXMuZ2V0Rm9ybWF0cygpO1xuICBkZWZhdWx0VmFsdWUgPSB0aGlzLmdldERlZmF1bHRWYWx1ZSgpO1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHdhcm5EZXByZWNhdGVkKCk7XG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY3VycmVudCBkYXRlIGFzIGRlZmF1bHQgdmFsdWUgaWYgbm8gZGVmYXVsdCB2YWx1ZSBpcyBwcm92aWRlZC4gQW5cbiAgICAgKiBlbXB0eSBzdHJpbmcgbWVhbnMgdGhlIHZhbHVlIGlzIGludGVudGlvbmFsbHkgYmxhbmsuXG4gICAgICovXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSh0aGlzLmRlZmF1bHRWYWx1ZSA9PT0gdW5kZWZpbmVkID8gbmV3IERhdGUoKSA6IHRoaXMuZGVmYXVsdFZhbHVlKTtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgfVxuXG4gIC8vIERhdGUgaXMgdmFsaWQgaWYgZGF0ZXRpbWUgaXMgYSBtb21lbnQgb3IgRGF0ZSBvYmplY3Qgb3RoZXJ3aXNlIGl0J3MgYSBzdHJpbmcuXG4gIC8vIEhhbmRsZSB0aGUgZW1wdHkgY2FzZSwgaWYgdGhlIHVzZXIgd2FudHMgdG8gZW1wdHkgdGhlIGZpZWxkLlxuICBpc1ZhbGlkRGF0ZSA9IGRhdGV0aW1lID0+XG4gICAgbW9tZW50LmlzTW9tZW50KGRhdGV0aW1lKSB8fCBkYXRldGltZSBpbnN0YW5jZW9mIERhdGUgfHwgZGF0ZXRpbWUgPT09ICcnO1xuXG4gIGhhbmRsZUNoYW5nZSA9IGRhdGV0aW1lID0+IHtcbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGRhdGUgb25seSBpZiBpdCBpcyB2YWxpZC5cbiAgICAgKi9cbiAgICBpZiAoIXRoaXMuaXNWYWxpZERhdGUoZGF0ZXRpbWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGZvcm1hdCB9ID0gdGhpcy5mb3JtYXRzO1xuXG4gICAgLyoqXG4gICAgICogUHJvZHVjZSBhIGZvcm1hdHRlZCBzdHJpbmcgb25seSBpZiBhIGZvcm1hdCBpcyBzZXQgaW4gdGhlIGNvbmZpZy5cbiAgICAgKiBPdGhlcndpc2UgcHJvZHVjZSBhIGRhdGUgb2JqZWN0LlxuICAgICAqL1xuICAgIGlmIChmb3JtYXQpIHtcbiAgICAgIGNvbnN0IGZvcm1hdHRlZFZhbHVlID0gZGF0ZXRpbWUgPyBtb21lbnQoZGF0ZXRpbWUpLmZvcm1hdChmb3JtYXQpIDogJyc7XG4gICAgICBvbkNoYW5nZShmb3JtYXR0ZWRWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gbW9tZW50LmlzTW9tZW50KGRhdGV0aW1lKSA/IGRhdGV0aW1lLnRvRGF0ZSgpIDogZGF0ZXRpbWU7XG4gICAgICBvbkNoYW5nZSh2YWx1ZSk7XG4gICAgfVxuICB9O1xuXG4gIG9uQmx1ciA9IGRhdGV0aW1lID0+IHtcbiAgICBjb25zdCB7IHNldEluYWN0aXZlU3R5bGUgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoIXRoaXMuaXNWYWxpZERhdGUoZGF0ZXRpbWUpKSB7XG4gICAgICBjb25zdCBwYXJzZWREYXRlID0gbW9tZW50KGRhdGV0aW1lKTtcblxuICAgICAgaWYgKHBhcnNlZERhdGUuaXNWYWxpZCgpKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlKGRhdGV0aW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5hbGVydCgnVGhlIGRhdGUgeW91IGVudGVyZWQgaXMgaW52YWxpZC4nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRJbmFjdGl2ZVN0eWxlKCk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgZm9ySUQsIHZhbHVlLCBjbGFzc05hbWVXcmFwcGVyLCBzZXRBY3RpdmVTdHlsZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGZvcm1hdCwgZGF0ZUZvcm1hdCwgdGltZUZvcm1hdCB9ID0gdGhpcy5mb3JtYXRzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICR7cmVhY3REYXRlVGltZVN0eWxlc307XG4gICAgICAgIGB9XG4gICAgICA+XG4gICAgICAgIDxEYXRlVGltZVxuICAgICAgICAgIGRhdGVGb3JtYXQ9e2RhdGVGb3JtYXR9XG4gICAgICAgICAgdGltZUZvcm1hdD17dGltZUZvcm1hdH1cbiAgICAgICAgICB2YWx1ZT17bW9tZW50KHZhbHVlLCBmb3JtYXQpfVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cbiAgICAgICAgICBvbkZvY3VzPXtzZXRBY3RpdmVTdHlsZX1cbiAgICAgICAgICBvbkJsdXI9e3RoaXMub25CbHVyfVxuICAgICAgICAgIGlucHV0UHJvcHM9e3sgY2xhc3NOYW1lOiBjbGFzc05hbWVXcmFwcGVyLCBpZDogZm9ySUQgfX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ== */"))
    }, (0, _core.jsx)(_reactDatetime2.default, {
      dateFormat: dateFormat,
      timeFormat: timeFormat,
      value: (0, _moment.default)(value, format),
      onChange: this.handleChange,
      onFocus: setActiveStyle,
      onBlur: this.onBlur,
      inputProps: {
        className: classNameWrapper,
        id: forID
      }
    }));
  }

}

exports.default = DateControl;

_defineProperty(DateControl, "propTypes", {
  field: _propTypes.default.object.isRequired,
  forID: _propTypes.default.string,
  onChange: _propTypes.default.func.isRequired,
  classNameWrapper: _propTypes.default.string.isRequired,
  setActiveStyle: _propTypes.default.func.isRequired,
  setInactiveStyle: _propTypes.default.func.isRequired,
  value: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  includeTime: _propTypes.default.bool
});