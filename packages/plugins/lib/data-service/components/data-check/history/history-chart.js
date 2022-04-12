import React, { Component } from "react";
import moment from 'moment'
import { Charts } from '@peace/components';
const { TimeValueLineChart } = Charts;

class HistoryChart extends Component {
    // constructor(props) {

    // }
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (nextProps.data && (JSON.stringify(nextProps.data) != JSON.stringify(this.props.data))) {
    //         return true;
    //     }
    // }
    renderCharts = () => {
        const { data } = this.props

        if (data && data.length > 0) {
            let dataSource = data[0].stations
            if (dataSource.length > 0 && dataSource.find(x => x.data.length > 0)) {
                return Object.keys(data[0].items).map(key => {
                    const arr = []
                    dataSource.map(s => s.data.map(x => {
                        arr.push({
                            name: s.name,
                            value: x.values[key],
                            time: moment(x.time).format('YYYY-MM-DD HH:mm:ss')
                        })

                    }))
                    return <div style={{ marginTop: 20 }} key={key}>
                        <TimeValueLineChart
                            key={`timeValueLineChart-${key}`}
                            data={arr}
                            height={300}
                            xAxis={'time'}
                            configs={{ slider: { start: 0, end: 100 }, unit: data[0].items[key].unit }}
                        />
                    </div>
                })
            } else {
                return <div style={{ textAlign: 'center', color: '#b9c8d7', fontSize: 24, lineHeight: '150px' }}>暂无数据</div>
            }
        } else {
            return <div style={{ textAlign: 'center', color: '#b9c8d7', fontSize: 24, lineHeight: '150px' }}>暂无数据</div>
        }

    }
    render() {

        return (
            <div style={{ minHeight: 374, border: '1px solid rgba(47, 83, 234, 0.08)', marginTop: 20, padding: '8px 24px 20px 24px' }}>
                {this.renderCharts()}
            </div>
        )
    }
}

export default HistoryChart;

