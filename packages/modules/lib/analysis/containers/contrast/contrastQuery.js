import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu } from '../../components/contrast';
import { getStructures, getFactors, getStations } from '../../actions/structure'
import { getStationsData, moreTimeStationsData } from '../../actions/contrast/stationsData'

class ContrastQuery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            structId: null,//结构物id
            factorId: null,//监测因素id
            defaultRadioValue: 0,//检测因素中iteams的默认值  即第一个 随检测因素的改变而改变
            itemsId: null,//检测项id
            itemsName: '',//测点名称
            fieldName: '',
        };
    }
    componentDidMount() {
        const { dispatch, user } = this.props;
        const _this = this;
        dispatch(getStructures(user.orgId))//获取结构物
            .then(action => {
                if (action.payload.data.length > 0) {
                    _this.setState({ structId: action.payload.data[0].id });
                    return dispatch(getFactors(action.payload.data[0].id));
                }
            }).then(action => {
                if (action && action.payload.data.length > 0) {
                    let factors = action.payload.data.filter(f => f.checked);
                    _this.setState({ factorId: factors[0].id }, () => {
                        _this.getContextData();
                    });
                }
            });
    }
    componentWillUnmount() { this.setState = (state, callback) => { return } }

    getContextData = () => {
        const { dispatch, factors } = this.props;
        const { structId, factorId } = this.state;
        this.setState({
            defaultRadioValue: factors.filter(f => f.checked).filter(s => s.id == factorId)[0].items[0].id,
            itemsName: factors.filter(s => s.id == factorId)[0].items[0].name,
            fieldName: factors.filter(s => s.id == factorId)[0].items[0].field_name
        })
        dispatch(getStations(structId, factorId));//获取结构物下测点
    }

    handleStructChange = (value) => {
        this.props.dispatch(getFactors(value))//更新选中结构物对应的监测因素
            .then(action => {
                this.setState({ structId: value });
                if (action && action.payload.data.length > 0) {
                    let factors = action.payload.data.filter(f => f.checked);
                    this.setState({ factorId: factors[0].id }, () => {
                        this.getContextData();
                    });
                }
            });
    }
    handleFactorChange = (factorId) => {//检测因素改变
        const { factors, dispatch } = this.props;
        const { structId } = this.state;
        if (factorId.length != 0) {
            this.setState({ factorId: factorId[0] }, function () {
                dispatch(getStations(structId, factorId[0]));
            });
            let itemsName = factors.filter(s => s.id == factorId[0])[0].items.filter(f => f.id == factorId[1])[0].name;
            let fieldName = factors.filter(s => s.id == factorId[0])[0].items.filter(f => f.id == factorId[1])[0].field_name;
            this.setState({
                itemsName: itemsName,
                fieldName: fieldName,
                defaultRadioValue: factorId[1]
            })
        } else {
            this.setState({ factorId: null }, function () {
                dispatch(getStations(structId, 0));
            });
            this.setState({
                itemsName: '',
                fieldName: '',
                defaultRadioValue: null
            });
        }
    }
    handleQuery = (timeDateStrings, stationsId, structId, mult) => {
        if (mult) {
            this.props.dispatch(getStationsData(timeDateStrings, stationsId.join(','), structId));
        } else {
            this.props.dispatch(moreTimeStationsData(timeDateStrings, stationsId.join(','), structId));
        }
        this.props.queryForCharts(structId, this.state.itemsName, this.state.fieldName);
    }
    render() {
        const { structures, factors, stations } = this.props;
        const { structId, factorId, defaultRadioValue } = this.state;

        return (
            <Menu
                structId={structId}
                factorId={factorId}
                defaultRadioValue={defaultRadioValue}
                structures={structures}
                stations={stations}
                factors={factors}
                onQuery={this.handleQuery}
                onStructChange={this.handleStructChange}
                onFactorChange={this.handleFactorChange}
            />
        )
    }
}

function mapStateToProps(state) {
    const { thresholdFactors, thresholdStructures, thresholdStations, auth } = state;

    return {
        factors: thresholdFactors.data ? thresholdFactors.data.filter(s => s.proto != 2002 && s.proto != 5001 && s.proto != 5002) : [],//监测因素
        structures: thresholdStructures.data,//结构物
        stations: thresholdStations.data,//测点
        user: auth.user//用户信息
    }
}

export default connect(mapStateToProps)(ContrastQuery);