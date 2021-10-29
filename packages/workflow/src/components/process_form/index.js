/** 
 * Created by Xumeng 2020/07/06.
 * 流程表单渲染通用组件 
 */
'use strict'
import React from 'react';
import PropTypes from 'prop-types';
import XFormAntd from '../../containers/editor-form/scalable-form-antd/index'
import { RouteRequest } from '@peace/utils';
import { WebAPI } from '$utils';
import moment from 'moment';

class ProcessForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            formData: null,
            formSchema: null,
        };
        this.behaviorUrl = null;
        this.xform = React.createRef();
    }


    componentDidMount() {
        const { onCurrentRef } = this.props;
        onCurrentRef && onCurrentRef(this.xform.current);

    }
    handleXformChange = (formData, bizData) => {
        //let { uiSchema, ...formValues } = formData;
        //console.log('Xform Changed!', formData);
        //console.log('Xform Changed!', bizData);
    };


    getListItemTitles = (formValues) => {
        let listShowItems = {};
        const { formSchema, listItemTitles } = this.props;
        if (Array.isArray(listItemTitles) && listItemTitles.length > 0) {
            for (let [key, value] of Object.entries(formValues)) {
                if (typeof value === 'object') {
                    if (Array.isArray(value)) {
                        if (typeof value[0] === 'object') {
                            if (listItemTitles.some(item => value[0].hasOwnProperty(item))) {
                                listShowItems[key] = value;
                            }
                        }
                    } else {
                        listItemTitles.map(item => {
                            if (value.hasOwnProperty(item)) {
                                listShowItems[item] = value[item];
                            }
                        })
                    }
                } else {
                    if (listItemTitles.includes(key)) {
                        listShowItems[key] = value;
                    }
                }

            }

        }
        return listShowItems;
    }

    handleXformSubmit = (formData, bizData) => {

        console.log('Xform Submitted!', formData);
        //console.log('Xform Submitted!', bizData);
        const { uiSchema, ...formValues } = formData;


        if (this.props.onFormSubmit) {
            this.props.onFormSubmit(formValues)
        }


    };

    handleBtnClick = (behavior, options) => {
        //console.log(behavior,options)
        this.behaviorUrl = options.behaviorUrl ? options.behaviorUrl : null;
        switch (behavior) {
            case '取消':
                if (this.props.onCancel) {
                    this.props.onCancel();
                }
                break;
            case '弹出控件组':
                if (this.props.onPopView) {
                    this.props.onPopView(options)
                }
            default:
                break;
        }


    }
    getDefaultValuesFormData = (bizData, formData, sequence) => {

        for (let [key, value] of Object.entries(bizData)) {
            if (value.type === 'date') {
                if (formData.hasOwnProperty(key)) {
                    formData[key] = moment().format('YYYY-MM-DD');
                } else {
                    let group = sequence.find(v => v.code == key) ? sequence.find(v => v.code == key).group : null;
                    if (group) {
                        if (Array.isArray(formData[group]) && formData[group].length === 1) {
                            formData[group][0][key] = moment().format('YYYY-MM-DD');
                        } else {
                            formData[group][key] = moment().format('YYYY-MM-DD');
                        }
                    }
                }
            }
        }
        return formData;
    }

    uploadhander = (file, action, uploadType, getUrl) => {
        const { RouteTable } = WebAPI;
        if (action == 'upload') {
            const formData = new FormData();
            formData.append('file', file);
            const type = uploadType == 'picture' || uploadType == 'picture-inline' || uploadType == 'picture-card' ? 'image' : 'project';
            RouteRequest.post(RouteTable.fileUpload, formData, { type }).then(res => {
                if (res && res.filename) {
                    getUrl(res.filename.replace(/\\/g, '/'));
                }
            }, err => {
                getUrl('');
            });
        } else {
            RouteRequest.delete(RouteTable.cleanUpUploadTrash, { url: file.url });
        }
    }

    render() {

        const { formSchema, currentNode, extFormSchema, extType, formItemLayout } = this.props;


        let { jsonSchema = {}, uiSchema = {}, formData = {}, bizData = {}, sequence = [] } = formSchema || {};

        const { jsonSchema: extJsonSchema = {}, uiSchema: extUiSchema = {}, formData: extFromData = {}, bizData: extBizData = {}, sequence: extSequence = [] } = extFormSchema || {};

        jsonSchema.properties = Object.assign({}, jsonSchema.properties, extJsonSchema);

        uiSchema = Object.assign({}, uiSchema, extUiSchema);
        formData = Object.assign({}, formData, extFromData);

        bizData = Object.assign({}, bizData, extBizData);

        if (!extType || extType == 'frist') {
            sequence = [].concat(extSequence, sequence);

        } else {
            sequence = [].concat(sequence, extSequence);
        }
        formData = this.getDefaultValuesFormData(bizData, formData, sequence);
        return (
            <div id="xform-root-process">
                <XFormAntd
                    ref={this.xform}
                    defaultSubmitButton
                    locale="zh-cn"
                    xtrackerCode="xform-core-demo"
                    popupContainer={() => {
                        return document.getElementById('xform-root-process');
                    }}
                    alignType="inline"
                    labelAlign="right"

                    customUploadRequest={this.uploadhander}
                    formItemLayout={formItemLayout ? formItemLayout : {
                        labelCol: { span: 4 },
                        wrapperCol: { span: 20 }
                    }}
                    formContext={{
                        onClickCallBack: this.handleBtnClick,
                        currentNode: currentNode
                    }}
                    itemNumberInRow={2}
                    jsonSchema={jsonSchema}
                    uiSchema={uiSchema}
                    formData={this.state.formData ? this.state.formData : formData}
                    bizData={bizData}
                    sequence={sequence}
                    onChange={this.handleXformChange}
                    onSubmit={this.handleXformSubmit}
                />

            </div>
        );
    }
}
ProcessForm.propTypes = {
    formSchema: PropTypes.object.isRequired, // json数据资源，包含 {jsonSchema,uiSchema,formData,bizData,sequence}
    extFormSchema: PropTypes.object, // 额外的formSchema ，包含 {jsonSchema,uiSchema,formData,bizData,sequence}
    extType: PropTypes.oneOf(['frist', 'last']), //额外的formSchema 插入方式， 只支持插入 最前面或者最后面
    currentNode: PropTypes.string, //当前节点 
    onFormSubmit: PropTypes.func, // 表单提交 回调函数
    onCancel: PropTypes.func, // 表单取消 回调函数
    onPopView: PropTypes.func, // 表单按钮弹出控件组 回调函数
    listItemTitles: PropTypes.array //系统字段数组用于后续业务逻辑处理需要 例 ：['sealTitle', 'sealName']
};
export default ProcessForm;

