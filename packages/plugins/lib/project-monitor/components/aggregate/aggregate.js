/** * Created by ZhouXin on 2018/10/8. */
'use strict';

import React, { Component } from 'react';
import moment from 'moment';
import { Spin, Button, Input, Row, Col, Select, Modal } from 'antd';
import AggregateTable from './aggregate-table';
import AggregateModal from './aggregate-modal';
import { AuthorizationCode } from '$utils';
import { PinyinHelper } from '@peace/utils';

const Search = Input.Search;

class Aggregate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            searchValue: '',
            execAggId: false,
            generateBegin: moment().add(-1, 'month'),
            generateEnd: moment()
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
    }

    handleAdd = () => {
        this.initContext({
            isEdit: false,
            modalData: {
                id: null,
                dataToEdit: null
            }
        });
    }

    handleCancel = () => {
        this.setState({ modalVisible: false });
    }

    handleEdit = (id, dataToEdit) => {
        this.initContext({
            isEdit: true,
            modalData: {
                id: id,
                dataToEdit
            }
        });
    }

    handleSave = (isEdit, dataToSave) => {
        this.props.onSave(isEdit, dataToSave, this.modalProps.modalData.id)
        if (isEdit) this.setState({ modalVisible: false });

    }

    handleSearch = (value) => {
        this.setState({ searchValue: value.trim() });
    };

    handleExec = (aggId) => {
        this.setState({ execAggId: aggId || 'all' });
    }

    callExecAggApi = (structId) => {
        const { execAggId, generateBegin, generateEnd } = this.state;
        let params = {
            begin: generateBegin.format('YYYY-MM-DD'),
            end: generateEnd.format('YYYY-MM-DD')
        };
        if (execAggId == 'all') {
            params.struct = structId;
        } else {
            params.aggId = execAggId;
        }

        this.props.execAgg(params);
        this.setState({ execAggId: false });
    }

    renderTable = () => {
        const { aggConfigList, factors, onDelete, user } = this.props;
        return (
            <AggregateTable
                factors={factors}
                aggConfigList={aggConfigList}
                onDelete={onDelete}
                onEdit={this.handleEdit}
                onExec={this.handleExec}
                searchValue={this.state.searchValue}
                user={user}
            />
        )
    }

    renderModal = () => {
        const { factors, structId, aggConfigList } = this.props;
        return (
            this.state.modalVisible ?
                <AggregateModal
                    factors={factors}
                    structId={structId}
                    aggConfigList={aggConfigList}
                    modalProps={this.modalProps}
                    onSave={this.handleSave}
                    onCancel={this.handleCancel}
                />
                : ''
        )
    }

    onStructChange = value => {
        this.props.onStructChange(value);
    }
    render() {
        const { user, structures, structId } = this.props;

        return (
            <div style={{ padding: '24px' }}>
                <Spin
                    spinning={this.props.isRequesting}
                >
                    <Row style={{ marginBottom: 20 }}>
                        <Col span={12}>
                            {/* <Select value={structId}
                                onChange={this.onStructChange}
                                placeholder="请选择结构物"
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) => {
                                    const { children } = option.props;
                                    return (
                                        children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                        PinyinHelper.isPinyinMatched(children, input)
                                    );
                                }}
                                style={{ width: 200 }} >
                                {
                                    structures ? structures.map(s => <Select.Option key={s.id} value={s.id}>{s.name}</Select.Option>) : []
                                }
                            </Select> */}
                            {
                                // user.resources.some(r => r == AuthorizationCode.AddAggregate) ?
                                <Button type="primary" onClick={this.handleAdd}>新建</Button>
                                // :
                                // <Button  type="primary" disabled>新建</Button>
                            }

                            {
                                // user.resources.some(r => r == AuthorizationCode.AddAggregate || r == AuthorizationCode.ModifyAggregate) ?
                                <Button style={{ marginLeft: 20 }} onClick={() => this.handleExec()}>立即执行</Button>
                                // :
                                // <Button style={{ marginLeft: 20 }} disabled>立即执行</Button>
                            }

                        </Col>
                        <Col span={12}>
                            <Search placeholder='请输入关键字搜索' onSearch={this.handleSearch} style={{ width: 200, float: 'right', marginLeft: 100 }} />
                        </Col>
                    </Row>
                    {this.renderTable()}
                    {this.renderModal()}
                    {
                        this.state.execAggId ?
                            <Modal title="聚集计算立即执行" maskClosable={false} visible={true}
                                onCancel={() => this.setState({ execAggId: false })}
                                onOk={e => this.callExecAggApi(structId)}>
                                <Select defaultValue={1} style={{ width: 200 }} onChange={v => {
                                    if (v == 1) {
                                        this.setState({ generateBegin: moment().add(-1, 'month'), generateEnd: moment() })
                                    } else if (v == 2) {
                                        this.setState({ generateBegin: moment().add(-6, 'month'), generateEnd: moment() })
                                    } else if (v == 3) {
                                        this.setState({ generateBegin: moment().add(-12, 'month'), generateEnd: moment() })
                                    } else {
                                        this.setState({ generateBegin: moment().add(-5, 'year'), generateEnd: moment() })
                                    }
                                }}>
                                    <Select.Option value={1}>最近一个月</Select.Option>
                                    <Select.Option value={2}>最近半年</Select.Option>
                                    <Select.Option value={3}>最近一年</Select.Option>
                                    <Select.Option value={4}>全部</Select.Option>
                                </Select>
                            </Modal>
                            : ""
                    }
                </Spin>
            </div>
        );
    }
}

export default Aggregate;