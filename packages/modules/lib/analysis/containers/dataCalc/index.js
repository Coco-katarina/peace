'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getStations } from '../../actions/structure';//获取测点
import StructSelect from './structSelect';
import Recalc from './recalc';
import AbnFilter from './abnFilter';
import AbnRecognize from './abnRecognize';

class DataCalc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBtn: 'reCalc',
            calcMethod: 'interrupt',
            startTime: moment().add(-1, 'days').format('YYYY-MM-DD HH:mm:ss'),
            endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        };
    }
    // componentDidMount() {
    //     const { dispatch } = this.props;
    //     let current = 'reCalc';
    //     this.props.dispatch(initPageHeaderDetails(
    //         <StructSelect
    //             dispatch={dispatch}
    //             activeKey={current}
    //             radioChange={this.radioChange}
    //             structChange={this.structChange}
    //             factorCh={this.factorCh}
    //             setfactorAndStations={this.setfactorAndStations}
    //             changeMethod={this.changeMethod}
    //             setTime={this.timeChange}
    //             reFaChange={this.reFaChange}
    //         />
    //     ));
    // }
    // componentWillUnmount() {
    //     this.props.dispatch(initPageHeaderDetails(null));
    // }
    timeChange = (s, e) => {
        this.setState({ startTime: s, endTime: e });
    }
    radioChange = (key) => {
        this.setState({
            currentBtn: key
        })

    }
    factorCh = (value) => {
        this.setState({
            factorId: value
        })
    }
    changeMethod = (value) => {
        this.setState({
            calcMethod: value
        })
    }
    setfactorAndStations = (structId, factorId, itemId) => {
        this.setState({
            structId: structId,
            factorId: factorId,//异常数据识别用
            itemId: itemId,//异常数据识别用

            reCalcFactorId: factorId,//重计算用

            filterFactorId: factorId,//异常过滤用
            filterItemId: itemId,//异常过滤用
        })
    }
    reFaChange = (value) => {
        this.setState({
            reCalcFactorId: value,//重计算和异常过滤筛选用
        })
    }
    filFactorChange = (value) => {
        this.setState({
            filterFactorId: value[0],
            filterItemId: value[1],
        }, () => {
            //获取测点
            this.props.dispatch(getStations(this.state.structId, this.state.filterFactorId));
        })
    }

    render() {
        const { dispatch } = this.props;
        const SubContent = {
            'reCalc': <Recalc structId={this.state.structId} factorId={this.state.reCalcFactorId} startTime={this.state.startTime} endTime={this.state.endTime} />,
            'abnFilter': <AbnFilter
                structId={this.state.structId}
                factorId={this.state.filterFactorId}
                itemId={this.state.filterItemId}
                filFactorChange={this.filFactorChange}
                cfgFilterFactorId={this.state.reCalcFactorId}//与重计算公用,筛选用
            />,
            'abnRecognize': <AbnRecognize
                structId={this.state.structId}
                factorId={this.state.factorId}
                itemId={this.state.itemId}
                //factorChange={this.factorChange}
                calcMethod={this.state.calcMethod}
            />,
        };
        return (<div>
            <StructSelect
                dispatch={dispatch}
                activeKey={this.state.currentBtn}
                radioChange={this.radioChange}
                structChange={this.structChange}
                factorCh={this.factorCh}
                setfactorAndStations={this.setfactorAndStations}
                changeMethod={this.changeMethod}
                setTime={this.timeChange}
                reFaChange={this.reFaChange}
            />
            {SubContent[this.state.currentBtn]}
        </div>
        );
    }
}

// function mapStateToProps(state) {

// }

export default connect()(DataCalc);
