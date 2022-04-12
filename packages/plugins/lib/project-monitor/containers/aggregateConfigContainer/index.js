/**Created by zhouxin on 2018/10/8. */
'use strict'

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Spin, Card } from 'antd';
import Aggregate from '../../components/aggregate/aggregate';
import { getFactors } from '../../../evaluation-analysis/actions/common';
// import { getStructures } from '../../actions/structure';
import {
    addAggConfig, AGGCONFIG_ADD_SUCCESS,
    delAggConfig, AGGCONFIG_DEL_SUCCESS,
    modifyAggConfig, AGGCONFIG_MODIFY_SUCCESS,
    execAgg
} from '../../actions/agg-config';
import { getAggConfig } from '../../actions/threshold/index'
class AggregateContainers extends React.Component {
    constructor(props) {
        super(props);
        const { match: { params } } = props;
        this.state = {
            structId: params?.id
        }
    }

    componentDidMount() {
        const { dispatch, match: { params } } = this.props;
        if (params?.id) {
            this.getAggConfigs(params?.id);
            dispatch(getFactors(params?.id))
        }
        // dispatch(getStructures(user.orgId))
        //     .then(action => {
        //         if (action.payload.data && action.payload.data.length > 0) {
        //             this.setState({ structId: action.payload.data[0].id });
        //             this.getAggConfigs(action.payload.data[0].id);
        //             return dispatch(getFactors(action.payload.data[0].id))
        //         } else {
        //             return Promise.resolve();
        //         }
        //     })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { dispatch, match: { params } } = this.props;
        if (params.id != nextProps.match.params.id) {
            this.getAggConfigs(params?.id);
            dispatch(getFactors(params?.id))
        }
    }

    getAggConfigs(structNum) {
        const { dispatch } = this.props;
        dispatch(getAggConfig(structNum || this.state.structId));
    }

    handleSave = (isEdit, dataToSave, id) => {
        const { dispatch } = this.props;
        if (isEdit) {
            dispatch(modifyAggConfig(id, dataToSave)).then(action => {
                let { type, payload } = action;
                if (type == AGGCONFIG_MODIFY_SUCCESS) {
                    message.success('修改聚集配置成功');
                    this.getAggConfigs();
                } else {
                    message.error(payload.error);
                }
            })
        } else {
            dispatch(addAggConfig(dataToSave)).then(action => {
                const { type, payload } = action;
                if (type === AGGCONFIG_ADD_SUCCESS) {
                    message.success('新增聚集配置成功');
                    this.getAggConfigs();
                } else {
                    message.error(payload.error);
                }
            })
        }
    }

    handleDelete = (id) => {
        const { dispatch } = this.props;
        dispatch(delAggConfig(id)).then(action => {
            const { type, payload } = action;
            if (type === AGGCONFIG_DEL_SUCCESS) {
                message.success('聚集配置删除成功');
                this.getAggConfigs();
            } else {
                message.error(payload.error);
            }
        });
    }

    execAgg = (params) => {
        this.props.dispatch(execAgg(params));
    }

    onStructChange = value => {//结构物改变
        this.setState({
            structId: value
        })
        this.props.dispatch(getFactors(value))
            .then(() => this.props.dispatch(getAggConfig(value)));
    }

    render() {
        const { factors, aggConfigLists, isRequesting, structures, user } = this.props;
        return (
            <Spin spinning={isRequesting}>
                <Card>
                    <Aggregate
                        factors={factors}
                        structures={structures}
                        structId={this.state.structId}
                        onSave={this.handleSave}
                        onDelete={this.handleDelete}
                        aggConfigList={aggConfigLists}
                        isRequesting={isRequesting}
                        onStructChange={this.onStructChange}
                        user={user}
                        execAgg={this.execAgg}
                    />
                </Card>
            </Spin>
        )
    }
}

function mapStateToProps(state) {
    const { auth, thresholdFactors, aggreateList } = state;
    let isRequesting = false;

    return {
        user: auth.user,
        structures: [],
        factors: thresholdFactors.data || [],
        aggConfigLists: aggreateList.data || [],
        isRequesting: isRequesting
    }
}

export default connect(mapStateToProps)(AggregateContainers);