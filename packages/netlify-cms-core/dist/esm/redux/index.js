"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _connectedReactRouter = require("connected-react-router");

var _waitUntilAction = require("./middleware/waitUntilAction");

var _combinedReducer = _interopRequireDefault(require("../reducers/combinedReducer"));

var _history = _interopRequireDefault(require("../routing/history"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const store = (0, _redux.createStore)((0, _combinedReducer.default)(_history.default), (0, _redux.compose)((0, _redux.applyMiddleware)((0, _connectedReactRouter.routerMiddleware)(_history.default), _reduxThunk.default, _waitUntilAction.waitUntilAction), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f));
var _default = store;
exports.default = _default;