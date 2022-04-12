import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin, Select, Row, Col, Checkbox, message } from 'antd';
import { LayoutContent } from '@peace/components';
import ProTable from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card'
import { AuthorizationCode, Func as localFunc } from '$utils';
import { Func } from '@peace/utils';
import './style.less'
import Heatmap from '../../components/factorMonitor/heatmap';
const { AddBridgeComponent, ModifyBridgeComponent, DeleteBridgeComponent } = AuthorizationCode;
import { getstationsDeployed } from '../../../project-monitor/actions/integrationInfo'
import { getHeatmaps } from '../../../project-monitor/actions/2d/station-deploy'
import RealTime from './realtime'
let interval = null;
const RealTimeData = ({ ...props }) => {
    const { dispatch, actions, user, structId, myStructList, realtimeAlarms,
        myStationList, factorId, factorProto, heatMaps, stationsDeployed, thresholdBatch, realtimeData, heatmapData } = props;
    const [stations, setStations] = useState(null)
    const [selectSensorId, setSelectSensorId] = useState(null)
    const [currentHeatMap, setCurrentHeatMap] = useState(null)
    const [alarmTemp, setAlarmTemp] = useState(null)
    useEffect(() => {
        dispatch(actions.dataMonitor.getMyStructList(user?.orgId));
    }, []);

    useEffect(() => {
        //轮询告警数据 有新数据时 更新数据 避免请求清空导致重复渲染
        if (realtimeAlarms) {
            if (JSON.stringify(realtimeAlarms) != JSON.stringify(alarmTemp)) {
                setAlarmTemp(realtimeAlarms)
            }
        }
    }, [realtimeAlarms]);

    useEffect(() => {
        if (myStationList?.length > 0) {
            let stationList = []
            myStationList.filter(x => x.factorId == factorId).map(s => s.groups.map(k => k.stations.map(v => {
                stationList.push(v)
            })))

            if (stationList.length > 0) {
                setStations(stationList)
                dispatch(actions.dataMonitor.getHeatMapData(stationList.map(s => s.id).toString()));
            } else {
                setStations([])
            }

        }
    }, [myStationList, structId, factorId])

    useEffect(() => {
        if (structId && factorId) {
            dispatch(actions.dataMonitor.getBatchThreshold(structId, factorId));
        }
    }, [structId, factorId])

    useEffect(() => {
        if (structId) {
            clearAlarmInterval()
            setAlarmTemp({})
            initState({ "name": '2D', "typeId": 1, "sectionType": 2 }, structId);
            dispatch(actions.dataMonitor.getUserAlarmsInfo(user?.id, [structId]));
            interval = setInterval(() => { dispatch(actions.dataMonitor.getUserAlarmsInfo(user?.id, [structId])) }, 1000)
        }
    }, [structId])

    useEffect(() => {
        return clearAlarmInterval
    }, [])

    const clearAlarmInterval = () => {
        if (interval) clearInterval(interval)
    }

    useEffect(() => {
        if (stationsDeployed && stationsDeployed.filter(s => s.factor.id == factorId).length > 0) {
            setSelectSensorId(stationsDeployed.filter(s => s.factor.id == factorId)[0].sensorId)
        } else {
            setSelectSensorId(null)
        }
    }, [stationsDeployed, factorId])

    const initState = (heatMapModel, sid) => {
        dispatch(getHeatmaps(sid, heatMapModel.name))
            .then(res => {
                if (res.payload.data && res.payload.data.length) {
                    let heatmapId = null;
                    let currHeatmap;
                    if (heatMapModel.name == '2D') {
                        heatmapId = res.payload.data;
                        currHeatmap = heatmapId[0];
                        for (let heatmap of heatmapId) {
                            if (heatmap.type.id == 1) {
                                currHeatmap = heatmap;
                                break;
                            }
                        }
                        currHeatmap['index'] = 0
                        setCurrentHeatMap(currHeatmap);
                    } else {
                        heatmapId = res.payload.data.filter(s => s.type.id == heatMapModel.typeId);
                    }
                    dispatch(getstationsDeployed(currHeatmap && currHeatmap.id || heatmapId[0].id));
                } else {
                    setCurrentHeatMap(null);
                }
            });
        dispatch(actions.dataMonitor.getStations(sid));
    }

    const catchWatch = (value) => {
        setSelectSensorId(value)
    }

    const nextClick = (direction) => {
        let index = currentHeatMap.index
        if (direction == 'left' && currentHeatMap) {
            if (index == 0) {
                message.info('已经是第一张热点图')
            } else {
                let i = index - 1
                let heatMap = heatMaps[i]
                heatMap['index'] = i
                setCurrentHeatMap(heatMap)
                dispatch(getstationsDeployed(heatMap && heatMap.id));
            }
        } else {
            if (index == heatMaps.length - 1) {
                message.info('已经是最后一张热点图')
            } else {
                let i = index + 1
                let heatMap = heatMaps[i]
                heatMap['index'] = i
                setCurrentHeatMap(heatMap)
                dispatch(getstationsDeployed(heatMap && heatMap.id));
            }
        }
    }

    return (
        <div>
            <div>
                <span className='monitor-header-title'>热点图</span>
                <div style={{ border: '1px solid rgba(47, 83, 234, 0.08)', marginTop: 20 }}>
                    {currentHeatMap && heatMaps && heatMaps.length > 0 ?
                        <div
                            style={{ color: '#fff', position: 'absolute', left: '23%', top: '23%', zIndex: 20 }}
                            onClick={() => nextClick('left')}
                        ><img src='/assets/images/monitor/left.png' /></div> : ''}
                    {currentHeatMap && heatMaps && heatMaps.length > 0 ?
                        <div
                            style={{ color: '#fff', position: 'absolute', right: '3%', top: '23%', zIndex: 20 }}
                            onClick={() => nextClick('right')}> <img src='/assets/images/monitor/right.png' /> </div> : ''}
                    <Heatmap
                        resourceRoot={'resourceRoot'}
                        structId={structId}
                        alarms={alarmTemp}
                        isRequesting={false}
                        heatMap={stationsDeployed.filter(s => s.factor.id == factorId)}
                        currentHeatMapModel={{ "name": '2D', "typeId": 1, "sectionType": 2 }}
                        currentHeatMap={currentHeatMap}
                        sectionItems={heatMaps}
                        cedianMap={myStationList}
                        latestData={null}
                        realtimeAlarms={alarmTemp}
                        onHeatMapModelChange={() => { }}
                        on2DHeatmapChange={() => { }}
                        catchWatch={catchWatch}
                        width={992}
                        height={305}
                        threeDisabled={false}
                        onModuleChange={() => { }}
                        user={user}
                        realtimeData={heatmapData}
                    />
                </div>
            </div>


            <RealTime
                structId={structId}
                stations={stations}
                selectSensorId={heatMaps && heatMaps.length > 0 ? selectSensorId : null}
                factorName={factorId && myStationList ? myStationList.find(s => s.factorId == factorId)?.factorName : ''}
                thresholdBatch={thresholdBatch}
                realtimeAlarms={alarmTemp}
                factorId={factorId}
                factorProto={factorProto}
                myStationList={myStationList}
            />
        </div>
    )
}

function mapStateToProps(state) {

    const { auth, global, myStructList, stationDeploy, staionsDeployedList, myStationList,
        monitorThreshold, realtimeAlarm, realtimeData, heatmapData } = state;
    return {
        loading: myStructList.isRequesting,
        user: auth.user,
        actions: global.actions,
        clientWidth: global.clientWidth,
        clientHeight: global.clientHeight,
        myStructList: myStructList.data || [],
        heatMaps: stationDeploy.data || [],
        stationsDeployed: staionsDeployedList.data || [],
        myStationList: myStationList.data || [],
        thresholdBatch: monitorThreshold.data || [],
        realtimeAlarms: realtimeAlarm.data || null,
        realtimeData: realtimeData.data || {},
        heatmapData: heatmapData.data || []
    };
}


export default connect(mapStateToProps)(RealTimeData);
