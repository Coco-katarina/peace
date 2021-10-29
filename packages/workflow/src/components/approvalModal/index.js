'use strict';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin, Row, Col, Card, Button, Table, message } from 'antd';
import { ProcessForm, NoResource } from '$components';
import moment from 'moment';
import { Request } from '@peace/utils';
import { getWorkflowProcessByProcinstId, getButtonAuth, getFlowRecord, getCompanyOrganization } from '../../actions/index'
import { WebAPI, Constans, buildFormSchemaByDataSourceUrl } from '$utils';
import AuthButton from '../buttonAuth/authButton';
import './index.less'

const ApprovalModal = props => {
    const [processInfo, setProcessInfo] = useState();
    const [processNodes, setProcessNodes] = useState();
    const [formSchema, setFormSchema] = useState();
    const [formData, setFormData] = useState();
    const [isRequesting, setIsRequesting] = useState(true)
    const {
        processInstanceId,
        taskDefinitionKey,
        id: taskId,
        variables,
        ...extInfo
    } = props.processData || {};
    const { buttonAuth, userList, user, flowRecord, dispatch, successCallBack } = props;

    const columns = [{
        title: '序号',
        dataIndex: 'id',
        width: 80,
        render: (text, record, index) => {
            return (
                <span>{index + 1}</span>
            )
        }
    },
    // {
    //     title: '节点',
    //     dataIndex: 'node',
    //     width: 120,
    // }, 
    {
        title: '处理人',
        dataIndex: 'operator',
        ellipsis: true,
        width: 120,
    }, {
        title: '处理操作',
        dataIndex: 'actionName',
        width: 120,
    },
    {
        title: '处理内容',
        dataIndex: 'operateContent',
        width: 250,
        ellipsis: true,
    },
    {
        title: '处理时间',
        dataIndex: 'operateAt',
        width: 120,
        render: (v, t) => {
            return moment(v).format('YYYY-MM-DD HH:mm:ss')
        }
    }, {
        title: '处理意见',
        dataIndex: 'comment',
        width: 300,
        render: (v, t) => {
            return <div>{v}</div>
        }
    }];

    const [actiPage, setActiPage] = useState(1)

    useEffect(() => {
        dispatch(getButtonAuth());
        dispatch(getCompanyOrganization(user.companyId));
        dispatch(getWorkflowProcessByProcinstId({ procinstId: processInstanceId })).then(res => {
            //setIsRequesting(false);
            if (res.success) {
                const { data } = res.payload;
                if (data && data.form) {
                    let processSchema = data.form.formSchema;
                    setProcessInfo(data);
                    if (data.version && data.version.bpmnJson) {
                        setProcessNodes(data.version.bpmnJson);
                    }
                    if (data.history && data.history.formData) {
                        processSchema.formData = data.history.formData;
                    }
                    if (processSchema) {
                        buildFormSchemaByDataSourceUrl(processSchema, Request, [], 'all').then(schema => {
                            setIsRequesting(false);
                            setFormSchema(schema);
                            setFormData(schema.formData);
                        }).catch(err => {
                            message.error('获取表单数据源失败，请重试!');
                        })
                    }
                }
            } else {
                setIsRequesting(false);
            }
        });
        dispatch(getFlowRecord({ procinstId: processInstanceId }));
    }, [])
    const onPageChange = (e) => {
        setActiPage(e)
    }

    const tableChange = (pagination) => {
        console.log(pagination);
    }

    const formChange = (data) => {
        setFormData(data);
    }

    const noticecolumns = [{
        dataIndex: 'id',
        key: 'id',
        title: '序号',
        width: 70
    }, {
        dataIndex: 'name',
        key: 'name',
        title: '姓名',
        render: (text, record, index) => {
            return <div style={{ wordBreak: 'break-all' }}>{text}</div>
        },
    }];


    return (<Spin spinning={isRequesting}>
        <div className='process-approval'>
            <Row className='process-approval_header'>
                {formSchema ? <Col span={24} className='process-approval_header-action'>
                    {buttonAuth.map(v => {
                        const btnProps = {
                            noticeData: {
                                leftColumns: noticecolumns,
                                rightColumns: noticecolumns,
                                data: userList
                            },
                            btnInfo: {
                                ...v
                            },
                            currentNodeId: taskDefinitionKey,
                            processNodes: processNodes,
                            applyInfo: {
                                ...extInfo,
                                procinstId: processInstanceId,
                                taskId: taskId,
                                applyUser: processInfo.history.applyUser,
                                variables: variables,
                                endAddress: processInfo.endAddress
                            },
                            onSucessCallBack: () => {
                                if (successCallBack) {
                                    successCallBack();
                                }
                            }
                        }
                        return <AuthButton {...btnProps} key={v.functionName} ></AuthButton>
                    })}
                </Col> : ''}

            </Row>
            <div className='process-approval_form'>
                {
                    formSchema ?
                        <ProcessForm
                            formSchema={formSchema}
                            isRequesting
                            currentNode={taskDefinitionKey}
                            onChange={formChange}
                        />
                        : !isRequesting && <NoResource title='未查询到该流程的表单' />
                }
            </div>
            <Card title="处理详情" className='process-approval_card'>
                {
                    <Table columns={columns} bordered={true} dataSource={flowRecord}></Table>
                }
            </Card>
        </div >
    </Spin>)

}
function mapStateToProps(state) {
    const { buttonAuth, companyOrganization, auth, flowRecord } = state;
    let companyOrganization_ = companyOrganization.data || {};
    let userList = [];
    if (companyOrganization_.departments && companyOrganization_.departments.length > 0) {
        companyOrganization_.departments.map(v => {
            if (v.users && v.users.length > 0) {
                v.users.map(user => {
                    if (!userList.find(val => val.id == user.id)) {
                        let departmentsName = ''
                        user.departments.map(a => {
                            if (departmentsName == '') {
                                departmentsName = a.name;
                            } else {
                                departmentsName = departmentsName + ',' + a.name;
                            }
                        });
                        userList.push({
                            id: user.id,
                            key: user.id,
                            name: user.name,
                            department: departmentsName
                        })
                    }
                })

            }
        })
    }

    return {
        user: JSON.parse(sessionStorage.getItem('user')),
        buttonAuth: buttonAuth.data || [],
        userList: userList,
        flowRecord: flowRecord.data || []
    }
}
export default connect(mapStateToProps)(ApprovalModal)