"use strict";
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Layout, Row, Col, Spin, Empty } from "antd";
import { PinyinHelper, Func } from '@peace/utils';
import { AuthorizationCode } from '$utils';
import {
    getFactorTemplateList,
    addFactorTemplate,
    updateFactorTemplate,
    deleteFactorTemplate,
    getStructTypes
} from "../actions/factorTemplate";
import { getFactorList } from '../actions/factor';
import TemplateModal from "../components/factorTemplate/templateModal";
import TemplateCard from "../components/factorTemplate/templateCard";
import PageSearch from "../components/PageSearch";

const { Content } = Layout;

class FactorTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = { modalVisible: false, factorTemplateList: [], search: '' };
    }

    // static propTypes = {
    //     editVisible: React.PropTypes.bool,
    //     deleteVisible: React.PropTypes.bool,
    // };

    modalCancel = () => {
        this.setState({ modalVisible: false });
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
    updateTemplate = (id, data) => {
        this.props.dispatch(updateFactorTemplate(id, data)).then(() => {
            this.props.dispatch(getFactorTemplateList(this.props.user.orgId)).then(() => {
                this.setState({ modalVisible: false });
            });
        });
    }
    addTemplate = (data) => {
        this.props.dispatch(addFactorTemplate(this.props.user.orgId, data)).then(() => {
            this.props.dispatch(getFactorTemplateList(this.props.user.orgId)).then(() => {
                this.setState({ modalVisible: false });
            });
        });
    }
    deleteTemplate = (id) => {
        this.props.dispatch(deleteFactorTemplate(id)).then(() => {
            this.props.dispatch(getFactorTemplateList(this.props.user.orgId)).then(() => {
                this.setState({ modalVisible: false });
            });
        });
    };


    searchFactor = searchValue => {
        this.setState({ search: searchValue });
    };
    filterFactor = () => {
        const searchValue = this.state.search;
        let tempArr = [];
        for (let i in this.props.factorTemplateList) {
            let factorTempl = this.props.factorTemplateList[i];
            let factorTemplName = factorTempl.name;
            let factorTemplStructName = factorTempl.structureType.name;
            if (
                factorTemplName.search(searchValue) >= 0 || PinyinHelper.isPinyinMatched(factorTemplName, searchValue) ||
                factorTemplStructName.search(searchValue) >= 0 || PinyinHelper.isPinyinMatched(factorTemplStructName, searchValue)
            ) {
                tempArr.push(factorTempl);
                continue;
            }
            for (let j in factorTempl.factorTemplateFactors) {
                let name = factorTempl.factorTemplateFactors[j].factor.name;
                if (name.search(searchValue) >= 0 || PinyinHelper.isPinyinMatched(name, searchValue)) {
                    tempArr.push(factorTempl);
                    break;
                }
            }
        }
        return tempArr;
        //this.props.factorTemplateList = tempArr;
        // this.setState({});
    };

    componentDidMount() {
        this.props.dispatch(getFactorList(this.props.user.orgId)).then(() => {
            this.props
                .dispatch(getFactorTemplateList(this.props.user.orgId))
                .then(() => {
                    this.props.dispatch(getStructTypes()).then(() => {
                        this.setState({
                            selectData: {
                                structtypeList: this.props.structureType,
                                factorList: this.props.factorList
                            }
                        });
                    });
                });
        });
    }
    render() {
        let addVisible = Func.judgeRights(AuthorizationCode.AddStructureTemplate)
        let editVisible = Func.judgeRights(AuthorizationCode.ModifyStructureTemplate)
        let deleteVisible = Func.judgeRights(AuthorizationCode.DeleteStructureTemplate)
        const factorTemplateList = this.filterFactor();
        return <Layout>
            <Content style={{ padding: "20px 30px", backgroundColor: "rgb(237,241,245)", minHeight: 100 }}>
                {this.props.isRequesting ? <div style={{ position: "absolute", top: 0, bottom: 0, zIndex: 9, width: "100%", backgroundColor: "rgb(240, 242, 245)", textAlign: "center" }}>
                    <Spin size="large" style={{ marginTop: "100px" }} />
                </div> : null}

                <PageSearch
                    searchValue={this.state.search}
                    onSearch={v => {
                        this.searchFactor(v);
                    }} onNew={this.showAddModal} addVisible={addVisible} />

                <Row gutter={24}>
                    {factorTemplateList.length > 0 ? factorTemplateList.map(
                        val => {
                            if (val.org) {
                                return (
                                    <Col key={Math.random()} span={6}>
                                        <TemplateCard
                                            key={val.id}
                                            cardData={val}
                                            showUpdateModal={this.showUpdateModal}
                                            deleteTemplate={this.deleteTemplate}
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
            {this.state.modalVisible ? <TemplateModal closeModal={this.modalCancel} modalData={this.state.modalData} structtypeList={this.props.structureType} addTemplate={this.addTemplate} updateTemplate={this.updateTemplate} selectData={this.state.selectData} /> : ""}
        </Layout>;
    }
}

function mapStateToProps(state) {
    const { factorList, factorTemplateList, structureType } = state;
    return {
        user: state.auth.user,
        isRequesting: factorTemplateList.isRequesting,
        factorTemplateList: factorTemplateList.data || [],
        factorList: factorList.data || [],
        structureType: structureType.data || []
    };
}

export default connect(mapStateToProps)(FactorTemplate);


