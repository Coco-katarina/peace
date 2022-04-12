import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin, Card, Row, Col, Text, Button } from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { push } from 'react-router-redux';

const ProductIntroduction = (props) => {
    const { dispatch, actions, user, loading, clientWidth, structureInfo, location } = props

    let { structId } = location.state;
    useEffect(async () => {

        dispatch(actions.projectOverview.getStructureByStructureId(structId))
    }, [])

    const basicInfoList = [
        {
            key: 1,
            name: '项目名称',
            value: structureInfo.name
        },
        {
            key: 2,
            name: '所在路名',
            value: structureInfo.extraInfo ? structureInfo.extraInfo.way : ''
        },
        {
            key: 3,
            name: '运行状态',
            value: structureInfo.extraInfo && structureInfo.extraInfo.bridgeState ? structureInfo.extraInfo.bridgeState.label : ''
        },
        {
            key: 4,
            name: '建设单位',
            value: structureInfo.extraInfo ? structureInfo.extraInfo.buildCompany : ''
        },
        {
            key: 5,
            name: '设计单位',
            value: structureInfo.extraInfo ? structureInfo.extraInfo.designCompany : ''
        },
        {
            key: 6,
            name: '施工单位',
            value: structureInfo.extraInfo ? structureInfo.extraInfo.constructionCompany : ''
        }
    ]

    const onNavigateBack = () => {
        dispatch(push({ pathname: `/projectOverview`, state: { structId } }))
    }

    return (
        <div className="content">
            <Spin spinning={loading}>
                <div className="contentBody">
                    <Row className="structName">
                        <Col span={22}>{structureInfo.name}</Col>
                        <Col span={2}><Button size='small' onClick={onNavigateBack}>返回</Button></Col>
                    </Row>
                    <Row className="structImg">
                        <Col span={8}>
                            <img src={structureInfo.portrait}></img>
                        </Col>
                        <Col span={16}>
                            <div className="structIntruduction">{structureInfo.desc}</div>
                        </Col>
                    </Row>
                    <Row className="basicInfo">
                        <Col span={2} style={{ marginLeft: 20 }}>
                            基本信息
                        </Col>
                    </Row>
                    <Row className="infoDesc">
                        {basicInfoList.map(v => {
                            return (
                                <Col className="cell" key={v.key} span={8}>
                                    <Row>
                                        <Col className="cellName" span={8}><div>{v.name}：</div></Col>
                                        <Col className="cellValue" span={16}><div className="text---">{v.value}</div></Col>
                                    </Row>
                                </Col>
                            )
                        })}

                    </Row>
                </div>
            </Spin>

        </div>
    )
}

function mapStateToProps(state) {
    const { global, auth, structure, structuresList } = state;

    return {
        loading: structure.isRequesting || structuresList.isRequesting,
        user: auth.user,
        actions: global.actions,
        structureInfo: structure.data || {},
        clientWidth: global.clientWidth,
    };
}

export default connect(mapStateToProps)(ProductIntroduction);
