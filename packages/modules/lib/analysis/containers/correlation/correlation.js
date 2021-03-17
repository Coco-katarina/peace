import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import moment from 'moment';
import { Menu, Data, Coefficient } from '../../components/correlation';

const { Content } = Layout;

class Correlation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            factors: null,
            factorId: null,
            correlationFactorId: null,
            flag: false,
            correlationData: null,
            currStartTime: moment().add(-1, 'days').format('YYYY-MM-DD HH:mm:ss'),
            // factorData: null,
            // correlationFactorData: null,
            stationIds: [],
            correlationStationIds: [],
            stationData: null,
            correlationStationData: null,
            independentVariableStaionId: null,
            dependentVariableStaionId: null,
            factorItems: [],
            correlationFactorItems: [],
        };
    }
    // componentDidMount() {
    //     const { dispatch, initPageHeaderDetails } = this.props;
    //     dispatch(initPageHeaderDetails(<Menu test={this.test} />));
    // }
    // componentWillUnmount() {
    //     const { dispatch, initPageHeaderDetails } = this.props;
    //     dispatch(initPageHeaderDetails(null));
    // }

    onIndependentVariableStaionChange = value => {
        this.setState({ independentVariableStaionId: value }, function () {
        });
    }

    onDependentVariableStaionChange = value => {
        this.setState({ dependentVariableStaionId: value }, function () {
        });
    }
    test = (factorId, corFactorId, flag, indVarStationId, dVarStationId,
        stationData, corStationData, factorItems, corFactorItems, stationIds, corStationIds, startT, endT) => {
        this.setState({
            factorId: factorId,
            correlationFactorId: corFactorId,
            flag: flag,
            independentVariableStaionId: indVarStationId,
            dependentVariableStaionId: dVarStationId,
            stationData: stationData,
            correlationStationData: corStationData,
            factorItems: factorItems,
            correlationFactorItems: corFactorItems,
            stationIds: stationIds,
            correlationStationIds: corStationIds,
            currStartTime: startT
        })

    }
    render() {
        const { correlationData } = this.props;
        return (
            <div>
                <Menu test={this.test} />
                <Content style={{ padding: 15 }}>
                    <Data correlationData={correlationData || {}} factors={this.props.factors}
                        factorId={this.state.factorId} correlationFactorId={this.state.correlationFactorId}
                        flag={this.state.flag}
                    />
                    <Coefficient
                        correlationData={correlationData || {}}
                        currStartTime={this.state.currStartTime}
                        independentVariableStaionId={this.state.independentVariableStaionId}
                        dependentVariableStaionId={this.state.dependentVariableStaionId}
                        independentVariableStaionData={this.state.stationData}
                        dependentVariableStaionData={this.state.correlationStationData}
                        independentVariableFactorItems={this.state.factorItems}
                        dependentVariableFactorItems={this.state.correlationFactorItems}
                        independentVariableStationIds={this.state.stationIds}
                        dependentVariableStationIds={this.state.correlationStationIds}
                        onIndependentVariableStaionChange={this.onIndependentVariableStaionChange}
                        onDependentVariableStaionChange={this.onDependentVariableStaionChange}
                    />
                </Content>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { auth, thresholdFactors, correlationData } = state;
    // const { actions } = global;

    return {
        // initPageHeaderDetails: actions && actions.layout && actions.layout.initPageHeaderDetails,
        user: auth.user,
        factors: thresholdFactors.data,
        correlationData: correlationData.data
    }
}

export default connect(mapStateToProps)(Correlation);