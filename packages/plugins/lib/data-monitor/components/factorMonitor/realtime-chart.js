import React, { Component } from "react";
import LineChart from './line-chart'
import moment from 'moment'
class RealTimeChart extends Component {
    // constructor(props) {

    // }
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (nextProps.data && (JSON.stringify(nextProps.data) != JSON.stringify(this.props.data))) {
    //         return true;
    //     }
    // }
    renderCharts = () => {
        const { data, selectSensorId } = this.props

        if (data && data.stations && selectSensorId && data.stations.find(s => s.id == selectSensorId)) {
            let dataSource = data.stations.find(s => s.id == selectSensorId).data
            if (dataSource.length > 0) {
                return Object.keys(data.items).map(key => {
                    const arr = {
                        xAxisData: dataSource.map(s => moment(s.time).format('MM-DD HH:mm')),
                        seriesData: [
                            { name: data.items[key].name, data: dataSource.map(s => s[key]) },
                        ],
                    }
                    return <div style={{ marginTop: 20 }}>
                        <LineChart
                            xAxisData={arr.xAxisData}
                            seriesData={arr.seriesData}
                            height={200}
                            DOMID={'realtime-chart-' + key}
                            unit={data.items[key].unit}
                            smooth={true}
                            grids={['7%', '1%', '3%', '7%']}
                            type={'value'}
                            overflow='visible'
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

export default RealTimeChart;