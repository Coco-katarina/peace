/**
 * xform基础widget => DateTimePicker日期时间选择类型
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DatePicker, List } from 'antd-mobile';
import { DatePicker as AntdDatePicker } from 'antd';
import classnames from 'classnames';
import { If, Then, Else } from 'react-if';
import moment from 'moment';

import './index.less';
import utils from '../util';

const ListItem = List.Item;

export default class CustomDateTimePickerWidget extends Component {
    constructor(props) {
        super(props);
        this.onDateTimeFocus = this.onDateTimeFocus.bind(this);
        this.onDateTimeBlur = this.onDateTimeBlur.bind(this);
        this.state = {
            visible: false,
            isshow: true
        };
    }
    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'data-time');
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
    onDateTimeFocus() {
        setTimeout(() => {
            this.setState({ visible: true })
        }, 100)
    }
    onDateTimeBlur(reRender) {
        if (reRender) {
            //重新渲染移除焦点
            this.setState({
                visible: false,
                isshow: false
            }, () => {
                this.setState({
                    isshow: true
                })
            })
        } else {
            this.setState({ visible: false })
        }

    }

    render() {
        const { options, label, required, value, onChange, placeholder, readonly } = this.props;
        let disabled = this.props.disabled;
        const popupContainer = this.props.formContext && this.props.formContext.popupContainer;
        const { visible, isshow } = this.state;
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
                'xform-custom-datetimepicker': true,
                'xform-item-has-error': _errorType !== '',
                disabled,
                nohidden: true
            })}>
                <If condition={typeof value !== 'undefined' && value !== ''}>
                    <Then>
                        {/* <DatePicker
                            mode="datetime"
                            format="YYYY-MM-DD HH:mm:ss"
                            value={new Date(value.replace(/-/g, '/'))}
                            disabled={disabled}
                            onChange={(value) => {
                                onChange(utils.formatDate(value, 'yyyy-MM-dd hh:mm'));
                            }}
                            extra={placeholder}
                            {...options}
                        >
                            <ListItem arrow="horizontal">
                                <label className={classnames({
                                    required: required
                                })}>{label}</label>
                            </ListItem>
                        </DatePicker> */}
                        <ListItem arrow="horizontal"
                            extra={(
                                isshow ? <AntdDatePicker
                                    className='datepicker'
                                    bordered={false}
                                    popupStyle={{ transform: 'scale(0.7)', display: visible ? 'block' : 'none' }}//display none控制transform带来的闪烁
                                    disabled={disabled || readonly}
                                    showTime
                                    onFocus={this.onDateTimeFocus}
                                    onBlur={() => this.onDateTimeBlur(true)}
                                    format="YYYY-MM-DD HH:mm:ss"
                                    value={moment(value, 'YYYY-MM-DD HH:mm:ss')}
                                    getCalendarContainer={popupContainer}
                                    onOk={() => {
                                        this.onDateTimeBlur(true);
                                    }}
                                    onChange={(date, dateString) => {
                                        this.onDateTimeBlur(true);
                                        onChange(dateString);
                                    }}
                                /> : null
                            )}
                        >
                            <label className={classnames({
                                required: required
                            })}>{label}</label>
                        </ListItem>
                    </Then>
                    <Else>{() => {
                        return (
                            // <DatePicker
                            //     mode="datetime"
                            //     format="YYYY-MM-DD HH:mm"
                            //     disabled={disabled}
                            //     onChange={(value) => {
                            //         onChange(utils.formatDate(value, 'yyyy-MM-dd hh:mm'));
                            //     }}
                            //     extra={placeholder}
                            //     {...options}
                            // >
                            //     <ListItem className='content' arrow="horizontal">
                            //         <label className={classnames({
                            //             required: required
                            //         })}>{label}</label>
                            //     </ListItem>
                            // </DatePicker>
                            <ListItem arrow="horizontal"
                                extra={(
                                    <AntdDatePicker
                                        className='datepicker'
                                        bordered={false}
                                        popupStyle={{ transform: 'scale(0.7)', display: visible ? 'block' : 'none' }}
                                        disabled={disabled || readonly}
                                        showTime
                                        onFocus={this.onDateTimeFocus}
                                        format="YYYY-MM-DD HH:mm:ss"
                                        value={undefined}
                                        onBlur={this.onDateTimeBlur}

                                        getCalendarContainer={popupContainer}
                                        onChange={(date, dateString) => {
                                            this.onDateTimeBlur();
                                            onChange(dateString);
                                        }}
                                    />
                                )}
                            >
                                <label className={classnames({
                                    required: required
                                })}>{label}</label>
                            </ListItem>
                        );
                    }}</Else>
                </If>
                <div className="ant-form-explain">{validateMessage}</div>
            </div>
        );
    }
}
