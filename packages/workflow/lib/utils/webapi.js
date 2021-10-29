'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouteTable = exports.ApiTable = void 0;
var ApiTable = {
  //获取当前流程表单系统字段
  getProcessFormSystemFieldsUrl: 'process/{processId}/form/system-fields',
  //获取当前流程表单系统字段
  getFormFieldsUrl: 'process/{processId}/form/fields',
  //审批中心
  getMyApplyListUrl: 'process-instance/my-apply-list',
  //获取  我发起的(我申请的)  列表
  getMyAuditListUrl: 'process-instance/my-audit-list',
  //获取  待办任务(我审核的)  列表
  getMyNoticeListUrl: 'process-instance/my-notice-list',
  //获取  抄送我的  列表
  getMyDraftListUrl: 'process-instance/my-draft-list',
  //获取  保存待发  列表
  getMyApplyCountUrl: '/process-instance/my-apply-count',
  //获取  我发起的  数量
  getMyAuditCountUrl: 'process-instance/my-audit-count',
  //获取  待办任务(我审核的)  数量
  getMyNoticeCountUrl: 'process-instance/my-notice-count',
  //获取  抄送我的  数量
  getMyDraftCountUrl: 'process-instance/my-draft-count',
  //获取  保存待发  数量
  //获取审批意见
  getFlowRecordUrl: 'workflow/process/action/records',
  //获取流程页面配置
  getProcessPageConfig: 'process/{processId}/approval/page',
  getApprovalActionUrl: 'process-instance/audit/{type}',
  // 审批操作
  submitProcessApplyUrl: 'process/key/{key}/start',
  //提交申请
  createProcessDraftUrl: 'process/drafts',
  //新增草稿
  //工作流
  getUserInfoByTokenUrl: 'user-info',
  getWorkflowGroupsUrl: 'workflow/groups/{appId}',
  addWorkflowGroup: 'workflow/group',
  editWorkflowGroup: 'workflow/group/{groupId}',
  delWorkflowGroup: 'workflow/group/{groupId}',
  //获取当前流程配置
  getProcessByIdUrl: 'workflow/process/{processId}',
  //获取指定流程数据
  getWorkflowProcessByProcinstIdUrl: 'workflow/process/history/info',
  //获取历史流程配置
  getHistoryProcessByIdUrl: 'workflow/history-process/{processId}',
  //通用获取固化数据接口
  getDataDictionaryUrl: 'data-dictionary/{model}',
  // 组织管理
  getUser: 'company/{companyId}/user',
  getCompanyOrganization: 'company/{companyId}/department'
};
exports.ApiTable = ApiTable;
var RouteTable = {
  apiRoot: '/api/root',
  deploy: '/camunda/deploy',
  fileUpload: '/_upload/new',
  cleanUpUploadTrash: '/_upload/cleanup',
  fileExist: '/exist-file'
};
exports.RouteTable = RouteTable;