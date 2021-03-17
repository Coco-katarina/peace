import React, { Component } from 'react';
import createG2 from 'g2-react';
import G2, { Plugin } from 'g2';
import 'g2-plugin-slider';
import './theme';

class DeflectionChart extends Component {
    constructor(props) {
        super(props);

        this.sliderId = 'range' + Math.floor(Math.random() * 1000000000);
        const Chart = createG2((chart, configs) => {
            chart.source(props.data, {
                'location': {
                    alias: '位置',
                }
            });
            chart.axis('location', {
                title: null,
            });
            chart.axis('value', {
                title: null,
            });
            chart.legend({
                position: 'bottom', // 设置图例的显示位置
                spacingX: 20 // 图例项之间的水平间距
            });
            chart.line().position('location*value').color('name').shape('line').size(2);

            chart.render()
        });

        this.Chart = Chart;
    }

    render() {
        const { data, width, height, configs } = this.props;

        return (
            <div>
                <this.Chart data={data} width={width} height={height || 300} forceFit={true} ref="myChart" configs={configs} />
            </div>
        );
    }
}

export default DeflectionChart;