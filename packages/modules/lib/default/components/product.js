import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDevices } from '../actions/wholeview';
import createG2 from 'g2-react';
import G2 from 'g2';

class ProductCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            forceFit: true,
            width: 500,
            height: 270,
            plotCfg: {
                margin: [20, 130, 80]
            },
        }
    }

    componentDidUpdate() {

    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const devices = nextProps.devices;
        if (devices) {
            let hasData = false;

            const data = [
                { name: '上周总数', data: [] },
                { name: '上月总数', data: [] },
                { name: '本周总数', data: [] },
                { name: '本月总数', data: [] }
            ];
            var months = [];
            devices.map(s => {
                s.stats.length > 0 ? hasData = true : '';
                s.stats.map(k => {
                    months.push(k.deviceType)
                })
                if (s.period == 'LAST_WEEK') {
                    s.stats.map(k => {
                        data[0].data.push(k.total)
                    })
                }
                if (s.period == 'LAST_MONTH') {
                    s.stats.map(k => {
                        data[1].data.push(k.total)
                    })
                }
                if (s.period == 'THIS_WEEK') {
                    s.stats.map(k => {
                        data[2].data.push(k.total)
                    })
                }
                if (s.period == 'THIS_MONTH') {
                    s.stats.map(k => {
                        data[3].data.push(k.total)
                    })
                }

            })
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var datas = item.data;

                for (var j = 0; j < datas.length; j++) {
                    item[months[j]] = datas[j];
                }
                data[i] = item;
            }
            var Frame = G2.Frame;
            var frame = new Frame(data);
            frame = Frame.combinColumns(frame, months, '数量', '类型', 'name');
            hasData ? this.setState({ data: frame }) : this.setState({ data: [] })
        }

    }

    componentDidMount() {
        const { dispatch, user } = this.props;
        dispatch(getDevices(user.orgId))
    }

    render() {
        const { data, width, height, plotCfg, forceFit } = this.state;

        const Chart = createG2(chart => {
            chart.col('name', { alias: '时间' });
            chart.intervalDodge().position('类型*数量').color('name');
            chart.render();
        });

        return (
            <div style={{ height: '280px', position: 'relative', padding: '30px' }} id='ProductCard-content' >
                <Chart
                    data={data}
                    width={width}
                    height={height}
                    plotCfg={plotCfg}
                    forceFit={forceFit}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { deviceData, auth } = state;
    return {
        devices: deviceData.data || [],
        user: auth.user,
    };
}

export default connect(mapStateToProps)(ProductCard);