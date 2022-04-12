// import { useBoolean, useRequest } from 'ahooks';
// import React from 'react';
// import { Request } from '@peace/utils'
// import request from 'superagent';
// async function getData() {
//     return new Promise((resolve, reject) => {
//         request.get('https://project.anxinyun.cn/_api/stations/theme/data?token=11ab9c40-ee34-46c0-81ef-6185e36348ea&stations=44132%2C44133%2C44135%2C44134%2C44128%2C44130%2C44129%2C44131&startTime=2021-11-13%2000%3A00%3A00&endTime=2021-11-13%2023%3A59%3A59&limit=1')
//             .end(
//                 (err, res) => {
//                     resolve({
//                         data: JSON.stringify(res.body),
//                         time: new Date().getTime(),
//                     });
//                 }
//             );
//     });
// }


// const RealTime = () => {
//     const { data, loading } = useRequest(getData, {
//         cacheKey: 'article',
//         pollingInterval: 1000
//     });
//     if (!data && loading) {
//         return <p>loading</p>;
//     }
//     return (
//         <>
//             <p>Latest request time: {data?.time}</p>
//             <p>{data?.data}</p>
//         </>
//     );
// };

// export default RealTime;

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Modal } from 'antd';
import './style.less'
import RealTimeData from '../../components/factorMonitor/realtime-data'
import RealTimeChart from '../../components/factorMonitor/realtime-chart'
import HistoryDataContainer from '../../../data-service/containers/data-check'

let interval = null
const RealTime = ({ ...props }) => {
    const { dispatch, actions, realtimeData, stations, selectSensorId,
        myStationList, realtimeAlarms, factorName, thresholdBatch, structId, factorId, factorProto } = props;
    const [arr, setArr] = useState(null) //最新12条数据
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        if (selectSensorId) {
            setArr({})
            if (interval) clearInterval(interval)
            dispatch(actions.dataMonitor.getRealTimeData(selectSensorId));

            interval = setInterval(() => {
                dispatch(actions.dataMonitor.getRealTimeData(selectSensorId));
            }, 1000)
        }
    }, [selectSensorId]);

    useEffect(() => {
        if (structId) {
            setArr({})
        }
    }, [structId]);


    useEffect(() => {
        return componentWillUnmount
    }, [])

    const componentWillUnmount = () => {
        if (interval) clearInterval(interval)
    }

    useEffect(() => {
        if (realtimeData && realtimeData.stations) {
            if (JSON.stringify(realtimeData) != JSON.stringify(arr)) {
                setArr(realtimeData)
            }
        }
    }, [realtimeData]);

    const onClose = () => {
        setVisible(false)
    }
    return (
        <div>
            <div style={{ marginTop: 20 }}>
                <Row>
                    <Col span={12}><span className='monitor-header-title'>实时监测</span></Col>
                    <Col span={12} style={{ textAlign: 'right', color: '#2F53EA' }}>
                        <a onClick={() => { setVisible(true) }}>历史数据</a>
                    </Col>

                    <Modal
                        width="80%"
                        visible={visible}
                        title={'历史数据'}
                        onCancel={() => { onClose() }}
                        onOk={() => {
                            onClose()
                        }}
                    >
                        <HistoryDataContainer
                            myStationList={myStationList}
                            factorId={factorId}
                            factorProto={factorProto}
                            selectSensorId={selectSensorId}
                        />
                    </Modal>
                </Row>

                <Row>
                    <Col span={15} style={{ paddingRight: 24 }}>
                        <RealTimeChart
                            selectSensorId={selectSensorId}
                            data={arr}
                        />
                    </Col>

                    <Col span={9}>
                        <RealTimeData
                            realtimeData={arr}
                            factorName={factorName}
                            location={stations && selectSensorId ? stations.find(s => s.id == selectSensorId)?.name : '-'}
                            thresholdBatch={thresholdBatch}
                            selectSensorId={selectSensorId}
                            realtimeAlarms={realtimeAlarms}
                        />
                    </Col>
                </Row>


            </div>
        </div>
    )
}

function mapStateToProps(state) {

    const { auth, global, realtimeData, } = state;
    return {
        loading: realtimeData.isRequesting,
        user: auth.user,
        actions: global.actions,
        realtimeData: realtimeData.data || {}
    };
}

export default connect(mapStateToProps)(RealTime);
