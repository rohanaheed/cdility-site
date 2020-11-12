"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NetlifyCmsWidgetCode = void 0;

var _CodeControl = _interopRequireDefault(require("./CodeControl"));

var _CodePreview = _interopRequireDefault(require("./CodePreview"));

var _schema = _interopRequireDefault(require("./schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Widget = (opts = {}) => _objectSpread({
  name: 'code',
  controlComponent: _CodeControl.default,
  previewComponent: _CodePreview.default,
  schema: _schema.default,
  allowMapValue: true,
  codeMirrorConfig: {}
}, opts);

const NetlifyCmsWidgetCode = {
  Widget,
  controlComponent: _CodeControl.default,
  previewComponent: _CodePreview.default
};
exports.NetlifyCmsWidgetCode = NetlifyCmsWidgetCode;
var _default = NetlifyCmsWidgetCode;
exports.default = _default;