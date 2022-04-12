'use strict'

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Tooltip, Modal, Button, Table, Spin, Input, Alert, Divider } from "antd";
import CeDianModel from './cedianModel'
import { getCedian } from '../../actions/zuhe';
import { getStructState } from '../../actions/struct';
import { getDeviceList } from '../../actions/integrationInfo';
import { deletePointInfo } from '../../actions/bushepeizhi';
import { getStructFactorList } from '../../actions/struct';
import { AuthorizationCode } from '$utils';
import { PinyinHelper, clearData } from '@peace/utils';
import { SearchOutlined } from '@ant-design/icons';

var filterSet = { location: null, factorName: null, groupName: null, deviceName: null }

class CeDian extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: null,
            disableBatchDelete: true,
            showCeDianModel: false,
            dataSource: [],
            //tmpds:[],
            titile: '',
            previewPicShow: false,
            previewImage: '',
            selectedRow: null,
            modalType: '',
            currentPage: 1,
            showPopover: false,
            selectedRowKeys: [],
            filterFunc: {},
            singleStructState: null,
            isRequesting: false
        };
    }
    UNSAFE_componentWillMount() {
        const { dispatch, match, location } = this.props;

        if (match.params && match.params.id) {
            dispatch(getStructState(parseInt(match.params.id))).
                then(res => {
                    dispatch(getDeviceList(res.payload.data.iotaThingId)).then(
                        dres => {
                            dispatch(getCedian(parseInt(match.params.id))).then(
                                sres => {
                                    let ds = this.packageData(dres, sres);
                                    //this.setState({dataSource:ds,tmpds:ds})
                                    this.setState({ dataSource: ds })
                                }
                            )
                        }
                    )

                });
            dispatch(getStructFactorList(match.params.id));
        }

    }
    componentWillUnmount() {
        const { dispatch } = this.props;
        clearData(dispatch, { actionType: 'GET_ZUWANG_INFO' })

    }
    initSet = () => {
        const { dispatch, match, location } = this.props;
        if (match.params && match.params.id) {
            dispatch(getStructState(parseInt(match.params.id))).
                then(res => {
                    dispatch(getDeviceList(res.payload.data.iotaThingId)).then(
                        dres => {
                            dispatch(getCedian(parseInt(match.params.id))).then(
                                sres => {
                                    let ds = this.packageData(dres, sres);
                                    //this.setState({dataSource:ds})
                                    this.setState({ dataSource: ds, tmpds: ds })
                                }
                            )
                        }
                    )

                });
        }

    }

    handleChange = (record, selected, selectedRows) => {
        this.setState({ disableBatchDelete: true });
    }
    //测点和设备
    packageData = (dres, sres) => {
        if (!dres || !sres) {
            return null;
        }
        let stations = [];
        let instances = dres.payload.data.instances;
        //const {items}=this.props;
        const items = sres.payload.data;
        if (items && items.length > 0) {
            items.forEach(s => {
                if (s.groups.length > 0) {
                    for (let i = 0; i < s.groups.length; i++) {
                        let g = s.groups[i];
                        for (let j = 0; j < g.stations.length; j++) {
                            let ss = g.stations[j];
                            if (JSON.stringify(ss.iotaDevices) != "{}") {
                                let deviceIds = [];
                                for (let device in ss.iotaDevices) {
                                    deviceIds.push(device);
                                }
                                let deviceNames = [];
                                if (instances && deviceIds.length > 0) {
                                    deviceIds.forEach(id => {
                                        if (instances.hasOwnProperty(id)) {
                                            //deviceNames+=instances[id].instance.name;//todo show
                                            deviceNames.push(instances[id].instance.name);
                                        }
                                    })
                                }
                                //if(deviceNames!=''){
                                //if(deviceNames.length>0){
                                stations.push({
                                    key: ss.id,
                                    factorId: s.factorId,
                                    factorName: s.factorName,
                                    factorProto: s.factorProto,
                                    groupId: g.id,
                                    groupName: g.name,

                                    groupParams: ss.groupParams,
                                    location: ss.name,
                                    sensorId: ss.id,
                                    portrait: ss.portrait,
                                    labels: ss.labels,
                                    manualData: ss.manualData,
                                    iotaDevices: ss.iotaDevices,
                                    multiParams: ss.multiParams,
                                    deviceName: deviceNames,
                                    extras: ss.extras

                                });
                                //}
                            } else {
                                stations.push({
                                    key: ss.id,
                                    factorId: s.factorId,
                                    factorName: s.factorName,
                                    factorProto: s.factorProto,
                                    groupId: g.id,
                                    groupName: g.name,

                                    groupParams: ss.groupParams,
                                    location: ss.name,
                                    sensorId: ss.id,
                                    portrait: ss.portrait,
                                    labels: ss.labels,
                                    manualData: ss.manualData,
                                    iotaDevices: ss.iotaDevices,
                                    multiParams: ss.multiParams,
                                    deviceName: null,
                                    extras: ss.extras

                                });
                            }

                        }
                    }

                }
            })
        }
        return stations;
    }

    handleInputChange = e => {
        if (e.target.value != null) {
            const value = e.target.value;
            let func = (ep => (s => (s.location).search(ep) > -1 || PinyinHelper.isPinyinMatched(s.location, ep)))(value);
            filterSet.location = func;
            func = (ep => (s => (s.factorName).search(ep) > -1 || PinyinHelper.isPinyinMatched(s.factorName, ep)))(value);
            filterSet.factorName = func;
            func = (ep => (s => (s.groupName).search(ep) > -1 || PinyinHelper.isPinyinMatched(s.groupName, ep)))(value);
            filterSet.groupName = func;
            /* func = (ep => (s => (s.deviceName.join(',')).search(ep) > -1))(value);
            filterSet.deviceName = func; */
        } else {
            filterSet.location = null;
            filterSet.factorName = null;
            filterSet.groupName = null;
            //filterSet.deviceName = null;
        }
        this.setState({ filterFunc: filterSet })
    }
    handleBatchDelete = () => {
        this.setState({ disableBatchDelete: true });
    }
    handleBtnCancle = () => {
        this.setState({ showCeDianModel: false });
    }
    handleBtnAddCedian = () => {
        this.setState({ showCeDianModel: true, titile: '新增测点', selectedRow: null, modalType: 'add' });
    }
    viewClick = (e, record) => {
        this.setState({ showCeDianModel: true, titile: '查看测点', selectedRow: record, modalType: 'query' });
    }
    editClick = (e, record) => {
        this.setState({ showCeDianModel: true, titile: '修改测点', selectedRow: record, modalType: 'modify' });
    }

    mouseOut = (img) => {
        //this.setState({previewPicShow:false});

    }
    mouseOver = (img) => {
        //this.setState({previewPicShow:true,previewImage:img});
    }
    removeClick = (e, record) => {
        const _this = this;
        Modal.confirm({
            title: '删除测点',
            content: <div style={{ width: 290, wordBreak: 'break-all' }}>{'确定删除测点【' + record.location + '】吗？删除后，相关的信息将全部丢弃！'}</div>,
            onOk() {
                _this.props.dispatch(deletePointInfo(record.sensorId)).then(_ => {
                    _this.initSet();
                    //选中项中，去除删除项
                    let index = _this.state.selectedRowKeys.indexOf(record.sensorId);
                    let arr = _this.state.selectedRowKeys;
                    if (index > -1) {
                        arr.splice(index, 1);
                        _this.setState({ selectedRowKeys: arr });
                    }
                });
            },
            onCancel() {
            },
        });
    }

    batchRemoveClick = () => {
        const { selectedRowKeys, dataSource } = this.state;
        const _this = this;
        let keysName = '';
        for (let i = 0; i < selectedRowKeys.length; i++) {
            keysName += dataSource.filter(d => d.key == selectedRowKeys[i])[0].location;
            if (i != selectedRowKeys.length - 1) {
                keysName += '、'
            }
        }
        Modal.confirm({
            title: '批量删除测点',
            content: <div style={{ width: 290, wordBreak: 'break-all' }}>{'确定删除测点【' + keysName + '】吗？删除后，相关的信息将全部丢弃！'}</div>,
            onOk() {
                _this.onBatchDelete()
            },
            onCancel() {
            },
        });
    }
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }
    onBatchDelete = () => {
        const { selectedRowKeys } = this.state;
        if (selectedRowKeys && selectedRowKeys.length > 0) {
            // selectedRowKeys.forEach(m => {
            //     this.props.dispatch(deletePointInfo(m));
            // });
            // this.initSet();
            // this.setState({ selectedRowKeys: [] });
            this.setState({ isRequesting: true });
            this.props.dispatch(deletePointInfo(selectedRowKeys)).then(_ => {
                this.initSet();
                this.setState({ selectedRowKeys: [], isRequesting: false });
            });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.singleStructState) {
            this.setState({ singleStructState: nextProps.singleStructState })
        }
    }
    render() {
        const resources = this.props.user.resources;
        const addStationRes = resources.length == 0 ? false :
            resources.indexOf(AuthorizationCode.AddStation) > -1 ? true : false;
        const modifyStationRes = resources.length == 0 ? false :
            resources.indexOf(AuthorizationCode.ModifyStation) > -1 ? true : false;
        const deleteStationRes = resources.length == 0 ? false :
            resources.indexOf(AuthorizationCode.DeleteStation) > -1 ? true : false;
        const { items, match, location } = this.props;
        const { showPopover, selectedRowKeys, dataSource, singleStructState } = this.state;
        const modalContentMaxHeight = document.body.clientHeight - 300;
        let tmpds = [];
        let filterData = dataSource;
        let dataPush = [];
        let keyArr = [];
        let flag = false;
        let stationLocation = [];

        Object.keys(this.state.filterFunc).forEach(key => {
            const filter = this.state.filterFunc[key];
            filterData = dataSource;
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
        tmpds = flag ? dataPush : dataSource;
        tmpds = tmpds.sort((a, b) => a.key - b.key);
        stationLocation = tmpds.reduce((p, c) => {
            p = p.concat(c.location.toString());
            return p;
        }, []);
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        const columns = [{
            title: '监测因素',
            key: 'factorName',
            dataIndex: 'factorName',
            sorter: (a, b) => {
                let stringA = a.factorName.toUpperCase();
                let stringB = b.factorName.toUpperCase();
                if (stringA < stringB) {
                    return -1;
                }
                if (stringA > stringB) {
                    return 1;
                }
                return 0;
            }
        }, {
            title: '分组',
            key: 'groupName',
            dataIndex: 'groupName',
            sorter: (a, b) => {
                let stringA = a.groupName.toUpperCase();
                let stringB = b.groupName.toUpperCase();
                if (stringA < stringB) {
                    return -1;
                }
                if (stringA > stringB) {
                    return 1;
                }
                return 0;
            }
        }, {
            title: '测点名称',
            key: 'location',
            dataIndex: 'location',
            sorter: (a, b) => {
                let stringA = a.location.toUpperCase();
                let stringB = b.location.toUpperCase();
                if (stringA < stringB) {
                    return -1;
                }
                if (stringA > stringB) {
                    return 1;
                }
                return 0;
            }
        }, {
            title: '设备',
            key: 'deviceName',
            dataIndex: 'deviceName',
            render: (text) => (text && text.length > 0) ? text.join(',') : null
        }, {
            title: '数据来源方式',
            key: 'manualData',
            dataIndex: 'manualData',
            render: (text) => text ? "人工上传" : "采集"
        }, {
            title: '特征标签',
            key: 'labels',
            dataIndex: 'labels',
            render: (text) => (text && text.length > 0) ? text.join(",") : null
        }, {
            title: '现场测点缩略图',
            key: 'portrait',
            dataIndex: 'portrait',
            render: (text) => text != null ? (<Tooltip style={{ width: 253 }} title={<img style={{ width: 200, cursor: 'pointer' }}
                src={`${text}`} />}><img style={{ width: 25, cursor: 'pointer' }} onMouseOut={() => this.mouseOut(text)} onMouseOver={() => this.mouseOver(text)}
                    src={`${text}`} title={text.split('/')[2]} /></Tooltip>) : null
        }, /* {
            title: '启用/停用',
            key: '',
            dataIndex: 'ss'
        }, */{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: '15%',
            render: (text, record) => (
                <span>
                    {/* <a href="#" onClick={(e) => this.viewClick(e, record)}>查看</a>
                    <span className="ant-divider"></span> */}
                    {modifyStationRes ? <a href="#" onClick={(e) => this.editClick(e, record)}>编辑</a> : null}
                    {modifyStationRes && deleteStationRes ? <Divider type="vertical" /> : null}
                    {deleteStationRes ? <a href="#" onClick={(e) => this.removeClick(e, record)}>删除</a> : null}
                </span>
            ),
        }];
        return (
            <Spin spinning={this.props.isRequesting || this.state.isRequesting}>
                <Card>
                    <Row style={{ marginBottom: 16 }}>
                        <Col span={24}>
                            <div style={{ float: 'right' }}>
                                <Button style={{ marginRight: 8, display: deleteStationRes ? "inline" : "none" }}
                                    onClick={this.batchRemoveClick}
                                    disabled={!hasSelected}
                                >批量删除</Button>
                                <Button style={{ display: addStationRes ? "inline" : "none" }} type='primary' onClick={this.handleBtnAddCedian}>新建测点</Button>
                            </div>

                            <Input id="searchInput"
                                style={{
                                    zIndex: 1,
                                    float: 'left',
                                    width: '25%',
                                    marginRight: 0
                                }}
                                size="large"
                                placeholder="监测因素、分组、测点名称" onChange={this.handleInputChange}
                                suffix={<SearchOutlined />} />
                        </Col>
                    </Row>

                    <Row style={{ marginBottom: 16 }}>
                        <Col span={24}>
                            <Alert
                                message={`已选择${selectedRowKeys.length}项`}
                                type="info" showIcon
                                onClose={e => { }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Table rowSelection={rowSelection} columns={columns} dataSource={tmpds} />
                        </Col>
                    </Row>
                    {this.state.showCeDianModel ?
                        <CeDianModel
                            visible={true}
                            onCancle={this.handleBtnCancle}
                            structId={match.params.id}
                            selectedRow={this.state.selectedRow}
                            title={this.state.titile}
                            modalType={this.state.modalType}
                            structFactors={this.props.structFactors}
                            stations={items}
                            stationLocation={stationLocation}
                            init={this.initSet}
                            modalContentMaxHeight={modalContentMaxHeight}
                            singleStructState={singleStructState}
                        />
                        : ''}
                    <Modal id={Math.random()} maskClosable={false} visible={this.state.previewPicShow} footer={null} title='预览'>
                        <img alt="example" style={{ width: '100%' }} src={`${this.state.previewImage}`} />
                    </Modal>
                </Card>
            </Spin>
        );
    }
}

function mapStateToProps(state) {
    const { singleStructState, cedian, auth, deviceList, structFactorList, global } = state;
    return {
        isRequesting: cedian.isRequesting || singleStructState.isRequesting || deviceList.isRequesting || structFactorList.isRequesting,
        user: auth.user,
        items: cedian.data || [],
        structFactors: structFactorList.data || [],
        apiRoot: global.apiRoot,
        singleStructState: singleStructState.data || null
    };
}

export default connect(mapStateToProps)(CeDian)
