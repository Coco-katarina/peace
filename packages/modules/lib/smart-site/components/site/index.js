'use strict';

import React, { Component } from 'react';
import { Button, Input, Row, Col, Card } from 'antd';
import SiteSetModal from './set-modal'
import SiteViewTable from './view-table'
import RelateModal from './relate-modal'
import { AuthorizationCode } from '$utils';
import { Func } from '@peace/utils';
const Search = Input.Search;

class Site extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            relateModalVisible: false,
            searchValue: ''
        };
        this.modalProps = {
            isEdit: false,
            modalData: {
                id: null,
                dataToEdit: null
            }
        };
    }

    initContext = (modalProps) => {
        this.setState({ modalVisible: true });
        this.modalProps = modalProps;
    };

    handleAdd = () => {
        this.initContext({
            isEdit: false,
            modalData: { id: null, dataToEdit: null }
        });
    };

    handleEdit = (id, dataToEdit) => {
        this.initContext({
            isEdit: true,
            modalData: { id, dataToEdit }
        });
    };
    relateStructs = (siteInfo) => {
        this.props.getRelateStructs(siteInfo.Id);
        setTimeout(() => {
            this.setState({ relateModalVisible: true, siteInfo: siteInfo });
        }, 200);
    }
    handleSearch = (value) => {
        this.setState({ searchValue: value });
    };

    handleSave = (isEdit, dataToSave) => {
        this.props.onSave(isEdit, dataToSave, this.modalProps.modalData.id); // [id] is null when add
        if (isEdit) this.setState({ modalVisible: false });
    };
    saveRelate = (id, data) => {
        //保存关联结构物
        this.props.onSaveRelate(id, data); // [id] is null when add
        //this.setState({ relateModalVisible: false });
    }
    handleCancel = () => {
        this.setState({ modalVisible: false });
    };
    handleRelateCancel = () => {
        this.setState({ relateModalVisible: false });
    }
    renderModal = () => {
        const modalProps = Object.assign({}, this.modalProps, { modalVisible: this.state.modalVisible });
        const modalContentMaxHeight = document.body.clientHeight - 300;
        const { siteDepartments, siteList } = this.props;
        return (
            this.state.modalVisible ?
                <SiteSetModal
                    modalContentMaxHeight={modalContentMaxHeight}
                    modalProps={modalProps}
                    onSave={this.handleSave}
                    onCancel={this.handleCancel}
                    siteDepartments={siteDepartments}
                    siteList={siteList}
                />
                : ''
        );
    };
    renderRelateModal = () => {
        const visible = this.props.reStructs ? this.state.relateModalVisible : false;
        return (
            <RelateModal
                visible={visible}
                onSave={this.saveRelate}
                onCancel={this.handleRelateCancel}
                siteInfo={this.state.siteInfo}
                reStructs={this.props.reStructs}
                thingsList={this.props.thingsList} />
        );
    }
    renderTable = (addVisible) => {
        const { siteList, thingsList, user, isRequesting } = this.props;
        const { DeleteConstruction, ModifyConstruction } = AuthorizationCode;
        let deleteVisible = Func.judgeRights(DeleteConstruction);
        let modifyVisible = Func.judgeRights(ModifyConstruction);
        return (
            <SiteViewTable
                searchValue={this.state.searchValue}
                onEdit={this.handleEdit}
                onDelete={this.props.onDelete}
                relateStructs={this.relateStructs}
                siteList={siteList}
                deleteVisible={deleteVisible}
                modifyVisible={modifyVisible}
                addVisible={addVisible}
                thingsList={thingsList}
                user={user}
                isRequesting={isRequesting}
            />
        );
    };


    render() {
        let addVisible = Func.judgeRights(AuthorizationCode.AddConstruction);
        return (
            <Card>
                <Row style={{ marginBottom: 20 }}>
                    <Col span={12} style={{ float: 'left', width: '30%' }} >
                        {addVisible ? <Button type='primary' onClick={this.handleAdd}>新增</Button> : null}
                    </Col>
                    <Col span={12} >
                        <Search placeholder='请输入关键字搜索'
                            onChange={e => this.handleSearch(e.target.value)}
                            style={{ width: 200, float: 'right' }} />
                    </Col>
                </Row>
                {this.renderModal()}
                {this.renderTable(addVisible)}
                {this.renderRelateModal()}
            </Card>
        )
    }
}

export default Site;
