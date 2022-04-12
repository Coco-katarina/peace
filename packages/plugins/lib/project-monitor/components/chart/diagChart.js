/**
 * Created by zmh on 2017/7/6.
 */
'use strict';
import React, { Component } from 'react';
// import createG2 from 'g2-react';

class DiagChart extends Component {
    constructor(props) {
        super(props);
        // const Chart = createG2(chart => {
        //     chart.source(props.data, {
        //         time: {
        //             range: [0, 1],
        //             alias: '时间',
        //             type: 'time',
        //             mask: 'yyyy-mm-dd HH:MM:ss'
        //         }
        //     });
        //     chart.axis('time', {
        //         title: null,
        //         mask: 'yyyy-mm-dd HH:MM:ss'
        //     });
        //     chart.axis('value', {
        //         title: null
        //     });
        //     chart.legend({
        //         title: null,
        //         position: props.options && props.options.legend ? props.options.legend.position : 'bottom', // 设置图例的显示位置
        //     });
        //     chart.on('tooltipchange', function (ev) {
        //         var item = ev.items[0]; // 获取tooltip要显示的内容
        //         item.title = item.title;
        //         for (let i = 0; i < ev.items.length; i++) {
        //             ev.items[i].value = ev.items[i].value + (props.options.showPercent ? '%' : '');
        //         }
        //     })

        //     chart.line().position('time*value').color('name').shape('line').size(2);
        //     chart.guide().text(['min', 'max'], props.options.yAlias);
        //     chart.render();
        // });

        // this.Chart = Chart;
    }

    render() {
        const { data, width, height, options, key } = this.props;

        let margin = options.margin || [20, 60, 60, 60];

        return (
            <div style={{ position: 'relative', paddingTop: 20, marginBottom: 24 }}>
                <div>
                    {/* <this.Chart data={data} width={width} height={height || 300}
                        plotCfg={{ margin: margin }} forceFit={true} ref="myChart" options={options} id={`chart-diag-${key || 1}`} /> */}
                </div>
            </div>
        );
    }
}
export default DiagChart;