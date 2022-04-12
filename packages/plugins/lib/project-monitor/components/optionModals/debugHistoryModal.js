import React, { Component } from 'react';
import moment from 'moment';
import { Table, Modal, Button, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker

class debugHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: moment().startOf('day'),
            endTime: moment().endOf('day'),
            loading: false,
            columns: [{
                title: 'DTU编号',
                dataIndex: 'dtuId',
                key: 'dtuId',
                align: 'center'
            }, {
                title: '操作人',
                dataIndex: 'user.name',
                key: 'user.name',
                align: 'center'
            }, {
                title: '操作时间',
                dataIndex: 'doTime',
                key: 'doTime',
                align: 'center',
                render: doTime => {
                    let trueTime = moment(doTime).utcOffset("+08:00");
                    trueTime = moment(trueTime).format('YYYY-MM-DD HH:mm:ss');
                    return trueTime;
                }
            }, {
                title: '数据包(BYTES)',
                dataIndex: 'packageSize',
                key: 'packageSize',
                align: 'center'
            }, {
                title: '耗时',
                dataIndex: 'useTime',
                key: 'useTime',
                align: 'center'
            }, {
                title: '结果',
                dataIndex: 'isSuccess',
                key: 'isSuccess',
                render: isSuccess => (
                    isSuccess ? '成功' : '失败'
                ),
                align: 'center'
            },]
        }
    }

    searchDebugHistory = () => {
        this.props.handleGetDebugHistory(this.state.startTime, this.state.endTime);
    }

    dateOnChange = (dates) => {
        this.setState({ startTime: dates[0], endTime: dates[1] });
    }

    _onCancel = () => {
        const { onCancel } = this.props
        onCancel();
        this.setState({ startTime: moment().startOf('day'), endTime: moment().endOf('day') });
    }

    render() {
        const { visible, title, onCancel, responseDebugHistory } = this.props;
        let { columns, startTime, endTime } = this.state;
        return (
            <div>
                <Modal
                    visible={visible}
                    title={title}
                    onCancel={this._onCancel}
                    width={800}
                    footer={null}
                >
                    <div style={{ marginBottom: 16 }}>
                        <RangePicker
                            ranges={{
                                '今天': [moment().startOf('day'), moment().endOf('day')],
                                '本周': [moment().startOf('week'), moment().endOf('week')],
                                '本月': [moment().startOf('month'), moment().endOf('month')],
                            }}
                            format="YYYY/MM/DD HH:mm:ss"
                            style={{ marginRight: 16 }}
                            showTime
                            onChange={this.dateOnChange}
                            value={[startTime, endTime]}
                        />
                        <Button type="primary" icon={<SearchOutlined />} onClick={this.searchDebugHistory}>查询</Button>
                    </div>
                    <Table dataSource={responseDebugHistory} columns={columns} bordered></Table>
                </Modal>
            </div>
        );
    }
}

export default debugHistory;