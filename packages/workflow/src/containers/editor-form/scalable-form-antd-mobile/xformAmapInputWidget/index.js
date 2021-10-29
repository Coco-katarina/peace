/**
 * xform基础widget => 普通文本框类型
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Modal } from 'antd';
import classnames from 'classnames';
import AmpModal from './ampModal';
import { Request } from '@peace/utils';

let onComposition = false;

// cited from: https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome
const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

export default class CustomAmapInput extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleComposition = this.handleComposition.bind(this);
        this._handleFieldValueChange = this._handleFieldValueChange.bind(this);
        this.timer = null;
        this.value = props.value;
        this.state = {
            value: props.value,
            visible: false,
            coordinate: null,
            addressValue: null,
        };
    }

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'input');
        if (this.value) {
            let ampAPIUrl = 'https://restapi.amap.com/v3/geocode/regeo'
            let query = {
                key: '15504371e7f2ccc0236a4989ff21bafd',
                location: this.value
            }
            Request.getByDirect(ampAPIUrl, query).then(res => {
                let { province, city, district, township, streetNumber } = res.regeocode.addressComponent
                this.setState({
                    addressValue: province + city + district + township + streetNumber.street + streetNumber.number
                })
            });
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.value = nextProps.value;
            this.setState({
                value: nextProps.value
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
        //console.log(e);
        this.value = this.state.coordinate;
        this.setState({
            visible: false,
            value: this.state.coordinate
        });
        if (!onComposition) {
            if (this.timer !== null) {
                window.clearTimeout(this.timer);
                this.timer = window.setTimeout(() => {
                    this._handleFieldValueChange(this.state.coordinate);
                }, 100);
            } else {
                this.timer = window.setTimeout(() => {
                    this._handleFieldValueChange(this.state.coordinate);
                }, 100);
            }
        }
        if (this.value) {
            let ampAPIUrl = 'https://restapi.amap.com/v3/geocode/regeo'
            let query = {
                key: '15504371e7f2ccc0236a4989ff21bafd',
                location: this.value
            }
            Request.getByDirect(ampAPIUrl, query).then(res => {
                let { province, city, district, township, streetNumber } = res.regeocode.addressComponent
                this.setState({
                    addressValue: province + city + district + township + streetNumber.street + streetNumber.number
                })
            });
        }
    };

    handleCancel = e => {
        //console.log(e);
        this.setState({
            visible: false,
        });
    };
    getCoordinate = (Coordinate) => {
        this.setState({
            coordinate: Coordinate
        })
    }

    render() {
        let required = this.props.required;
        let schema = this.props.schema;
        let options = this.props.options;
        let readonly = this.props.readonly,
            autofocus = this.props.autofocus,
            disabled = this.props.disabled,
            placeholder = this.props.placeholder,
            value = this.state.value,
            addressValue = this.state.addressValue;
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
                <div className='am-list-item am-list-item-middle am-list-item-mobile'>
                    <div className='am-list-line am-list-line-multiple am-list-line-wrap mobile-stamp'>
                        <label className={classnames({
                            'label-text': true,
                            // required: required
                        })}>外带地点</label>
                        <Input
                            type="text"
                            maxLength={maxLength || Infinity}
                            minLength={minLength || 0}
                            placeholder={placeholder}
                            value={addressValue}
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
                    </div>
                </div>
                <Modal
                    width='800px'
                    title="请选择地点"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    destroyOnClose={true}
                >
                    <div style={{ paddingBottom: "18px", fontSize: "18px" }}>{this.state.coordinate ? '当前选中经纬度为:' + this.state.coordinate : "请点击地图选择经纬度"}</div>
                    <AmpModal getCoordinate={this.getCoordinate} value={value} />
                </Modal>
            </div >
        );
    }
}
