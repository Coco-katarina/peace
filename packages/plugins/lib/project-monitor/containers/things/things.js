'use strict'

import React, { Component, useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom"
import { connect } from 'react-redux';
import HeaderDetails from "../../components/things/header-details";
import NewlyBuild from "../../components/things/newlyBuild";
import ThingsCard from "../../components/things/thingsCard";
import { getStructsList, deleteStruct } from '../../actions/integrationInfo';
import { getFactorTemplateList, getStructFactorList } from '../../actions/struct'
import { Row, Col, Modal, Pagination, Spin, Empty } from "antd";
import { PinyinHelper } from '@peace/utils';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const Things = props => {
    const { dispatch, user, isRequesting, structList, structTypes } = props
    const location = useLocation()
    const params = new URLSearchParams(location.search || '');
    const [curPage, setCurPage] = useState(params.get('currentPage') || 1)
    const [searchType, setSearchType] = useState(params.get('filterType') || -1)
    const [searchValue, setSearchValue] = useState(params.get('searchVal') || '')
    const [showSize, setShowSize] = useState(8)
    const [structListFilterd, setStructListFilterd] = useState([])
    const [newlyBuildVisible, setNewlyBuildVisible] = useState(false)
    const [curEditStrucId, setCurEditStrucId] = useState(null)
    const [optionNewlyState, setOptionNewlyState] = useState(-1)
    const [curFactors, setCurFactors] = useState([])

    const getStructs = () => {
        dispatch(getStructsList(user.orgId))
    }

    useEffect(() => {
        getStructs()
        dispatch(getFactorTemplateList(user.orgId))
    }, [])

    useEffect(() => {
        setStructListFilterd(structList.filter(s => (!searchValue || typeof searchValue == 'number' || PinyinHelper.isSearchMatched(s.name, searchValue)) && (!searchType || searchType == -1 || s.type.id == searchType)))
        setCurPage(1)
    }, [structList, searchType, searchValue])

    const deleteProject = (id) => {
        confirm({
            title: `确定删除结构物 ${structListFilterd.find(s => s.id == id).name} ？`,
            icon: <ExclamationCircleOutlined />,
            content: '删除后，相关集成信息将全部消失！',
            okType: 'danger',
            onOk() {
                return new Promise((resolve, reject) => {
                    dispatch(deleteStruct(id)).then(res => {
                        if (res.success) {
                            getStructs()
                            resolve()
                        } else {
                            reject()
                        }
                    });
                });
            },
            onCancel() { },
        });

    };

    const filtrate = (type, keyValue) => {
        if (type) { setSearchType(type) };
        if (keyValue) { setSearchValue(keyValue) };
    }

    const changeNewlyVisible = (optionNewlyState, curEditStrucId) => {
        setNewlyBuildVisible(!newlyBuildVisible)
        setOptionNewlyState(optionNewlyState)
        setCurEditStrucId(curEditStrucId)
        if (curEditStrucId) {
            dispatch(getStructFactorList(curEditStrucId)).then(res => {
                if (res.success) {
                    setCurFactors(res.payload.data.filter(d => d.checked))
                }
            })
        }
    }

    return (
        <Spin spinning={isRequesting}>
            <HeaderDetails
                defaultSearchVal={searchValue}
                filtrate={filtrate}
                changeNewlyVisible={changeNewlyVisible}
            />
            <Row
                gutter={24}
                type="flex"
                justify={structList.length > 0 ? "star" : "center"}
                align="top"
            >
                {
                    structListFilterd.length ?
                        structListFilterd.slice((curPage - 1) * showSize, curPage * showSize).map(s => (
                            (
                                <Col span={6} style={{ marginBottom: 24 }} key={Math.random()}>
                                    <ThingsCard
                                        dispatch={dispatch}
                                        changeNewlyVisible={changeNewlyVisible}
                                        cardData={s}
                                        params={{ id: s.id }}
                                        currentPage={curPage}
                                        filterType={searchType}
                                        searchVal={searchValue}
                                        deleteProject={deleteProject}
                                    />
                                </Col>
                            )
                        ))
                        :
                        <div style={{ width: '100%', height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Empty />
                        </div>
                }
            </Row>
            {
                structListFilterd.length ?
                    <Pagination
                        style={{ textAlign: "center" }}
                        showSizeChanger
                        pageSizeOptions={["8", "16", "24"]}
                        defaultPageSize={8}
                        onShowSizeChange={(current, size) => setShowSize(size)}
                        defaultCurrent={1}
                        total={structListFilterd.length}
                        current={curPage}
                        onChange={(p) => setCurPage(p)}
                    /> : ''
            }
            {
                newlyBuildVisible ?
                    <NewlyBuild
                        visible={newlyBuildVisible}
                        closeModel={changeNewlyVisible}
                        structTypes={structTypes}
                        thingsList={structList}
                        refreshs={getStructs}
                        currentState={optionNewlyState}// 0 新增    1 编辑
                        currentId={curEditStrucId}
                        factors={curFactors}
                    /> : ''
            }

        </Spin>
    )
}

function mapStateToProps(state) {
    const { structTypes, structList, auth, factorTemplateData, structFactorList } = state;
    return {
        user: auth.user,
        isRequesting: structList.isRequesting || structTypes.isRequesting || structFactorList.isRequesting,
        structList: structList.data || [],
        structTypes: structTypes.data || [],
        structFactorList: structFactorList.data || []
    };
}

export default connect(mapStateToProps)(Things)