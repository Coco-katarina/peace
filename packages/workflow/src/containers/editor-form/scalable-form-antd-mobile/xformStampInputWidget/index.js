/**
 * xform基础widget => 普通文本框类型
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Modal } from 'antd';
import classnames from 'classnames';
import StampModal from './stampModal';
import './index.less';

let onComposition = false;

// cited from: https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome
const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
// const tempData = [ //测试数据
//     {
//         id: 2,
//         imgURL: "/assets/images/stamp.png",
//         keeper: "1水电费",
//         label: "财务章",
//         name: "XX公章2XX公章",
//         state: 1,
//         value: 2
//     }, {
//         id: 12,
//         imgURL: "/assets/images/stamp.png",
//         keeper: "超级管理员",
//         label: "区域公章",
//         name: "XX公章4",
//         state: 1,
//         value: 12
//     }, {
//         id: 11,
//         imgURL: "/assets/images/stamp.png",
//         keeper: "超级管理员",
//         label: "区域公章",
//         name: "XX公章4",
//         state: 1,
//         value: 11
//     }, {
//         id: 13,
//         imgURL: "/assets/images/stamp.png",
//         keeper: "超级管理员",
//         label: "区域公章",
//         name: "XX公章4",
//         state: 1,
//         value: 13
//     }, {
//         id: 14,
//         imgURL: "/assets/images/stamp.png",
//         keeper: "超级管理员",
//         label: "区域公章",
//         name: "XX公章4",
//         state: 1,
//         value: 14
//     }
// ]

export default class CustomStampInput extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleComposition = this.handleComposition.bind(this);
        this._handleFieldValueChange = this._handleFieldValueChange.bind(this);
        this.timer = null;
        this.value = props.value;
        const stampData = props.schema.stampData;
        const valueName = stampData && props.value ? stampData.find(v => v.value == props.value) : null
        this.state = {
            value: props.value,
            valueName: valueName ? valueName.name : null,
            visible: false,
        };
    }

    componentWillMount() {
        const this_ = this
        window.document.addEventListener('message', function (e) {
            const message = e.data
            // if(JSON.parse(message) == 'close'){
                this_.backClick();
            // }
        })
    }

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'input');
        this.setState({
            visible: false,
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const stampData = this.props.schema.stampData;
        if (nextProps.value !== this.props.value) {
            this.value = nextProps.value;
            this.setState({
                value: nextProps.value,
                valueName: stampData.find(v => v.value == nextProps.value) ? stampData.find(v => v.value == nextProps.value).name : null
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
        // show mask
        window.ReactNativeWebView.postMessage('isclose');
        this.setState({
            visible: true
        });

        // enable parent div scroll
        const parentDom = document.getElementById("xform-root-process");
        if (parentDom) {
            parentDom.style.height = document.body.clientHeight + 'px';
            parentDom.style.overflow = 'hidden';
        }
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
            }, () => {
                this.setDOMVisible();
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
        } else {
            this.setState({
                visible: false,
            }, () => {
                this.setDOMVisible();
            });
        }
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        }, () => {
            this.setDOMVisible();
        });
    };

    onValueChange = (value) => {
        const data = this.props.schema.stampData;

        if (data) {
            this.setState({
                visible: false,
                value: value,
                valueName: data.find(item => item.value == value) ? data.find(item => item.value == value).name : null
            }, () => {
                this.setDOMVisible();
            });
            if (!onComposition) {
                if (this.timer !== null) {
                    window.clearTimeout(this.timer);
                    this.timer = window.setTimeout(() => {
                        this._handleFieldValueChange(value);
                    }, 100);
                } else {
                    this.timer = window.setTimeout(() => {
                        this._handleFieldValueChange(value);
                    }, 100);
                }
            }
        } else {
            this.setState({
                visible: false,
            }, () => {
                this.setDOMVisible();
            });
        }
    }

    backClick = (e) => {
        // e.preventDefault();
        this.setState({ visible: false })
        this.setDOMVisible();
    }

    setDOMVisible = () => {
        window.ReactNativeWebView.postMessage('isgoback');
        const parentDom = document.getElementById("xform-root-process");
        if (parentDom) {
            parentDom.style.height = 'auto';
            parentDom.style.overflow = null;
        }
    }

    render() {
        const { label, required } = this.props;
        const clientWidth = document.body.clientWidth,
            clientHeight = document.body.clientHeight,
            headerHeight = 0.0541 * clientHeight,
            bodyHeight = clientHeight - (0.0541 * clientHeight);
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
                'xform-item-has-error': _errorType !== ''
            })}>
                <div className='am-list-item am-list-item-middle am-list-item-mobile'>
                    <div className='am-list-line am-list-line-multiple am-list-line-wrap mobile-stamp'>
                        <label className={classnames({
                            'label-text': true,
                            required: required
                        })}>{label}</label>
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
                        ></Input>
                    </div>
                </div>
                <div className="xform-item-error-explain">{validateMessage}</div>
                {
                    this.state.visible ?
                        <div className='xform-mobile-stamp-outer-page'
                            style={{ width: clientWidth, height: clientHeight }}>
                            {/* <div className='xform-mobile-stamp-header' style={{ height: headerHeight }}>
                                <img style={{ height: '70%', transform: 'translate(20%,15%)' }} src='../../../../../../../assets/images/mobile-back.png' onClick={this.backClick} /> */}
                                {/* <StampModal onValueChange={this.onValueChange} value={value} data={stampData} /> */}
                            {/* </div> */}
                            <StampModal
                                bodyHeight={bodyHeight}
                                clientWidth={clientWidth}
                                onValueChange={this.onValueChange}
                                value={value}
                                data={stampData}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                            />
                        </div>
                        : ''
                }
                {/* <Modal
                    title="请选择印章"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    destroyOnClose={true}
                    width="765px"
                >
                    <StampModal onValueChange={this.onValueChange} value={value} data={stampData} />
                </Modal> */}
            </div >
        );
    }
}
