'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { getFactors } from '../../actions/struct';
import {
    getAggConfig,
    getAggThreshold, postAggThreshold, putAggThreshold, delAggThreshold
} from '../../actions/threshold';
import ChangeThresholdTable from '../../components/threshold/changeThresholdTable';


class ChangeThread extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curFactorId: null
        }
    }

    componentDidMount() {
        const { dispatch, params } = this.props;
        dispatch(getFactors(params.id)).then((factors) => {
            if (factors && factors.payload && factors.payload.data && factors.payload.data.length > 0) {
                let fid = factors.payload.data[0].id;
                this.setState({ curFactorId: fid });
                dispatch(getAggConfig(params.id));
                this.getAggThreshold(params.id);
            } else {
                this.setState({ curFactorId: null });
            }
        });
    }
    componentWillUnmont() { this.setState = (state, callback) => { return; } }

    getAggThreshold = () => {
        const { curFactorId } = this.state;
        const { params, dispatch } = this.props;
        dispatch(getAggThreshold(params.id, curFactorId));
    }
    updataCurFactorId = (value) => {
        this.setState({ curFactorId: value });
        this.props.dispatch(getAggThreshold());
    }
    handleSave = (isEdit, data) => {
        const { dispatch, params } = this.props;
        const { curFactorId } = this.state;
        if (isEdit) {
            dispatch(putAggThreshold(data, params.id, curFactorId, data.items[0].id, data.category[0].id)).then(action => {
                const { success, error } = action;
                if (success) {
                    this.getAggThreshold()
                } else {
                    message.error(error);
                }
            })
        } else {
            dispatch(postAggThreshold(data, params.id, curFactorId)).then(action => {
                const { success, error } = action;
                if (success) {
                    this.getAggThreshold()
                } else {
                    message.error(error);
                }
            })
        }
    }
    handleDelete = (record) => {
        const { dispatch, params } = this.props;
        const { aggCategory, itemId } = record;
        dispatch(delAggThreshold(params.id, this.state.curFactorId, aggCategory, itemId)).then(action => {
            const { success, error } = action;
            if (success) {
                this.getAggThreshold()
            } else {
                message.error(error);
            }
        })
    }
    handleFactorChange = (value) => {
        this.setState({ curFactorId: value });
        const { params, dispatch } = this.props;
        dispatch(getAggThreshold(params.id, value));
    }
    formatData = (aggThresholdList) => {
        let dataSource = [];
        let key = 1;
        if (aggThresholdList && aggThresholdList.length) {
            for (let a of aggThresholdList) {
                if (a.threshold.length) {
                    if (a.threshold[0].startTime == null || a.threshold[0].startTime == undefined) {
                        let level1 = '', level2 = '', level3 = '';
                        a.threshold.forEach(t => {
                            switch (t.level) {
                                case 1:
                                    level1 += `${t.value};`
                                    break;
                                case 2:
                                    level2 += `${t.value};`;
                                    break;
                                case 3:
                                    level3 += `${t.value};`;
                                    break;
                                default: ''; break;
                            }
                        });
                        dataSource.push({
                            key: key++,
                            ...a,
                            action: true,
                            level1,
                            level2,
                            level3
                        })
                    } else {
                        let children = [];
                        for (let t of a.threshold) {
                            let hasIndex = children.findIndex(c => c.startTime == t.startTime + '时' && c.endTime == t.endTime + '时');
                            let level = '';
                            switch (t.level) {
                                case 1:
                                    level = 'level1';
                                    break;
                                case 2:
                                    level = 'level2';
                                    break;
                                case 3:
                                    level = 'level3';
                                    break;
                            }
                            if (hasIndex >= 0) {
                                if (children[hasIndex][level]) {
                                    children[hasIndex][level] += t.value + ';'
                                } else {
                                    children[hasIndex][level] = t.value + ';'
                                }
                            } else {
                                let childrenItem = {
                                    key: key++,
                                    startTime: t.startTime + '时',
                                    endTime: t.endTime + '时',
                                    action: false,
                                }
                                childrenItem[level] = t.value + ';'
                                children.push(childrenItem)
                            }
                        }
                        dataSource.push({
                            key: key++,
                            ...a,
                            action: true,
                            children
                        })
                    }
                }
            }
        }
        return dataSource;
    }

    render() {
        const { factors, aggConfigList, params, aggThresholdList, user, isRequesting } = this.props;
        const { curFactorId } = this.state;
        const dataSource = aggThresholdList ? this.formatData(aggThresholdList) : []

        return (
            <ChangeThresholdTable
                user={user}
                factors={factors}
                structId={params.id}
                factorId={curFactorId}
                dataSource={dataSource}
                isRequesting={isRequesting}
                aggConfigList={aggConfigList}
                aggThresholdList={aggThresholdList}
                onSave={this.handleSave}
                onDelete={this.handleDelete}
                onFactorChange={this.handleFactorChange}
            />
        )
    }
}

function mapStateToProps(state) {
    const { factors, auth, aggreateList, thresholdAgg } = state;

    return {
        isRequesting: thresholdAgg.isRequesting,
        user: auth.user,
        aggConfigList: aggreateList.data,
        factors: factors.data,
        aggThresholdList: thresholdAgg.data
    }
}

export default connect(mapStateToProps)(ChangeThread);
