'use strict'

import React, { Component } from 'react';
import { Card, Row, Col, Button } from 'antd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Func } from '@peace/utils';
import { AuthorizationCode } from '$utils';
import style from './decoratedCard.css';

class HeatmapCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showOption: false,
            showDeleteModal: false,
        }
    }

    extraContent = (canDel, canEdit) => {

        return canDel || canEdit ? < a disabled={this.state.showDeleteModal} >
            {this.state.showOption ?
                <CloseOutlined onClick={this.onOptionClick} /> :
                <EditOutlined onClick={this.onOptionClick} />
            }
        </a > : null;
    };
    onOptionClick = () => {
        this.setState({
            showOption: !this.state.showOption,
            showDeleteModal: false
        })
    };
    onDeleteClick = () => {
        this.setState({
            showDeleteModal: true
        })
    };

    renderDeleteCard() {
        return <Card bordered={false} className={style['deleteBox']}>
            <h3>删除布设图</h3>
            <p>确认删除信息吗？删除后，相关信息将全部消失！</p>
            <div className={style['btnRow']}>
                <Button onClick={() => this.props.onDelete(this.props.heatmap.id)}>确认</Button>
                <Button type="primary" onClick={this.onOptionClick}>取消</Button>
            </div>
        </Card>
    }

    renderOptionDiv(canDel, canEdit) {
        return <div className={style['cardCover']}>
            <Row className={style['btnCell']} type="flex" justify="space-around">
                <Col span="12"><Button type='primary' disabled={!canEdit} onClick={() => this.props.onEdit(this.props.heatmap)}>编辑信息</Button></Col>
                <Col span="12"><Button type='primary' disabled={!canDel} onClick={this.onDeleteClick}>删除布设图</Button></Col>
            </Row>
        </div>
    }

    cardTitle = () => {
        const { name, type: heatmapType } = this.props.heatmap;
        return <span>
            {name}
            <span style={{ fontSize: '12px', color: 'rgba(102,102,102)' }}>{`(${heatmapType.id == 1 ? '整体图' : '截面图'})`}</span>
        </span>
    };

    render() {
        let canDel = Func.judgeRights(AuthorizationCode.DeleteHotspotMap);
        let canEdit = Func.judgeRights(AuthorizationCode.ModifyHotspotMap);
        let canLayout = Func.judgeRights(AuthorizationCode.LayoutHotspot);
        const { portrait, deployed } = this.props.heatmap;

        return (
            <Card title={this.cardTitle()}
                // bordered={false}
                extra={this.extraContent(canDel, canEdit)}
                className="no-card-border things-card" bodyStyle={{ padding: "5px 24px" }} >
                <div>
                    <img width="100%" src={`${portrait}`} />
                    <Row type="flex" justify="space-between" style={{ marginTop: 10, marginBottom: 10 }}>
                        <Col span="12">已布测点:{deployed}</Col>
                        {canLayout ?
                            <Col span="12" style={{ textAlign: 'right' }}>
                                <a onClick={() => this.props.onDeploy(this.props.heatmap)}>测点布设</a>
                            </Col> : null
                        }
                    </Row>
                </div>
                {!this.state.showOption ? null :
                    <div className={style['cardCoverBox']}>
                        {this.state.showDeleteModal ? this.renderDeleteCard() : this.renderOptionDiv(canDel, canEdit)}
                    </div>
                }
            </Card>
        );
    }
}

export default HeatmapCard;


