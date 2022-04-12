import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Spin, Card, Radio, Switch, Button } from 'antd';
import DeploySpot from './spot-deploy';

const ButtonGroup = Button.Group;

class Heatmap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPics: false,
            changedCameraInfo: '',
            screenW: null,
            screenH: null,
            handleSectionChange: false,
            currSelectedD: "2D"
        }
    }


    _catchWatch = (spot) => {
        this.props.catchWatch(spot);
    }

    resetHeatMapSize = () => {
        let heatmapScreen = ReactDOM.findDOMNode(this.refs['heatmap-screen']);
        this.setState({ screenW: heatmapScreen.width, screenH: heatmapScreen.height });
    }

    getScreenSize = () => {
        let heatmapScreen = ReactDOM.findDOMNode(this.refs['heatmap-screen']);
        this.setState({ screenW: heatmapScreen.width, screenH: heatmapScreen.height });
    }



    componentWillUnmount() {
        window.removeEventListener('resize', this.resetHeatMapSize);
    }

    componentDidMount() {
        window.addEventListener('resize', this.resetHeatMapSize);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.factorId != this.props.factorId || nextProps.structId != this.props.structId) {
            this.setState({ currSelectedD: '2D' })
        }
    }

    onModuleChange = (key, factorId, groupId, stationId) => {
        this.props.onModuleChange(key, factorId, groupId, stationId);
    }
    initData = (heatMap, cedianMap) => {
        let cedians = [], a = new Map();
        if (cedianMap.length) {
            cedianMap.forEach(factor => {
                factor.groups.forEach(group => {
                    group.stations.forEach(t => {
                        a.set(t.id, { "factorProtoCode": factor.factorProto, "factorId": factor.factorId, "groupId": group.id, "id": t.id, "portrait": t.portrait, "labels": t.labels });
                    })
                })
            })
        }

        let b = [], c = [];
        if (heatMap.constructor == Array) {
            b = new Set(heatMap.filter(s => s.position.x && s.position.x));
            [...b].forEach(y => {
                if (a.get(y.sensorId)) {
                    let tempData = Object.assign({}, y, {
                        "factorProtoCode": a.get(y.sensorId).factorProtoCode,
                        "factorId": a.get(y.sensorId).factorId,
                        "groupId": a.get(y.sensorId).groupId, "portrait": a.get(y.sensorId).portrait,
                        "labels": a.get(y.sensorId).labels
                    });
                    b.delete(y);
                    b.add(tempData)
                } else if (this.props.factorId && y.stationIds) {
                    let heatMapHasStations = false;
                    for (let id of y.stationIds) {
                        if (a.get(id)) {
                            heatMapHasStations = true;
                            break;
                        }
                    }
                    if (!heatMapHasStations) {
                        b.delete(y);
                    }
                }

            })
            c = new Set([...b].filter(x => a.get(x.sensorId) || x.modelId));
        } else if (heatMap.constructor == Object) {
            b = new Set(heatMap.hotspots);
            [...b].forEach(y => {
                if (a.get(y.station.id)) {
                    let tempData = Object.assign({}, y, {
                        "factorProtoCode": a.get(y.station.id).factorProtoCode,
                        "factorId": a.get(y.station.id).factorId,
                        "groupId": a.get(y.station.id).groupId, "portrait": a.get(y.station.id).portrait, "labels": a.get(y.station.id).labels
                    });
                    b.delete(y);
                    b.add(tempData)
                }
            })
            c = new Set([...b].filter(x => a.get(x.station.id)))
        }
        return { "spots": Array.from(c) };
    }

    render() {
        const { handleSectionChange, changedCameraInfo, screenW, screenH } = this.state;
        const { isRequesting, structId, factorId, heatMap, cedianMap, sectionItems, currentHeatMapModel, currentHeatMap,
            latestData, realtimeAlarms, realtimeData, width, height, on2DHeatmapChange, user } = this.props;
        return (
            <Card id="heatmap"
                bodyStyle={{ padding: 0 }}>
                {isRequesting ?
                    <Spin />
                    :
                    heatMap && cedianMap ?
                        currentHeatMapModel.name == '2D' && sectionItems && heatMap && heatMap.constructor == Array && currentHeatMap ?
                            <div style={{ position: 'relative', maxHeight: height }}>
                                <img onLoad={this.getScreenSize} ref="heatmap-screen" width="100%" height={height} src={`${currentHeatMap.portrait}`} />
                                <DeploySpot
                                    data={latestData ?
                                        Object.assign({}, this.initData(heatMap, cedianMap), latestData.getIn([structId]), { "alarms": realtimeAlarms })
                                        : Object.assign({}, this.initData(heatMap, cedianMap), { "alarms": realtimeAlarms })
                                    }
                                    catchWatch={this._catchWatch}
                                    screenSize={{ "width": screenW, "height": screenH }}
                                    onModuleChange={this.onModuleChange}
                                    on2DHeatmapChange={on2DHeatmapChange}
                                    heatmaps={sectionItems}
                                    user={user}
                                    realtimeAlarms={realtimeAlarms}
                                    realtimeData={realtimeData}
                                />
                            </div>
                            :
                            <p style={{ width: width, height: height, lineHeight: `${height}px`, fontSize: 30, color: '#b9c8d7', textAlign: 'center' }}>暂未配置热点图</p>
                        :
                        <p style={{ width: width, height: height, lineHeight: `${height}px`, fontSize: 30, color: '#b9c8d7', textAlign: 'center' }}>暂未配置热点图</p>
                }
            </Card>
        );
    }
}

export default Heatmap;