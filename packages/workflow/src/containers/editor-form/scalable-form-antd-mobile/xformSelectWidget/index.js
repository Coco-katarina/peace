/**
 * xform基础widget => select选择器组件
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Picker, List } from 'antd-mobile';
import classnames from 'classnames';

import './index.less';

const ListItem = List.Item;

export default class CustomSelect extends PureComponent {

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'select');
    }

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
        const { label, required, options, value, placeholder, onChange, schema } = this.props;
        let disabled = this.props.disabled;

        let enumOptions = options.enumOptions || [];
        if (typeof schema.data !== 'undefined' && schema.data.length >= 0) {
            enumOptions = schema.data;
        }

        //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过
        let validateMessage = '';
        let _errorType = options._errorType || '';
        if (_errorType !== '' && typeof options.validate !== 'undefined') {
            validateMessage = this._getValidateMessage(_errorType, options.validate);
        }

        //判断节点禁用属性
        let formContext = this.props.formContext;
        let disnodes = options.disnodes || null;
        if (formContext.currentNode && Array.isArray(disnodes)) {
            if (disnodes.indexOf(formContext.currentNode) > -1) {
                disabled = true;
            }
        }

        return (
            <div className={classnames({
                'xform-custom-widget': true,
                'xform-custom-select': true,
                'xform-item-has-error': _errorType !== '',
                'unClick': disabled,
                disabled
            })}>
                <Picker
                    data={enumOptions}
                    cols={1}
                    value={[value]}
                    disabled={disabled}
                    onChange={(value) => {
                        // ant mobile的picker组件支持的value格式为数组，对于单选这里要做一下兼容处理，提交给Form前转换为String
                        onChange(value[0]);
                    }}
                    extra={placeholder}
                    {...options}
                >
                    <ListItem arrow="horizontal" wrap multipleLine>
                        <label className={classnames({
                            required: required
                        })}>{label}</label>
                    </ListItem>
                </Picker>
                <div className="xform-item-error-explain">{validateMessage}</div>
            </div>
        );
    }
}
