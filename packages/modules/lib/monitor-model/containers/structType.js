"use strict";
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Layout, Row, Col, Spin, Alert, message } from "antd";
import { PinyinHelper, Func } from '@peace/utils';
import { AuthorizationCode } from '$utils';
import {
    getAllStructTypes,
    addStructTypes,
    updateStructTypes,
    findGyFactors,
    updateStructTypeFactors,
    deleteStructTypeFactors,
} from "../actions/structType";
import { getStructTypes } from '../actions/factorTemplate';
import TypeModal from "../components/structType/typeModal";
import TypeCard from "../components/structType/typeCard";
import ModifyModal from "../components/structType/typeModifyModal";
import PageSearch from "../components/PageSearch";

const { Header, Footer, Sider, Content } = Layout;

class StructType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            searchValue: '',
            structtypeList: [],
            modalmVisible: false
        };
    }
    modalCancel = () => {
        this.setState({ modalVisible: false });
    };
    modifyModalCancel = () => {
        this.setState({ modalmVisible: false });
    }
    showAddModal = () => {
        this.setState({
            modalVisible: true,
            modalData: null
        });
    };
    showUpdateModal = data => {
        this.setState({
            modalmVisible: true,
            modalData: data
        });
    };
    searchFactor = (searchValue) => {
        this.setState({ searchValue });
    }
    addStructType = (data) => {
        this.props.dispatch(addStructTypes(data)).then(() => {
            this.props.dispatch(getAllStructTypes()).then(() => {
                this.props.dispatch(getStructTypes());
                this.setState({ modalVisible: false });
            });
        });
    }
    updateStructType = (id, data) => {
        this.props.dispatch(updateStructTypes(id, data)).then(() => {
            this.props.dispatch(updateStructTypeFactors(id, data)).then((res) => {

                if (res.payload.data.state == false) {
                    message.error('更新完毕！更新的监测因素部分正在被使用');
                } else {
                    message.info('更新成功！');
                }
                this.props.dispatch(getAllStructTypes()).then(() => {
                    this.props.dispatch(getStructTypes());
                    this.setState({ modalmVisible: false });
                });

            })
        });
    }
    deleteStructTypes = (id) => {
        this.props.dispatch(deleteStructTypeFactors(id)).then((res) => {

            if (res.payload.data.state == false) {
                message.error('删除失败！此结构物类型正在被使用');
            } else {
                message.info('删除成功！');
            }
            this.props.dispatch(getAllStructTypes(id)).then(() => {
                this.props.dispatch(getStructTypes());
                this.setState({ modalVisible: false });
            });
        })

    };

    componentDidMount() {
        this.props.dispatch(getAllStructTypes());
        this.props.dispatch(getStructTypes());
        this.props.dispatch(findGyFactors());
    }

    renderStructureTypes = (structType, structTypes) => {
        let editVisible = this.props.user.resources.indexOf(AuthorizationCode.ModifyStructureType) > -1;
        let deleteVisible = this.props.user.resources.indexOf(AuthorizationCode.DeleteStructureType) > -1;
        const { searchValue } = this.state;
        if (structType && structType.length > 0 && structTypes && structTypes.length > 0) {
            let targets = structType.filter(t => {
                let { name } = t;
                return name.search(searchValue) != -1 || PinyinHelper.isPinyinMatched(name, searchValue);
            });
            if (targets.length) {
                let structureTypes = targets.map(val => {
                    let factors = structTypes.find(n => n.id == val.id)
                        ? structTypes.filter(k => k.id == val.id).map(o => o.factors)[0].filter(p => p.org == null)
                        : [];
                    return (
                        <Col key={Math.random()} span={6}>
                            <TypeCard
                                key={val.id}
                                cardData={val}
                                factors={factors}
                                showUpdateModal={this.showUpdateModal}
                                deleteTemplate={this.deleteStructTypes}
                                editVisible={editVisible}
                                deleteVisible={deleteVisible}
                            />
                        </Col>
                    );
                });
                return structureTypes;
            }
        }
        return null;
    };

    render() {
        const { structType, isRequesting, structTypes, gyFactors } = this.props;
        const { modalData, searchValue } = this.state;
        return (<Spin spinning={isRequesting}>

            <PageSearch
                searchValue={searchValue}
                onSearch={v => {
                    this.searchFactor(v);
                }} onNew={this.showAddModal} addVisible={Func.judgeRights(AuthorizationCode.AddStructureType)} />
            <Row gutter={24} style={{ padding: "0 30px" }}>
                <Col span={24}>
                    <Alert
                        message="以下情况结构物类型无法删除"
                        description="1.结构物类型，已被（结构物、监测因素、监测模板）使用的&nbsp;&nbsp;2.结构物类型关联的监测因素，已被（结构物、监测模板）使用的"
                        type="warning"
                        showIcon
                        closable={false}
                    />
                </Col>
            </Row>
            <Content style={{ padding: "20px 30px", backgroundColor: "rgb(237,241,245)", minHeight: 100 }}>
                <Row gutter={24}>
                    {this.renderStructureTypes(structType, structTypes)}
                </Row>
            </Content>
            {this.state.modalVisible ? (
                <TypeModal
                    closeModal={this.modalCancel}
                    structTypeList={structType}
                    addTemplate={this.addStructType}
                />
            ) : (
                ""
            )}
            {this.state.modalmVisible ? (
                <ModifyModal
                    closeModal={this.modifyModalCancel}
                    modalData={this.state.modalData}
                    factors={gyFactors.map(m => { return { id: m.id, name: m.name } })}
                    updateStructFactors={this.updateStructType}
                    structTypeList={structType}
                />
            ) : (
                ""
            )}
        </Spin>)
    }
}

function mapStateToProps(state) {
    const { auth, allStructureType, structureType, gyFactors } = state;
    let isRequesting = allStructureType.isRequesting && structureType.isRequesting && gyFactors.isRequesting;
    return {
        user: auth.user,
        isRequesting: isRequesting,
        structType: allStructureType.data || [],
        structTypes: structureType.data || [],
        gyFactors: gyFactors.data || [],

    };
}

export default connect(mapStateToProps)(StructType)
