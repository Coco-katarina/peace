import React, { Component } from 'react';
import { Spin, Tabs, message, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Request } from '@peace/utils';
import { Constans, buildFormSchemaByDataSourceUrl } from '$utils';
import {
    NoResource,
    ProcessForm,
    FlowRecordTable
} from '$components';
// import * as T from '../../approval/constants';
const { TabPane } = Tabs;

// import ProcessForm from '../../containers/process_form/index'

const schema = {
    "jsonSchema": {
        "title": "",
        "description": "",
        "type": "object",
        "required": [],
        "properties": {
            "xaBJJBmNk7":
                { "type": "string", "title": "段落", "default": "" }, "W8dc788z5Y": { "type": "string", "title": "富文本框", "default": "" }, "sFXYMzmC6D": { "type": "string", "title": "单选", "default": "", "enum": ["mFaYZtXBr", "Tt2r8TGxZ", "jNwB5sK3N"], "enumNames": ["选项一", "选项二", "选项三"] }, "aK3FTWsXxC": { "type": "object", "title": "分组", "default": [], "properties": {}, "required": [] }
        }
    },
    "uiSchema": {
        "xaBJJBmNk7": {
            "ui:widget": "label"
        },
        "W8dc788z5Y": {
            "ui:widget": "richtext",
            "ui:options": {
                "placeholder": "请输入"
            }
        },
        "sFXYMzmC6D": {
            "ui:widget": "radio",
            "ui:options": {
                "vertical": false
            }
        },
        "aK3FTWsXxC": {
            "ui:widget": "group",
            "ui:options": {
                "groupName": "分组标题",
                "showGroupTitle": true
            }, "nhN8yn52Mk": {
                "ui:widget": "richtext",
                "ui:options": {
                    "placeholder": "请输入"
                },
                "ui:placeholder": "",
                "ui:help": ""
            }
        }
    },
    "formData": {
        "xaBJJBmNk7": "<p>普通文本默认值</p>",
        "W8dc788z5Y": "",
        "sFXYMzmC6D": "",
        "aK3FTWsXxC": {}
    },
    "bizData": {
        "xaBJJBmNk7": {
            "type": "label",
            "fieldType": "custom"
        },
        "W8dc788z5Y": {
            "type": "richtext",
            "fieldType": "custom"
        }, "sFXYMzmC6D": { "options": { "mFaYZtXBr": { "name": "选项一", "code": "mFaYZtXBr" }, "Tt2r8TGxZ": { "name": "选项二", "code": "Tt2r8TGxZ" }, "jNwB5sK3N": { "name": "选项三", "code": "jNwB5sK3N" } }, "type": "radio", "fieldType": "custom" }, "aK3FTWsXxC": { "type": "group", "fieldType": "custom" }
    },
    "sequence": ["xaBJJBmNk7", "W8dc788z5Y", "sFXYMzmC6D", "aK3FTWsXxC"]
}

class ProcinstInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actiPage: 1,
            isRequesting: true,
            formSchema: null,
            formSchema: { "jsonSchema": { "title": "", "description": "", "type": "object", "required": [], "properties": { "xaBJJBmNk7": { "type": "string", "title": "段落", "default": "" }, "W8dc788z5Y": { "type": "string", "title": "富文本框", "default": "" }, "sFXYMzmC6D": { "type": "string", "title": "单选", "default": "", "enum": ["mFaYZtXBr", "Tt2r8TGxZ", "jNwB5sK3N"], "enumNames": ["选项一", "选项二", "选项三"] }, "aK3FTWsXxC": { "type": "object", "title": "分组", "default": [], "properties": {}, "required": [] } } }, "uiSchema": { "xaBJJBmNk7": { "ui:widget": "label" }, "W8dc788z5Y": { "ui:widget": "richtext", "ui:options": { "placeholder": "请输入" } }, "sFXYMzmC6D": { "ui:widget": "radio", "ui:options": { "vertical": false } }, "aK3FTWsXxC": { "ui:widget": "group", "ui:options": { "groupName": "分组标题", "showGroupTitle": true }, "nhN8yn52Mk": { "ui:widget": "richtext", "ui:options": { "placeholder": "请输入" }, "ui:placeholder": "", "ui:help": "" } } }, "formData": { "xaBJJBmNk7": "<p>普通文本默认值</p>", "W8dc788z5Y": "", "sFXYMzmC6D": "", "aK3FTWsXxC": {} }, "bizData": { "xaBJJBmNk7": { "type": "label", "fieldType": "custom" }, "W8dc788z5Y": { "type": "richtext", "fieldType": "custom" }, "sFXYMzmC6D": { "options": { "mFaYZtXBr": { "name": "选项一", "code": "mFaYZtXBr" }, "Tt2r8TGxZ": { "name": "选项二", "code": "Tt2r8TGxZ" }, "jNwB5sK3N": { "name": "选项三", "code": "jNwB5sK3N" } }, "type": "radio", "fieldType": "custom" }, "aK3FTWsXxC": { "type": "group", "fieldType": "custom" } }, "sequence": ["xaBJJBmNk7", "W8dc788z5Y", "sFXYMzmC6D", "aK3FTWsXxC"] },
            currentNode: null,
            popCode: null,
            expressionVar: '',
            titleName: null,
            backedTapKey: null,
            tabName: ''
        }

        this.approvalActions = {}// props.actions.approval.approval;
    }

    componentDidMount() {
        const info = this.props.location.state || {};
        const { dispatch } = this.props;
        const _this = this;
        const { getProcVersionForm } = this.approvalActions;
        if (1 || info && info.processInstanceId && info.versionId) {
            // this.getFlowRecord(info.processInstanceId);
            // dispatch(getProcVersionForm(info.versionId)).then(action => {
            //     const { type, payload } = action;
            //     if (type === T.GetVersionForm.REQUEST_ERROR) {
            //         message.error(payload.error);
            //     } else if (type === T.GetVersionForm.REQUEST_SUCCESS) {
            //         let formSchema = Object.assign({}, payload.data.formSchema);
            //         if (formSchema.formData && info.formData) {
            //             formSchema.formData = Object.assign({}, info.formData);
            //         }
            //         let params = [
            //             {
            //                 path: 'seal/list?mine=true',
            //                 param: `history=true`
            //             }, {
            //                 path: 'seal/list',
            //                 param: `history=true`
            //             }
            //         ];
            // buildFormSchemaByDataSourceUrl(formSchema, Request, params).then(formSchema => {
            //     _this.setState({
            //         titleName: info.titleName || null,
            //         backedTapKey: info.backedTapKey || null,
            //         formSchema,
            //         isRequesting: false,
            //     })
            //         }).catch(err => {
            //             message.error('获取表单数据源失败，请重试!');
            //         })
            //     }
            // });


            buildFormSchemaByDataSourceUrl(schema, Request, [], 'all').then(formSchema => {
                console.log(formSchema);
                _this.setState({
                    // formSchema,
                    isRequesting: false,
                })
            }).catch(err => {
                console.log(err);
                message.error('获取表单数据源失败，请重试!');
            })

        } else {
            _this.setState({
                isRequesting: false,
            })
        }
    }
    getFlowRecord = (id) => {
        const { getFlowRecordData } = this.approvalActions;
        const { dispatch } = this.props;
        dispatch(getFlowRecordData(id))
    }
    onPageChange = (e) => {
        this.setState({
            actiPage: e
        })
    }
    handFormSubmit = (url, formValues, listShowItems) => {
        message.error('查看详情无法执行提交操作!');
    }
    handFormCancel = () => {
        this.handerback()
    }

    handerback = () => {
        const { backedTapKey } = this.state;
        const state = {
            backedTapKey
        }
        this.props.dispatch(push({ pathname: `/processCheck`, state }))
    }
    handPopView = (options) => {

    }
    render() {
        const { flowRecord } = this.props;
        const { formSchema, actiPage, titleName, tabName } = this.state;

        const flowRecordProps = {
            flowRecord: flowRecord && flowRecord.data && flowRecord.data.length > 0 ? flowRecord.data : [],
            actiPage,
            onPageChange: this.onPageChange
        }
        // console.log(flowRecordProps)
        let extFormSchema = Object.assign({},
            Constans.sealUseExtFormSchema
        );
        console.log(formSchema);
        return <Spin spinning={this.state.isRequesting}>
            <Button type="primary" icon={<LeftOutlined />} onClick={this.handerback}>
                {`返回${titleName || ''}`}
            </Button>
            <Tabs defaultActiveKey='audit' size='large'  >
                <TabPane tab={tabName + '信息'} key="audit">
                    {
                        formSchema ?
                            <ProcessForm
                                formSchema={formSchema}
                                extFormSchema={extFormSchema}
                                extType={`frist`}
                                currentNode={Constans.addNodesId.history}
                                onFormSubmit={this.handFormSubmit}
                                onCancel={this.handFormCancel}
                                onPopView={this.handPopView}
                            />
                            :
                            !this.state.isRequesting && <NoResource title='未查询到该流程的表单' />
                    }
                </TabPane>
                <TabPane tab="流程记录" key="record">
                    <FlowRecordTable {...flowRecordProps} />
                </TabPane>
            </Tabs>
        </Spin>


    }
}

function mapStateToProps(state) {
    const { auth, global, flowRecord } = state;
    return {
        theme: global.theme,
        actions: global.actions,
        flowRecord: [],// flowRecord.data,
        clientHeight: global.clientHeight,
        clientWidth: global.clientWidth,
        user: auth.user,
    };
}
export default connect(mapStateToProps)(ProcinstInfo);


