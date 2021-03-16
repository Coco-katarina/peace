'use strict'

import React, { Component } from 'react';
import { connect } from "react-redux";
import { Layout, Row, Col, Spin, Empty } from "antd";
import { PinyinHelper, Func } from '@peace/utils';
import { AuthorizationCode } from '$utils';
import FactorModal from "../components/factor/factorModal";
import FactorCard from "../components/factor/factorCard";
import PageSearch from "../components/PageSearch";
import {
    getFactorList,
    getFactorProtoList,
    addFactor,
    updateFactor,
    deleteFactor,
} from "../actions/factor";
import { getStructTypes } from '../actions/factorTemplate';

const { Content } = Layout;

class CustomFactor extends Component {
    constructor(props) {
        super(props);
        this.state = { modalVisible: false, factorData: null, factorList: [], search: '' };
    }
    modalCancel = () => {
        this.setState({ modalVisible: false });
        //this.props.dispatch({ type: "clearFactorProtoItem" });
    };

    showAddModal = () => {
        this.setState({
            modalVisible: true,
            modalData: null
        });
    };
    showUpdateModal = data => {
        this.setState({
            modalVisible: true,
            modalData: data
        });
    };
    addFactor = (data) => {
        this.props.dispatch(addFactor(this.props.user.orgId, data))
            .then(e => {
                this.props.dispatch(getFactorList(this.props.user.orgId)).then(() => {
                    this.modalCancel();
                });
            });
    }
    updateFactor = (id, data) => {
        this.props.dispatch(updateFactor(id, data)).then(() => {
            this.props.dispatch(getFactorList(this.props.user.orgId)).then(() => {
                this.modalCancel();
            });
        });
    }
    deleteFactor = (id) => {
        this.props.dispatch(deleteFactor(id)).then(() => {
            this.props.dispatch(getFactorList(this.props.user.orgId)).then(() => {
                this.modalCancel();
            });
        });
    };
    renderFactorCard = () => {
        return this.props.factorList.map(val => {
            if (val.org) {
                return <Col span={6}>
                    <FactorCard key={val.id} cardData={val} setFactor={this.setFactor} />
                </Col>;
            }
        })

    }
    searchFactor = searchValue => {
        this.setState({ search: searchValue });
    };

    filterFactor = () => {
        const searchValue = this.state.search;
        // if (!this.state.factorList.length > 0) {
        //     for (let i in this.props.factorList) {
        //         if (this.props.factorList[i].org) {
        //             this.state.factorList.push(this.props.factorList[i]);
        //         }
        //     }
        // }

        let tempArr = [];
        for (let i in this.props.factorList) {
            let factor = this.props.factorList[i];
            let fname = factor.name;
            let proto = factor.proto;
            let pname = factor.factorProto.name;
            if (fname.search(searchValue) >= 0 || PinyinHelper.isPinyinMatched(fname, searchValue)
                || proto.search(searchValue) >= 0 || PinyinHelper.isPinyinMatched(proto, searchValue)
                || pname.search(searchValue) >= 0 || PinyinHelper.isPinyinMatched(pname, searchValue)
            ) {
                tempArr.push(factor);
                continue;
            }
            for (let j in factor.factorProto.factorProtoItems) {
                let { name } = factor.factorProto.factorProtoItems[j];
                if (name.search(searchValue) >= 0 || PinyinHelper.isPinyinMatched(name, searchValue)) {
                    tempArr.push(factor);
                    break;
                }
            }
        }
        return tempArr;
        //this.props.factorList = tempArr;
        //this.setState({});
    }

    componentDidMount() {
        this.props.dispatch(getStructTypes()).then(() => {
        });
        this.props.dispatch(getFactorProtoList());
        this.props.dispatch(getFactorList(this.props.user.orgId)).then(() => {
        });
    }
    render() {
        let addVisible = Func.judgeRights(AuthorizationCode.AddFactor);
        let editVisible = Func.judgeRights(AuthorizationCode.ModifyFactor)
        let deleteVisible = Func.judgeRights(AuthorizationCode.DeleteFactor)
        const factorList = this.filterFactor();
        return <Layout>
            <Content style={{ padding: "40px 30px", backgroundColor: "rgb(237,241,245)" }}>
                {this.props.isRequesting ? <div style={{ position: "absolute", top: 0, bottom: 0, zIndex: 9, width: "100%", backgroundColor: "rgb(240, 242, 245)", textAlign: "center" }}>
                    <Spin size="large" style={{ marginTop: "100px" }} />
                </div> : null}
                <PageSearch
                    searchValue={this.state.search}
                    onSearch={v => this.searchFactor(v)}
                    onNew={this.showAddModal} addVisible={addVisible} />
                <Row gutter={24}>
                    {factorList.length > 0 ? factorList.map(
                        val => {
                            if (val.org) {
                                return (
                                    <Col span={6} key={Math.random()}>
                                        <FactorCard
                                            key={val.id}
                                            cardData={val}
                                            showUpdateModal={this.showUpdateModal}
                                            deleteFactor={this.deleteFactor}
                                            editVisible={editVisible}
                                            deleteVisible={deleteVisible}
                                        />
                                    </Col>
                                );
                            }
                        }
                    ) : <div style={{ width: '100%' }}><Empty description={false} /></div>}
                </Row>
            </Content>
            {this.state.modalVisible ? <FactorModal closeModal={this.modalCancel} modalData={this.state.modalData} addFactor={this.addFactor} updateFactor={this.updateFactor} structtypeList={this.props.structureType} /> : ""}
        </Layout>;
    }
}

function mapStateToProps(state) {
    const { factorList, structureType } = state;
    return {
        user: state.auth.user,
        isRequesting: factorList.isRequesting,
        factorList: factorList.data || [],
        structureType: structureType.data || []
    };
}

export default connect(mapStateToProps)(CustomFactor);

