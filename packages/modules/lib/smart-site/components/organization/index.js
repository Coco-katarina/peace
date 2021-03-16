/**
 * Created by cherry on 2018/7/16.
 */
'use strict';

import React, { Component } from 'react';
import { Spin, Row, Col, Input, Button, Card } from 'antd';
import OrganizationViewTable from './view-table';
import OrganizationSetModal from './set-modal';
import { AuthorizationCode } from '$utils';
import { Func } from '@peace/utils';

const Search = Input.Search;

class Organization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
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

    handleSearch = (value) => {
        this.setState({ searchValue: value.trim() });
    };

    handleSave = (isEdit, dataToSave) => {
        this.props.onSave(isEdit, dataToSave, this.modalProps.modalData.id); // [id] is null when add
        if (isEdit) this.setState({ modalVisible: false });
    };

    handleCancel = () => {
        this.setState({ modalVisible: false });
    };

    renderModal = () => {
        const modalContentMaxHeight = document.body.clientHeight - 300;
        return (
            this.state.modalVisible ?
                <OrganizationSetModal
                    organizations={this.props.organizations}
                    modalContentMaxHeight={modalContentMaxHeight}
                    modalProps={this.modalProps}
                    onSave={this.handleSave}
                    onCancel={this.handleCancel}
                    roles={this.props.roles}
                />
                : null
        );
    };

    renderTable = () => {
        let deleteVisible = Func.judgeRights(AuthorizationCode.DeleteInstitution);
        let modifyVisible = Func.judgeRights(AuthorizationCode.ModifyInstitution);
        return (
            <OrganizationViewTable
                organizations={this.props.organizations}
                searchValue={this.state.searchValue}
                onEdit={this.handleEdit}
                onDelete={this.props.onDelete}
                deleteVisible={deleteVisible}
                modifyVisible={modifyVisible}
            />
        );
    };


    render() {
        let addVisible = Func.judgeRights(AuthorizationCode.AddInstitution);

        return (
            <Spin spinning={this.props.isRequesting}>
                <Card>
                    <Row style={{ marginBottom: 20 }}>
                        <Col span={12} style={{ float: 'left', width: '30%' }} >
                            {addVisible ? <Button type='primary' onClick={this.handleAdd}>新增</Button> : null}
                        </Col>
                        <Col span={12}>
                            <Search placeholder='请输入关键字搜索' onSearch={this.handleSearch} style={{ width: 200, float: 'right' }} />
                        </Col>
                    </Row>
                    {this.renderModal()}
                    {this.renderTable()}
                </Card>
            </Spin>
        )
    }
}

export default Organization;
