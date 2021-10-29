/**
 * xform基础widget => sliderRange滑动区域输入条
 */

import React, {PureComponent} from 'react';
import {Slider} from 'antd';
import classnames from 'classnames';

export default class CustomSliderRange extends PureComponent {

    constructor(props) {
        super(props);
        this.handleSliderChange = this.handleSliderChange.bind(this);
    }

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'sliderRange');
    }

    handleSliderChange(value) {
        const {onChange} = this.props;
        onChange(value);
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
        let {id, disabled, readonly, options, autofocus} = this.props;

         //判断节点禁用属性
         let formContext = this.props.formContext;
         let disnodes = options.disnodes || null;
         if(formContext.currentNode && Array.isArray(disnodes)){
             if(disnodes.indexOf(formContext.currentNode) > -1){
                 disabled = true;
             }
         }
        let {value} = this.props;

        if (typeof value === 'undefined' || value === '') {
            value = [];
        }

        //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过
        let validateMessage = '';
        let _errorType = options._errorType || '';
        if (_errorType !== '' && typeof options.validate !== 'undefined') {
            validateMessage = this._getValidateMessage(_errorType, options.validate);
        }


        return (
            <div className={classnames({
                'ant-form-item-control': true,
                'xform-custom-widget': true,
                'xform-custom-slider-range': true,
                'has-error': _errorType !== ''
            })}>
                <Slider
                    range
                    id={id}
                    autoFocus={autofocus}
                    disabled={disabled}
                    readOnly={readonly}
                    value={value}
                    onChange={this.handleSliderChange}
                    onAfterChange={this.handleSliderChange}
                    {...options}
                />
                <div className="ant-form-explain">{validateMessage}</div>
            </div>
        );
    }
}
