/**
 * Created by liu.xinyi
 * on 2016/7/20.
 */
'use strict';
import React, { Component, PropTypes } from 'react';
import { Row, Col, Switch } from 'antd';


const Red_Light = 'rgba(255, 0, 0, 0.1)';
const Orange_Light = 'rgba(255, 165, 0, 0.1)';
const Purple_Light = '#E6E6FA';
const Blue_Light = '#F0FFFF';

function pickColorWithThreshold(level) {
    switch (level) {
        case 1:
            return Red_Light;
        case 2:
            return Orange_Light;
        case 3:
            return Purple_Light;
        case 4:
            return Blue_Light;
        default:
            return '#c8c8c8';
    }
}

class PeriodThreshold extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         thresholdDisplay: false,
    //     }
    // }


    thresholdDisplayChange = (checked) => {
        const { onThresholdDisplayChange } = this.props;
        onThresholdDisplayChange && onThresholdDisplayChange(checked);
    }
    renderVertical = (thresholds, leftColSpan, rightColSpan, LevelHanzi) => {
        let rows = []
        for (let level = 1; level <= 3; level++) {
            // const tv = JSON.parse(thresholds[level].value);
            // let threshold = Array.isArray(tv) && tv.length > 0 ? tv : null;
            const threshold = thresholds.filter(item => item.level == level);

            rows.push(
                <Row key={level}>
                    <Col span={leftColSpan || 6}>
                        <span className='home-monitor-add-on-col-align-right'>{`${LevelHanzi[level]}级阈值：`}</span>
                    </Col>
                    <Col span={rightColSpan || 18}>
                        {
                            threshold ?
                                <div style={{ backgroundColor: pickColorWithThreshold(level) }}>
                                    {
                                        threshold.map((t, index) => {
                                            return (
                                                <div key={index} style={{ padding: 5 }}>
                                                    {t.value}
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                                : <div>无</div>
                        }
                    </Col>
                </Row>
            );
        }
        return rows;
    }

    renderHorizonta = (thresholds, LevelHanzi, stationName) => {
        let rows = []
        rows.push(<div key={'stationName'} style={{ margin: '0 16px', padding: '5px' }}><span>测点名称： {stationName}</span></div>)
        for (let level = 1; level <= 3; level++) {
            const threshold = thresholds.filter(item => item.level == level);

            rows.push(
                <div key={`${level}`} style={{ marginRight: 16, display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'inline-block' }}>
                        <span className='home-monitor-add-on-col-align-right'>{`${LevelHanzi[level]}级阈值：`}</span>
                    </div>
                    <div style={{ display: 'inline-block' }}>
                        {
                            threshold ?
                                <div style={{ backgroundColor: pickColorWithThreshold(level) }}>
                                    {
                                        threshold.map((t, index) => {
                                            return (
                                                <div key={index} style={{ padding: 5 }}>
                                                    {t.value}
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                                : <div>无</div>
                        }
                    </div>
                </div>
            );
        }
        //有阈值
        if(rows.length > 1){
            rows.push(<div key={'thresholdDisplay'} style={{ display: 'inline-block', margin: '0 16px', padding: '5px' }}>
                <Switch checkedChildren="显示阈值" unCheckedChildren="隐藏阈值" onChange={this.thresholdDisplayChange} checked={this.props.thresholdDisplay || false} />
            </div>)
        }
        return rows;
    }


    render() {
        const { thresholds, leftColSpan, rightColSpan, direction, stationName } = this.props;
        if (!thresholds || (!stationName && direction && direction == 'horizontal')) return <div />;

        let LevelHanzi = { 1: '一', 2: '二', 3: '三' };
        let rows = [];
        if (direction && direction == 'vertical')
            return <div>{this.renderVertical(thresholds, leftColSpan, rightColSpan, LevelHanzi)}</div>;
        if (direction && direction == 'horizontal')
            return <div style={{ display: 'flex' }}>{this.renderHorizonta(thresholds, LevelHanzi, stationName)}</div>;
    }
}

export default PeriodThreshold;