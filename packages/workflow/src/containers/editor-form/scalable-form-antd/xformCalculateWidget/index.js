/**
 * xform基础widget => 计算组件
 */

import React, { Component } from 'react';
import { InputNumber } from 'antd';
import classnames from 'classnames';

export default class CustomCalculate extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'button');
    }

    render() {
        let { id, options, disabled, autofocus, value, onChange, formContext: { showPopView, popupContainer, onClickCallBack, } } = this.props;
        return (
            <div className={classnames({
                'ant-form-item-control': true,
                'xform-custom-widget': true,
                'xform-custom-number-input': true,
                // 'has-error': _errorType !== ''
            })}>
                <InputNumber
                    value={value}
                    disabled={disabled}
                    readOnly={true}
                    autoFocus={autofocus}
                    onChange={(value) => {
                        onChange(value);
                    }}
                    {...otherOptions}
                />
            </div>
        );
    }
}
