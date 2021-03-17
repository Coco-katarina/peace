'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Spin, Row } from 'antd';
import { getFactors } from '../../actions/structure';
import { getStructures } from '../../actions/structure';
import { getAggConfig, postAggConfig, putAggConfig, delAggConfig, execAgg } from '../../actions/aggregate'
import AggregateTable from '../../components/aggregate/aggregateTable';

class AggregateContainers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            structId: null,
            keywords: null,
            curpage: 1,
            offset: 0,
        }
    }

    componentDidMount() {
        const { dispatch, user } = this.props;
        dispatch(getStructures(user.orgId))
            .then(action => {
                if (action.payload.data && action.payload.data.length > 0) {
                    this.setState({ structId: action.payload.data[0].id });
                    this.getAggConfigs(action.payload.data[0].id);
                    return dispatch(getFactors(action.payload.data[0].id))
                } else {
                    return Promise.resolve();
                }
            })
    }
    getAggConfigs(structNum) {
        const { dispatch } = this.props;
        dispatch(getAggConfig(structNum || this.state.structId));
    }
    handleStructChange = value => {
        const { dispatch } = this.props;
        this.setState({ structId: value });
        dispatch(getFactors(value))
            .then(() => dispatch(getAggConfig(value)));
    }

    handlerSearchMembers = (values) => {
        this.setState({
            keywords: values.keywords,
            curpage: 1,
            offset: 0,
        }, () => {
            this.getAggConfigs(
                //     {
                //     keywords: values.keywords,
                //     curpage: 1,
                //     offset: 0,
                // }
            );
            /**todo
             * 搜索放开
             */
        })
    }
    handerTableChange = (limit, offset, current) => {
        const { keywords } = this.state;
        let obj = { limit, offset }
        if (keywords) {
            obj.keywords = keywords
        }
        this.setState({
            curpage: current,
            offset: offset,
        }, () => {
            this.getAggConfigs(obj);
            /**
             * todo 分页查询接口优化
             */
        })
    }
    handleExecAgg = (params) => {
        const { dispatch } = this.props
        dispatch(execAgg(params))
    }
    handleDelete = (id) => {
        const { dispatch } = this.props;
        dispatch(delAggConfig(id)).then(action => {
            const { success, error } = action;
            if (success) {
                this.getAggConfigs();
            } else {
                message.error(error);
            }
        });
    }
    handleSave = (isEdit, dataToSave, id) => {
        const { dispatch } = this.props;
        const { keywords } = this.state;
        /**tod
         * 搜索优化，this.getAggConfigs({keywords});
         */
        if (isEdit) {
            return dispatch(putAggConfig(id, dataToSave)).then(action => {
                const { success, error } = action;
                if (success) {
                    this.getAggConfigs();
                } else {
                    message.error(error);
                }
                return action
            })
        } else {
            return dispatch(postAggConfig(dataToSave)).then(action => {
                const { success, error } = action;
                if (success) {
                    this.getAggConfigs();
                } else {
                    message.error(error);
                }
                return action
            })
        }
    }

    render() {
        const { user, factors, structures, isRequesting, aggConfigLists } = this.props;
        const { structId } = this.state;

        return (
            <Spin spinning={isRequesting}>
                <Row>
                    <AggregateTable
                        user={user}
                        factors={factors}
                        structId={structId}
                        structures={structures}
                        isRequesting={isRequesting}
                        aggConfigList={aggConfigLists ? aggConfigLists.length > 0 ? aggConfigLists.map(item => item) : [] : []}
                        onStructChange={this.handleStructChange}
                        onSearchHander={this.handlerSearchMembers}
                        onTableChangeHander={this.handerTableChange}
                        onExecAgg={this.handleExecAgg}
                        onDelete={this.handleDelete}
                        onSave={this.handleSave}
                    />
                </Row>
            </Spin>
        )
    }
}

function mapStateToProps(state) {
    const { auth, thresholdStructures, thresholdFactors, aggreateList } = state;
    let isRequesting = thresholdStructures.isRequesting || thresholdFactors.isRequesting || aggreateList.isRequesting;

    return {
        user: auth.user,
        structures: thresholdStructures.data,
        factors: thresholdFactors.data,
        aggConfigLists: aggreateList.data,
        isRequesting: isRequesting
    }
}

export default connect(mapStateToProps)(AggregateContainers);