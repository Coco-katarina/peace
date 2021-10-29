/**
 * xform自定义field template
 */

import React, { Component } from 'react';
import { Row, Col, Tooltip } from 'antd';
import classnames from 'classnames';
import './index.less';

export default class CustomFieldTemplate extends Component {

    render() {
        const props = this.props;
        //formContext中存放着类似formItemLayout = {labelCol: { span: 6 },wrapperCol: { span: 18 }}的配置
        let { id, classNames, label, required, hidden, description, children, rawHelp, formContext, schema, uiSchema } = props;
        const { groupMsg } = schema;
        // 这个idPrefix决定所有字段的id的前缀，与react-jsonschema-form组件中的idPrefix属性相同https://github.com/mozilla-services/react-jsonschema-form#id-prefix
        const idPrefix = 'root';
        let showLabel = true;
        if (typeof label === 'string' && label !== undefined && label != '') {
            const idLabel = id.slice(-label.length);
            if (idLabel === label) {
                showLabel = false;
            }
        }
        if (schema.type === 'array' && schema.items && uiSchema.items) {
            if (schema.items.type === 'object' && (uiSchema.items['ui:widget'] === 'group' || uiSchema.items['ui:widget'] === 'Table')) {
                showLabel = false;
            }
        }
        //上传控件处于禁用且无上传文件，则进行隐藏
        let isHidden = false;
        if (schema.type === 'array' && schema.items && schema.items.format == "data-url") {
            if (formContext.currentNode && Array.isArray(uiSchema['ui:options'].disnodes)) {
                if (uiSchema['ui:options'].disnodes.indexOf(formContext.currentNode) > -1) {
                    if (children && children.length > 0 && children[0].props.formData && !(children[0].props.formData.length > 0)) {
                        isHidden = true;
                    }
                }
            }

        }
        const code = id.slice(idPrefix.length + 1);
        let labelCol = formContext.labelCol.span || 4;
        let wrapperCol = formContext.wrapperCol.span || 20;
        let labelType = formContext.labelType || 'inline';
        let alignType = formContext.alignType || 'vertical';
        let labelAlign = formContext.labelAlign || 'left';

        //let itemNumberInRow = formContext.itemNumberInRow || 2;
        //width: (Math.floor(100 / itemNumberInRow) + '%')
        //let itemNumberInRow = (uiSchema['ui:options'] && uiSchema['ui:options'].itemwidth) ? uiSchema['ui:options'].itemwidth : 100;

        let itemWidth = 100;
        let isBooleanCheckbox = (schema.type === 'boolean' && typeof uiSchema['ui:widget'] === 'undefined');
        let shownodes;
        if (schema.type === 'array' && uiSchema.items) {
            shownodes = (uiSchema.items['ui:options'] && uiSchema.items['ui:options'].shownodes) ? uiSchema.items['ui:options'].shownodes : null;
            classNames += uiSchema.items.classNames ? ' ' + uiSchema.items.classNames : '';
            itemWidth = (uiSchema.items['ui:options'] && uiSchema.items['ui:options'].itemwidth) ? uiSchema.items['ui:options'].itemwidth : 100;

        } else {
            shownodes = (uiSchema['ui:options'] && uiSchema['ui:options'].shownodes) ? uiSchema['ui:options'].shownodes : null;
            itemWidth = (uiSchema['ui:options'] && uiSchema['ui:options'].itemwidth) ? uiSchema['ui:options'].itemwidth : 100;
        }
        //计算 labelCol wrapperCol 目前只处理一行两个 的样式统一问题
        if (itemWidth <= 50 && itemWidth >= 33) {
            labelCol = labelCol * 2;
            wrapperCol = labelCol >= 24 ? 0 : 24 - labelCol;
        }


        //判断节点是否可见
        let currentNode = formContext.currentNode || null
        if (currentNode) {
            if (Array.isArray(shownodes) && shownodes.length > 0 && shownodes.indexOf(currentNode) === -1) {
                hidden = true;
            }
        }

        let idArr = id.split('_');
        let isTable = groupMsg && groupMsg.type == 'Table'
        let tableGroupMore = isTable && idArr[2] && idArr[2] > 0
        // debugger;
        if (labelType === 'inline') {
            // labelType为inline的场景下才有labelAlign、alignType、itemNumberInRow配置
            if (alignType === 'vertical') {
                if (schema.type === 'object') {
                    let rootClassNames = classNames + ' ' + 'xform-root';
                    if (hidden) {
                        rootClassNames += (' ' + 'xform-hidden');
                    }
                    return (
                        <div className={rootClassNames}>
                            {children}
                        </div>
                    );
                } else {
                    let calClassNames = classNames + ' ' + 'xform-item';
                    if (hidden) {
                        calClassNames += (' ' + 'xform-hidden');
                    }

                    if (typeof label === 'string' && label !== '' && label !== code && showLabel) {
                        return (
                            <div className={calClassNames}>
                                {!isHidden && <Row type="flex" align="top">
                                    <Col span={labelCol} style={{
                                        textAlign: labelAlign,
                                        visibility: isBooleanCheckbox ? 'hidden' : 'visible',
                                        maxHeight: isBooleanCheckbox ? '20px' : 'auto',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        <Tooltip title={label}>
                                            <label htmlFor={id} className={classnames({
                                                'control-label': true,
                                                'ant-form-item-label': true,
                                                'required': required
                                            })}>{label}</label>
                                        </Tooltip>
                                    </Col>
                                    <Col span={wrapperCol}>
                                        {description}
                                        {children}
                                        <div className="xform-help" dangerouslySetInnerHTML={{
                                            __html: rawHelp
                                        }} />
                                    </Col>
                                </Row>}
                            </div>
                        );
                    } else {
                        return (
                            <div className={calClassNames}>
                                {description}
                                {children}
                                <div className="xform-help" dangerouslySetInnerHTML={{
                                    __html: rawHelp
                                }} />
                            </div>
                        );
                    }
                }
            } else if (alignType === 'inline') {
                if (schema.type === 'object') {
                    let rootClassNames = classNames + ' ' + 'xform-root';
                    if (hidden) {
                        rootClassNames += (' ' + 'xform-hidden');
                    }

                    return (
                        <div className={rootClassNames}>
                            {children}
                        </div>
                    );
                } else {
                    let calClassNames = classNames + ' ' + (isTable ? '' : 'xform-item');
                    if (hidden) {
                        calClassNames += (' ' + 'xform-hidden');
                    }
                    if (typeof label === 'string' && label !== '' && label !== code && showLabel) {
                        // pc ?
                        return (
                            <div
                                className={calClassNames}
                            // style={{
                            //     display: 'inline-block',
                            //     width: (itemNumberInRow + '%')
                            // }}
                            >
                                {
                                    !isHidden && (!groupMsg || (groupMsg && groupMsg.type != 'Table')) &&
                                    <Row type="flex" align="top">
                                        <Col span={labelCol} style={{
                                            textAlign: labelAlign,
                                            visibility: isBooleanCheckbox ? 'hidden' : 'visible',
                                            maxHeight: isBooleanCheckbox ? '20px' : 'auto',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            <Tooltip title={label}>
                                                <label htmlFor={id} className={classnames({
                                                    'ant-form-item-label': true,
                                                    'control-label': true,
                                                    'required': required
                                                })}>{label}</label>
                                            </Tooltip>
                                        </Col>
                                        <Col span={wrapperCol}>
                                            {description}
                                            {children}
                                            <div className="xform-help" dangerouslySetInnerHTML={{
                                                __html: rawHelp
                                            }} />
                                        </Col>
                                    </Row>
                                }{
                                    isTable ?
                                        <div style={{
                                            display: 'inline-block',
                                            // minWidth: 240,
                                        }}>
                                            {
                                                tableGroupMore ? '' :
                                                    <div style={{ padding: '8px 0', backgroundColor: '#fafafa', marginBottom: 8 }}>
                                                        <label htmlFor={id} className={classnames({
                                                            'ant-form-item-label': true,
                                                            // 'control-label': true,
                                                            'required': required
                                                        })}>{label}</label>
                                                    </div>
                                            }
                                            <div>
                                                {description}
                                                {children}
                                                <div className="xform-help" dangerouslySetInnerHTML={{
                                                    __html: rawHelp
                                                }} />
                                            </div>
                                        </div>
                                        : ''
                                }
                            </div>
                        );
                    } else {
                        return (
                            <div className={calClassNames}>
                                {description}
                                {children}
                                <div className="xform-help" dangerouslySetInnerHTML={{
                                    __html: rawHelp
                                }} />
                            </div>
                        );
                    }
                }
            }
        } else {
            if (schema.type === 'object') {
                let rootClassNames = classNames + ' ' + 'xform-root';
                if (hidden) {
                    rootClassNames += (' ' + 'xform-hidden');
                }
                return (
                    <div className={rootClassNames}>
                        {children}
                    </div>
                );
            } else {
                let calClassNames = classNames + ' ' + 'xform-item';
                if (hidden) {
                    calClassNames += (' ' + 'xform-hidden');
                }
                if (typeof label === 'string' && label !== '' && label !== code && showLabel) {
                    return (
                        <div className={calClassNames}>
                            <label htmlFor={id} className={classnames({
                                'xform-hidden': isBooleanCheckbox,
                                'control-label': true,
                                'ant-form-item-label': true,
                                'required': required
                            })}>{label}</label>
                            {description}
                            {children}
                            <div className="xform-help" dangerouslySetInnerHTML={{
                                __html: rawHelp
                            }} />
                        </div>
                    );
                } else {
                    return (
                        <div className={calClassNames}>
                            {description}
                            {children}
                            <div className="xform-help" dangerouslySetInnerHTML={{
                                __html: rawHelp
                            }} />
                        </div>
                    );
                }
            }
        }
    }
}
