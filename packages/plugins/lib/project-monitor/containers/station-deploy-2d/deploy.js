'use strict'

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import { message, Layout, Menu, Button, Radio, Input, Tree, Modal } from 'antd';
import Ps from 'perfect-scrollbar';
import { getPointsImg, getHeatmaps } from '../../actions/2d/station-deploy';
import { getstationsDeployed, modifystationsDeployed } from '../../actions/integrationInfo';
import { getCedian } from '../../actions/zuhe';
import Heatmap from '../../components/station-deploy/2d/heatmap';
import StationSpot from '../../components/station-deploy/2d/station-spot';
import style from './deploy-style.css';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const Search = Input.Search;
const TreeNode = Tree.TreeNode;

const Header_Height = 64;
const Search_Panel_Height = 105;
const Sider_Footer_Height = 36;

class Deploy extends Component {
    constructor(props) {
        super(props);
        this.Ps;
        this.state = {
            siderHeight: 0,
            heatmapWidth: 0,
            heatmapHeight: 0,

            spots: [],
            filteredSpots: [],
            expandedKeys: [],
            autoExpandParent: true,

            searchValue: '',
            deployState: -1, //0未布,1已布,-1全部

            changedTreeNodeKey: '',

            partsSpots: [],
            partsFilteredSpots: [],
            expandedPartsKeys: ['tree-parts'],

            dataHasChanged: false,
        };
    }

    componentDidMount() {
        const { dispatch, match: { params: { id, heatmapId } } } = this.props;

        dispatch(getPointsImg(heatmapId));
        dispatch(getstationsDeployed(heatmapId));
        dispatch(getCedian(id));
        dispatch(getHeatmaps(id, '2D'));

        this.setSiderHeight();
        window.onresize = () => { this.setSiderHeight(); };

        this.Ps = new Ps('#stationTree', { suppressScrollX: true });
        // Ps.default(document.getElementById('stationTree'), { suppressScrollX: true });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { stations, deployedStations, msg, heatmaps } = nextProps;
        if (stations != this.props.stations || deployedStations != this.props.deployedStations) {
            if (stations && deployedStations) {
                let deployedStationsMap = new Map();
                deployedStations.forEach(s => {
                    if (s.sensorId) deployedStationsMap.set(s.sensorId, s);
                });

                let groupKeys = [];
                let tempData = [];
                stations.forEach(item => {
                    if (item.groups.length) {
                        item.groups.forEach(t => {
                            groupKeys.push(`0-${item.factorId}-${t.id}`);

                            if (t.stations.length) {
                                t.stations.forEach(m => {
                                    let x = null, y = null, screenH = null, screenW = null;
                                    let deployed = false;
                                    let station = deployedStationsMap.get(m.id);
                                    let iconImgDeviceTypeId = this.getFactorIcon(item.factorProto);
                                    if (station) {
                                        x = station.position.x;
                                        y = station.position.y;
                                        screenH = station.position.screenHeight;
                                        screenW = station.position.screenWidth;
                                        deployed = true;
                                    }
                                    tempData.push({
                                        factorId: item.factorId,
                                        factorName: item.factorName,
                                        factorProto: item.factorProto,
                                        groupId: t.id,
                                        groupName: t.name,
                                        location: m.name,
                                        sensorId: m.id,
                                        portrait: m.portrait,
                                        x: x,
                                        y: y,
                                        screenHeight: screenH,
                                        screenWidth: screenW,
                                        deployed: deployed,
                                        iconImgDeviceTypeId: iconImgDeviceTypeId,
                                    })
                                })
                            }
                        })
                    }
                });

                this.setState({
                    expandedKeys: groupKeys,
                    spots: tempData,
                    filteredSpots: tempData,
                });
            }
        }

        if ((heatmaps != this.props.heatmaps || deployedStations != this.props.deployedStations) && heatmaps && deployedStations) {
            let deployedPartsMap = new Map();
            deployedStations.forEach(s => {
                if (s.modelId) deployedPartsMap.set(s.modelId, s);
            });

            let tempData = [];
            heatmaps.forEach(heatmap => {
                if (heatmap.type.id == 2) {

                    let x = null, y = null, screenH = null, screenW = null, deployed = false;
                    let part = deployedPartsMap.get(heatmap.id);
                    if (part) {
                        x = part.position.x;
                        y = part.position.y;
                        screenH = part.position.screenHeight;
                        screenW = part.position.screenWidth;
                        deployed = true;
                    }

                    tempData.push({
                        partId: heatmap.id,
                        location: heatmap.name,
                        x: x,
                        y: y,
                        screenHeight: screenH,
                        screenWidth: screenW,
                        deployed: deployed,
                    })
                }
            })

            this.setState({
                partsSpots: tempData,
                partsFilteredSpots: tempData,
            })
        }

        if (msg) {
            message.destroy();
            if (msg.done) {
                message.success(msg.done);
            }

            if (msg.error) {
                message.error(msg.error);
            }
        }
    }

