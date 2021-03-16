import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDataflow } from '../actions/wholeview';
import moment from 'moment';
import G2 from 'g2';

let chart;
class DataFlow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weekOrmonth: 'week',
            data: [],
            unit: ''
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { dataflow } = nextProps;
        if (dataflow) {
            let data = []
            let max = 0;
            dataflow.map(s => {
                s.volume > max ? max = s.volume : ''
                data.push({ time: moment(s.time).format('YYYY-MM-DD'), number: s.volume });
            })

            let unit = '条';

            chart.destroy()

            chart = new G2.Chart({
                id: 'c1',
                forceFit: true,
                height: 270
            });

            chart.source(data, {
                time: {
                    alias: '时间',
                    type: 'time',
                    tickCount: 0.00,
                    nice: false
                },
                number: {
                    alias: `数据流量(${unit})`,
                },
            });

            let view = chart.createView();
            view.source(data);
            view.tooltip(false);
            chart.legend(false)

            view.area().position('time*number').color('#D5F0FD').shape('area');
            chart.line().position('time*number').shape('line').size(2);
            chart.render();
            chart.changeData(data);
        }
    }

    handleWeek = () => {
        const { dispatch, user } = this.props;
        dispatch(getDataflow(user.orgId, 'THIS_WEEK'))
        this.setState({ weekOrmonth: 'week' })
    }
    handleMouth = () => {
        const { dispatch, user } = this.props;
        dispatch(getDataflow(user.orgId, 'THIS_MONTH'))
        this.setState({ weekOrmonth: 'month' })
    }

    componentDidMount() {
        const { dispatch, user } = this.props;
        //var data = [{ time: '2017-10-12', number: 12 }, { time: '2017-10-13', number: 23 }, { time: '2017-10-14', number: 9 }, { time: '2017-10-15', number: 7 }, { time: '2017-10-16', number: 12 }, { time: '2017-10-17', number: 23 }, { time: '2017-10-18', number: 9 }];
        dispatch(getDataflow(user.orgId, 'THIS_WEEK'))
        const { data } = this.state;

        chart = new G2.Chart({
            id: 'c1',
            forceFit: true,
            height: 270
        });

        chart.source(data, {
            time: {
                alias: '时间',
                type: 'time',
                tickCount: 0.00,
                nice: false
            },
            number: {
                alias: '数据流量(B)',
            },
        });

        let view = chart.createView();
        view.source(data);
        view.tooltip(false);
        chart.legend(false)
        view.area().position('time*number').color('#D5F0FD').shape('area');
        chart.line().position('time*number').shape('line').size(2);
        chart.render();
        chart.changeData(data);
    }

    render() {
        const { weekOrmonth } = this.state
        return (
            <div style={{ height: '300px', position: 'relative' }} id='dataflow'>
                <div style={{ textAlign: 'right', paddingRight: 50 }}>
                    <a style={{
                        marginRight: 10, color: `${weekOrmonth == "week" ? "#A3A3A3" : "#1E92E9"}`
                    }} onClick={this.handleWeek}>本周</a>
                    <a style={{
                        marginRight: 10, color: `${weekOrmonth == "month" ? "#A3A3A3" : "#1E92E9"}`
                    }} onClick={this.handleMouth}>本月</a>
                </div>
                <div style={{ width: '100%', height: '300px' }} id="c1"></div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { getDataflowRslt, auth } = state;
    return {
        dataflow: getDataflowRslt.data || [],
        user: auth.user,
    };
}

export default connect(mapStateToProps)(DataFlow);
