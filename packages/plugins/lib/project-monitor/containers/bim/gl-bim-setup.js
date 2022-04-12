import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBimPath, GET_BIM_PATH_SUCCESS, updateBimPath, changeBimStations, GET_BIM_STATIONS_SUCCESS, getBimStations } from '../../actions/bim';
import { getCedian } from '../../actions/zuhe';
import {
    Button, Modal, message, Card, Radio, Collapse, Input, Spin, Tooltip, Row, Col,
    Menu, Dropdown, Slider, Layout
} from 'antd';
import { push } from 'react-router-redux';
import PerfectScrollbar from 'perfect-scrollbar';
import { PinyinHelper } from '@peace/utils';
import { HddOutlined, RollbackOutlined, SaveOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const Panel = Collapse.Panel;
const Search = Input.Search;
const confirm = Modal.confirm;

const panelDivStyle = {
    height: 30, lineHeight: '30px', backgroundColor: '#108ee9', borderRadius: 4, marginTop: 10, paddingLeft: 5, paddingRight: 7, color: 'white'
}
const panelStationNameStyle = {
    marginLeft: 5, width: 110 - 17, display: 'inline-block', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'
}
const panelOptionStyle = {
    fontSize: '14px', marginLeft: 9, cursor: 'pointer', lineHeight: '30px',
}
const panelOptionTwoWordStyle = {
    fontSize: '14px', marginLeft: 9, width: 28, cursor: 'pointer', lineHeight: '30px', float: 'right', marginBottom: 0
}
const panelOptionFourWordStyle = {
    fontSize: '14px', marginLeft: 9, width: 56, cursor: 'pointer', lineHeight: '30px', float: 'right'
}
const panelDivSetedStyle = {
    height: 30, lineHeight: '30px', backgroundColor: '#F2EADA', borderRadius: 4, marginTop: 10, paddingLeft: 5, paddingRight: 7, color: '#666666'
}
const stationBIMiconStyle = {
    position: 'relative', bottom: 10
}
const optionButtonStyle = {
    width: 100
}
const stationNameMaxLength = 14;
const stationIcon = '/assets/images/sensor-yellow.svg';
const stationSelectedIcon = '/assets/images/sensor-green.svg';

class GlBimSetup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            containerHeight: window.innerHeight - 68 - 24 * 2,
            containerWidth: window.innerWidth - 300 - 24 * 2,

            uploadVisible: false,
            confirmLoading: false,
            uploadDisabled: false,
            fileList: [],
            uploading: false,
            iframeSrcUpLoad: null,
            isDeleteHotspots: false,
            buDian: false,
            showType: 'all',
            stationsList: [],
            isModelReady: false,
            stations: null,
            currentPanel: null,
            searchMsg: [],
            isSetPointing: false,
            currentStationName: null,
            currentStationId: null,
            currentPoint: null,
            currentBbox: null,
            currentStrucId: null,
            currentOption: null,
            addStations: [],
            changeStations: [],
            delStations: [],
            isStoragePoint: false,
            hasStorageStationsId: false,
            isStationsDataReady: false,
            currentStrucName: '',

            //操作
            showExplosionSlider: false,
            expSliderValue: 0,
            showClipSlider: false,
            xClipSliderValue: [0, 100],
            yClipSliderValue: [0, 100],
            zClipSliderValue: [0, 100],
            showClearSlider: false,
            clearSliderValue: 100,
            isWireFrameModal: false,
            isBimStationsReady: false,
        }
    }

    _onWindowResize = () => {
        this.setState({
            containerHeight: window.innerHeight - 68 - 24 * 2,
            containerWidth: window.innerWidth - 300 - 24 * 2
        })
    }

    UNSAFE_componentWillMount() {
        this.setState({
            currentStrucName: decodeURI(window.location.href.split('?')[1])
        })
        window.addEventListener('resize', this._onWindowResize);
        const { dispatch, match: { params } } = this.props;
        const that = this;
        window.OnLoadModelEnd = function (tag) {
            that.setState({ isModelReady: true });
            dispatch(getBimStations(params.id)).then(res_ => {
                if (res_.type == GET_BIM_STATIONS_SUCCESS) {
                    dispatch(getCedian(params.id)).then(res => {
                        if (res.success) {
                            let { stations, bimMsg } = that.props;
                            if (stations && bimMsg.stations) {
                                if (stations == 'error') {
                                    return message.error('测点数据获取失败');
                                }
                                that.setState({
                                    stations: JSON.parse(JSON.stringify(stations)),
                                })
                                that.handelStations([], that.state.showType);
                            }
                        }
                        that.setState({ isStationsDataReady: true })
                    });
                    that.drawBimStations();
                }
                that.setState({ isBimStationsReady: true })
            });
        };
        window.OnClickPosition = function (position) {
            const { currentStationId, isSetPointing } = that.state;
            if (isSetPointing) {
                that.delTagging(currentStationId)
                that.setState({ currentPoint: position })
                that.addTagging(position, currentStationId)
            }
        };
        window.OnSelectionChanged = function (componentId) {
            that.setState({ currentStrucId: componentId })
        };
        // window.OnAnchorClick = function (tag) {
        //     console.log(tag)
        // }
    }

    componentDidMount() {
        const { dispatch, match: { params } } = this.props;
        const that = this;
        //window.removeEventListener('resize', this._onWindowResize);
        EngineInit('bimIframe', true, '../../../../../assets/js/glendale-bim/cube.glb');
        dispatch(getBimPath(params.id)).then(res => {
            if (res.type == GET_BIM_PATH_SUCCESS) {
                let path = res.payload.bimPath;
                if (path) {
                    AddModel(path, params.id);
                }
            }
        });
        new PerfectScrollbar('#sensor-list', { suppressScrollX: true });
    }

    componentWillReceiveProps(nextProps) {

    }

    showConfirm = () => {
        let { addStations, changeStations, delStations, isSetPointing } = this.state;
        let { dispatch, match: { params } } = this.props;
        let that = this;
        if (isSetPointing) {
            return message.warning('请先取消或完成当前操作');
        }
        let backUrl = `/project-monitor/things/struct/${params.id}/configuration/glbim`
        if (addStations.length || changeStations.length || delStations.length) {
            confirm({
                title: '还有未保存的数据，确定不保存就返回吗?',
                content: '',
                onOk() {
                    dispatch(push(backUrl))
                },
                onCancel() {
                    //console.log('Cancel');
                },
            });
        } else {
            dispatch(push(backUrl))
        }
    }

    beforeSetPoint = (stationId, stationName, optionType) => {
        let { searchMsg, showType, isStoragePoint, isSetPointing } = this.state;
        if (isSetPointing) {
            return message.warning('请先完成当前操作');
        }
        if (isStoragePoint) {
            return message.warning('请等待数据保存完毕');
        }
        this.setState({ isSetPointing: true, currentStationId: stationId, currentStationName: stationName, currentOption: optionType });
        this.handelStations(searchMsg, showType, stationId);
        SetClickMode(3);
    }

    comfirmSetPoint = () => {
        let { currentStrucId, currentStationId, currentPoint, currentBbox, currentOption } = this.state;
        if (currentPoint == null) {
            message.warning('请选择测点位置');
        } else {
            let { delStations, addStations, changeStations } = this.state;
            let { match: { params } } = this.props;
            let bimStations = this.props.bimMsg.stations;
            let isSeted = bimStations.filter(s => s.stationId == currentStationId);
            let currentDel = delStations.filter(s => s == currentStationId);
            let pointMsg = {
                structId: params.id,
                stationId: currentStationId,
                componentId: currentStrucId,
                point: currentPoint,
                bbox: currentBbox
            }
            if (currentOption == 'setPoint') {
                if (currentDel.length) {
                    for (let i in delStations) {
                        if (delStations[i] == currentStationId) {
                            delStations.splice(i, 1);
                            this.setState({ delStations: delStations })
                        }
                    }
                }
                if (isSeted.length) {
                    changeStations.push(pointMsg);
                    this.setState({ changeStations: changeStations })
                } else {
                    addStations.push(pointMsg);
                    this.setState({ addStations: addStations });
                }
            } else if (currentOption == 'resetPoint') {
                let rereset = false;
                if (isSeted.length) {
                    for (let i in changeStations) {
                        if (changeStations[i].stationId == currentStationId) {
                            changeStations[i] = pointMsg;
                            rereset = true;
                            break;
                        }
                    }
                } else {
                    for (let i in addStations) {
                        if (addStations[i].stationId == currentStationId) {
                            addStations[i] = pointMsg;
                            rereset = true;
                            this.setState({ addStations: addStations });
                            break;
                        }
                    }
                }
                if (!rereset) {
                    changeStations.push(pointMsg);
                }
                this.setState({ changeStations: changeStations });
            }

            this.setState({ isSetPointing: false, currentStationId: null, currentStationName: null, currentPoint: null, currentBbox: null, currentStrucId: null, currentOption: null });
            SetClickMode(0);
            this.handelStations();
        }
    }

    cancelSetPoint = () => {
        this.setState({ isSetPointing: false });
        let { searchMsg, showType, changeStations, addStations, delStations, currentStationId, currentStationName } = this.state;
        let currentItem = this.state.currentStationName;

        let rePosition = null;
        let isChangeBefore = changeStations.filter(s => s.stationId == currentStationId);
        let isSetedBefore = this.props.bimMsg.stations.filter(s => s.stationId == currentStationId);
        let isAddedBefore = addStations.filter(s => s.stationId == currentStationId);
        let isDeledBefore = delStations.filter(s => s == currentStationId);

        if (isDeledBefore.length > 0) {

        } else if (isChangeBefore.length > 0) {// change  add  bimStation
            rePosition = isChangeBefore[0].point;
        } else if (isSetedBefore.length > 0) {
            rePosition = isSetedBefore[0].point;
        } else if (isAddedBefore.length > 0) {
            rePosition = isAddedBefore[0].point;
        }

        this.delTagging(currentStationId)
        if (rePosition) {
            this.addTagging(rePosition, currentStationId);
        }

        this.setState({ isSetPointing: false, currentStationId: null, currentStationName: null, currentPoint: null, currentBbox: null, currentStrucId: null, currentOption: null });
        this.handelStations(searchMsg, showType);

    }

    addTagging = (position, id) => {
        AddAnchor(position, stationIcon, 13, 13, id, true);
    }

    delTagging = (stationId) => {
        RemoveAnchor(stationId)
    }

    delSetPoint = (stationId) => {
        let { addStations, changeStations, delStations, isSetPointing, isStoragePoint } = this.state;
        let bimStations = this.props.bimMsg.stations;
        let isSeted = bimStations.filter(s => s.stationId == stationId).length;
        if (isSetPointing) {
            return message.warning('请先完成当前操作');
        }
        if (isStoragePoint) {
            return message.warning('请等待数据保存完毕');
        }
        if (!isSeted) {
            for (let i in addStations) {
                if (addStations[i].stationId == stationId) {
                    addStations.splice(i, 1);

                    this.delTagging(stationId);
                    this.setState({ addStations: addStations });
                }
            }
        } else {
            for (let i in bimStations) {
                if (bimStations[i].stationId == stationId) {
                    this.delTagging(stationId);
                    break;
                }
            }
            for (let i in changeStations) {
                if (changeStations[i].stationId == stationId) {
                    changeStations.splice(i, 1);
                    this.setState({ changeStations: changeStations });
                    break;
                }
            }
            delStations.push(stationId);
            this.setState({ delStations: delStations });
        }
        this.handelStations();
    }

    _handleInputChange = (e) => {
        let searchValue = e.target.value;
        let { searchMsg, currentPanel, showType } = this.state;
        for (let s of searchMsg) {
            if (s[0] == currentPanel) {
                s[1] = searchValue;
                break;
            }
        }
        this.setState({ searchMsg: searchMsg });
        this.handelStations(searchMsg, showType)
    }

    panelChange = (e) => {
        this.setState({ currentPanel: e })
        let { searchMsg } = this.state;
        let isInclude = searchMsg.filter(s => s[0] == e);
        if (isInclude.length == 0) {
            searchMsg.push([e, null]);
            this.setState({ searchMsg: searchMsg });
        }
    }

    storageSetPoint = () => {
        let { addStations, changeStations, delStations, isSetPointing } = this.state;
        let { dispatch, match: { params } } = this.props;
        if (isSetPointing) {
            return message.warning('请先取消或完成当前操作');
        }
        this.setState({
            isStoragePoint: true
        })
        let setMsg = {
            addStations: addStations,
            changeStations: changeStations,
            delStations: delStations,
        };
        dispatch(changeBimStations(params.id, setMsg)).then(res => {
            dispatch(getBimStations(params.id)).then(res => {
                this.handelStations();
                this.drawBimStations();
            });
            if (res.type == "CHANGE_BIM_STATIONS_SUCCESS") {
                this.setState({
                    addStations: [],
                    delStations: [],
                    changeStations: [],
                    isStoragePoint: false,
                    isSetPointing: false,
                })
                message.success('数据保存成功');
            } else {
                message.error('数据保存失败，请稍候重试');
                this.setState({
                    isStoragePoint: false,
                })
            }
        });
    }

    zoomToComponent = (componentId, stationId, position) => {
        //缩放至组件
        //ZoomTo(componentId, 1000.0)

        const { bimMsg } = this.props;
        const { addStations } = this.state;
        let bimStations = bimMsg.stations;
        //this.showAllAnchor();
        for (let s of bimStations.concat(addStations)) {
            RemoveAnchor(s.stationId)
            if (s.stationId != stationId) {
                //恢复颜色
                this.addTagging(s.point, s.stationId)

                //隐藏其他标记
                //ShowAnchor(s.stationId, false)
            } else {
                AddAnchor(s.point, stationSelectedIcon, 17, 17, stationId, true);
            }
        }
    }

    showAllAnchor = (boolean) => {
        const { bimMsg } = this.props;
        const { addStations, delStations } = this.state;
        let bimStations = bimMsg.stations;
        for (let s of bimStations.concat(addStations)) {
            if (!delStations.some(d => d == s.stationId)) {
                ShowAnchor(s.stationId, boolean)
            }
        }
    }

    handelStations = (searchMsg, showType, setingStationId_) => {
        let { hasStorageStationsId } = this.state;
        let searchV = searchMsg || this.state.searchMsg || [];
        let showT = showType || this.state.showType || null;
        let { stations } = this.state;
        let setingStationId = setingStationId_ || null;
        let that = this;
        function isBimStations(stationId, stationName, showType, setingStationId) {
            let bimStations = that.props.bimMsg.stations;
            let { delStations, addStations, changeStations } = that.state;
            let stationNameLength = stationName.replace(/[^\u0000-\u00ff]/g, "aa").length;
            let isSeted = bimStations ? bimStations.filter(s => s.stationId == stationId) : [];
            let currentSeted = addStations.filter(s => s.stationId == stationId);
            let currentDel = delStations.filter(s => s == stationId);
            let componentStationName = stationNameLength > stationNameMaxLength ?
                <Tooltip placement="topLeft" title={stationName} overlayStyle={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>
                    <span style={panelStationNameStyle}>{stationName}</span>
                </Tooltip>
                : <span style={panelStationNameStyle}>{stationName}</span>
            if ((isSeted.length || currentSeted.length) && !currentDel.length && showType != 'notYet') {//已布点  是不等号！！！
                if (stationId == setingStationId) {
                    return <div style={panelDivSetedStyle}>
                        <HddOutlined style={stationBIMiconStyle} />
                        {
                            componentStationName
                        }
                        <p style={panelOptionTwoWordStyle} onClick={that.comfirmSetPoint}>确定</p>
                        <p style={panelOptionTwoWordStyle} onClick={that.cancelSetPoint}>取消</p>
                    </div>
                }
                let currComponentId = isSeted.length ? isSeted[0].componentId : currentSeted[0].componentId;
                let currStationId = isSeted.length ? isSeted[0].stationId : currentSeted[0].stationId;
                let currPosition = isSeted.length ? isSeted[0].point : currentSeted[0].point;
                return <div style={panelDivSetedStyle}>
                    <HddOutlined style={stationBIMiconStyle} />
                    <span style={{ cursor: 'pointer' }} onClick={() => that.zoomToComponent(currComponentId, currStationId, currPosition)}>
                        {
                            componentStationName
                        }
                    </span>
                    <p style={panelOptionTwoWordStyle} onClick={() => that.delSetPoint(stationId)}>删除</p>
                    <span style={panelOptionFourWordStyle} onClick={() => that.beforeSetPoint(stationId, stationName, 'resetPoint')}>重新布点</span>
                </div>
            } else if ((!isSeted.length && !currentSeted.length || currentDel.length) && showType != 'already') {
                if (stationId == setingStationId) {
                    return <div style={panelDivStyle}>
                        <HddOutlined style={stationBIMiconStyle} />
                        {
                            componentStationName
                        }
                        <p style={panelOptionTwoWordStyle} onClick={that.comfirmSetPoint}>确定</p>
                        <p style={panelOptionTwoWordStyle} onClick={that.cancelSetPoint}>取消</p>
                    </div>
                }
                return <div style={panelDivStyle}>
                    <HddOutlined style={stationBIMiconStyle} />
                    {
                        componentStationName
                    }
                    <p style={panelOptionTwoWordStyle} onClick={() => that.beforeSetPoint(stationId, stationName, 'setPoint')}>布点</p>
                </div>
            } else {
                return null;
            }

        }
        if (stations && stations.length > 0) {
            let stationsList = [];
            let stationsId = [];
            for (let s1 of stations) {
                if (s1.groups.length > 0) {//分组是否有数据
                    for (let s2 of s1.groups) {//循环组内测点
                        let oneStationsGroup = [];//装组内测点
                        let hasSearchWord = false;
                        let hasStations = false;
                        if (s2.stations.length > 0) {//组内是否有测点数据
                            for (let s3 of s2.stations) {//循环测点
                                stationsId.push(s3.id);
                                if (searchV.length) {//是否带着筛选参数
                                    let hasSearchStation = false;
                                    for (let s4 of searchV) {//遍历筛选数据
                                        if (s2.id == s4[0]) {//匹配筛选数据
                                            hasSearchStation = true;
                                            if (s4[1] != null) {//是否有筛选值
                                                hasSearchWord = true;
                                                let singStationHtml = isBimStations(s3.id, s3.name, showT, setingStationId);
                                                if (singStationHtml != null) {
                                                    if (PinyinHelper.isSearchMatched(s3.name, s4[1])) {
                                                        oneStationsGroup.push(
                                                            singStationHtml
                                                        );
                                                    } else {
                                                        hasStations = true;
                                                    }
                                                }
                                            } else {
                                                let singStationHtml = isBimStations(s3.id, s3.name, showT, setingStationId);
                                                if (singStationHtml != null) {
                                                    oneStationsGroup.push(
                                                        singStationHtml
                                                    );
                                                }
                                            }
                                            break;
                                        }
                                    }
                                    if (!hasSearchStation) {
                                        let singStationHtml = isBimStations(s3.id, s3.name, showT, setingStationId);
                                        if (singStationHtml != null) {
                                            oneStationsGroup.push(
                                                singStationHtml
                                            );
                                        }
                                    }
                                    continue;
                                }
                                let singStationHtml = isBimStations(s3.id, s3.name, showT, setingStationId);
                                if (singStationHtml != null) {
                                    oneStationsGroup.push(
                                        singStationHtml
                                    )
                                }
                            }
                        }
                        if (oneStationsGroup.length || (hasSearchWord && hasStations)) {
                            let isAble = setingStationId ? true : false
                            stationsList.push(
                                <Panel header={s2.name + '(' + oneStationsGroup.length + ')'} key={s2.id} disabled={isAble}>
                                    <Search style={{ width: '100%' }} placeholder="Search" onChange={this._handleInputChange} disabled={isAble} id='search' />
                                    {oneStationsGroup}
                                </Panel>
                            )
                        }
                    }
                }
            }
            this.setState({
                stationsList: stationsList,
            })
            if (stationsId.length > 0) {
                sessionStorage.setItem('stationsId', stationsId);
            }
        }
    }

    prepareSetPoint = () => {
        const { isSetPointing, isModelReady, showExplosionSlider, showClipSlider, isStationsDataReady } = this.state;
        const { bimMsg, match: { params } } = this.props;
        if (showExplosionSlider || showClipSlider) {
            this.showAllAnchor(true);
            if (showExplosionSlider) {
                this.closeExpSlider();
            }
            if (showClipSlider) {
                this.closeClipSlider();
            }
        }
        SetModelNomal(params.id);
        this.setState({ isWireFrameModal: false })
        if (isSetPointing) { return message.warning('请先取消或完成当前操作') }
        if (isModelReady && !bimMsg.getStationsState && isStationsDataReady) {
            this.setState({ buDian: this.state.buDian ? false : true })
        } else if (!isModelReady) {
            message.warning('请等待模型加载完毕');
        } else if (bimMsg.getStationsState || !isStationsDataReady) {
            message.warning('数据载入中，请稍候');
        }
    }

    handleTypeChange = (e) => {
        let { searchMsg } = this.state;
        for (let s of searchMsg) {
            s[1] = null;
        }
        document.getElementById('search') ? document.getElementById('search').value = '' : null;
        this.setState({ showType: e.target.value, searchMsg: searchMsg });
        this.handelStations([], e.target.value);
    }

    drawBimStations = () => {
        let { bimMsg } = this.props;
        if (bimMsg.stations) {
            for (let s of bimMsg.stations) {
                AddAnchor(s.point, stationIcon, 13, 13, s.stationId, true);
            }
        }
    }

    changeExSliderShow = () => {//爆炸
        const { showExplosionSlider, isSetPointing, showClipSlider, buDian } = this.state;
        if (showExplosionSlider) {//关闭
            this.closeExpSlider();
        } else {
            if (isSetPointing) {
                return message.warning('请先取消或完成当前操作')
            }
            if (showClipSlider) {
                this.closeClipSlider();
            }
            this.setState({ showExplosionSlider: true, buDian: false })
        }
        this.showAllAnchor(showExplosionSlider)
    }
    expValueChange = (v) => {
        this.setState({ expSliderValue: v })
        try {
            PopOut(v);
        } catch (e) {
            console.log(e);
        }
    }
    closeExpSlider = () => {
        this.setState({ showExplosionSlider: false })
        this.expValueChange(0);
    }
    changeClipSliderShow = () => {//剖切
        const { showClipSlider, showExplosionSlider, isSetPointing } = this.state;
        if (showClipSlider) {//close
            this.closeClipSlider()
        } else {
            if (isSetPointing) {
                return message.warning('请先取消或完成当前操作')
            }
            if (showExplosionSlider) {
                this.closeExpSlider();
            }
            this.setState({ showClipSlider: true })
        }
        this.showAllAnchor(showClipSlider)
    }
    closeClipSlider = () => {
        this.setState({
            xClipSliderValue: [0, 100],
            yClipSliderValue: [0, 100],
            zClipSliderValue: [0, 100],
        });
        this.setState({ showClipSlider: false })
        ResetClip()
    }
    xClipValueChange = (v) => {
        this.setState({ xClipSliderValue: v })
        PlateClip('x-min', v[0] / 100);
        PlateClip('x-max', (100 - v[1]) / 100);
    }
    yClipValueChange = (v) => {
        this.setState({ yClipSliderValue: v })
        PlateClip('y-min', v[0] / 100);
        PlateClip('y-max', (100 - v[1]) / 100);
    }
    zClipValueChange = (v) => {
        this.setState({ zClipSliderValue: v })
        PlateClip('z-min', v[0] / 100);
        PlateClip('z-max', (100 - v[1]) / 100);
    }
    changeClearSliderShow = () => {//透明度
        const { showClearSlider } = this.state;
        this.setState({ showClearSlider: !showClearSlider })
    }
    clearValueChange = (v) => {
        const { match: { params } } = this.props;
        this.setState({ clearSliderValue: v })
        SetModelAlpha(params.id, v / 100)
    }
    setModelWireFrame = () => {//线框
        const { isWireFrameModal } = this.state;
        const { match: { params } } = this.props;
        if (isWireFrameModal) {
            this.setState({ isWireFrameModal: false })
            SetModelNomal(params.id)
        } else {
            this.setState({ isWireFrameModal: true })
            SetModelWireFrame(params.id)
        }
    }
    saveImage = () => {
        SaveImage()
    }


    render() {
        const { containerHeight, containerWidth, buDian, isModelReady, confirmLoading, iframeSrcUpLoad,
            uploadVisible, uploadDisabled, isDeleteHotspots, isSetPointing, addStations, delStations,
            changeStations, showType, bimMsg, showExplosionSlider, expSliderValue, showClipSlider, xClipSliderValue,
            yClipSliderValue, zClipSliderValue, showClearSlider, clearSliderValue, isWireFrameModal, isBimStationsReady, currentStrucName } = this.state;
        const { isRequesting } = this.props;
        return (

            <div style={{ position: 'relative' }}>
                <Header className="header" style={{ backgroundColor: '#2d3446' }}>
                    <div style={{
                        float: 'left',
                        height: 64,
                        lineHeight: '64px',
                        fontSize: 18,
                        color: '#fff'
                    }}>
                        <h3 style={{ color: '#fff' }}>
                            {`${currentStrucName}`}
                            {`-BIM测点布设`}
                        </h3>
                    </div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={{ lineHeight: '64px', float: 'right' }}
                    >
                        <SubMenu key="return" icon={<RollbackOutlined />} onTitleClick={() => { this.showConfirm() }} title={'返回'}>
                            {/*<Menu.Item key="saveExit">保存退出</Menu.Item>*/}
                            {/*<Menu.Item key="exit">放弃编辑</Menu.Item>*/}
                        </SubMenu>
                    </Menu>

                    <div style={{ lineHeight: '64px', float: 'right' }}>
                        <Button type="primary" style={{ marginLeft: 8, padding: '0 20px', height: 64, borderRadius: 0, }}
                            onClick={this.storageSetPoint} icon={<SaveOutlined />}>保存</Button>
                    </div>
                </Header>
                <Spin spinning={isRequesting}>
                    <Layout>
                        <Sider width={300} style={{ background: '#fff', height: window.innerHeight - 64 }}>
                            {/* <div style={{ position: 'absolute', top: 70 + 64, left: 16, zIndex: 999 }}> */}
                            <div>
                                <Card bodyStyle={{ padding: 0, marginTop: 24 }} bordered={false} style={{ width: 300, }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <Radio.Group style={{ textAlign: 'center' }} defaultValue={showType} onChange={this.handleTypeChange}>
                                            <Radio.Button style={{ width: 92 }} value="all" disabled={isSetPointing}>全部</Radio.Button>
                                            <Radio.Button style={{ width: 92 }} value="notYet" disabled={isSetPointing}>未布点</Radio.Button>
                                            <Radio.Button style={{ width: 92 }} value="already" disabled={isSetPointing}>已布点</Radio.Button>
                                        </Radio.Group>
                                    </div>
                                    <div style={{ marginTop: 10, height: containerHeight - 40, overflow: 'auto', position: 'relative' }} id='sensor-list'>
                                        <Collapse accordion bordered={false} style={{ backgroundColor: 'transparent', }} onChange={this.panelChange} disabled={isSetPointing}>
                                            {this.state.stationsList}
                                        </Collapse>
                                    </div>
                                </Card>
                            </div>
                        </Sider>
                        <Layout>
                            <div style={{ padding: 24 }}>
                                <div style={{ position: 'relative', height: containerHeight, width: containerWidth }} id="bimIframe"></div>
                                {
                                    isModelReady && isBimStationsReady ?
                                        <div style={{ zIndex: 99999, textAlign: 'center', position: 'absolute', width: containerWidth, height: 30, bottom: 50 }}>
                                            <Button.Group style={{ textAlign: 'center' }} >
                                                <Button style={optionButtonStyle} disabled={buDian}>
                                                    <Dropdown
                                                        overlay={
                                                            <Card style={{ width: 200, padding: '0 7px' }}>
                                                                <Slider
                                                                    style={{ padding: '10px 0 15px 0' }}
                                                                    value={expSliderValue}
                                                                    onChange={this.expValueChange}
                                                                />
                                                            </Card >
                                                        }
                                                        placement="topCenter"
                                                        trigger={['click']}
                                                        visible={showExplosionSlider}

                                                    >
                                                        <div onClick={this.changeExSliderShow}>爆炸效果</div>
                                                    </Dropdown>
                                                </Button>
                                                <Button style={optionButtonStyle} disabled={buDian}>
                                                    <Dropdown
                                                        overlay={
                                                            <Card style={{ width: 200, position: 'relative', bottom: 10 }}>
                                                                <Row>
                                                                    <Col span={3}>X轴</Col>
                                                                    <Col span={20}>
                                                                        <Slider
                                                                            range={true}
                                                                            value={xClipSliderValue}
                                                                            onChange={this.xClipValueChange}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col span={3}>Y轴</Col>
                                                                    <Col span={20}>
                                                                        <Slider
                                                                            range={true}
                                                                            value={yClipSliderValue}
                                                                            onChange={this.yClipValueChange}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col span={3}>Z轴</Col>
                                                                    <Col span={20}>
                                                                        <Slider
                                                                            range={true}
                                                                            value={zClipSliderValue}
                                                                            onChange={this.zClipValueChange}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </Card >
                                                        }
                                                        placement="topCenter"
                                                        trigger={['click']}
                                                        visible={showClipSlider}
                                                    >
                                                        <div onClick={this.changeClipSliderShow}>剖切</div>
                                                    </Dropdown>
                                                </Button>
                                                <Button style={optionButtonStyle} onClick={this.setModelWireFrame} type={isWireFrameModal ? 'primary' : 'default'} disabled={buDian}>
                                                    线框模式
                                            </Button>
                                                <Button style={optionButtonStyle} onClick={this.saveImage}>
                                                    生成图片
                                            </Button>
                                                <Button style={optionButtonStyle}>
                                                    <Dropdown
                                                        overlay={
                                                            <Card style={{ width: 200, padding: '0 7px' }}>
                                                                <Slider
                                                                    style={{ padding: '10px 0 15px 0' }}
                                                                    value={clearSliderValue}
                                                                    onChange={this.clearValueChange}
                                                                />
                                                            </Card >
                                                        }
                                                        placement="topCenter"
                                                        trigger={['click']}
                                                        visible={showClearSlider}
                                                    >
                                                        <div onClick={this.changeClearSliderShow}>透明度</div>
                                                    </Dropdown>
                                                </Button>
                                            </Button.Group>
                                        </div>
                                        : ''
                                }
                            </div>
                        </Layout>
                    </Layout>
                </Spin>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let { bim, cedian } = state;
    let nextBimStations = [];
    if (bim.stations) {
        for (let s of bim.stations) {
            if (!s.bbox) {
                nextBimStations.push(s);
            }
        }
        bim.stations = nextBimStations;
    }
    let isRequesting = bim.pathRequesting || cedian.isRequesting
    return {
        bimMsg: bim,
        stations: cedian.data || [],
        isRequesting: isRequesting,
    }
};

export default connect(mapStateToProps)(GlBimSetup)