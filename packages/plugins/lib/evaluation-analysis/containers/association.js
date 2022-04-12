import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin, message, Card } from 'antd';
import { LayoutContent } from '@peace/components';
import { useSafeState } from 'ahooks';
import moment from 'moment';
import { AuthorizationCode, Func as localFunc } from '$utils';
import { Func } from '@peace/utils';
import QueryFilter from '../components/association/query-filter';
import Data from '../components/association/data';
import Coefficient from '../components/association/coefficient';
import { getCorrelationData, clearCorrelationData } from '../actions/association';
const { } = AuthorizationCode;

const notSupportFactorProtos = ['1024', '2002', '5001', '5002', '5003'];
const notSupportInterrelatedFactorIds = [1, 2, 12, 29, 54, 80, 118, 119, 149, 160, 207];
const notSupportInterrelatedFactorProtos = ['1001', '1002', '3002'];

const Association = ({ ...props }) => {
    const { dispatch, actions, user, loading, myStructList, factors, stations, correlationData } = props;

    const [structId, setStructId] = useSafeState(null);
    const [factorId, setFactorId] = useSafeState(null);
    const [correlationFactorId, setCorrelationFactorId] = useSafeState(null);
    const [factorData, setFactorData] = useSafeState([]);
    const [correlationFactorData, setCorrelationFactorData] = useSafeState([]);
    const [stationIds, setStationIds] = useSafeState([]);
    const [correlationStationIds, setCorrelationStationIds] = useSafeState([]);
    const [stationData, setStationData] = useSafeState([]);
    const [correlationStationData, setCorrelationStationData] = useSafeState([]);
    const [currStartTime, setCurrStartTime] = useSafeState(moment().add(-1, 'days').format('YYYY-MM-DD HH:mm:ss'));
    const [currEndTime, setCurrEndTime] = useSafeState(moment().format('YYYY-MM-DD HH:mm:ss'));
    const [flag, setFlag] = useSafeState(false);
    const [independentVariableStaionId, setIndependentVariableStaionId] = useSafeState(null);
    const [dependentVariableStaionId, setDependentVariableStaionId] = useSafeState(null);
    const [factorItems, setFactorItems] = useSafeState([]);
    const [correlationFactorItems, setCorrelationFactorItems] = useSafeState([]);



    const getTargetFactorData = (factorData, factorId) => {
        let corData = factorData.filter(f => f.id !== factorId);
        if (notSupportInterrelatedFactorIds.includes(factorId)) {
            corData = corData.filter(f => !notSupportInterrelatedFactorProtos.includes(f.proto));
        }
        return corData;
    };
    const getFactorProto = (factorId) => {
        let fctorProto = factors.filter(f => f.id == factorId)[0].proto;
        return fctorProto;
    }
    const reSetFactorData = (factors) => {
        if (factors) {
            let factData = factors.filter(f => !notSupportFactorProtos.includes(f.proto));
            let corData = getTargetFactorData(factorData, factorId);
            if (corData.length > 0) {
                setCorrelationFactorId(corData[0]?.id || null);
                setCorrelationFactorItems(corData[0]?.items || []);
            }
            setFactorData(factData)
            setCorrelationFactorData(corData)
        }
    };

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
            dispatch(clearCorrelationData());
        }
    }, []);

    useEffect(() => {
        if (structId && myStructList?.length > 0) {
            let curStructure = myStructList.find(v => v.id === structId);
            if (curStructure) {
                dispatch(actions.evaluationAnalysis.getFactors(structId)).then(res => {
                    if (res.success) {
                        const data = res?.payload?.data || [];
                        if (data.length > 0) {
                            let factorData = data.filter(f => !notSupportFactorProtos.includes(f.proto));
                            factorData = factorData.filter(s => s.checked)
                            if (factorData.length > 0) {
                                setFactorId(factorData[0]?.id);
                                setFactorItems(factorData[0]?.items)
                            }
                        }
                    }
                });

            }
        }
    }, [structId]);

    useEffect(() => {
        if (structId && factorId && factors.length > 0) {
            reSetFactorData(factors);
            dispatch(actions.evaluationAnalysis.getStationsWithOutFactorId(structId));//获取结构物下测点
        }
    }, [structId, factorId]);


    useEffect(() => {
        if (structId && factorId && factors.length > 0 && stations) {
            doSetStationIds(stations)
        }
    }, [stations]);


    useEffect(() => {
        getCorrelationStationId(stations);
    }, [correlationFactorId]);


    const doSetStationIds = (stations) => {

        let sId = getStationId(stations);
        let corStationId = getCorrelationStationId(stations);
        if (sId.length > 0 && corStationId.length > 0 && currStartTime && currEndTime) {
            let factorProto = getFactorProto(factorId) + "-0";
            dispatch(getCorrelationData(currStartTime, currEndTime, sId.join(','), factorProto));
            let correlationFactorProto = getFactorProto(correlationFactorId) + "-1";
            dispatch(getCorrelationData(currStartTime, currEndTime, corStationId.join(','), correlationFactorProto));
            setFlag(true);

        }
        else {
            setFlag(false);
        }
    }
    const getStationId = (stations) => {
        let stationInfoData = stations.filter(s => s.factorId == factorId);
        let sIds = [];
        let sData = [];
        let independentVarStaionId = null;
        let key = factorItems.length > 0 ? factorItems[0].name : null;
        let field_name = factorItems.length > 0 ? factorItems[0].field_name : null;
        stationInfoData.map(sid => {
            sid.groups.map(g => {
                g.stations.map(s => {
                    if (sIds.length == 0) {
                        sIds.push(s.id);
                        independentVarStaionId = `${s.name}-${key}-${field_name}`;
                    }
                })
                if (g.stations.length > 0)
                    sData = sData.concat(g.stations);
            })
        });
        setStationIds(sIds);
        setStationData(sData);
        setIndependentVariableStaionId(independentVarStaionId)
        return sIds;
    }
    const getCorrelationStationId = (stations) => {


        let correlationStationInfoData = stations.filter(s => s.factorId == correlationFactorId);

        let corIds = [];
        let corData = [];
        let dependentVarStaionId = null;
        let key = correlationFactorItems.length > 0 ? correlationFactorItems[0].name : null;

        let field_name = correlationFactorItems.length > 0 ? correlationFactorItems[0].field_name : null;
        correlationStationInfoData.map(csid => {
            csid.groups.map(g => {
                g.stations.map(s => {
                    if (corIds.length == 0) {
                        corIds.push(s.id);
                        dependentVarStaionId = `${s.name}-${key}-${field_name}`;
                    }
                })
                if (g.stations.length > 0)
                    corData = corData.concat(g.stations);

            })
        });
        setCorrelationStationIds(corIds);
        setCorrelationStationData(corData);
        setDependentVariableStaionId(dependentVarStaionId);
        return corIds;
    }
    const onStructChange = (id) => {
        setStructId(id);
        setFactorId(null);
        setCorrelationFactorId(null);
        setFactorData([]);
        setCorrelationFactorData([]);
        setStationIds([]);
        setCorrelationStationIds([]);
        setStationData([]);
        setCorrelationStationData([]);
        setFlag(false);
        setIndependentVariableStaionId(null);
        setDependentVariableStaionId(null);
        setFactorItems([]);
        setCorrelationFactorItems([]);

    }

    const onFactorChange = (fId) => {
        let items = factors.filter(f => f.id == fId)[0]?.items || [];
        setFactorId(fId);
        setFactorItems(items)

    }
    const onCorrelationFactorChange = (factorId) => {
        let items = factors.filter(f => f.id == factorId)[0]?.items || [];
        setCorrelationFactorId(factorId);
        setCorrelationFactorItems(items);
        setFlag(false);
    }
    const onStationChange = (stationIds) => {

        let key = factorItems.length > 0 ? factorItems[0].name : null;
        let field_name = factorItems.length > 0 ? factorItems[0].field_name : null;
        if (stationIds.length == 0) {
            setIndependentVariableStaionId(null);
            setStationIds(stationIds);

        } else {

            stations.map(csid => {
                if (csid.factorId == factorId) {
                    csid.groups.map(g => {
                        g.stations.map(s => {
                            if (s.id == stationIds[0]) {
                                let senName = s.name;
                                setIndependentVariableStaionId(`${senName}-${key}-${field_name}`);
                                setStationIds(stationIds);

                            }
                        })
                    })
                }
            });
        }
    }
    const onCorrelationStationChange = (correlationStationIds) => {

        let key = correlationFactorItems.length > 0 ? correlationFactorItems[0].name : null;
        let field_name = correlationFactorItems.length > 0 ? correlationFactorItems[0].field_name : null;
        if (correlationStationIds.length == 0) {
            setDependentVariableStaionId(null);
            setCorrelationStationIds(correlationStationIds);

        } else {

            stations.map(csid => {
                if (csid.factorId == correlationFactorId) {
                    csid.groups.map(g => {
                        g.stations.map(s => {
                            if (s.id == correlationStationIds[0]) {
                                let senName = s.name;
                                setDependentVariableStaionId(`${senName}-${key}-${field_name}`);
                                setCorrelationStationIds(correlationStationIds);

                            }
                        })
                    })
                }
            });
        }
    }
    const onDateRangeChange = (dates) => {
        if (dates.length == 0) {
            setCurrStartTime(null);
            setCurrEndTime(null);
            return message.warning('请选择时间');
        }
        setCurrStartTime(dates[0].format('YYYY-MM-DD HH:mm:ss'));
        setCurrEndTime(dates[1].format('YYYY-MM-DD HH:mm:ss'));

    }

    const queryCorrlationData = () => {

        if (stationIds.length > 0 && correlationStationIds.length > 0 && currStartTime && currEndTime) {
            setFlag(true);
            let factorProto = getFactorProto(factorId) + "-0";
            dispatch(getCorrelationData(currStartTime, currEndTime, stationIds.join(','), factorProto));
            let correlationFactorProto = getFactorProto(correlationFactorId) + "-1";
            dispatch(getCorrelationData(currStartTime, currEndTime, correlationStationIds.join(','), correlationFactorProto));
        } else {
            setFlag(false);
            return message.warning('请选择关联测点或时间');
        }
    }

    const onIndependentVariableStaionChange = value => {
        setIndependentVariableStaionId(value)

    }

    const onDependentVariableStaionChange = value => {
        setDependentVariableStaionId(value);

    }


    return (
        <LayoutContent>
            <Spin spinning={loading}>
                <QueryFilter
                    structId={structId}
                    factorId={factorId}
                    correlationFactorId={correlationFactorId}
                    structures={myStructList}
                    factorData={factorData}
                    correlationFactorData={correlationFactorData}
                    stationIds={stationIds}
                    correlationStationIds={correlationStationIds}
                    stationData={stationData}
                    correlationStationData={correlationStationData}
                    onStructChange={onStructChange}
                    onFactorChange={onFactorChange}
                    onCorrelationFactorChange={onCorrelationFactorChange}
                    onStationChange={onStationChange}
                    onCorrelationStationChange={onCorrelationStationChange}
                    onDateRangeChange={onDateRangeChange}
                    btnQuery={queryCorrlationData}
                />
                <Data
                    correlationData={correlationData}
                    factors={factors}
                    factorId={factorId}
                    correlationFactorId={correlationFactorId}
                    flag={flag}
                />
                <Coefficient
                    correlationData={correlationData}
                    currStartTime={currStartTime}
                    independentVariableStaionId={independentVariableStaionId}
                    dependentVariableStaionId={dependentVariableStaionId}
                    independentVariableStaionData={stationData}
                    dependentVariableStaionData={correlationStationData}
                    independentVariableFactorItems={factorItems}
                    dependentVariableFactorItems={correlationFactorItems}
                    independentVariableStationIds={stationIds}
                    dependentVariableStationIds={correlationStationIds}
                    onIndependentVariableStaionChange={onIndependentVariableStaionChange}
                    onDependentVariableStaionChange={onDependentVariableStaionChange}
                />


            </Spin>
        </LayoutContent>
    )
}

function mapStateToProps(state) {

    const { auth, global, myStructList, thresholdFactors, associationStations, correlationData } = state;
    return {
        loading: myStructList.isRequesting || thresholdFactors.isRequesting
            || associationStations.isRequesting || correlationData.isRequesting,
        user: auth.user,
        actions: global.actions,
        clientWidth: global.clientWidth,
        clientHeight: global.clientHeight,
        myStructList: myStructList.data || [],
        factors: thresholdFactors.data ? thresholdFactors.data.filter(s => s.checked) : [],
        stations: associationStations.data || [],
        correlationData: correlationData.items,
    };
}


export default connect(mapStateToProps)(Association);