    getFactorIcon = (factorProto) => {
        let iconImgDeviceTypeId = null;
        switch (factorProto) {
            case "1001":
            case "1029":
            case "1022": // 风速 风向
                iconImgDeviceTypeId = '30002';
                break;
            case "1002":
            case "1004":
            case "1006": // 温湿度
                iconImgDeviceTypeId = '20401';
                break;
            case "1007": // 噪音
                iconImgDeviceTypeId = '25001';
                break;
            case "1003": // 雨量
                iconImgDeviceTypeId = '20601';
                break;
            case "1005":
            case "1024": // 地下水位
                iconImgDeviceTypeId = '20206';
                break;
            case "1008":
            case "1014": // 渗流量 流量
                iconImgDeviceTypeId = '22001';
                break;
            case "1010": // 干滩和库水位
                iconImgDeviceTypeId = '20210';
                break;
            case "1013": // 液位
                iconImgDeviceTypeId = '22002';
                break;
            case "1015":
            case "1016":// 蚀度 PH值
                iconImgDeviceTypeId = '11101';
                break;
            case "1017":
            case "1018":
            case "1023":
            case "1031": // 浓度
                iconImgDeviceTypeId = '20208';
                break;
            case "1030": // 能见度
                iconImgDeviceTypeId = '30006';
                break;
            case "2001": // 索力
                iconImgDeviceTypeId = '20901';
                break;
            case "2002": // 车流量
                iconImgDeviceTypeId = '21000';
                break;
            case "2003":
            case "2005": // 压力 重力
                iconImgDeviceTypeId = '30005';
                break;
            case "2004":
            case "2006":
            case "3003": // 受力 应力
                iconImgDeviceTypeId = '20204';
                break;
            case "3001":
            case "3002": // 应变
                iconImgDeviceTypeId = '20402';
                break;
            case "4001":
            case "4002":
            case "4003":
            case "4005":
            case "4008":
            case "4009":
            case "4013": // 位移 裂缝
                iconImgDeviceTypeId = '30001';
                break;
            case "4004": // 挠度
                iconImgDeviceTypeId = '20701';
                break;
            case "4006":
            case "4007":
            case "4010":
            case "4012": // 角度 倾斜
                iconImgDeviceTypeId = '20101';
                break;
            case "4011": // 沉降
                iconImgDeviceTypeId = '23001';
                break;
            case "5001":
            case "5002": // 振动
                iconImgDeviceTypeId = '30004';
                break;
            case "5003": // 动应变
                iconImgDeviceTypeId = '20202';
                break;
            default:
                iconImgDeviceTypeId = null;
        }
        return iconImgDeviceTypeId;
    }
    componentDidUpdate() {
        const dom = document.getElementById('stationTree');
        // Ps.update(dom);
        this.Ps.update();
        dom.scrollTop = 0;
    }

    setSiderHeight = () => {
        let height = innerHeight - Header_Height;
        let width = innerWidth - 300 - 64;
        this.setState({
            siderHeight: height,
            heatmapWidth: width,
            heatmapHeight: height - 48,
        });
    };

