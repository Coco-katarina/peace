import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux";
import { editProject } from "../actions/projectInfo";
import { getThingsList, getConstructionsList, getStructuregroupList, appTableData } from "../actions/appTable";
import { addProject } from "../actions/projectInfo";
import { Modal } from "antd";
import { region } from '@peace/utils';
import { Form } from '@peace/components'

const AddForm = props => {
    const { dispatch, user, modalData, thingsList, constructionsList, structureGroupList, closeModal, visible,
        isRequesting, regetStateNum } = props;
    let [thingsType, setThingsType] = useState('struct');
    let [btnLoading, setBtnLoading] = useState(false);
    const _formRef = useRef(null)

    useEffect(() => {
        dispatch(getThingsList(user.orgId));
        dispatch(getConstructionsList());
        dispatch(getStructuregroupList());
    }, [])

    useEffect(() => {
        if (modalData) {
            setThingsType(modalData.structureClassify)
        }
    }, [modalData])

    const renderSelectThings = () => {
        let selectChild = [{ id: 'all', name: '全部' }];
        if (["struct", 'smartToilet', 'smartWorkSafety', 'smartFireControl', 'bridge'].includes(thingsType) && thingsList.length > 0) {
            thingsList.map(val => {
                if (val.type.name != '小区') {
                    selectChild.push({ id: val.id.toString(), name: val.name });
                }
            });
        } else if (thingsType == 'community') {
            thingsList.map(val => {
                if (val.type.name == '小区') {
                    selectChild.push({ id: val.id.toString(), name: val.name });
                }
            });
        } else if (thingsType == "construction" && constructionsList.length > 0) {
            constructionsList.map(val => {
                selectChild.push({ id: val.Id.toString(), name: val.siteName });
            });
        } else if (thingsType == "structuregroup" && structureGroupList.length > 0) {
            structureGroupList.map(val => {
                selectChild.push({ id: val.structureGroups.id.toString(), name: val.structureGroups.name });
            });
        }
        return selectChild;
    }

    const renderFormItems = () => {
        let formItems = [
            {
                type: "Input",
                id: "name",
                label: "项目名称",
                rules: [{ required: true, whitespace: true, }],
                itemProps: {
                    maxLength: 50,
                    placeholder: "名称最长 50 字符",
                },
            }, {
                type: "Text",
                id: "describe",
                label: "项目描述",
                rules: [{ required: true, max: 500 }],
                itemProps: {
                    autosize: { minRows: 3, maxRows: 6 },
                    placeholder: "请输入项目描述",
                },
            }, {
                type: "Radio",
                id: "thingsType",
                label: "监测对象类型",
                optionsSrc: [
                    { id: "struct", name: "通用" },
                    { id: "construction", name: "工地" },
                    { id: "bridge", name: "中小桥" },
                    { id: "structuregroup", name: "结构物群" },
                    { id: "community", name: "小区" },
                    { id: "smartToilet", name: "公厕" },
                    { id: "smartWorkSafety", name: "安监" },
                    { id: "smartFireControl", name: "消防" },
                ],
                rules: [{ required: true }],
                itemProps: {
                    onChange: (e) => {
                        const { current } = _formRef
                        setThingsType(e.target.value)
                        current.setFieldsValue({ things: [] })
                    }
                },
            }, {
                type: "Select",
                id: "things",
                label: "监测对象",
                optionsSrc: renderSelectThings(),
                rules: [{ required: true }],
                itemProps: { mode: "multiple" },
            }
        ]
        if (thingsType == 'community') {
            formItems.push({
                type: "Cascader",
                id: "region",
                label: "所在地区",
                optionsSrc: region,
                placeholder: "请选择所在地区",
                rules: [{ required: true }],
            })
        }
        return formItems
    }

    const submit = () => {
        const { current } = _formRef
        current.validateFields().then(val => {
            setBtnLoading(true)
            let structuresArr = [];
            let constructionArr = [];
            let structuregroupArr = [];
            for (let i in val.things) {
                if (val.things[i] != "all") {
                    if (['struct', 'smartToilet', 'smartWorkSafety', 'smartFireControl', 'bridge', 'community'].includes(thingsType)) {
                        if (!structuresArr.includes(parseInt(val.things[i]))) {
                            structuresArr.push(parseInt(val.things[i]));
                        }
                    } else if (thingsType == 'construction') {
                        if (!structuresArr.includes(parseInt(val.things[i]))) {
                            constructionArr.push(parseInt(val.things[i]));
                        }
                    } else if (thingsType == 'structuregroup') {
                        if (!structuresArr.includes(parseInt(val.things[i]))) {
                            structuregroupArr.push(parseInt(val.things[i]));
                        }
                    }
                } else {
                    if (['struct', 'smartToilet', 'smartWorkSafety', 'smartFireControl', 'bridge'].includes(thingsType)) {
                        thingsList.map(k => {
                            if (k.type.name != '小区') {
                                structuresArr.push(k.id)
                            }
                        });
                        break;
                    } else if (thingsType == 'community') {
                        thingsList.map(k => {
                            if (k.type.name == '小区') {
                                structuresArr.push(k.id)
                            }
                        });
                        break;
                    } else if (thingsType == 'construction') {
                        constructionArr = constructionsList.filter(k => k.structures.length > 0).map(k => {
                            return k.Id;
                        });
                        break;
                    } else if (thingsType == 'structuregroup') {
                        structuregroupArr = this.props.structuregroupList.map(k => {
                            return k.structureGroups.id;
                        });
                        break;
                    }
                }
            }
            let extra = null;
            if (thingsType == 'community') {
                let newRegion = val.region
                let regionStr = '';
                if (newRegion.length == 2) {
                    region.map(s => {
                        s.value == newRegion[0] ? s.children.map(k => {
                            k.value == newRegion[1] ? regionStr = s.label + '/' + k.label : ''
                        }) : ''
                    })
                } else if (newRegion.length == 3) {
                    region.map(s => {
                        s.value == newRegion[0] ? s.children.map(k => {
                            k.value == newRegion[1] ?
                                k.children.map(x => {
                                    x.value == newRegion[2] ? regionStr = s.label + '/' + k.label + '/' + x.label : ''
                                }) : ''
                        }) : ''
                    })
                } else {

                }
                extra = {
                    address: regionStr,
                    addressCode: newRegion
                }
            }
            let postData = {
                name: val.name,
                structureIds: structuresArr,
                constructionIds: constructionArr,
                structuregroupIds: structuregroupArr,
                describe: val.describe,
                type: thingsType,
                extra: extra,
            }
            if (modalData) {
                dispatch(editProject(modalData.key, postData)).then(res => {
                    setBtnLoading(false)
                    if (res.success) {
                        dispatch(appTableData(user.id, regetStateNum))
                        closeModal();
                    }
                })
            } else {
                dispatch(addProject(user.id, postData)).then(res => {
                    setBtnLoading(false)
                    if (res.success) {
                        current.resetFields();
                    }
                });
            }
        })
    }

    const editData = () => {
        return modalData ? {
            name: modalData.name,
            describe: modalData.describe,
            thingsType: modalData.structureClassify,
            things: modalData.struct.map(val => {
                return val.id.toString()
            }),
            region: modalData.extra && modalData.extra.addressCode ?
                modalData.extra.addressCode : [],
        } : {}
    }

    return (
        <div>
            <Modal
                maskClosable={false}
                title={modalData ? "项目编辑" : "新建项目"}
                visible={visible}
                confirmLoading={btnLoading || isRequesting}
                okText="保存"
                onOk={submit}
                onCancel={closeModal}
                destroyOnClose
            >
                <Form
                    ref={_formRef}
                    formItems={renderFormItems()}
                    formItemLayout={{ labelCol: { span: 5 }, wrapperCol: { span: 19 } }}
                    popupContainerId="addProjectForm"
                    dataToEdit={editData()}
                />
            </Modal>
        </div>
    )
}

function mapStateToProps(state) {
    const { auth, structureGroupList, thingsList, constructionsList } = state;
    return {
        structureGroupList: structureGroupList.data || [],
        constructionsList: constructionsList.data || [],
        thingsList: thingsList.data || [],
        isRequesting: structureGroupList.isRequesting || constructionsList.isRequesting || thingsList.isRequesting,
        user: auth.user,
    };
}

export default connect(mapStateToProps)(AddForm)