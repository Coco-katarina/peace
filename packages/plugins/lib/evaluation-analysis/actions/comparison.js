import { basicAction, Request } from '@peace/utils';
import { ApiTable } from '$utils';

export function clearStationsData() {
    return {
        type: 'CLEAR_STATIONS_DATA'
    }
}

export function getStationsData(staryAndEndTime, stationIds, structId) {
    return dispatch => {
        dispatch({ type: 'STATIONS_DATA_REQUEST' });
        const url = ApiTable.getStationThemesData;
        return Request.get(url, {
            stations: stationIds,
            startTime: staryAndEndTime[0],
            endTime: staryAndEndTime[1]
        }).then(res => {
            let station = res.stations;

            for (let i = 0; i < station.length; i++) {
                if (station[i].data.length > 1) {
                    let dataj = [];
                    for (let j = 1; j < station[i].data.length; j++) {
                        if (j == 1) {
                            dataj.push(station[i].data[j - 1]);

                        }
                        if (station[i].data[j].time == station[i].data[j - 1].time) {
                            continue;
                        } else {
                            dataj.push(station[i].data[j]);
                        }
                    }
                    station[i].data = dataj;
                }
            }
            res.timeArea = staryAndEndTime;
            let results = [res];
            return dispatch({ type: 'STATIONS_DATA_SUCCESS', payload: { items: results, structId: structId } });
        }, err => {
            return dispatch({ type: 'STATIONS_DATA_FAILURE', error: '获取测点数据失败' });
        });
    }
}




export function moreTimeStationsData(staryAndEndTime, stationIds, structId) {
    return dispatch => {
        dispatch({ type: 'STATIONS_DATA_REQUEST' });
        const url = ApiTable.getStationThemesData;
        let results = [];

        let promises = [];
        for (let key in staryAndEndTime) {
            if (staryAndEndTime.hasOwnProperty(key) == true) {
                let p = Request.get(url, {
                    stations: stationIds,
                    startTime: staryAndEndTime[key][0],
                    endTime: staryAndEndTime[key][1]
                }).then(res => {
                    let station = res.stations;
                    for (let i = 0; i < station.length; i++) {
                        if (station[i].data.length > 1) {
                            let dataj = [];
                            for (let j = 1; j < station[i].data.length; j++) {
                                if (j == 1) {
                                    dataj.push(station[i].data[j - 1]);
                                }
                                if (station[i].data[j].time == station[i].data[j - 1].time) {
                                    continue;
                                } else {
                                    dataj.push(station[i].data[j]);
                                }
                            }
                            station[i].data = dataj;
                        }
                    }
                    res.timeArea = staryAndEndTime[key];
                    results.push(res);
                    //dispatch({ type: STATIONS_DATA_SUCCESS, payload: { items: results, structId: structId } });
                }, err => {
                    return dispatch({ type: 'STATIONS_DATA_FAILURE', error: '获取测点数据失败' });
                });
                promises.push(p);
            }
        }

        Promise.all(promises).then(() => {
            dispatch({ type: 'STATIONS_DATA_SUCCESS', payload: { items: results, structId: structId } });
        })

    }
}

export default {
    getStationsData,
    moreTimeStationsData,
    clearStationsData
}