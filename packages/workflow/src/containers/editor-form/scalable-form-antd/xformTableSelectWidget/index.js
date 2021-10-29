/**
 * xform基础widget => 弹出表格选择
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Modal, Table } from 'antd';
import { Search } from '$components';
import { PinyinHelper } from '$utils';
import classnames from 'classnames';

let onComposition = false;

// cited from: https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome
const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

export default class CustomTableSelect extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleComposition = this.handleComposition.bind(this);
        this._handleFieldValueChange = this._handleFieldValueChange.bind(this);
        this.timer = null;
        const { schema } = props;
        const name = schema.tableData && schema.tableData.selectValue || 'name';
        const newValue = Array.isArray(props.value) ? props.value.map(s=>s[name]).toString() : typeof props.value === 'object' ?  props.value[name]: props.value;
        this.value = newValue || '';
        this.state = {
            value: newValue || '',
            valueName: '',
            visible: false,
            selectedRowKeys: [],
            data: null,
            selectRowData: null
        };
    }

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'input');
        // this.setState({
        //     visible: false,
        // })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        
        const { schema } = this.props;
        const name = schema.tableData && schema.tableData.selectValue || 'name';
        if (JSON.stringify(nextProps.value) !== JSON.stringify(this.props.value) ) {
            const newValue = Array.isArray(nextProps.value) ? nextProps.value.map(s=>s[name]).toString() : typeof nextProps.value === 'object' ? nextProps.value[name] : nextProps.value;
            this.value = newValue || '' ;
            this.setState({
                value: newValue || '',
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
        onChange(value);
        
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


        const { selectRowData } = this.state;
        const { schema } = this.props;
        const name = schema.tableData && schema.tableData.selectValue || 'name';
        
            // console.log(e);
        this.value = selectRowData.map(s=>s[name]).toString();
            
        this.setState({
            visible: false,
            value: selectRowData.map(s=>s[name]).toString(),
        });
        let changeValue = selectRowData;
        if(schema.tableData && schema.tableData.selectType == 'radio'){
            changeValue = selectRowData[0];
        }
        if (!onComposition) {
                if (this.timer !== null) {
                    window.clearTimeout(this.timer);
                    this.timer = window.setTimeout(() => {
                        this._handleFieldValueChange(changeValue);
                    }, 100);
                } else {
                    this.timer = window.setTimeout(() => {
                        this._handleFieldValueChange(changeValue);
                    }, 100);
                }
        }
        
    };

    handleCancel = e => {
        // console.log(e);
        this.setState({
            visible: false,
            data: null
        });
    };
  
    onSelectChange = (selectedRowKeys,selectRow) => {
        //console.log(selectedRowKeys,selectRow)
        const { schema } = this.props;
        const name = schema.tableData && schema.tableData.selectValue || 'name';
        this.setState({
            selectedRowKeys: selectedRowKeys,
            selectRowData: selectRow
      });
    }
    onSearchClick = ({keywords}) => {
        const { schema } = this.props;
        const tableData = schema.tableData && schema.tableData.data; 
        const name = schema.tableData && schema.tableData.selectValue || 'name';
        let value = keywords ? keywords.toLowerCase() : '';
        const filterData = tableData.filter(item => item[name] && (item[name].includes(value) || PinyinHelper.isPinyinMatched(item[name], value)) );
        this.setState({
            data: filterData
        })
    }
    renderTable = ({ columns, selectType, selectValue, data }) => {
        const {  selectedRowKeys, data: tableData } = this.state;
        const rowSelection = {
              type: selectType,
              selectedRowKeys: selectedRowKeys,
              onChange: this.onSelectChange,
        };
        const searchFormLists = [
            { 
                field: 'keywords', 
                type: 'INPUT', 
                label: '关键字',
                labelSpan: 24,
            }, 
        ]
        return (
                <div>
                <Search
                    showNumber={1}
                    formList={searchFormLists}
                    onSearch={this.onSearchClick}
                    colSpan={{ label: 16,button: 4 }}
                />
                <Table
                    rowKey="id"
                    dataSource={tableData ? tableData : data}
                    columns={columns}
                    rowSelection={rowSelection}
                    size="small"
                />
                </div>
        );
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
            tableData = schema.tableData || null;
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
                    value={value}
                    readOnly={true}
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
                    centered
                    title={placeholder}
                    visible={this.state.visible}
                    //maskClosable={false}
                    destroyOnClose={true}
                    onOk={this.handleOk}
                    //confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel}
                >

                    {tableData ? this.renderTable(tableData) : <div style={{width: '100%', textAlign:'center'}}>暂无数据</div>}
                </Modal>
            </div >
        );
    }
}