    onRemoveSpot = (spot) => {
        const { spots, deployState, searchValue, partsSpots } = this.state;
        let tempSpots;
        if (spot.sensorId) {
            tempSpots = Object.assign([], spots);
            tempSpots.forEach(item => {
                if (item.sensorId == spot.sensorId) {
                    item.x = null;
                    item.y = null;
                    item.screenWidth = null;
                    item.screenHeight = null;
                    item.deployed = false;
                }
            });
            tempSpots = tempSpots.concat(partsSpots)
        } else {
            tempSpots = Object.assign([], partsSpots);
            tempSpots.forEach(item => {
                if (item.partId == spot.partId) {
                    item.x = null;
                    item.y = null;
                    item.screenWidth = null;
                    item.screenHeight = null;
                    item.deployed = false;
                }
            });
            tempSpots = tempSpots.concat(spots)
        }
        //this.saveHotspots(tempSpots);
        this.filterSpots(deployState, searchValue);
        this.setState({ changedTreeNodeKey: spot.key, dataHasChanged: true });
    };
    onDeploySpot = (spot) => {
        const { spots, deployState, searchValue, partsSpots } = this.state;
        const that = this;
        function dealPosition(spot, item) {
            if (spot.deployed) {
                item.x = spot.rect.x + spot.move.x;
                item.y = spot.rect.y + spot.move.y;
                item.screenHeight = that.state.heatmapHeight;
                item.screenWidth = that.state.heatmapWidth;
            } else {
                const boundingClientRect = findDOMNode(that.refs.heatmapComponent).getBoundingClientRect();
                item.x = spot.spotInlist.x + spot.move.x - boundingClientRect.left;
                item.y = spot.spotInlist.y + spot.move.y - boundingClientRect.top;
                item.screenHeight = that.state.heatmapHeight;
                item.screenWidth = that.state.heatmapWidth;
                item.deployed = true;
            }
        }

        let tempSpots = Object.assign([], spots);
        let tempPartsSpots = Object.assign([], partsSpots);
        if (spot.info.sensorId) {
            tempSpots.forEach(item => {
                if (item.sensorId == spot.info.sensorId) {
                    dealPosition(spot, item)
                }
            });
        } else {
            tempPartsSpots.forEach(item => {
                if (item.partId == spot.info.partId) {
                    dealPosition(spot, item)
                }
            });
        }

        //this.saveHotspots(tempSpots.concat(tempPartsSpots));
        this.setState({ spots: tempSpots, partsSpots: tempPartsSpots });
        this.filterSpots(deployState, searchValue);
        this.setState({ changedTreeNodeKey: spot.info.key, dataHasChanged: true });
    };
    saveHotspots = (data) => {
        let postData = data
            .filter(s => s.x != null && s.y != null)
            .map(item => {
                const { x, y, screenWidth, screenHeight } = item;
                let relativeX = parseFloat((x / screenWidth).toFixed(4));
                let relativeY = parseFloat((y / screenHeight).toFixed(4));
                if (item.sensorId) {
                    return ({
                        stationId: item.sensorId,
                        position: { x, y, screenWidth, screenHeight, relativeX, relativeY }
                    })
                } else {
                    return ({
                        partId: item.partId,
                        position: { x, y, screenWidth, screenHeight, relativeX, relativeY }
                    })
                }

            });
        const that = this;
        this.props.dispatch(modifystationsDeployed(this.props.match.params.heatmapId, { "hotspots": postData })).then(res => {
            if (res.success) {
                that.setState({ dataHasChanged: false })
            }
        });
    };

    onSaveClick = () => {
        this.saveHotspots(this.state.spots.concat(this.state.partsSpots));
    };
    onReturnClick = () => {
        const that = this;
        function back() {
            that.props.dispatch(push(`/project-monitor/things/struct/${that.props.match.params.id}/configuration/2d`))
        }
        if (this.state.dataHasChanged) {
            Modal.confirm({
                content: "有未保存的数据，确定不保存就退出吗？",
                onOk() {
                    back();
                },
            })
        } else {
            back()
        }

    };

    filterSpots = (deployState, searchValue) => {
        let deploySpots = this.state.spots;
        let deployPartSpots = this.state.partsSpots;
        if (deployState != -1) {
            deploySpots = this.state.spots.filter(s => s.deployed == (deployState == 1 ? true : false));
            deployPartSpots = this.state.partsSpots.filter(s => s.deployed == (deployState == 1 ? true : false));
        }

        let searchSpots = deploySpots;
        let searchPartSpots = deployPartSpots;
        if (searchValue.trim().length > 0) {
            searchSpots = deploySpots.filter(s => s.location.indexOf(searchValue) >= 0);
            searchPartSpots = deployPartSpots.filter(s => s.location.indexOf(searchValue) >= 0);
        }

        let keys = searchSpots.map(s => `0-${s.factorId}-${s.groupId}`);

        this.setState({
            searchValue,
            deployState,
            filteredSpots: searchSpots,
            partsFilteredSpots: searchPartSpots,
            expandedKeys: keys,
            expandedPartsKeys: ['tree-parts'],
            autoExpandParent: true,
        });
    };
    formatTreeSource = (data) => {
        if (!data || data.length == 0) return;
        let tempFactors = new Map();
        let tempGroups = new Map();
        data.map(item => {
            if (tempGroups.has(item.groupId)) {
                let groupChildren = tempGroups.get(item.groupId).children;
                item.key = `0-${item.factorId}-${item.groupId}-${item.sensorId}`;
                groupChildren.set(item.sensorId, item);
            } else {
                tempGroups.set(item.groupId, {
                    'key': `0-${item.factorId}-${item.groupId}`,
                    'factorId': item.factorId,
                    'factorName': item.factorName,
                    'location': item.groupName,
                    'groupId': item.groupId,
                    'children': new Map(),
                    iconImgDeviceTypeId: item.iconImgDeviceTypeId,
                });
                let groupChildren = tempGroups.get(item.groupId).children;
                item.key = `0-${item.factorId}-${item.groupId}-${item.sensorId}`;
                groupChildren.set(item.sensorId, item);
            }
        });

        tempGroups.forEach(item => {
            if (tempFactors.has(item.factorId)) {
                let factorChildren = tempFactors.get(item.factorId).children;
                item.key = `0-${item.factorId}-${item.groupId}`;
                factorChildren.set(item.groupId, item);
            } else {
                tempFactors.set(item.factorId, {
                    'key': `0-${item.factorId}`,
                    'factorId': item.factorId,
                    'location': item.factorName,
                    'children': new Map(),
                    iconImgDeviceTypeId: item.iconImgDeviceTypeId,
                });
                tempFactors.get(item.factorId).children.set(item.groupId, item);
            }
        });

        return tempFactors;
    };


