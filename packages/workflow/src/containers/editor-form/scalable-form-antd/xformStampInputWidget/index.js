/**
 * xform基础widget => 普通文本框类型
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Modal } from 'antd';
import classnames from 'classnames';
import StampModal from './stampModal';

let onComposition = false;

// cited from: https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome
const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

export default class CustomStampInput extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleComposition = this.handleComposition.bind(this);
        this._handleFieldValueChange = this._handleFieldValueChange.bind(this);
        this.timer = null;
        this.value = props.value;
        const stampData =  props.schema.stampData;
        const valueName = stampData && props.value ? stampData.find(v=> v.value == props.value) : null
        this.state = {
            value: props.value,
            valueName: valueName ? valueName.name : null,
            visible: false,
        };
    }

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'input');
        this.setState({
            visible: false,
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const stampData =  this.props.schema.stampData;
        if (nextProps.value !== this.props.value) {
            this.value = nextProps.value;
            this.setState({
                value: nextProps.value,
                valueName: stampData.find(v=> v.value == nextProps.value) ? stampData.find(v=> v.value == nextProps.value).name : null
            });
        }
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

    handleChange(event) {
        const value = event.currentTarget.value;
        console.log(event)
        this.value = value;
        this.setState({
            value
        });
        if (!onComposition) {
            if (this.timer !== null) {
                window.clearTimeout(this.timer);
                this.timer = window.setTimeout(() => {
                    this._handleFieldValueChange(this.value);
                }, 100);
            } else {
                this.timer = window.setTimeout(() => {
                    this._handleFieldValueChange(this.value);
                }, 100);
            }
        }
    }

    handleComposition = (event) => {
        const value = event.currentTarget.value;
        if (event.type === 'compositionend') {
            console.log('compositionend triggered!');
            onComposition = false;
            // fixed for Chrome v53+ and detect all Chrome
            // https://chromium.googlesource.com/chromium/src/
            // +/afce9d93e76f2ff81baaa088a4ea25f67d1a76b3%5E%21/
            if (event.target instanceof HTMLInputElement && isChrome) {
                // fire onChange
                this._handleFieldValueChange(value);
            }
        } else {
            onComposition = true;
        }
    }

    _handleFieldValueChange(value) {
        const { onChange } = this.props;
        this.setState({
            value
        }, () => {
            onChange(value);
        });
    }

    //过滤掉react-json-schema中注入option中的属性，防止这部分属性添加到组件上
    _filterSystemOptions(options) {
        const BLACK_LIST = ['enumOptions', 'disabled', 'readonly', 'help', 'emptyValue'];
        BLACK_LIST.map((name) => {
            if (options.hasOwnProperty(name)) {
                delete options[name];
            }
        });
        return options;
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOk = e => {

        const data = this.props.schema.stampData;
        if (data) {
            // console.log(e);
            this.value = this.state.value;
            this.setState({
                visible: false,
                value: this.state.value,
                valueName: data.find(item => item.value == this.state.value) ? data.find(item => item.value == this.state.value).name : null
            });
            if (!onComposition) {
                if (this.timer !== null) {
                    window.clearTimeout(this.timer);
                    this.timer = window.setTimeout(() => {
                        this._handleFieldValueChange(this.state.value);
                    }, 100);
                } else {
                    this.timer = window.setTimeout(() => {
                        this._handleFieldValueChange(this.state.value);
                    }, 100);
                }
            }
        }else{
            this.setState({
                visible: false,
            });
        }
    };

    handleCancel = e => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    };
    onValueChange = e => {
        //console.log('radio checked', e.target.value);
        const data = this.props.schema.stampData;
       
        this.setState({
            value: e.target.value,
            valueName:  data.find(item => item.value == e.target.value) ? data.find(item => item.value == e.target.value).name : null
        })
    }

    render() {
        let schema = this.props.schema;
        let options = this.props.options;
        let readonly = this.props.readonly,
            autofocus = this.props.autofocus,
            disabled = this.props.disabled,
            placeholder = this.props.placeholder,
            value = this.state.value,
            valueName = this.state.valueName,
            stampData = schema.stampData;
        //判断节点禁用属性
        let formContext = this.props.formContext;
        let disnodes = options.disnodes || null;
        if (formContext.currentNode && Array.isArray(disnodes)) {
            if (disnodes.indexOf(formContext.currentNode) > -1) {
                disabled = true;
            }
        }
        //解析schema中的约定maxlength
        const maxLength = schema.maxLength;
        const minLength = schema.minLength;
        //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过
        let validateMessage = '';
        let { _errorType, validate, ...otherOptions } = options;
        otherOptions = this._filterSystemOptions(otherOptions);
        _errorType = _errorType || '';

        if (_errorType !== '' && typeof validate !== 'undefined') {
            validateMessage = this._getValidateMessage(_errorType, validate);
        }
        
        return (
            <div className={classnames({
                'ant-form-item-control': true,
                'xform-custom-widget': true,
                'xform-custom-input': true,
                'has-error': _errorType !== ''
            })}>
                <Input
                    type="text"
                    maxLength={maxLength || Infinity}
                    minLength={minLength || 0}
                    placeholder={placeholder}
                    value={valueName}
                    readOnly={readonly}
                    disabled={disabled}
                    autoFocus={autofocus}
                    onChange={this.handleChange}
                    onCompositionStart={this.handleComposition}
                    onCompositionUpdate={this.handleComposition}
                    onCompositionEnd={this.handleComposition}
                    {...otherOptions}
                    onClick={e => this.showModal(e)}
                />
                <div className="ant-form-explain">{validateMessage}</div>

                <Modal
                    title="请选择印章"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    destroyOnClose={true}
                    width="765px"
                >
                    <StampModal onValueChange={this.onValueChange} value={value} data={stampData} />
                </Modal>
            </div >
        );
    }
}
