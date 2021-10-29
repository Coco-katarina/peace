"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = contextWrapper;

var _react = _interopRequireDefault(require("react"));

var _reactDnd = require("react-dnd");

var _reactDndHtml5Backend = _interopRequireDefault(require("react-dnd-html5-backend"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * DragDropContext HOC
 */
function contextWrapper(YComponent) {
  return /*#__PURE__*/_react["default"].createElement(_reactDnd.DndProvider, {
    backend: _reactDndHtml5Backend["default"]
  }, /*#__PURE__*/_react["default"].createElement(YComponent, null));
} // import HTML5Backend from 'react-dnd-html5-backend';
// import {DndProvider} from 'react-dnd';
// export default function contextWrapper(YComponent) {
//     return DragDropContext(HTML5Backend)(YComponent);
// }