/**
 * Created by yuanfenghua on 2018/6/1.
 */
'use strict'

import React from 'react';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Row, Col, Tabs } from 'antd';
import Style from './style.css';

const TabPane = Tabs.TabPane;

class StructureDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: 'station',
            curStruct: {}
        }
    }

    static height = 90;

    UNSAFE_componentWillMount() {
        const { match: { params }, structList, activeKey } = this.props
        let curStruct = structList.find(s => s.id == params.id)
        this.setState({
            curStruct, activeKey,
        })
    }

    callback = (key) => {
        const { match: { params }, dispatch, currentPage, searchVal, filterType } = this.props
        this.setState({ activeKey: key });
        dispatch(push(`/project-monitor/things/struct/${params.id}/configuration/${key}?currentPage=${currentPage}&searchVal=${searchVal}&filterType=${filterType}`));
    };

    render() {
        let curStruct = this.state.curStruct || this.props.structure || {}
        const { id, name, portrait, type } = curStruct;
        const { pathname, currentPage, searchVal, filterType } = this.props;
        return <Row type="flex"  className="wrapper-background" style={{padding: 20}}>
            <Row type="flex">
                <div className={Style.logo}>
                    <img src={portrait} />
                </div>
                <div>
                    <h1 style={{ fontSize: 20, fontWeight: 500, color: 'rgba(0,0,0,.65)' }}>{name}
                        <Link style={{ marginLeft: 10, fontSize: 14, fontWeight: 'normal' }}
                            to={`/project-monitor/structure?currentPage=${currentPage}&searchVal=${searchVal}&filterType=${filterType}`}>返回</Link>
                    </h1>
                </div>
            </Row>
            {
                pathname.indexOf('equipment') > -1 ? null : <Col span="24">
                    <div id="structureTabWrapper" style={{ textAlign: 'left' }}>
                        <Tabs defaultActiveKey={this.props.activeKey}
                            style={{ marginBottom: -17, marginLeft: -8, fontSize: 14 }}
                            activeKey={this.state.activeKey}
                            onChange={this.callback}>
                            <TabPane tab="测点管理" key="station"></TabPane>
                            <TabPane tab="阈值配置" key="threshold"></TabPane>
                            <TabPane tab="2D布设" key="2d"></TabPane>
                            <TabPane tab="3D布设" key="3d"></TabPane>
                            <TabPane tab="BIM模型" key="glbim"></TabPane>
                            <TabPane tab="组合计算" key="combCalc"></TabPane>
                            <TabPane tab="视频监控" key="video"></TabPane>
                            <TabPane tab="动态采集" key="collection"></TabPane>
                            <TabPane tab="聚集配置" key="aggregate"></TabPane>
                        </Tabs>
                    </div>
                </Col>
            }
        </Row>
    }
}

function mapStateToProps(state) {
    const { auth, singleStructState, structList } = state;
    return {
        user: auth.user,
        structure: singleStructState.data,
        structList: structList.data || [],
    };
}

export default connect(mapStateToProps)(StructureDetails)

