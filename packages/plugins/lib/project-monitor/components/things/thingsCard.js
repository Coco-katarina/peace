import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Card, Row, Col, Tooltip, Modal, Button } from "antd";
import { push } from 'react-router-redux';
import { Func } from '@peace/utils'
import { AuthorizationCode } from '$utils';
import { CloseOutlined, SettingOutlined } from '@ant-design/icons';
import style from '../../style.css'

const { ModifyStructure, DeleteStructure } = AuthorizationCode

const ThingsCard = props => {
    const { cardData, dispatch, deleteProject, params, changeNewlyVisible } = props
    const [showOption, setShowOption] = useState(false)
    const editIconStyle = { fontSize: 18, cursor: "pointer", }
    const optionButSty = { width: 90 }

    const renderOptionBut = (params) => {
        const { title, disabled, click } = params
        return (
            <Col span={12} style={{
                height: '50%'
            }}>
                <Button type="primary" size="large" style={optionButSty} disabled={disabled} onClick={click} >{title}</Button>
            </Col>
        )
    }

    const handleClick = (e) => {
        const { params, dispatch, currentPage, searchVal, filterType } = props;
        if (e.name == 'station') {
            dispatch(push(`/project-monitor/things/struct/${params.id}/configuration/${e.name}?currentPage=${currentPage}&searchVal=${encodeURIComponent(searchVal)}&filterType=${filterType}`));
        } else {
            dispatch(push(`/project-monitor/structure/things/${cardData.id}/equipment?currentPage=${currentPage}&searchVal=${encodeURIComponent(searchVal)}&filterType=${filterType}`))
        }
    }

    return (
        <Card
            hoverable
            bordered={false}
            bodyStyle={{ padding: 0, position: 'relative' }}
            headStyle={{ padding: "0px 12px", margin: '-2px' }}
            title={
                <Tooltip placement="top" title={cardData.name}>
                    <span>{cardData.name}</span>
                </Tooltip>
            }
            extra={
                showOption ?
                    <CloseOutlined onClick={() => setShowOption(false)} style={editIconStyle} />
                    : <SettingOutlined onClick={() => setShowOption(true)} style={editIconStyle} />
            }
            cover={
                <>
                    
                    {
                        showOption ?
                            <div style={{
                                position: 'absolute',
                                height: '80%',
                                width: '100%',
                                backgroundColor: 'rgba(0,0,0,0.3)',
                                zIndex: 99
                            }}>
                                <Row type="flex" justify="space-around" align="middle" style={{ textAlign: "center", height: '50%' }}>
                                    {renderOptionBut({ title: '组网配置', click: () => { handleClick({ name: 'equipment' }) } })}
                                    {renderOptionBut({ title: '测点管理', click: () => { handleClick({ name: 'station' }) } })}
                                </Row>
                                <Row type="flex" justify="space-around" align="middle" style={{ textAlign: "center", height: '50%' }}>
                                    {renderOptionBut({
                                        title: '编辑', disabled: !Func.judgeRights(ModifyStructure), click: () => {
                                            changeNewlyVisible(1, params.id)
                                        }
                                    })}
                                    {renderOptionBut({ title: '删除', disabled: !Func.judgeRights(DeleteStructure), click: () => { deleteProject(params.id) } })}
                                </Row>
                            </div> : ""
                    }
                    <img src={cardData.portrait} style={{ width: "100%", minHeight: 220 }} />

                </>
            }
        >
           
            {/* <div style={{
                position: "absolute", height: 56, width: '100%', bottom: 2, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 0
            }} className={style.optionBut}>
                <Row type="flex" justify="space-around" align="middle" style={{ textAlign: "center", height: '50%' }}>
                    {renderOptionBut({ title: '查看数据', click: () => { dispatch(push('/project-monitor/data/chart/:' + params.id)); } })}
                    {renderOptionBut({ title: '查看告警', click: () => { dispatch(push('/project-monitor/alarm/:' + params.id)) } })}
                </Row>
            </div> */}
            
        </Card>
    )
}

function mapStateToProps(state) {
    const { auth } = state;
    return {
        user: auth.user,
        thingsData: state.thingsData
    };
}

export default connect(mapStateToProps)(ThingsCard)