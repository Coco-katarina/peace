/*
 * @description  : 
 * @Date         : 2021-09-27 15:22:40
 * @FilePath     : \web-apie:\FS-Anxinyun\tags\jilin\web\client\src\sections\projectOverview\components\Gis.js
 * @useStrict    : use strict
 */
'use strict'
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { Tabs, Select, Row, Col, Button, Input, Badge, Divider, Card } from 'antd';
import { localFlag } from '$utils';//配置判断是否使用离线地图 true为离线 false为在线
import { Amap, CircleMarker, InfoWindow } from '@amap/amap-react';
import CustomInfoWindow from './infoWindow';
import ProCard from '@ant-design/pro-card';

import '../style.less';


const Gis = (props) => {
    const { clientWidth, clientHeight, gisStructures, structuresList, dispatch, userAlarmsInfo } = props;

    const mapRef = useRef();
    const iWindowRef = useRef();

    let [selectStructure, setSelectStructure] = useState(null);

    let alarmColor = ['#00FA9A', '#F31C1C', '#FE812C', '#FADF37', '#801CF3', '#00FA9A'] //数据内告警颜色顺序[正常,1级,2级,3级,4级] -- 安心云为3级--需求是4级
    useEffect(() => {
        //renderInfoWindow(gisStructures[0])
    }, []);

    useEffect(() => {
        //if (gisStructures && gisStructures.length == 1) {
        //if (mapRef.current) {
        //mapRef.current.clearInfoWindow();
        //setSelectStructure(gisStructures[0]);
        // onMarkerClick(gisStructures[0].latitude,gisStructures[0].longitude)
        // renderInfoWindow()
        //mapRef.current.setFitView();
        //}
        //renderInfoWindow()
        //} else {
        if (mapRef.current) {
            mapRef.current.setFitView();
        }
        //}
        if (iWindowRef && iWindowRef.current && gisStructures && gisStructures.length > 1) {
            iWindowRef.current.close();
        }
    }, [gisStructures]);

    const onMarkerClick = (lat, lng) => {
        if (structuresList?.length > 0) {
            structuresList.map(struct => {
                if (struct.latitude == lat && struct.longitude == lng) {
                    setSelectStructure(struct);
                }
            })
        }
    }

    const circleMarker = () => {
        let markerList = [];
        if (gisStructures?.length > 0) {
            gisStructures.map((s, index) => {
                let curMaxLevel = 5;
                if (userAlarmsInfo && userAlarmsInfo?.alarms.length > 0) {
                    userAlarmsInfo.alarms.map(alarmStruct => {
                        if (alarmStruct.structureId == s.id && alarmStruct?.alarms.length > 0) {
                            alarmStruct.alarms.map(alarm => {
                                if (alarm.state!= 3 && curMaxLevel > alarm.level) {
                                    curMaxLevel = alarm.level
                                }
                            })
                        }
                    })
                }
                let markColor = alarmColor[curMaxLevel];
                markerList.push(
                    <CircleMarker
                        key={index}
                        center={[s.longitude, s.latitude]}
                        radius={5}
                        strokeColor={markColor}
                        strokeOpacity={0.25}
                        strokeWeight={20}
                        fillColor={markColor}
                        fillOpacity={1}
                        onClick={(e) => onMarkerClick(e.getCenter().lat, e.getCenter().lng)}
                    >
                    </CircleMarker>
                )
            })
        }
        if (mapRef.current) {
            mapRef.current.setFitView();
        }
        return markerList;
    }

    const renderInfoWindow = (struct) => {
        if (struct && struct.id) {
            return <InfoWindow
                ref={iWindowRef}
                position={[struct.longitude, struct.latitude]}
                autoMove
                closeWhenClickMap
                isCustom
                onClose={() => setSelectStructure(null)}
                offset={[0, 0]}
            >
                <div className="content">
                    <div className="contentBody">
                        <ProCard>
                            <Row className="structName" style={{ marginBottom: 8 }} >
                                {struct ? struct.name : ''}
                            </Row>
                            <Row style={{ width: 660, height: 280 }}>
                                <CustomInfoWindow
                                    structureSelected={struct.id}
                                />
                            </Row>
                        </ProCard>
                    </div>
                </div>
            </InfoWindow>
        }
    }

    return (
        <div className="content">
            <div id='container' className="gisBody"
                style={{ width: `${clientWidth - 50}px`, height: `${clientHeight - 200}px`, margin: 24 }}>
                <Amap ref={mapRef}
                    onComplete={(map) => {
                        map.setFitView();
                    }}
                >
                    {circleMarker()}
                    {renderInfoWindow(selectStructure)}
                </Amap>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    const { global, auth, alarmsByStructures, structureFactors, structuresList, userAlarmsInfo } = state;
    return {
        user: auth.user,
        actions: global.actions,
        clientWidth: global.clientWidth,
        clientHeight: global.clientHeight,
        alarmsByStructures: alarmsByStructures.data,
        structureFactors: structureFactors.data,
        structuresList: structuresList.data || [],
        userAlarmsInfo: userAlarmsInfo.data,
    };
}

export default connect(mapStateToProps)(Gis);