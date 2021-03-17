'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import { Card, Table, Spin, Row, Input, Button, message } from 'antd';
import { getRecalList, issueRecalcRequest, getIssueRecalcResult } from '../../actions/recal';
import ShowResult from './showResult';

var filterSet = { location: null }
const g_RecalcResult = { OK: 0, WAITING: 1, FAILED: 2 };
const g_RecalcResultMap = {
    "0": { desp: "计算完毕", color: "#008B45" },
    "1": { desp: "计算中，请等待...", color: "#008B45" },
    "2": { desp: "计算失败", color: "#ff0000" }
};
class Recalc extends Component {
    constructor(props) {
        super(props);
        this.issueResults = new Map();
        this.issueIntervals = new Map();
        this.state = {
            selectedRowKeys: [],
            dataSource: [],
            filterFunc: {},
            recalcResults: this.issueResults,
            recalcIntervals: this.issueIntervals,
            pagination: false
        }
    }
    init = (dispatch, structId, factorId) => {
        //const { dispatch,structId,factorId } = this.props;
        dispatch(getRecalList(parseInt(structId), parseInt(factorId))).then(
            res => {
                this.initSource();
            }
        )
    }
    initSource = () => {
        const { items } = this.props;
        if (items) {
            const stations = items.stations;
            const dbsource = stations.map((n) => {
                return {
                    key: n.id,
                    statonId: n.id,
                    stationLoc: n.name,
                    formula: n.formula && JSON.stringify(n.formula) != '{}' ? n.formula : '',
                    params: n.paramNames && JSON.stringify(n.paramNames) != '{}' ? JSON.stringify(n.paramNames) : '',
                    pvalue: n.stationParams && JSON.stringify(n.stationParams) != '{}' ? JSON.stringify(n.stationParams) : '',
                    devices: n.iotaDevices.map(m => {
                        return {
                            key: m.id,
                            deviceName: m.name,
                            dformula: m.formula && JSON.stringify(m.formula) != '{}' ? m.formula : '',
                            dparams: m.paramNames && JSON.stringify(m.paramNames) != '{}' ? JSON.stringify(m.paramNames) : '',
                            dpvalue: m.params && JSON.stringify(m.params) != '{}' ? JSON.stringify(m.params) : ''
                        }
                    })

                };
            });
            this.setState({ dbsource: dbsource, selectedRowKeys: [] });
        } else {
            this.setState({ dbsource: [], selectedRowKeys: [] });
        }


    }
    UNSAFE_componentWillReceiveProps = (nextProps) => {
        if (nextProps.structId != this.props.structId || nextProps.factorId != this.props.factorId) {
            this.setState({ recalcResults: new Map(), selectedRowKeys: [] });
            const { structId, factorId, dispatch } = nextProps
            this.init(dispatch, structId, factorId);
            this.state.recalcIntervals.forEach(r => {
                clearInterval(r);
            });
        }
    }
    componentDidMount() {
        const { dispatch, params, structId, factorId } = this.props;
        this.init(dispatch, structId, factorId);
    }
    componentWillUnmount() {
        /*  this.state.issueIntervals.forEach(r => {
             clearInterval(r);
         }); */
        this.state.recalcIntervals.forEach(r => {
            clearInterval(r);
        });
        this.setState = (state, callback) => { return }
    }
    /* rowSelection= {
       onChange: (selectedRowKeys, selectedRows) => {
         this.setState({selectedRowKeys:selectedRowKeys});
       },        
     }; */
    rowSelection = (selectedRowKeys) => {
        this.setState({ selectedRowKeys: selectedRowKeys });
    }
    renderHistory = record => {
        const { alarmDetails } = this.props;
        const { dbsource } = this.state;
        const result = dbsource.find(m => m.key == record.key);
        const ff = Array.from(result.devices);
        const columns = [
            {
                title: '设备名称',
                dataIndex: 'deviceName',
                key: 'deviceName',
                render: (text, record) => {
                    return <b>{record.deviceName}</b>
                }
            }, {
                title: '计算公式',
                dataIndex: 'dformula',
                key: 'dformula',
                render: (text, record) => {
                    return <b>{record.dformula}</b>
                }
            }, {
                title: '计算参数',
                dataIndex: 'dparams',
                key: 'dparams',
                render: (text, record) => {
                    return <b>{record.dparams}</b>
                }
            }, {
                title: '参数值',
                dataIndex: 'dpvalue',
                key: 'dpvalue',
                render: (text, record) => {
                    return <b>{record.dpvalue}</b>
                }
            }]

        return <Table {...this.state} size="middle" columns={columns} dataSource={ff} />
    }
    handleInputChange = () => {

    }
    onBatchRecal = () => {
        const { structId, factorId, startTime, endTime, user } = this.props;
        if (this.state.selectedRowKeys.length <= 0) {
            message.error('请先选择测点！');
        } else {
            let stationIds = [];
            this.state.selectedRowKeys.forEach(row => {
                stationIds.push(row);
            });
            let tmpCatch = this.state.recalcIntervals;
            stationIds.forEach(s => {
                if (this.state.recalcIntervals.get(s) != undefined) {
                    clearInterval(this.state.recalcIntervals.get(s));
                }
                this.props.dispatch(issueRecalcRequest({ name: 'recalc_task', userId: user.id, stationId: s, startTime: startTime, endTime: endTime })).then((data) => {
                    var task = data.payload.data.msgId;
                    let intervalHandle = this.timingWorker(s, task);
                    tmpCatch.set(parseInt(s), intervalHandle);
                })
            });
            setTimeout(() => {
                this.setState({
                    issueIntervals: tmpCatch
                })
            });
        }
    }
    catchResult = (d, content) => {
        let temporary = new Map();
        this.state.dbsource.forEach(i => {
            let a = i;
            if (i.key == d) {
                a.result = content;
            }
            temporary.set(parseInt(i.key), a);
        })
        this.setState({
            recalcResults: temporary,
        });
    }
    timingWorker = (d, task) => {
        let timeOut = 60;
        let sivResult;
        var resultArray = [];
        this.catchResult(d, ['开始同步计算，请等待...']);


        return sivResult = setInterval(() => {
            timeOut = timeOut - 1;
            this.props.dispatch(getIssueRecalcResult(task)).then((data) => {
                if (data.success) {
                    var result = data.payload.data.state;
                    resultArray.push(result);
                    let res = '同步' + g_RecalcResultMap["" + result].desp;
                    let choose = [];
                    if (result == g_RecalcResult.OK || result == g_RecalcResult.FAILED) {
                        clearInterval(sivResult);
                        choose = [res];//下发成功或失败
                    } else {
                        choose = [res, timeOut];//下发等待
                    };
                    this.catchResult(d, choose);
                    if (timeOut == 0) {
                        clearInterval(sivResult);
                        let result = resultArray[resultArray.length - 1];
                        let res = result == g_RecalcResult.WAITING ?
                            '重计算超时, 请重新下发' : '同步' + g_RecalcResultMap["" + result].desp;
                        this.catchResult(d, [res]);
                    }
                }
                else {
                    let choose = [];
                    let res = '同步配置' + g_RecalcResultMap["2"].desp + ',请重新下发';
                    choose = [res];
                    this.catchResult(d, [res]);
                }
            });
        }, 1000);
    }
    handleInputChange = e => {
        if (e.target.value != null) {
            const value = e.target.value;
            let func = (ep => (s => (s.stationLoc).search(ep) > -1))(value);
            filterSet.location = func;
            /*func = (ep => (s => (s.factorName).search(ep) > -1))(value);
            filterSet.factorName = func;
            func = (ep => (s => (s.groupName).search(ep) > -1))(value);
            filterSet.groupName = func;
             func = (ep => (s => (s.deviceName.join(',')).search(ep) > -1))(value);
            filterSet.deviceName = func; */
        } else {
            filterSet.location = null;
            //filterSet.factorName = null;
            //filterSet.groupName = null;
            //filterSet.deviceName = null;
        }
        this.setState({ filterFunc: filterSet })
    }
    render() {
        const { selectedRowKeys, dbsource } = this.state;
        const hasSelected = selectedRowKeys.length > 0;
        const { structId, factorId, startTime, endTime } = this.props;
        let tmpds = [];
        let filterData = dbsource;
        let dataPush = [];
        let keyArr = [];
        let flag = false;
        Object.keys(this.state.filterFunc).forEach(key => {
            const filter = this.state.filterFunc[key];
            filterData = dbsource;
            if (filter != null) {
                flag = true;
                filterData = filterData.filter(filter)
                if (filterData.length > 0) {
                    filterData.map(s => {
                        if (keyArr.indexOf(s.key) == -1) {
                            keyArr.push(s.key);
                            dataPush.push(s);
                        }
                    })
                }
            }
        })
        tmpds = flag ? dataPush : dbsource;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.rowSelection,
        };
        const columns = [{
            title: '测点名称',
            dataIndex: 'stationLoc',
            key: 'stationLoc',
            width: '16%'
        }, {
            title: '计算公式',
            dataIndex: 'formula',
            width: '20%',
            key: 'formula',
        }, {
            title: '计算参数',
            dataIndex: 'params',
            width: '24%',
            key: 'params',
        }, {
            title: '参数值',
            dataIndex: 'pvalue',
            width: '15%',
            key: 'pvalue',
        }, {
            title: '下发结果',
            dataIndex: 'presult',
            width: '25%',
            key: 'presult',
            render: (text, record) => {
                return (
                    <ShowResult stationId={record.key} results={this.state.recalcResults} />
                );
            }
        }];

