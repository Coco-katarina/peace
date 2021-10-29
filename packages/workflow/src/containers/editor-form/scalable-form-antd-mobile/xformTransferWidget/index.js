/**
 * xform基础widget => 普通文本框类型
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Modal } from 'antd';
import classnames from 'classnames';
import TransferTable from './transferTable';
import TransferNormalTable from './transferNormalTable'

let onComposition = false;

// cited from: https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome
const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

//数据源格式较为特殊
// {
//     "data":[                                                           ——对应data
//         {"key":"0","title":"某某1","department":"1号部门"},
//         {"key":"1","title":"某某2","department":"2号部门"}, 
//     ],
//     "leftColumns":[{"dataIndex":"title","title":"姓名"},{"dataIndex":"department","title":"所属部门"}],    ——对应左侧表格的Columns配置
//     "rightColumns":[{"dataIndex":"title","title":"姓名"},{"dataIndex":"department","title":"所属部门"}]     ——对应右侧表格的Columns配置
// }
export default class CustomTransferWidget extends Component {

    constructor(props) {
        super(props);
        this.timer = null;
        this.state = {
            transferType: props.options.TransferType ? props.options.enumOptions.filter(x => x.value == props.options.TransferType)[0].label : "",
            targetKeys: [],
        };
    }

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'input');
    }

    setSelectedData(data) {
        if (this.timer !== null) {
            window.clearTimeout(this.timer);
            this.timer = window.setTimeout(() => {
                this._handleFieldValueChange(data);
            }, 100);
        } else {
            this.timer = window.setTimeout(() => {
                this._handleFieldValueChange(data);
            }, 100);
        }
    }


    _handleFieldValueChange(value) {
        const { onChange } = this.props;
        this.setState({
            targetKeys: value
        }, () => {
            onChange(value);
        });
    }

    onTargetKeysChange = nextTargetKeys => {
        this.setSelectedData(nextTargetKeys);
    };

    render() {
        let schema = this.props.schema;
        let options = this.props.options;
        let transferType = this.state.transferType,
            data = schema.transferData,
            targetKeys = this.state.targetKeys,
            leftTitle = options.leftTitle,
            rightTitle = options.rightTitle,
            checkType = options.checkType?'radio':'checkbox';
        let transferData = data?data.data:[],
            leftColumns = data?data.leftColumns:[],
            rightColumns = data?data.rightColumns:[];
         //判断节点禁用属性
         let disabled = options.disabled;
        return (
            <div className={classnames({
                'ant-form-item-control': true,
                'xform-custom-widget': true,
                'xform-custom-input': true
            })}>
                {/* {checkType=='radio'? */}
                <TransferNormalTable 
                    disabled={disabled}
                    transferData={transferData}
                    targetKeys={targetKeys}
                    columns={leftColumns}
                    title={leftTitle}
                    checkType={checkType}
                    onChange={this.onTargetKeysChange}
                />
                {/* :<TransferTable
                    disabled={disabled}
                    transferData={transferData}
                    targetKeys={targetKeys}
                    leftColumns={leftColumns}
                    rightColumns={rightColumns}
                    leftTitle={leftTitle}
                    checkType={checkType}
                    rightTitle={rightTitle}
                    onChange={this.onTargetKeysChange}
                />} */}
            </div >
        );
    }
}
