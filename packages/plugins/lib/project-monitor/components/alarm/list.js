import React, { Component } from 'react';
import { Table, Button, Badge, Input, Tag, Row, Col, Card } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { pickColorWithAlarmLevel } from '@peace/utils/lib/src/colors';
import AlarmModal from './alarm-modal';

const delImgSrc = '/assets/images/deleted.png'

class AlarmList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedRowKeys: [],
            sortedInfo: {
                order: 'descend',
                columnKey: 'endTime'
            },
            modalShow: false,
            confirmSourceId: 0,
            confirmAlarmTypeCode: '',
            searchValue: '',
            currImgIndex: 0,
            downloadIframeSrc: null,
            currAlarmPicSrc: null,
            alarmPicSingleDeling: false,
        }
    }

    convertLevelToLabel(level) {
        switch (level) {
            case 1:
                return '一级';
            case 2:
                return '二级';
            case 3:
                return '三级';
            default:
                return '';
        }
    }

    handleCountClick = key => {
        if (key != this.state.expandedRowKeys[0]) {
            this.setState({ expandedRowKeys: [key] });
            this.props.onAlarmSelectChange(key);
        } else {
            this.setState({ expandedRowKeys: [] });
        }
    }

    handleTableExpand = (expanded, record) => {
        if (!expanded) {
            this.setState({ expandedRowKeys: [] });
        } else {
            this.setState({ expandedRowKeys: [record.key] });
            this.props.onAlarmSelectChange(record.key);
        }
        this.setState({
            currImgIndex: 0, currAlarmPicSrc: null
        })
    }

    handleTableChange = (pagination, filters, sorter) => {
        const newParams = { limit: pagination.pageSize, offset: (pagination.current - 1) * pagination.pageSize };
        const orderMap = { "descend": "desc", "ascend": "asc" }

        if (filters && Array.isArray(filters.level)) {
            if (filters.level.length == 0) {
                newParams["levels"] = [1, 2, 3];
            } else {
                newParams["levels"] = filters.level;
            }
        }

        if (sorter) {
            newParams["orderBy"] = sorter.columnKey;
            newParams["orderDirection"] = orderMap[sorter.order];
            if (sorter.columnKey == 'level') {
                if (sorter.order == 'descend') {
                    newParams["orderDirection"] = 'asc';
                } else {
                    newParams["orderDirection"] = 'desc';
                }
            }
        }

        this.setState({ sortedInfo: sorter });
        this.props.onChange(newParams);
    }

    exporting = () => {
        this.props.exporting();
    }

    scroll(forward) {
        const { currImgIndex } = this.state;
        let { alarmDetails } = this.props;
        const container = document.getElementById('roller');
        let nextImgIndex = currImgIndex;
        if (forward == -1) {
            if (container.scrollLeft < 160) {
                container.scrollLeft = 0;
            } else {
                container.scrollLeft -= 160;
            }
            currImgIndex == 0 ? '' : nextImgIndex -= 1;
        } else {
            if (container.scrollLeft + 160 > container.scrollWidth) {
                container.scrollLeft = container.scrollWidth;
            } else {
                container.scrollLeft += 160;
            }
            currImgIndex < (alarmDetails[alarmDetails.length - 1].content.indexOf('告警确认') == -1 ? alarmDetails.length - 1 : alarmDetails.length - 2) ? nextImgIndex += 1 : ''
        }
        this.onClickImgItem(nextImgIndex, currImgIndex);
    }

    onClickImgItem(nextImgIndex, currImgIndex = null) {
        let { alarmDetails } = this.props;
        if (!currImgIndex) {
            currImgIndex = this.state.currImgIndex;
        }
        if (currImgIndex != nextImgIndex) {
            document.getElementById('main-img').src = alarmDetails[nextImgIndex].alarmPic == 'deleted' ? delImgSrc : '/_file-server/' + alarmDetails[nextImgIndex].alarmPic;
            let currImgTimeDom = document.getElementById('img-time-' + currImgIndex);
            currImgTimeDom.style.background = 'linear-gradient(to bottom, rgba(255,0,0,0), rgba(236,236,236,1), rgba(255,0,0,0))';
            currImgTimeDom.style.color = 'black';
            let nextImgTimeDom = document.getElementById('img-time-' + nextImgIndex);
            nextImgTimeDom.style.background = 'linear-gradient(to bottom, rgba(255,0,0,0), rgba(169,169,169,1), rgba(255,0,0,0))';
            nextImgTimeDom.style.color = 'white';
            let imgInfoDom = document.getElementById('img-info');
            imgInfoDom.innerHTML = `时间：${alarmDetails[nextImgIndex].time}；距离：${this.getImgRange(alarmDetails[nextImgIndex].alarmRange)}`
            document.getElementById('img-options').style.display = alarmDetails[nextImgIndex].alarmPic == 'deleted' ? 'none' : 'block';
            this.setState({
                currAlarmPicSrc: alarmDetails[nextImgIndex].alarmPic
            })
        }
        this.setState({ currImgIndex: nextImgIndex });
    }

    getImgRange(range) {
        switch (range) {
            case 1:
                return '近'
            case 2:
                return '中'
            case 3:
                return '远'
            default:
                return '无数据'
        }
    }

    downloadAlarmPic(defaultSrc) {
        const { currAlarmPicSrc } = this.state;
        if (currAlarmPicSrc) {
            this.setState({
                downloadIframeSrc: '/_file-server/' + currAlarmPicSrc + '?' + Math.random()
            })
        } else {
            this.setState({
                downloadIframeSrc: '/_file-server/' + defaultSrc + '?' + Math.random()
            })
        }
    }

    renderHistory = record => {
        const { alarmDetails, loadingDetails } = this.props;
        const { currImgIndex } = this.state;
        if (alarmDetails && alarmDetails.length && alarmDetails[0].alarmPic) {
            const buttonStyle = { border: '1px solid #ECECEC', backgroundColor: '#ECECEC', width: 30, height: '100%', lineHeight: '120px', textAlign: 'center', cursor: 'pointer', float: 'left' };
            let outerDom = document.getElementById('outer-dom');
            let baseWidth = outerDom.offsetWidth - 50;

            let alarmPics = [];
            for (let i = 0; i < alarmDetails.length; i++) {
                if (alarmDetails[i].content.indexOf('告警确认') == -1) {
                    alarmPics.push(
                        <div
                            className='pic'
                            style={{
                                marginRight: 10,
                                display: 'inline-block',
                                position: 'relative',
                                cursor: 'pointer'
                            }}
                            title={alarmDetails[i].time}
                            onClick={() => { this.onClickImgItem(i) }}
                        >
                            <img width="160px" height="120px" src={alarmDetails[i].alarmPic == 'deleted' ? delImgSrc : `/_file-server/${alarmDetails[i].alarmPic}`} />
                            <div
                                id={`img-time-${i}`}
                                className="title"
                                style={{
                                    width: '100%',
                                    paddingLeft: 7,
                                    lineHeight: '28px',
                                    height: 30,
                                    position: 'absolute',
                                    bottom: 45,
                                    overflow: 'hidden',
                                    whiteSpace: 'no-wrap',
                                    textOverflow: 'ellipsis',
                                    background: i == currImgIndex ? 'linear-gradient(to bottom, rgba(255,0,0,0), rgba(169,169,169,1), rgba(255,0,0,0))' : 'linear-gradient(to bottom, rgba(255,0,0,0), rgba(236,236,236,1), rgba(255,0,0,0))',
                                    color: i == currImgIndex ? 'white' : 'black'
                                }}
                            >{alarmDetails[i].time}</div>
                        </div>
                    )
                }
            }

            let defaultValue = alarmDetails[currImgIndex];
            return (
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'relative', margin: 'auto', textAlign: 'center' }}>
                        <div id='img-info' style={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.3)', height: 30, lineHeight: '30px', paddingLeft: 15, paddingRight: 5, position: "absolute", top: 10, borderRadius: '0 6px 6px 0' }}>
                            时间：{defaultValue.time}； 距离：{this.getImgRange(defaultValue.alarmRange)}；
                        </div>
                        <img
                            id={`main-img`}
                            src={defaultValue.alarmPic == 'deleted' ? delImgSrc : `/_file-server/${defaultValue.alarmPic}`}
                            style={{
                                maxHeight: 600,
                                minHeight: 200,
                                maxWidth: baseWidth - 2 * 8,
                            }}
                        />
                        <div id="img-options" style={{ position: 'absolute', bottom: 10, left: 15, display: defaultValue.alarmPic == 'deleted' ? 'none' : 'block' }}>
                            <Button
                                style={{ backgroundColor: 'rgba(0,0,0,0.3)', marginRight: 13, color: 'white' }}
                                onClick={() => {
                                    this.downloadAlarmPic(alarmDetails[0].alarmPic)
                                }}
                            >下载</Button>
                        </div>
                    </div>
                    <div className="imgs-roller" style={{ width: baseWidth, height: 120 }}>
                        <div className="controller" style={Object.assign({}, buttonStyle, { borderRadius: '6px 0 0 6px', marginRight: 10 })} onClick={() => this.scroll(-1)}>
                            <LeftOutlined />
                        </div>
                        <div id="roller" style={{ position: 'relative', whiteSpace: 'nowrap', height: 120, float: 'left', width: baseWidth - 30 * 2 - 8 * 2 - 10 * 2 }}>
                            <div>
                                {
                                    alarmPics
                                }
                            </div>
                        </div>
                        <div className="controller" style={Object.assign({}, buttonStyle, { borderRadius: '0 6px 6px 0', marginLeft: 10 })} onClick={() => this.scroll(1)}>
                            <RightOutlined />
                        </div>-
                    </div>
                </div>
            )
        } else {
            const columns = [
                {
                    title: '告警活动',
                    dataIndex: 'alarmState',
                    key: 'alarmState',
                    render: (text, record) => {
                        switch (record.alarmState) {
                            case 0:
                                return '首次产生';
                            case 1:
                                return '持续产生';
                            case 2:
                                return <b>等级提升</b>
                            case 3:
                                return <b>自动恢复</b>;
                            case 4:
                                return <b>人工恢复</b>;
                        }
                    }
                }, {
                    title: '告警信息',
                    dataIndex: 'content',
                    key: 'content',
                    render: (text, record) => {
                        const content = record.content.split('：');
                        switch (record.alarmState) {
                            case 0:
                            case 1:
                            case 2:
                                return text;
                            case 3:
                                return <b>自动恢复</b>;
                            case 4:
                                return <b>{content.length == 2 ? content[1] : ''}</b>;
                        }
                    }
                }, {
                    title: '等级',
                    dataIndex: 'currentLevel',
                    key: 'currentLevel',
                    render: (text, record) => {
                        return <span>
                            <Badge dot style={{ backgroundColor: pickColorWithAlarmLevel(record.currentLevel) }} />
                            <span style={{ paddingLeft: 16 }}>{this.convertLevelToLabel(record.currentLevel)}</span>
                        </span>
                    }
                }, {
                    title: '产生时间',
                    dataIndex: 'time',
                    key: 'time'
                }]

            return <Table size="middle" loading={loadingDetails} columns={columns} dataSource={alarmDetails} rowKey={"time"} />
        }
    }

    confirm = (sourceId, alarmTypeCode) => {
        this.setState({ modalShow: true, confirmSourceId: sourceId, confirmAlarmTypeCode: alarmTypeCode })
    }

    handleOk = (confirmContent) => {
        this.props.checkAlarm({ sourceId: this.state.confirmSourceId, alarmTypeCode: this.state.confirmAlarmTypeCode, content: confirmContent });
        this.setState({ modalShow: false })
    }
    enterHandler = (e) => {
        if (e.key === 'Enter') {
            this.searchHandler(e.target.value);
        }
    };

    searchHandler = (value) => {
        this.props.enterSearch(value);
    };

    render() {
        const { sortedInfo } = this.state;

        let columns = [{
            title: '结构物',
            dataIndex: 'struct',
            key: 'struct',
            width: '12%'
        }, {
            title: '告警源',
            dataIndex: 'source',
            key: 'source',
            width: '10%',
            render: (text, record) => { return <span><Tag>{record.sourceType}</Tag>{record.source}</span> }
        }, {
            title: '等级',
            dataIndex: 'level',
            key: 'level',
            width: '8%',
            sorter: (a, b) => b.level - a.level,
            sortOrder: sortedInfo.columnKey == 'level' ? sortedInfo.order : false,
            render: (text, record) => {
                return <span>
                    <Badge dot style={{ backgroundColor: pickColorWithAlarmLevel(record.level) }} />
                    <span style={{ paddingLeft: 16 }}>{this.convertLevelToLabel(record.level)}</span>
                </span>
            }
        }, {
            title: '告警信息',
            dataIndex: 'content',
            key: 'content',
            width: '20%',
        }, {
            title: '产生次数',
            dataIndex: 'count',
            key: 'count',
            sorter: (a, b) => a.count - b.count,
            sortOrder: sortedInfo.columnKey == 'count' ? sortedInfo.order : false,
            width: '10%',
            render: (text, record) => { return <a onClick={() => { this.handleCountClick(record.key) }}>{record.count}</a> }
        }, {
            title: '产生时间',
            dataIndex: 'startTime',
            key: 'startTime',
            width: '15%',
            sorter: true,
            sortOrder: sortedInfo.columnKey == 'startTime' && sortedInfo.order,
        }, {
            title: '更新时间',
            dataIndex: 'endTime',
            key: 'endTime',
            width: '15%',
            sorter: true,
            sortOrder: sortedInfo.columnKey == 'endTime' && sortedInfo.order,
        }, {
            title: '操作',
            dataIndex: 'recoveryMode',
            key: 'operation',
            width: '10%',
            render: (text, record) => {
                switch (text) {
                    case 0:
                    case 1:
                    case 2:
                        if (!this.props.canCheckAlarm) return '';
                        return <a onClick={() => this.confirm(record.sourceId, record.alarmTypeCode)}>确认</a>;
                    case 3:
                        return '自动恢复';
                    case 4:
                        return '人工恢复';
                }
            }
        }];

        const { alarms, loading, count, current } = this.props;

        return (
            <Card style={{ marginTop: 16 }}>
                <Row style={{ marginBottom: 20 }}>
                    <Col span={4}>
                        <Input
                            onKeyDown={this.enterHandler}
                            onChange={e => this.setState({ searchValue: e.target.value })}
                            placeholder="关键词：告警源、告警信息" />
                    </Col>
                    <Col span={4}>
                        <Button type="primary" onClick={() => this.searchHandler(this.state.searchValue)} style={{ display: 'inline-block' }}>搜索</Button>
                    </Col>
                    <Col span={16}>
                        <Button style={{ float: 'right' }} type="ghost" disabled={loading} onClick={this.exporting}>导出</Button>
                    </Col>
                </Row>

                <div id='outer-dom' style={{ marginTop: 16 }}>
                    <Table columns={columns} dataSource={alarms} loading={loading} 
                        pagination={{ total: count, current: current }} expandedRowKeys={this.state.expandedRowKeys}
                        onChange={this.handleTableChange}
                        onExpand={this.handleTableExpand}
                        expandedRowRender={this.renderHistory}
                    />
                </div>

                <AlarmModal
                    visible={this.state.modalShow}
                    onOk={this.handleOk}
                    onCancel={() => this.setState({ modalShow: false })}
                />
                <iframe src={this.state.downloadIframeSrc} style={{ display: 'none' }}></iframe>
            </Card>
        );
    }
}

export default AlarmList;