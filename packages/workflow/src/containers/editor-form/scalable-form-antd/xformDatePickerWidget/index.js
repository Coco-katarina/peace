/**
 * xform基础widget => DatePicker日期选择类型
 * @props: schema（format => 'date'普通日期选择器, 'month'月份选择器， 'range'日期范围选择器暂不支持）
 */

import './index.less';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DatePicker} from 'antd';
import moment from 'moment';
import classnames from 'classnames';

const {MonthPicker} = DatePicker;

export default class CustomDatePickerWidget extends Component {
    static propTypes = {
        schema: PropTypes.shape({
            format: PropTypes.oneOf(['date', 'month'])
        })
    };

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'date');
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
        const popupContainer = this.props.formContext && this.props.formContext.popupContainer;
        let schema = this.props.schema;
        const format = schema.format || 'date';
        const options = this.props.options;
        let value = this.props.value,
            disabled = this.props.disabled,
            onChange = this.props.onChange,
            placeholder = this.props.placeholder;
         //判断节点禁用属性
         let formContext = this.props.formContext;
         let disnodes = options.disnodes || null;
         if(formContext.currentNode && Array.isArray(disnodes)){
             if(disnodes.indexOf(formContext.currentNode) > -1){
                 disabled = true;
             }
         }
         
        let form;
        switch (format) {
            case 'date':
                if (typeof value !== 'undefined' && value !== '') {
                    form = (
                        <DatePicker
                            {...options}
                            placeholder={placeholder}
                            disabled={disabled}
                            value={moment(value, 'YYYY-MM-DD')}
                            getCalendarContainer={popupContainer}
                            onChange={(date, dateString) => {
                                onChange(dateString);
                            }}
                           
                        />
                    );
                } else {
                    form = (
                        <DatePicker
                            {...options}
                            placeholder={placeholder}
                            disabled={disabled}
                            value={undefined}
                            //value={moment(moment(), 'YYYY-MM-DD')}
                            getCalendarContainer={popupContainer}
                            onChange={(date, dateString) => {
                                onChange(dateString);
                            }}
                            
                        />
                    );
                }
                break;
            case 'month':
                if (typeof value !== 'undefined' && value !== '') {
                    form = (
                        <MonthPicker
                            {...options}
                            placeholder={placeholder}
                            disabled={disabled}
                            value={moment(value, 'YYYY-MM')}
                            getCalendarContainer={popupContainer}
                            onChange={(date, dateString) => {
                                onChange(dateString);
                            }}
                            
                        />
                    );
                } else {
                    form = (
                        <MonthPicker
                            {...options}
                            placeholder={placeholder}
                            disabled={disabled}
                            value={undefined}
                            //value={moment(moment(), 'YYYY-MM')}
                            getCalendarContainer={popupContainer}
                            onChange={(date, dateString) => {
                                onChange(dateString);
                            }}
                            
                        />
                    );
                }
                break;
            default:
                //什么都不做
                form = '';
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
                'xform-custom-datepicker': true,
                'has-error': _errorType !== ''
            })}>
                {form}
                <div className="ant-form-explain">{validateMessage}</div>
            </div>
        );
    }
}
