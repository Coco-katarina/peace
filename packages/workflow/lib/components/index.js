"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _approvalModal = _interopRequireDefault(require("./approvalModal"));

var _buttonAuth = require("./buttonAuth");

var _process_form = _interopRequireDefault(require("./process_form"));

var _processApply = _interopRequireDefault(require("./processApply"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import ProcessApproval from './processApproval'
var _default = {
  ApprovalModal: _approvalModal["default"],
  SubmitApply: _buttonAuth.SubmitApply,
  AuthButton: _buttonAuth.AuthButton,
  ProcessForm: _process_form["default"],
  ProcessApply: _processApply["default"] // , ProcessApproval

};
exports["default"] = _default;