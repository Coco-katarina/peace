import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjects } from '../actions/wholeview';
import createG2 from 'g2-react';
import G2 from 'g2';

class ProjectCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: '上月', value: 0, washaway: 0 },
                { name: '本月', value: 0, washaway: 0 },
                { name: '上周', value: 0, washaway: 0 },
                { name: '本周', value: 0, washaway: 0 }
            ],
            forceFit: true,
            width: 500,
            height: 300,
            plotCfg: {
                margin: [40, 80, 80, 80],
            }
        }
    }

    componentDidMount() {
        this.props.dispatch(getProjects(this.props.user.orgId)).then(res => {
            let projects = []
            res.payload.data.map(s => {
                if (s.period == 'LAST_MONTH') {
                    projects.push({ name: '上月', value: s.total, washaway: 0 })
                } else if (s.period == 'THIS_MONTH') {
                    projects.push({ name: '本月', value: s.total, washaway: 0 })
                } else if (s.period == 'LAST_WEEK') {
                    projects.push({ name: '上周', value: s.total, washaway: 0 })
                } else if (s.period == 'THIS_WEEK') {
                    projects.push({ name: '本周', value: s.total, washaway: 0 })
                }
            })
            this.setState({ data: projects })
        })
    }

    render() {
        const colorSet = {
            上月: '#46BEF2',
            本月: '#46BEF2',
            上周: '#46BEF2',
            本周: '#46BEF2',
        };
        const data = this.state.data;
        const Shape = G2.Shape;
        Shape.registShape('interval', 'textInterval', {
            drawShape(cfg, group) {
                const points = this.parsePoints(cfg.points); // 将0-1空间的坐标转换为画布坐标
                const value = cfg.origin._origin.value;
                group.addShape('text', {
                    attrs: {
                        text: value,
                        textAlign: 'center',
                        x: points[1].x + cfg.size / 2,
                        y: points[1].y,
                        fontFamily: 'PingFang SC',
                        fontSize: 12,
                        fill: '#BBB',
                    },
                });
                const polygon = group.addShape('polygon', {
                    attrs: {
                        points: points.map(point => [point.x, point.y]),
                        fill: cfg.color,
                    },
                });
                return polygon;
            },
        });
        Shape.registShape('interval', 'fallFlag', {
            getShapePoints({ x, y, y0, size }) {
                return [
                    { x: x + size, y: y0 + size },
                    { x, y },
                ];
            },
            drawShape(cfg, group) {
                if (cfg.origin.index === data.length - 1) {
                    return;
                }
                const points = this.parsePoints(cfg.points); // 将0-1空间的坐标转换为画布坐标
                const p1 = points[0];
                const width = 9;
                // const washaway = cfg.origin._origin.washaway;
                group.addShape('text', {
                    attrs: {
                        text: '',
                        x: p1.x - width / 2 - 14,
                        y: p1.y - 14,
                        fontFamily: 'PingFang SC',
                        fontSize: 12,
                        fill: '#BBB',
                    },
                });
                const polygon = group.addShape('image', {
                    attrs: {
                        x: p1.x - 16,
                        y: p1.y - 16,
                        img: '',
                        width: 32,
                        height: 32,
                    },
                });
                return polygon; // 将自定义Shape返回
            },
        });

        const Chart = createG2(chart => {
            chart.cols({
                value: {
                    alias: '个数',
                }
            });
            chart.legend(false)
            chart.axis('name', {
                title: null,
            });
            chart.tooltip(true, {
                map: { // 用于指定 tooltip 内显示内容同原始数据字段的映射关系复制代码
                    name: '总数', // 为数据字段名时则显示该字段名对应的数值，常量则显示常量
                },
            });
            chart.interval()
                .shape('textInterval')
                .position('name*value')
                .color('name', value => colorSet[value])
                .size(30);
            chart.render();
        });

        return (
            <div style={{ height: '280px', position: 'relative', paddingBottom: '30px' }} id='ProjectCard-content'>
                <Chart
                    data={this.state.data}
                    width={this.state.width}
                    height={this.state.height}
                    plotCfg={this.state.plotCfg}
                    forceFit={this.state.forceFit} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { auth, getProjectsRslt } = state;
    return {
        projects: getProjectsRslt.data || [],
        user: auth.user,
    }
}

export default connect(mapStateToProps)(ProjectCard);