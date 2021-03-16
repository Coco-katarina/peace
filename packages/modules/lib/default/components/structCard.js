import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMapData, getStructList } from '../actions/wholeview';
import { Stat } from 'g2'
import G2 from 'g2';

let data = [];
let mapData = {};
let chart;
class StructCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        const { dispatch, user } = this.props;
        dispatch(getMapData()).then(res => {
            const mapDatas = res.payload.mapData;
            let structlist = [];
            dispatch(getStructList(user.orgId)).then(res => {
                if (res.success) {
                    res.payload.data.map(s => {
                        s.latitude != null && s.longitude != null ?
                            structlist.push({
                                "name": s.name,
                                "value": 6,
                                "long": s.longitude,
                                "lant": s.latitude
                            }) : ''
                    })

                    if (mapDatas.data) {
                        mapData = mapDatas.mapData;
                        data = structlist
                        let map = [];
                        const features = mapData.features;
                        for (let i = 0; i < features.length; i++) {
                            const name = features[i].properties.name;
                            map.push({
                                "name": name
                            });
                        }
                        chart = new G2.Chart({
                            id: 'chart',
                            width: 600,
                            height: 299,
                            plotCfg: {
                                margin: [10, 105]
                            }
                        });
                        chart.legend(false);
                        chart.coord('map', {
                            projection: 'albers',
                            basic: [110, 0, 25, 47], // 指定投影方法的基本参数，[λ0, φ0, φ1, φ2] 分别表示中央经度、坐标起始纬度、第一标准纬度、第二标准纬度
                            max: [16.573, -13.613], // 指定投影后最大的坐标点
                            min: [-27.187, -49.739] // 指定投影后最小的坐标点
                        });
                        chart.tooltip({
                            title: null
                        });
                        const bgView = chart.createView();
                        bgView.source(map);
                        bgView.tooltip(false);
                        bgView.axis(false);
                        bgView.polygon()
                            .position(Stat.map.region('name', mapData))
                            .color('name', function (val) {
                                if (val === 'China') {
                                    return '#C7C7C7';
                                } else {
                                    return '#F0F0F0';
                                }
                            })
                            .style({
                                stroke: '#fff',
                                lineWidth: 3
                            });


                        const pointView = chart.createView();
                        pointView.source(data);
                        pointView.point().position(Stat.map.location('long*lant'))
                            .size(6)
                            .color('#6A006F')
                            .tooltip('name')
                            .shape('circle')
                            .style({
                                shadowBlur: 10,
                                shadowColor: '#6A006F'
                            });
                        chart.render();
                    }
                }
            })

        })
    }


    render() {
        return (
            <div style={{ height: '300px', position: 'relative', width: '100%' }} id='Struct-content' className='Notice-content'>
                <div style={{ width: '100%', height: '300px', }} id="chart"></div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { auth } = state;
    return {
        user: auth.user,
    };
}

export default connect(mapStateToProps)(StructCard);