        return (
            <Card>
                <Spin spinning={false}>
                    <Row style={{ marginBottom: 16 }}>
                        <Input id="searchInput"
                            style={{
                                zIndex: 1,
                                float: 'left',
                                width: '25%',
                                marginRight: 8
                            }}
                            // size="large"
                            placeholder="测点名称" onChange={this.handleInputChange}
                            suffix={<SearchOutlined />}
                        />
                        <Button type="primary"
                            // style={{ height: 32 }}
                            onClick={this.onBatchRecal}
                            disabled={!hasSelected}
                        >
                            批量计算
                        </Button>
                        {/* <div style={{float:''}}> */}

                        {/* </div> */}
                    </Row>
                    {/*  <Table columns={columns} rowSelection={this.rowSelection} dataSource={tmpds}  expandedRowRender={this.renderHistory}/> */}
                    <Table columns={columns} rowSelection={rowSelection} dataSource={tmpds} expandedRowRender={this.renderHistory} />
                </Spin>
            </Card>

        );
    }
}

function mapStateToProps(state) {
    const { recalList, auth, issueTask, resultTask } = state;
    return {
        isRequesting: recalList.isRequesting || issueTask.isRequesting || resultTask.isRequesting,
        user: auth.user,
        items: recalList.data && recalList.data.length > 0 ? recalList.data[0] : null,
        //structFactors:structFactorList.items  
    };
}

export default connect(mapStateToProps)(Recalc);

