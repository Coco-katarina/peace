
import React, { Component } from "react";
import moment from 'moment'
import { Charts } from '@peace/components';
const { TimeValueLineChart, WindRoseChart } = Charts;
import { Row, Col } from 'antd'
import { WindLevels } from '$utils';
class WindChart extends Component {
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

    renderWindRoseChart = () => {
        const { windroseData } = this.props;

        if (windroseData && windroseData.length > 0) {

            let legendArr = WindLevels
            const dataSource = [];
            legendArr.map((s, index) => {
                let arr = []
                windroseData.map(x => {
                    x.level == s ? arr.push(x.value) : ''
                })
                dataSource.push({
                    type: 'bar',
                    data: arr,
                    coordinateSystem: 'polar',
                    name: s,
                    stack: 'a',
                    itemStyle: {

                    }
                })
            })
            return <WindRoseChart
                data={dataSource}
                height={400}
            />
        }

    }

    render() {

        return (
            <div style={{ minHeight: 374, marginTop: 20, padding: '8px 24px 20px 24px' }}>

                <Row>
                    <Col span={15} style={{ paddingRight: 20 }}>
                        <div style={{ border: '1px solid rgba(47, 83, 234, 0.08)', minHeight: 350 }}>
                            {this.renderCharts()}
                        </div>
                    </Col>

                    <Col span={9} style={{ border: '1px solid rgba(47, 83, 234, 0.08)', minHeight: 350, paddingTop: 20 }}>
                        <div>
                            <span style={{ paddingLeft: 20 }}>风玫瑰图</span>
                        </div>
                        <div className="data-chart-container">
                            {this.renderWindRoseChart()}
                        </div>
                    </Col>

                </Row>
            </div>
        )
    }
}

export default WindChart;