    loop = (data) => {
        if (!data || data.length == 0) return;

        const treeNodes = [];
        data.forEach((item) => {
            let title = <StationSpot info={item} children={item.children} />;
            if (item.children) {
                treeNodes.push(
                    <TreeNode key={item.key} value={item.key} title={title}>
                        {this.loop(item.children)}
                    </TreeNode>
                );
            } else {
                let titleProps = {
                    info: item,
                    children: item.children,
                    onRemoveSpot: this.onRemoveSpot,
                };
                //性能优化,减少组件渲染
                if (this.state.changedTreeNodeKey == item.key) titleProps.key = Math.random();
                let nodeTitle = <StationSpot {...titleProps} />;
                treeNodes.push(<TreeNode key={item.key} value={item.key} title={nodeTitle} />);
            }
        });

        return treeNodes;
    };

    partsLoop = (data) => {
        if (!data || data.length == 0) return;

        const treeNodes = [];
        data.forEach((item) => {
            let titleProps = {
                info: item,
                //children: item.children,
                onRemoveSpot: this.onRemoveSpot,
            };
            //性能优化,减少组件渲染
            if (this.state.changedTreeNodeKey == item.key) titleProps.key = Math.random();
            let nodeTitle = <StationSpot {...titleProps} />;
            treeNodes.push(<TreeNode key={item.key} value={item.key} title={nodeTitle} />);
        });

        return treeNodes;
    }

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    };
    onPartsExpand = (keys) => {
        this.setState({
            expandedPartsKeys: keys,
        });
    }
    onSearch = (searchValue) => {
        this.filterSpots(this.state.deployState, searchValue);
    };
    handleStateChange = (e) => {
        this.filterSpots(e.target.value, this.state.searchValue);
    };

    render() {
        const { heatmap, heatmaps } = this.props;
        const { siderHeight, heatmapHeight, heatmapWidth, filteredSpots, deployState, spots, partsFilteredSpots,
            expandedPartsKeys, partsSpots } = this.state;
        let treeHeight = siderHeight - Search_Panel_Height - Sider_Footer_Height;
        const treeDataSource = this.formatTreeSource(filteredSpots);
        return (
            <Layout id="deploy2D">
                <Header className="header">
                    {/*<div className={style.logo} />*/}
                    <div className={style.title}>
                        {!heatmap ? null :
                            <h3 >
                                {`${heatmap.structure.name}-${heatmap.name}`}
                                <span style={{ fontSize: '15px'}}>{`(${heatmap.type.id == 1 ? '整体图' : '截面图'})`}</span>
                                {`-测点布设`}
                            </h3>
                        }
                    </div>
                    {/* <Menu
                        theme="dark"
                        mode="horizontal"
                        className={style['header-item']}
                    >
                        <SubMenu key="return" title={<div style={{ width: 64, height: 64 }} onClick={this.onReturnClick}>
                            <RollbackOutlined />返回</div>}>
                            <Menu.Item key="saveExit">保存退出</Menu.Item>
                            <Menu.Item key="exit">放弃编辑</Menu.Item>
                        </SubMenu>
                    </Menu> */}
                    <div className={style['header-item']}>
                        <Button type="primary" className={style['save-button']} onClick={this.onReturnClick}>
                            <RollbackOutlined />返回
                        </Button>
                    </div>

                    <div className={style['header-item']}>
                        <Button type="primary" className={style['save-button']} onClick={this.onSaveClick}>
                            <SaveOutlined />保存
                        </Button>
                    </div>
                </Header>

                <Layout>
                    <DndProvider backend={HTML5Backend}>
                        <Sider width={300} style={{ background: '#fff', height: this.state.siderHeight }}>
                            <div className={style['search-panel']}>
                                <Radio.Group defaultValue={-1} onChange={this.handleStateChange} buttonStyle="solid">
                                    <Radio.Button type={deployState == -1 ? 'primary' : 'default'} style={{ borderRadius: 0 }} value={-1}>全部</Radio.Button>
                                    <Radio.Button type={deployState == 1 ? 'primary' : 'default'} style={{ borderRadius: 0 }} value={1}>已布</Radio.Button>
                                    <Radio.Button type={deployState == 0 ? 'primary' : 'default'} style={{ borderRadius: 0 }} value={0}>未布</Radio.Button>
                                </Radio.Group>
                                <div style={{ marginTop: -1 }}>
                                    <Search
                                        placeholder={"测点" + (!heatmap ? "" : heatmap.type.id == 1 ? "/截面" : "") + "名称"}
                                        style={{ width: 300, borderRadius: 0 }}
                                        onSearch={this.onSearch}
                                    />
                                </div>
                            </div>

                            <div id="stationTree" style={{ position: 'relative', height: treeHeight }}>
                                {((!treeDataSource || treeDataSource.length == 0) && (heatmap && heatmap.type.id != 1)) ||
                                    ((!treeDataSource || treeDataSource.length == 0) && (partsFilteredSpots.length == 0)) ?
                                    <div style={{ width: '100%', textAlign: 'center' }}><span>符合条件的记录数为0</span></div>
                                    :
                                    <span>
                                        <Tree
                                            showLine
                                            onExpand={this.onExpand}
                                            expandedKeys={this.state.expandedKeys}
                                            autoExpandParent={this.state.autoExpandParent}
                                        >
                                            {this.loop(treeDataSource)}
                                        </Tree>
                                        {heatmap && heatmap.type.id == 1 ?
                                            <Tree
                                                showLine
                                                onExpand={this.onPartsExpand}
                                                expandedKeys={expandedPartsKeys}
                                            >
                                                {
                                                    partsFilteredSpots.length ?
                                                        <TreeNode key={'tree-parts'} title={
                                                            <span>
                                                                截面
                                                            <img style={{ height: 14, width: 14, position: 'relative', bottom: -2, marginLeft: 5 }} src={`/assets/images/sections.png`}></img>
                                                            </span>}>
                                                            {this.partsLoop(partsFilteredSpots)}
                                                        </TreeNode> : null
                                                }

                                            </Tree> : null}
                                    </span>
                                }
                            </div>

                            <div className={style['sider-footer']}>拖拽测点{heatmap && heatmap.type.id == 1 ? '/截面' : ''}进行布设，拖出画布移除测点</div>
                        </Sider>

                        <Layout style={{ padding: '24px' }}>
                            <Content className={style['content']}>
                                {spots && this.props.heatmap ?

                                    <Heatmap key={Math.random()}
                                        ref="heatmapComponent"
                                        apiRoot={this.props.apiRoot}
                                        height={heatmapHeight}
                                        width={heatmapWidth}
                                        image={heatmap.portrait}
                                        spots={spots.filter(s => s.deployed == true).concat(partsSpots.filter(p => p.deployed == true))}
                                        onRemoveSpot={this.onRemoveSpot}
                                        onDeploySpot={this.onDeploySpot}
                                    />

                                    : <div>无热点图</div>
                                }
                            </Content>
                        </Layout>
                    </DndProvider>
                </Layout>
            </Layout >
        )
    }
}

function mapStateToProps(state) {
    const { auth, ajaxResponse, stationDeploy, pointsImg, cedian, staionsDeployedList, global } = state;
    let isRequesting = cedian.isRequesting || staionsDeployedList.isRequesting || stationDeploy.isRequesting;
    return {
        user: auth.user,
        msg: ajaxResponse.msg,
        heatmap: pointsImg.data,
        isRequesting: isRequesting,
        stations: cedian.data,
        deployedStations: staionsDeployedList.data,
        heatmaps: stationDeploy.data,
        apiRoot: global.apiRoot
    }
}

export default connect(mapStateToProps)(Deploy)