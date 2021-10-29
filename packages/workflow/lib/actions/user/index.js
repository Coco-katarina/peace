"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserInfo = getUserInfo;
exports.getButtonAuth = getButtonAuth;
exports.getCompanyUsers = getCompanyUsers;
exports.getCompanyOrganization = getCompanyOrganization;
exports["default"] = void 0;

var _utils = require("@peace/utils");

var _$utils = require("$utils");

function getUserInfo(token) {
  return function (dispatch) {
    return (0, _utils.basicAction)({
      type: 'get',
      dispatch: dispatch,
      actionType: 'GET_USERINFO_BY_TOKEN',
      url: "".concat(_$utils.ApiTable.getUserInfoByTokenUrl, "?token=").concat(token),
      msg: {
        error: '获取应用列表失败'
      },
      reducer: {
        name: 'userInfo'
      }
    });
  };
}

function getButtonAuth() {
  return function (dispatch) {
    return (0, _utils.basicAction)({
      type: 'get',
      dispatch: dispatch,
      actionType: 'GET_BUTTON_AUTH',
      url: _$utils.ApiTable.getDataDictionaryUrl.replace('{model}', 'WorkflowButtonAuth'),
      msg: {
        error: '获取按钮列表失败'
      },
      reducer: {
        name: 'buttonAuth'
      }
    });
  };
} //获取全部用户


function getCompanyUsers(companyId) {
  return function (dispatch) {
    return (0, _utils.basicAction)({
      type: 'get',
      dispatch: dispatch,
      actionType: 'GET_COMPANY_USERS',
      url: _$utils.ApiTable.getUser.replace('{companyId}', companyId),
      msg: {
        error: '获取公司用户信息失败'
      },
      reducer: {
        name: 'companyUsers'
      }
    });
  };
}

function getCompanyOrganization(companyId) {
  return function (dispatch) {
    return (0, _utils.basicAction)({
      type: 'get',
      dispatch: dispatch,
      actionType: 'GET_COMPANY_ORG',
      url: _$utils.ApiTable.getCompanyOrganization.replace('{companyId}', companyId),
      msg: {
        error: '获取组织信息失败'
      },
      reducer: {
        name: 'companyOrganization'
      }
    });
  };
}

var _default = {
  getUserInfo: getUserInfo,
  getButtonAuth: getButtonAuth,
  getCompanyUsers: getCompanyUsers,
  getCompanyOrganization: getCompanyOrganization
};
exports["default"] = _default;