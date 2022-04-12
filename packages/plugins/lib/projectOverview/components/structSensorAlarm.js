import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Input, Badge, Divider } from 'antd';
import { getFactorsByStructures, getAlarmsByStructure, getStationList } from '../actions/projectOverview';
import { push } from 'react-router-redux';

import '../style.less';

const Body = (props) => {
    const { dispatch, actions, structureSelected } = props

    let initWarningData = [
        {
            warningLevel: 1,
            warningLevelName: '一级告警',
            num: 0,
            color: '#F31C1C'
        },
        {
            warningLevel: 2,
            warningLevelName: '二级告警',
            num: 0,
            color: '#FE812C'
        },
        {
            warningLevel: 3,
            warningLevelName: '三级告警',
            num: 0,
            color: '#FADF37'
        },
    ]

    let [factors, setFactors] = useState([]);
    let [sensorNum, setSensorNum] = useState(0);
    let [warningData, setWarningData] = useState(initWarningData);
    let [lastestWarningLevel, setLastestWarningLevel] = useState('正常');
    let [lastestWarningColor, setLastestWarningColor] = useState('#2F53EA');

    useEffect(() => {

    }, [])

    useEffect(() => {
        if (structureSelected) {
            dispatch(actions.projectOverview.getFactorsByStructures(structureSelected)).then(res => {
                if (res.success) {
                    let factorList = [];
                    let sensorNum = 0;
                    res.payload.data.map(fa => {
                        if (fa.checked) {
                            factorList.push(fa)
                        }
                    })
                    dispatch(getStationList(structureSelected)).then(res => {
                        if (res.success) {
                            res.payload.data.map(s => {
                                factorList.map(fac => {
                                    if (s.factorId == fac.id) {
                                        s.groups.map(g => {
                                            fac.serNum = g.stations.length
                                            sensorNum = sensorNum + g.stations.length
                                        })
                                    }
                                })
                            })
                            setSensorNum(sensorNum)
                        }
                    })
                    setFactors(factorList);
                }
            });
            dispatch(actions.projectOverview.getAlarmsByStructure(structureSelected, 'new')).then(res => {
                if (res.success) {
                    let _warningData = warningData;
                    if (res.payload.data.alarm?.hits.length == 0) {
                        _warningData.map(wa => {
                            wa.num = 0;
                        })
                        setWarningData(_warningData);
                        setLastestWarningLevel('正常');
                        setLastestWarningColor('#2F53EA')
                    } else {
                        res.payload.data.alarm?.hits.map(hi => {
                            _warningData[hi._source.current_level - 1].num = _warningData[hi._source.current_level - 1].num + 1;
                        })
                        setWarningData(_warningData);
                        let arr = ['一级告警', '二级告警', '三级告警', '四级告警']
                        setLastestWarningLevel(arr[res.payload.data.alarm.max_score - 1]);
                        setLastestWarningColor(initWarningData[res.payload.data.alarm.max_score - 1].color)
                    }

                }
            })
        }
    }, [structureSelected])

    const toAlarm = () => {
        dispatch(push({ pathname: `/alarm/list`, state: { structId: structureSelected } }))
    }

    const toData = () => {
        dispatch(push({ pathname: `/dataService/check`, state: { structId: structureSelected } }))
    }

    return (
        <div>
            <Row className="sensorDataTitle">
                <Col span={2} style={{ marginLeft: 20 }}>
                    监测因素：<span className="bodyNum">{factors.length}</span> 项
                </Col>
                <Col span={3}>
                    传感器总数：<span className="bodyNum">{sensorNum}</span> 个
                </Col>
                <Col offset={1}>
                    {/* TODO 目前没有监测数据页面 跳转暂时不做 */}
                    <Button size='small' onClick={toData}>
                        查看监测数据
                    </Button>
                </Col>
            </Row>
            <Row className="sensorData">
                {
                    factors.map((sd, index) => {
                        return (
                            <Col span={4} className='sensorDataCol' key={index}>
                                <Input addonAfter={<div className="sensorDataColAddonAfter">{sd.serNum ? sd.serNum : 0}</div>}
                                    value={sd.name} disabled={true}></Input>
                            </Col>
                        )
                    })
                }
            </Row>
            <Row className="realTimeMonitoringStatusTitle">
                <Col span={4} style={{ marginLeft: 20 }}>
                    实时监测状态：<span className="bodyNum" style={{color:lastestWarningColor}}>{
                        lastestWarningLevel
                    }</span>
                </Col>
                <Col offset={1}>
                    {/* TODO 目前没有告警信息页面 跳转暂时不做 */}
                    <Button size='small' onClick={toAlarm}>
                        查看告警信息
                    </Button>
                </Col>
            </Row>
            <Row className="realTimeMonitoringStatus">
                {
                    warningData.map((wa, index) => {
                        return (
                            <Col key={index} span={4}>
                                <Row>
                                    {
                                        index != 0 ?
                                            <Col span={1}>
                                                <Divider type='vertical'></Divider>
                                            </Col>
                                            :
                                            <Col span={1}>
                                                <div style={{ height: 45, marginTop: 25 }}></div>
                                            </Col>
                                    }
                                    <Col span={20} >
                                    <Badge color={wa.color} text={<span style={{color:wa.color}}>{wa.warningLevelName}</span>}></Badge>
                                    </Col>
                                    <Col className="realTimeMonitoringStatusText" span={24}>{wa.num}</Col>
                                </Row>
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    )
}

function mapStateToProps(state) {
    const { global, auth, members, structuresList } = state;
    return {
        //loading: members.isRequesting || null,
        user: auth.user,
        actions: global.actions,
        //members: members.data,
        clientWidth: global.clientWidth,
        structuresList: structuresList.data || [],
    };
}

export default connect(mapStateToProps)(Body);
