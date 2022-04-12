'use strict'

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Spin, message } from "antd";
import { getFactors, getStations } from '../../actions/struct';
import { getBatchThreshold, postBatchThreshold, putBatchThreshold, delBatchThreshold } from '../../actions/threshold';
import CommThresholdTable from '../../components/threshold/commThresholdTable';

class CommThread extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showThresholdModal: false,
            title: '',
            dataSource: [],
            curFactorId: null
        };
    }
    componentDidMount() {
        const { dispatch, params } = this.props;
        dispatch(getFactors(params.id)).then((factors) => {
            if (factors && factors.payload && factors.payload.data && factors.payload.data.length > 0) {
                let fid = factors.payload.data[0].id;
                this.setState({ curFactorId: fid });
                this.getContextData(fid);
            } else {
                this.setState({ curFactorId: null });
            }
        });
    }
    componentWillUnmont() { this.setState = (state, callback) => { return; } }

    getContextData = (factorId) => {
        const { dispatch, params, factors } = this.props;
        if (factors && factors.length > 0) {
            dispatch(getStations(params.id, factorId));
            this.getBatchThreshold(factorId);
        }
    }
    getBatchThreshold(value) {//查询测量值阈值
        const { dispatch, params } = this.props;
        const { curFactorId } = this.state;
        dispatch(getBatchThreshold(params.id, value || curFactorId))
    }
    formBatchThreshold = (batchThreshold) => {
        return Object.keys(batchThreshold).reduce((p, c, index) => {
            const batch = batchThreshold[c];
            const { batchNo, data } = batch;
            //测点信息
            var cedianRowData = this.parseCedianInfo(data.stations);
            cedianRowData.key = index + 1;
            cedianRowData.batchNo = batchNo;
            cedianRowData.data = data;
            //域值信息
            var children = this.parseBatchItemsThreshold(data.items);
            cedianRowData.children = children.reduce((q, v, childIndex) => {
                let dt = v.reduce((o, m) => {
                    m.key = (index + 1) * 10 + childIndex + 1;
                    o.push(m);
                    return o;
                }, []);
                q = q.concat(dt);
                return q;
            }, []);
            p.push(cedianRowData);
            return p;
        }, []);
    }
    parseCedianInfo = (stations) => {
        let names = stations.reduce((p, station, index) => {
            p.push({ name: station.name, id: station.id });
            return p;
        }, []);
        return {
            cedianName: names,
            option: '',
            children: []
        };
    }
    //解析域值 items    
    parseBatchItemsThreshold = (batchItems) => {
        let factorItemEles = batchItems.reduce((p, item) => {
            var itemName = `${item.name} (${item.unit})`;
            var obj = this.parseItemThresholds(item.config, itemName);
            p.push(obj);
            return p;
        }, []);
        return factorItemEles;
    }
    //解析 config
    parseItemThresholds = (config, itemName) => {
        let thresholdEles = config.reduce((p, data) => {
            const { startTime, endTime, thresholds } = data;
            let start = startTime != null ? `${startTime}时` : '',
                end = endTime != null ? `${endTime}时` : '';
            let obj = { itemName: itemName, startTime: start, endTime: end };
            let tobj = this.parseThresholds(thresholds);
            const threshold = Object.assign({}, obj, tobj);
            p.push(
                threshold
            );
            return p;
        }, []);
        return thresholdEles;
    }
    parseThresholds = (thresholds) => {
        const LevelHanzi = { 1: 'level1', 2: 'level2', 3: 'level3', 4: 'level4' };
        var obj = { "level1": null, "level2": null, "level3": null };
        thresholds.forEach(function (threshold) {
            let key = LevelHanzi[threshold.level];
            if (Object.keys(obj).indexOf(key) > -1) {
                obj[key] = threshold.value;
            }
        }, this);
        return obj;
    }
    handleFactorChange = (value) => {
        this.setState({ curFactorId: value });
        this.getContextData(value);
    }

    handleSave = (isEdit, dataToSave, batchNo) => {
        const { dispatch } = this.props;
        const { keywords } = this.state;
        /**tod
         * 搜索优化;
         */
        if (isEdit) {
            dispatch(putBatchThreshold(batchNo, dataToSave)).then(action => {
                const { success, error } = action;
                if (success) {
                    this.getBatchThreshold()
                } else {
                    message.error(error);
                }
            });
        } else {
            dispatch(postBatchThreshold(dataToSave)).then(action => {
                const { success, error } = action;
                if (success) {
                    this.getBatchThreshold()
                } else {
                    message.error(error);
                }
            });
        }
    };

    handleDelete = (id) => {
        const { dispatch } = this.props;
        dispatch(delBatchThreshold(id)).then(action => {
            const { success, error } = action;
            if (success) {
                this.getBatchThreshold();
            } else {
                message.error(error);
            }
        });
    }
    render() {
        const { factors, stations, batchThreshold, params, isRequesting } = this.props;
        const { curFactorId } = this.state;
        const dataSource = batchThreshold ? this.formBatchThreshold(batchThreshold) : [];
        return (
            <CommThresholdTable
                factors={factors}
                stations={stations}
                structId={params.id}
                dataSource={dataSource}
                batchThreshold={batchThreshold}
                factorId={curFactorId}
                isRequesting={isRequesting}
                onSave={this.handleSave}
                onDelete={this.handleDelete}
                onFactorChange={this.handleFactorChange}
            />
        );
    }
}

function mapStateToProps(state) {
    const { factors, stations, thresholdBatch } = state;
    let isRequesting = factors.isRequesting || stations.isRequesting || thresholdBatch.isRequesting;

    return {
        isRequesting: isRequesting,
        stations: stations.data,
        factors: factors.data,
        batchThreshold: thresholdBatch.data
    };
}

export default connect(mapStateToProps)(CommThread)
