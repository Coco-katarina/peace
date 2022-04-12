'use strict'

import React, { useState, useEffect } from 'react';
import { useSafeState } from 'ahooks';
import { Tabs, message, Spin } from 'antd';
import moment from 'moment';
import Option from './option';
import DimensionOption from './dimensionOption';
import State from './state';
import { ApiTable } from '$utils';
import { Request } from '@peace/utils'

const TabPane = Tabs.TabPane;

export default ({...props}) => {
    const { isEdit, devices, info, parentNode, dimensions, height, deviceMetas, dispatch } = props;
    const [linkState, setLinkState] = useSafeState(null);
    const [alarmMsg, setAlarmMsg] = useSafeState({ new: [],history: [] });
    const [currentDeviceId, setCurrentDeviceId] = useSafeState(null);
    const [activeKey, setActiveKey] = useSafeState('1');
    const callback = (key) => {
        setActiveKey(key)
    }
    useEffect(() => {
       if(info){
            if(info?.linkState){
                setLinkState(info.linkState)
            }
           if(info?.device?.id && info.device.id != currentDeviceId){
             setCurrentDeviceId(info.device.id);
             setActiveKey('1');
             let url = ApiTable.getDevicesLlinkStatus.replace('{deviceId}', info.device.id);

                Request.get(url)
                    .then(res => {
                        setLinkState(res.status)
                    }, error => {
                        message.warning('设备在线状态获取失败');
                    });

                url = ApiTable.getDeviceAlarms.replace('{deviceId}', info.device.id);
                
                Request.get(url, { limit: 5 })
                    .then(res => {
                        setAlarmMsg({ new: res.new || [],history: res.history || []})
                    }
                        , error => {
                            message.warning('设备告警信息获取失败');
                        });
           }
           
       }

    }, [info]);
    let tab = "属性";
    if (info && info?.type == "equipment") {
        tab = "属性"
    } else if (info && info?.type == "dimension") {
        tab = "采集策略"
    }
    return (
        <Tabs defaultActiveKey="1" activeKey={activeKey} onChange={callback} style={{ paddingRight: 16 }}>
            <TabPane tab={tab} key="1">
                {info && parentNode ?
                    info.type == "equipment" ?
                        <Option
                            isEdit={isEdit}
                            devices={devices}
                            info={info}
                            parentNode={parentNode}
                            deviceMetas={deviceMetas}
                            dimensions={dimensions}
                            height={height}
                            dispatch={dispatch}
                        />
                        : < DimensionOption
                            isEdit={isEdit}
                            info={info}
                            height={height}
                        />
                    : null
                }
            </TabPane>
             {
                parentNode && info && info.meta && info.meta.filteredResource && (JSON.parse(info.meta.filteredResource.properties).deviceType != 'dau.node') ?
                    <TabPane tab="状态" key="2">
                        <State
                            linkState={linkState}
                            alarmMsg={alarmMsg}
                        />
                    </TabPane> : null
            }  
        </Tabs>
    )

}
