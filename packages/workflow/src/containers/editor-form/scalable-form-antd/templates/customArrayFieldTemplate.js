/**
 * xform自定义Array类型模板
 */

import React, { Component } from 'react';
import { Button } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { If, Then } from 'react-if';

export default class CustomArrayFieldTemplate extends Component {

    _getValidateMessage(errorType, validate) {
        let errorMessage = '';
        validate.map((validateItem) => {
            if (validateItem.type === errorType) {
                errorMessage = validateItem.message;
                return false;
            }
        });
        return errorMessage;
    }

    render() {
        const props = this.props;
        const { uiSchema, formContext, schema } = props;
        const options = uiSchema.items && uiSchema.items['ui:options'] || {};
        const isTableArray = uiSchema.items && uiSchema.items['ui:widget'] == 'Table' && schema.type == 'array';
        //const hiddenClassName = uiSchema.items && uiSchema.items.classNames || '';
        //判断节点是否禁用 禁用不可增加
        let currentNode = formContext.currentNode || null;
        let disnodes = options.disnodes ? options.disnodes : null;
        let canAdd = true;
        if (currentNode) {
            if (Array.isArray(disnodes) && disnodes.length > 0 && disnodes.includes(currentNode)) {
                canAdd = false;
            }
        }
        //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过
        let validateMessage = '';
        let _errorType = options._errorType || '';

        if (_errorType !== '' && typeof options.validate !== 'undefined') {
            //validateMessage = this._getValidateMessage(_errorType, options.validate);
        }
        //debugger;
        return (
            <div className={props.className + ' xform-array-field'} style={isTableArray ? { position: 'relative' } : {}}>
                <div className={classnames({
                    'ant-form-item-control': true,
                    'xform-custom-widget': true,
                    'xform-custom-array': true,
                    'has-error': _errorType !== '',
                    'object_row_group_wraper': isTableArray
                })} style={isTableArray ? {
                    overflow: 'auto',
                    position: 'unset'
                } : {}}>
                    {props.items && props.items.map(element => (
                        <div className="xform-array-field-item" key={element.key || element.index}
                            style={Object.assign({}, isTableArray ? { borderBottom: '1px solid #F0F0F0', padding: '0 4px', width: 'max-content' } : {})}>
                            <div>{element.children}</div>
                            <div className="xform-array-buttons" style={isTableArray ? { float: 'left' } : {}}>
                                {element.hasMoveDown && (
                                    <Button size="small" type="default" onClick={element.onReorderClick(element.index, element.index + 1)}>
                                        <ArrowDownOutlined />
                                    </Button>
                                )}
                                {element.hasMoveUp && (
                                    <Button size="small" type="default" onClick={element.onReorderClick(element.index, element.index - 1)}>
                                        <ArrowUpOutlined />
                                    </Button>
                                )}
                                <If condition={props.items.length > 1}>
                                    <Then>
                                        <Button size="small" type="default" onClick={element.onDropIndexClick(element.index)}>
                                            <CloseOutlined />
                                        </Button>
                                    </Then>
                                </If>
                            </div>
                        </div>
                    ))}

                    {props.canAdd && canAdd && (
                        <div className={"xform-array-bottom"} style={isTableArray ? { paddingLeft: 8, textAlign: 'left' } : {}}>
                            <Button size="small" type="primary" onClick={props.onAddClick}>
                                <PlusOutlined />
                            </Button>
                        </div>
                    )}
                    <div className="ant-form-explain">{validateMessage}</div>
                </div>
            </div>
        );
    }
}
