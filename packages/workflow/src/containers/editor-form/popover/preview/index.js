/**
 * 顶部基础操作栏：预览浮层组件
 * @props: visible(浮层是否可见) visibleChangeHandler(popover的onVisibleChange回调方法) formSchema（浮层内的schema数据） platform（预览的适配端，laptop：PC端、mobile：移动端、both：两者）
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Popover, Tabs, Button, Row, Col } from 'antd';
import XForm from '../../scalable-form-antd/index';

import './index.less';
import { getMessageId } from '../../i18n/localeMessages';
import { util } from '../../common/util';
import { buildFormSchemaByDataSourceUrl } from '$utils';
import { RouteRequest } from '@peace/utils';

const { TabPane } = Tabs;


export default class PreviewModal extends PureComponent {
    static propTypes = {
        previewDomain: PropTypes.string.isRequired,
        namespace: PropTypes.string.isRequired,
        visible: PropTypes.bool.isRequired,
        visibleChangeHandler: PropTypes.func.isRequired,
        formSchema: PropTypes.object.isRequired,
        platform: PropTypes.oneOf(['laptop', 'mobile', 'both']).isRequired,
        messages: PropTypes.object.isRequired,
        children: PropTypes.element.isRequired,
        popupContainer: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.renderPopoverContent = this.renderPopoverContent.bind(this);
        this.renderLaptopPreviewContent = this.renderLaptopPreviewContent.bind(this);
        this.renderMobilePreviewContent = this.renderMobilePreviewContent.bind(this);
        this.handleNodeChange = this.handleNodeChange.bind(this);
        let initialPlatform = 'laptop';
        if (props.platform === 'mobile') {
            initialPlatform = 'mobile';
        }
        this.state = {
            current: initialPlatform,   // 当前预览的端的类型
            formSchema: null,
            currentNode: null,
            tapkey: 'all'

        };
    }
    componentDidUpdate(prevProps, prevState) {
        //将props中的schema同步到state中, 并用移步获取数据源url数据替换
        if (JSON.stringify(this.propsFormSchema) != JSON.stringify(this.props.formSchema) && this.props.visible) {
            buildFormSchemaByDataSourceUrl(this.props.formSchema, RouteRequest).then(formSchema => {
                this.propsFormSchema = this.deepCloneObject(this.props.formSchema)//缓存起来,以便下次做diff
                this.setState({
                    formSchema
                })
            }).catch(err => {
                console.error('数据源表单获取失败表单')
            })
        }

    }
    //深拷贝
    deepCloneObject(obj) {
        if (typeof obj !== 'object') {
            return obj;
        }
        if (Array.isArray(obj)) {
            return obj.concat();
        } else {
            return JSON.parse(JSON.stringify(obj));
        }
    }
    handleTabChange(activeKey) {
        this.setState({
            current: activeKey
        });
    }
    handleNodeChange(e) {

        this.setState({
            currentNode: e == 'all' ? null : e,
            tapkey: e
        })

    }

    renderPopoverContent() {
        const { messages, platform, bpmnNodes, } = this.props;
        const { current, tapkey } = this.state;
        switch (platform) {
            case 'laptop':
                return (
                    <div className="preview-wrapper">
                        <Tabs activeKey={tapkey} onChange={this.handleNodeChange}>
                            <TabPane tab={'全部'} key="all">
                                {this.renderLaptopPreviewContent()}
                            </TabPane>
                            {
                                Array.isArray(bpmnNodes) && bpmnNodes.map(node => (
                                    <TabPane tab={node.name} key={node.id}>
                                        {this.renderLaptopPreviewContent()}
                                    </TabPane>
                                ))
                            }

                        </Tabs>
                    </div>
                );
            case 'mobile':
                return (
                    <div className="preview-wrapper">
                        {this.renderMobilePreviewContent()}
                    </div>
                );
            case 'both':
                return (
                    <div className="preview-wrapper">
                        <Tabs activeKey={current} onChange={this.handleTabChange}>
                            <TabPane tab={messages[getMessageId('xformChangePlatformPCName')]} key="laptop">
                                {this.renderLaptopPreviewContent()}
                            </TabPane>
                            <TabPane tab={messages[getMessageId('xformChangePlatformMobileName')]} key="mobile">
                                {this.renderMobilePreviewContent()}
                            </TabPane>
                        </Tabs>
                    </div>
                );
            default:
                console.error('[xform-editor]platform属性值必须是laptop,mobile,both枚举值');
                return null;
        }

    }
    // 验证一个字段是否有配置数据源URL
    _fieldHasDataSource(fieldName, jsonSchema) {
        const jsonSchemaProperties = jsonSchema.properties;
        const jsonSchemaContent = jsonSchemaProperties[fieldName];
        return typeof jsonSchemaContent === 'object' && typeof jsonSchemaContent.dataSourceUrl === 'string' && jsonSchemaContent.dataSourceUrl !== '';
    }

    _onClickCallBack = (rslt) => {
        console.log(rslt)
    }

    renderLaptopPreviewContent() {
        const { messages, customInterfaces, customGateway, customUploadRequest, onImagePreview, registerWidgets, locale, popupContainer } = this.props;
        const { formSchema, currentNode } = this.state;
        if (!formSchema) {
            return;
        }
        // const form = formSchema || this.props.formSchema

        const xformCustomWidgets = util.getXFormCustomWidgets(registerWidgets);

        return <XForm
            customInterfaces={customInterfaces}
            customGateway={customGateway}
            customUploadRequest={customUploadRequest}
            onImagePreview={onImagePreview}
            alignType="inline"
            formItemLayout={{
                labelCol: { span: 4 },
                wrapperCol: { span: 20 }
            }}
            //itemNumberInRow={2}
            popupContainer={popupContainer}
            registerWidgets={xformCustomWidgets}
            locale={locale}
            jsonSchema={formSchema.jsonSchema}
            uiSchema={formSchema.uiSchema}
            formData={formSchema.formData}
            bizData={formSchema.bizData}
            sequence={formSchema.sequence}
            formContext={{
                onClickCallBack: this._onClickCallBack,
                currentNode: currentNode
            }}
            onChange={(formData, bizData) => {
                console.log('预览表单的formData:', formData);
                console.log('预览表单的bizData:', bizData);
            }}
            onSubmit={(formData, bizData) => {
                console.log('提交表单的formData:', formData);
                console.log('提交表单的bizData:', bizData);
            }}
        >
        </XForm>
    }

    renderMobilePreviewContent() {
        const { namespace, previewDomain, formSchema } = this.props;
        const iframeId = `J_xform_preview_frame_${namespace}`;
        if (document.getElementById(iframeId)) {
            // 将schema通过postMessage发送给移动端预览页
            document.getElementById(iframeId).contentWindow.postMessage({
                type: 'update-xform-schema',
                schema: {
                    jsonSchema: formSchema.jsonSchema,
                    uiSchema: formSchema.uiSchema,
                    formData: formSchema.formData,
                    bizData: formSchema.bizData
                }
            }, '*');
        } else {
            return <div className="mobile-preview-demo-wrapper">
                <iframe src={`//${previewDomain}/clientform/editor-preview.html`} frameBorder={0} className="iframe" id={iframeId} onLoad={() => {
                    // 将schema通过postMessage发送给移动端预览页
                    document.getElementById(iframeId).contentWindow.postMessage({
                        type: 'update-xform-schema',
                        schema: {
                            jsonSchema: formSchema.jsonSchema,
                            uiSchema: formSchema.uiSchema,
                            formData: formSchema.formData,
                            bizData: formSchema.bizData
                        }
                    }, '*');
                }}></iframe>
            </div>
        }
    }

    render() {
        const { visible, visibleChangeHandler, popupContainer, children } = this.props;
        return (
            <Popover
                title=""
                content={this.renderPopoverContent()}
                visible={visible}
                onVisibleChange={visibleChangeHandler}
                trigger="click"
                placement="leftTop"
                overlayClassName="app-xform-builder-preview-popover"
                getPopupContainer={popupContainer}
            >
                {children}
            </Popover>
        );
    }
}