'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Modal, Input, Table, Spin } from 'antd';
import { getSensorLastData } from '../../actions/integrationInfo';
import { PinyinHelper } from '@peace/utils';

const Search = Input.Search;

class SensorLastDataModal extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '传感器',
            dataIndex: 'sensorName',
            key: 'sensorName',
            sorter: (a, b) => {
                return a.sensorName.localeCompare(b.sensorName)
            },
            width: '150px',
        }, {
            title: '最后采集时间',
            dataIndex: 'collectTime',
            key: 'collectTime',
            sorter: (a, b) => a.sortMs - b.sortMs,
            width: '150px'
        }, {
            title: '数据',
            dataIndex: 'data',
            key: 'data',
        }];
        
        this.state = {
            searchV: '',
        }
    }

    UNSAFE_componentWillReceiveProps(np) {
        const { visible, dispatch, sensorsId } = np;
        if (visible && !this.props.visible) {
            dispatch(getSensorLastData(sensorsId));
        }
    }

    onCancel = () => {
        const { hideModal } = this.props;
        hideModal()
    }

    render() {
        const { visible, sensorsLastData, sensorsDataItems, clientHeight, isRequesting } = this.props;
        const { searchV } = this.state;
        const tableData = [];
        sensorsLastData.forEach(sd => {
            if (Object.keys(sensorsDataItems).length) {
                let sensorDataItem = sensorsDataItems[sd.sensorId];
                let sensorName = sensorDataItem && sensorDataItem.deviceName ? sensorDataItem.deviceName : '';
                let msg = sd.data.length ?
                    sd.data[0] :
                    {
                        collectTime: null,
                        sensorName: sensorName,
                        data: { noData: "暂无数据" },
                    }
                let dataStr = '';
                let dataKeys = Object.keys(msg.data);
                dataKeys.forEach(k => {
                    let item = sensorDataItem && sensorDataItem.items ? sensorDataItem.items[k] : null;
                    if (item) {
                        dataStr += `${item.name}：${msg.data[k]}（${item.unit}）； `
                    } else if (k == 'noData') {
                        dataStr += msg.data[k];
                    } else {
                        dataStr += `${k}：${msg.data[k]}；`
                    }
                })
                let collectTime = msg.collectTime ? moment(msg.collectTime).format('YYYY-MM-DD HH:mm:ss') : '';
                if (!searchV || (
                    PinyinHelper.isSearchMatched(sensorName, searchV) ||
                    PinyinHelper.isSearchMatched(collectTime, searchV) ||
                    PinyinHelper.isSearchMatched(dataStr, searchV)
                )) {
                    tableData.push({
                        sensorName: sensorName,
                        collectTime: collectTime,
                        data: dataStr,
                        sortMs: msg.collectTime ? moment(msg.collectTime).valueOf() : 0,
                    })
                }
            }
        })

        return (
            <Modal
                title="传感器采集数据"
                visible={visible}
                onCancel={this.onCancel}
                footer={null}
                maskClosable={false}
                width={900}
                style={{ top: 30 }}
            >
                <div style={{ height: 30, marginBottom: 7 }}>
                    <Spin style={{ marginLeft: 5 }} spinning={isRequesting} />
                    <Search
                        placeholder="搜索"
                        style={{ width: 200, float: 'right', marginBottom: 16 }}
                        onChange={(e) => {
                            this.setState({
                                searchV: e.target.value
                            })
                        }}
                    />
                </div>
                <Table dataSource={tableData} columns={this.columns} scroll={{ y: clientHeight - 100 }} />
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    const { sensorsLastData } = state;
    return {
        sensorsLastData: sensorsLastData.data || [],
        isRequesting: sensorsLastData.isRequesting,
    }
}
export default connect(mapStateToProps)(SensorLastDataModal);
