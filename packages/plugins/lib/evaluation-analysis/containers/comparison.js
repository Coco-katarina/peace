import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Spin, Row, Col, message } from 'antd';
import { LayoutContent } from '@peace/components';
import { useSafeState } from 'ahooks';
import QueryFilter from '../components/comparison/query-filter';
import Distribution from '../components/comparison/distribution';
import Difference from '../components/comparison/difference';
import Data from '../components/comparison/data';
import { Func, AuthorizationCode } from '$utils';
import { PinyinHelper, Func as peaceFunc } from '@peace/utils';
import { getStationsData, moreTimeStationsData, clearStationsData } from '../actions/comparison';
const { BridgeExtraInfo } = AuthorizationCode;
import '../style.less';

const Comparison = ({ ...props }) => {
    const { dispatch, actions, user, clientWidth, clientHeight, loading, myStructList, stations, factors, stationsData } = props;

    const [stationsId, setStationsId] = useSafeState(null);
    const [structId, setStructId] = useSafeState(null);
    const [factorId, setFactorId] = useSafeState(null);
    const [itemsId, setItemsId] = useSafeState(null);
    const [itemsName, setItemsName] = useSafeState('');
    const [defaultRadioValue, setDefaultRadioValue] = useSafeState(0);
    // const [defaultStations, setDefaultStations] = useState([]);     
    const [diffOptionId, setDiffOptionId] = useSafeState(0);
    const [timeDateStrings, setTimeDateStrings] = useSafeState({});


    useEffect(() => {
        dispatch(actions.evaluationAnalysis.getMyStructList(user?.orgId)).then(res => {
            if (res.success) {
                const data = res?.payload?.data || [];
                if (data.length > 0) {
                    setStructId(data[0]?.id);
                }
            }
        });
        return () => {
            dispatch(clearStationsData());
        }
    }, []);

    useEffect(() => {
        if (structId && myStructList?.length > 0) {
            let curStructure = myStructList.find(v => v.id === structId);
            if (curStructure) {
                dispatch(actions.evaluationAnalysis.getFactors(structId)).then(res => {
                    if (res.success) {
                        let data = res?.payload?.data || [];
                        data = data.filter(s => s.proto != 2002 && s.proto != 5001 && s.proto != 5002 && s.checked)
                        if (data.length > 0) {
                            setFactorId(data[0]?.id);
                        }
                    }
                });
            }
        }
    }, [structId]);

    useEffect(() => {
        if (structId && factorId && factors.length > 0) {
            const curFactors = factors.filter(s => s.id == factorId);
            if (curFactors.length > 0) {
                setDefaultRadioValue(curFactors[0]?.items[0]?.id || 0);
                setItemsName(curFactors[0]?.items[0]?.name || '')
            }
            dispatch(actions.evaluationAnalysis.getStations(structId, factorId));//获取结构物下测点

        }
    }, [structId, factorId]);



    const onStructChange = (id) => {//结构物改变
        setStructId(id)
    }

    const onFactorChange = (id) => {//检测因素改变
        setFactorId(id)
    }
    const onFactorItemChange = (value) => {
        setDefaultRadioValue(value);
        setItemsName(factors.filter(s => s.id == factorId)[0]?.items?.filter(f => f.id == value)[0]?.name || '')

    }



    const startAndEndTime = (dateRangeArray) => {
        setTimeDateStrings(dateRangeArray)

    }
    const singleTimeArea = () => {

        for (let keys in timeDateStrings) {
            if (keys != 0) {
                delete timeDateStrings[keys];
            }
        }
    }

    const diffOptionIdChange = (optionId) => {
        setDiffOptionId(optionId)

    }


    const onStationsChange = (ids) => {
        setStationsId(ids)
    }
    const doQuery = () => {

        if (itemsName == '') {
            setItemsName(factors.filter(s => s.id == factorId)[0]?.items[0]?.id)
        }
        if (stationsId == null || stationsId.length == 0) {
            return message.warning('请选择测点');
        } else if (stationsId.length > 1) {//多个测点  一个时间段的情况
            if (!timeDateStrings[0] || timeDateStrings[0].length == 0) {
                return message.warning('请选择时间区域');
            } else {//查询多个测点同一时间段的数据
                dispatch(getStationsData(timeDateStrings[0], stationsId.join(','), structId));
            }
        } else {//单个测点一或多个时间段
            if (Object.keys(timeDateStrings).length < 2) {

                return message.warning('请选择至少两个时间区域');
            } else {
                setDiffOptionId(null)

                dispatch(moreTimeStationsData(timeDateStrings, stationsId.join(','), structId));
            }
        }
    }



    return (
        <LayoutContent >
            <Spin spinning={loading}>
                <QueryFilter
                    onStationsChange={onStationsChange}
                    doQuery={doQuery}
                    stations={stations}
                    structId={structId}
                    factorId={factorId}
                    structures={myStructList}
                    factors={factors}
                    onStructChange={onStructChange}
                    onFactorChange={onFactorChange}
                    startAndEndTime={startAndEndTime}
                    onFactorItemChange={onFactorItemChange}
                    defaultRadioValue={defaultRadioValue}
                    singleTimeArea={singleTimeArea}
                    clientWidth={clientWidth}
                    loading={loading}
                />

                <Data
                    stationsData={stationsData}//获取的数据
                    itemsName={itemsName} //区别是  比如 温度还是 湿度
                    structId={structId}//保证数据不随结构物的改变而消失
                />
                <Distribution
                    stationsData={stationsData}
                    itemsName={itemsName}
                    structId={structId}
                />
                <Difference
                    stationsData={stationsData}
                    diffOptionIdChange={diffOptionIdChange}
                    itemsName={itemsName}
                    structId={structId}
                    diffOptionId={diffOptionId}
                />

            </Spin>
        </LayoutContent>
    )
}

function mapStateToProps(state) {

    const { auth, global, myStructList, thresholdStations, thresholdFactors, stationsData } = state;

    return {
        loading: myStructList.isRequesting || thresholdStations.isRequesting || thresholdFactors.isRequesting || stationsData.isRequesting,
        user: auth.user,
        actions: global.actions,
        clientWidth: global.clientWidth,
        clientHeight: global.clientHeight,
        myStructList: myStructList.data || [],
        stations: thresholdStations.data || [],//测点
        factors: thresholdFactors.data ? thresholdFactors.data.filter(s => s.proto != 2002 && s.proto != 5001 && s.proto != 5002 && s.checked) : [],//监测因素
        stationsData: stationsData.items || {}
    };
}

export default connect(mapStateToProps)(Comparison);
