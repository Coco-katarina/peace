import React, { Component } from 'react';
import createG2 from 'g2-react';
import G2 from 'g2';
import './theme';

/**
 * props:
 * 
 *      data: [{
 *          factorItem: 监测项,
 *          value: y轴数值,
 *          time: x轴时间值
 *      }],
 *      height: 图表高度
 */

const plotCfg = { margin: [16, 0, 0, 40] };

class TimeValueLineChart extends Component {
    constructor(props) {
        super(props);

        const Chart = createG2((chart, configs) => {
            chart.source(props.data, {
                'time': {
                    range: [0, 1],
                    type: 'time',
                    alias: '时间',
                    mask: 'HH:MM:ss'
                }
            });
            chart.axis('time', {
                title: null,
                labels: null
            });
            chart.axis('value', {
                title: null,
            });
            chart.legend(false);
            chart.facet([, 'factorItem'], {
                margin: 16
            });

            chart.line().position('time*value').color('factorItem').shape('line');
            chart.render();
        });

        this.Chart = Chart;
    }

    render() {
        const { data, height, configs, margin } = this.props;

        return (
            <div>
                <this.Chart data={data} height={height || 160} forceFit={true}
                    plotCfg={margin == undefined ? plotCfg : margin} configs={configs} />
            </div>
        );
    }
}

export default TimeValueLineChart;