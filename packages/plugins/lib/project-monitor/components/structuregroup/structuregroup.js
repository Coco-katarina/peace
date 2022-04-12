/**
 * Created by ZhouXin on 2018/9/19.
 */
'use strict';
import React, { Component } from 'react';
import { Spin, Button, Input, Row, Col, } from 'antd';
import StructuregroupTable from './structuregroup-table';
import StructuregroupModal from './structuregroup-modal';
import RelateModal from './relate-modal';
import { AuthorizationCode } from '$utils';
import { PinyinHelper } from '@peace/utils';

class Structuregroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            relateModalVisible: false,
            searchValue: '',
            originStructureGroupList: [],
            showStructureGroupList: []
        };
        this.modalProps = {
            isEdit: false,
            modalData: {
                projectId: null,
                dataToEdit: null
            }
        };
    }

    initContext = (modalProps) => {
        this.setState({ modalVisible: true });
        this.modalProps = modalProps;
    }

    handleAdd = () => {
        this.initContext({
            isEdit: false,
            modalData: {
                projectId: null,
                dataToEdit: null
            }
        });
    };

    handleCancel = () => {
        this.setState({ modalVisible: false });
    }

    handleEdit = (id, dataToEdit) => {
        this.initContext({
            isEdit: true,
            modalData: {
                projectId: id,
                dataToEdit
            }
        });
    }

    relateStructs = (structuregroup) => {
        this.setState({ relateModalVisible: true, structuregroup: structuregroup });
    }

    handleRelateCancel = () => {
        this.setState({ relateModalVisible: false });
    }

    handleSave = (isEdit, dataToSave) => {
        this.props.onSave(isEdit, dataToSave, this.modalProps.modalData.projectId)
        if (isEdit) this.setState({ modalVisible: false });

    }

    saveRelate = (id, data) => {
        this.props.onSaveRelate(id, data);
        this.setState({ relateModalVisible: false });
    }

    renderTable() {
        const { structuregroupList, user } = this.props;
        const { showStructureGroupList } = this.state;
        return (
            <StructuregroupTable
                user={user}
                onEdit={this.handleEdit}
                onDelete={this.props.onDelete}
                structuregroupList={showStructureGroupList}
                relateStructs={this.relateStructs}
            />
        )
    }

    renderModal() {
        const modalProps = Object.assign({}, this.modalProps, { modalVisible: this.state.modalVisible });
        const modalContentMaxHeight = document.body.clientHeight - 300;
        if (this.state.modalVisible) {
            return (
                <StructuregroupModal
                    modalProps={modalProps}
                    onSave={this.handleSave}
                    onCancel={this.handleCancel}
                    modalContentMaxHeight={modalContentMaxHeight}
                    delRelateStructs={this.props.delRelateStructs}
                />
            )
        }
    }

    renderRelateModal = () => {
        const { structureList } = this.props;
        const { structuregroup } = this.state;

        let divisionCode = structuregroup ? structuregroup.provinceCode + structuregroup.cityCode + structuregroup.countryCode : '';
        const newStructreList = [];
        if (structureList) {
            for (let i = 0; i < structureList.length; i++) {
                if (structureList[i].extraInfo) {
                    if (structureList[i].extraInfo.divisionCode) {
                        let se = structureList[i].extraInfo.divisionCode.slice(0, 6);
                        let reg = new RegExp("(0*$)", "g");
                        let newdisvionCode = divisionCode.replace(reg, "");
                        if (newdisvionCode != '' && se.indexOf(newdisvionCode) == 0) {
                            newStructreList.push(structureList[i]);
                        }
                    }
                }
            }
        }
        return (
            <RelateModal
                visible={this.state.relateModalVisible}
                onSave={this.saveRelate}
                onCancel={this.handleRelateCancel}
                structuregroup={this.state.structuregroup}
                reStructs={this.props.reStructs}
                structureList={newStructreList} />
        );
    }

    enterHandler = (e) => {
        if (e.key === 'Enter') {
            this.searchHandler(e.target.value);
        }
    };

    searchHandler = (value) => {
        const { originStructureGroupList } = this.state;
        let nextShowStructureGroupList = [];
        for (let g of originStructureGroupList) {
            if (g.structureGroups.name.toLowerCase().indexOf(value.toLowerCase()) >= 0 ||
                PinyinHelper.isPinyinMatched(g.structureGroups.name, value)) {
                nextShowStructureGroupList.push(g);
            }
        }
        this.setState({
            showStructureGroupList: nextShowStructureGroupList
        })
    };

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        this.setState({
            originStructureGroupList: nextProps.structuregroupList,
            showStructureGroupList: nextProps.structuregroupList,
        })
    }

    render() {
        const { user } = this.props;
        return (
            <div style={{}}>
                <Spin
                    spinning={this.props.isRequesting}
                >
                    <div style={{ marginBottom: 20, overflow: 'auto' }}>
                        {
                            user.resources.some(r => r == AuthorizationCode.AddStructsGroup) ?
                                <Col style={{ float: 'left', width: '30%' }} >
                                    <Button type="primary" onClick={this.handleAdd}>新建</Button>
                                </Col>
                                : null
                        }
                        <div style={{ float: 'right' }}>
                            <Input
                                style={{ height: 30, width: 160, marginRight: 16 }}
                                onKeyDown={this.enterHandler}
                                onChange={e => this.setState({ searchValue: e.target.value })}
                                placeholder="关键词：名称"
                            />
                            <Button type="primary" onClick={() => this.searchHandler(this.state.searchValue)} style={{ display: 'inline-block' }}>搜索</Button>
                        </div>
                    </div>

                    {this.renderTable()}
                    {this.renderModal()}
                    {this.renderRelateModal()}
                </Spin>
            </div>
        )
    }
}

export default Structuregroup;