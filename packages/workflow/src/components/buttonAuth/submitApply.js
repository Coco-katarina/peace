import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Button, message, Modal, Form, Radio } from 'antd';
import { connect } from 'react-redux';
import { submitProcessApply } from '../../actions/workflowProcessForm';
import CustomTransferTable from './customTransferTable/index';

let SubmitApply = (props) => {

    const { params, procKey, statusChange, dispatch, user, processNodes, currentNodeId, departments, refInstance, onSucessCallBack } = props;

    const [isVisible, setIsVisible] = useState(false);
    const [formValues, setFormValues] = useState(null);
    const [form] = Form.useForm();

    let nextNode, currentNode;
    let actionEle;
    const renderNextNode = (formData) => {
        if (processNodes && currentNodeId) {
            currentNode = processNodes[currentNodeId];
            /** customExclusive独占网关自定义条件判断
             * true：找出流程变量对应的flow分支
             * false：sourceRef找下一节点信息
             */
            if (currentNode.customExclusive) {
                if (formData && currentNode.express) {
                    for (let key in currentNode.express) {
                        let evalString = null;
                        if (currentNode.express[key].expressCondition.length) {
                            currentNode.express[key].expressCondition.map((item, index) => {
                                const { logical, conditionValue, operator, procinstVar } = item;
                                if (index == 0) {
                                    evalString = `'${formData[procinstVar]}' ${operator} '${conditionValue}'`
                                } else {
                                    evalString += ` ${logical == "and" ? '&&' : '||'} '${formData[procinstVar]}' ${operator} '${conditionValue}'`
                                }
                            });
                        }
                        if (evalString && eval(evalString)) {
                            nextNode = processNodes[currentNode.express[key].targetRef && currentNode.express[key].targetRef.elementId];
                            break;
                        }
                    }
                    if (!nextNode) {
                        message.error('没有满足条件的流程分支，请排查');
                    }
                }
            } else {
                for (let key in processNodes) {
                    let values = processNodes[key];
                    if (values.sourceRef) {
                        let sourceData = values.sourceRef.find(v => v.id == props.currentNodeId);
                        if (sourceData) {
                            nextNode = values;
                        }
                    }
                }
            }
        }
    }

    useImperativeHandle(refInstance, () => ({
        submit: (formData) => {
            onSubmit(formData);
        }
    }));

    const userColumns = [{
        dataIndex: 'id',
        key: 'id',
        title: 'ID',
        width: 70
    }, {
        dataIndex: 'name',
        key: 'name',
        title: '姓名',
        render: (text, record, index) => {
            return <div style={{ wordBreak: 'break-all' }}>{text}</div>
        },
    }];
    const options = {
        leftTitle: '待选人员',
        rightTitle: '已选人员',
    }
    let selectUsers = null;


    const renderAction = (formData) => {
        let renderEle = [];
        if (currentNode) {
            const { express } = currentNode;
            if (express && typeof express === 'object') {
                const radios = Object.values(express).filter(f => ['pass', 'reject'].includes(f.expressType));
                if (radios && radios.length > 0) {
                    renderEle.push(<Form.Item label='流转条件' name='expressCondition' rules={[{
                        required: true, message: '请选择'
                    }]}>
                        <Radio.Group>
                            {radios.map(v =>
                                <Radio value={v.expressType}>{v.expressName}</Radio>
                            )}
                        </Radio.Group>
                    </Form.Item>);
                }


            }
        }
        renderNextNode(formData)
        if (nextNode) {
            let transferData = { leftColumns: userColumns, rightColumns: userColumns }
            const { multiInstanceType, users: multiInstanceUsers, auditUserType } = nextNode;
            if ((multiInstanceType == 'anyone' || multiInstanceType == 'parallel' || multiInstanceType == 'squence')) {

                switch (auditUserType) {
                    case 'selectUsers':
                        selectUsers = multiInstanceUsers
                        break;
                    case 'lastAssign':
                        transferData.data = multiInstanceUsers.map(v => {
                            v.key = v.id;
                            return v;
                        });

                        renderEle.push(<Form.Item label='指定下个审批人员' name='assignUser' rules={[{
                            required: true, message: '请指定下个审批人员！'
                        }]}>
                            <CustomTransferTable options={{ ...options, checkType: 'radio' }} transferData={transferData} />
                        </Form.Item>);
                        break;
                    default:
                        break;
                }

            } else {
                if (auditUserType == 'departmentLeader') {
                    const userDepts = user.department.map(v => v.id);
                    let list = [];
                    departments.map(v => {
                        if (userDepts.includes(v.id)) {
                            v.departmentUsers.map(val => {
                                if ([1, 2].includes(val.principal)) {
                                    list.push({
                                        id: val.user.id,
                                        key: val.user.id,
                                        name: val.user.name
                                    })
                                }
                            })
                        }
                    });
                    transferData.data = list;
                    renderEle.push(<Form.Item label='选择领导审批' name='departmentLeader' rules={[{
                        required: true, message: '请选择一个领导审批！'
                    }]}>
                        <CustomTransferTable options={{ ...options, checkType: 'radio' }} transferData={transferData} />
                    </Form.Item>)
                }

            }
        }

        return renderEle.length > 0 ? renderEle : '';
    }

    actionEle = renderAction(formValues);


    const onSubmit = (formData) => {
        setFormValues(formData)
        actionEle = renderAction(formData);
        if (actionEle) {
            setIsVisible(true);
        } else {
            submitApply(formData);
        }
    }
    const submitApply = (formData) => {
        statusChange(true);
        form.validateFields().then(values => {
            let dataToSave = {
                businessKey: params.processId,
                formData: formData,
                node: params.node,
                actionName: params.actionName,
                versionId: params.versionId,
                processName: params.processName,
                syncInterface: params.syncInterface,
                variables: {
                    // 启动流程的表单模板版本id ，用于渲染后续历史表单
                    fsEmisApplyVersionId: {
                        value: params.versionId,
                    },
                    fsEmisBusinessName: {
                        value: params.processName,
                    },
                    fsEmisBusinessType: {    //业务类型
                        value: params.groupName,
                    },
                    fsEmisApplyUserName: {
                        value: params.user.name,
                    },
                    // 所属部门ids
                    fsEmisDepartment: {
                        value: params.user.department.map(v => v.name).toString(),
                    },
                }
            }
            //期望完成时间
            if (params.expectTime) {
                dataToSave.variables.fsEmisExpectTime = { value: params.expectTime }
            }
            //事项名称
            dataToSave.variables.fsFormItemName = { value: params.formItemName || params.processName }
            //处理表单流程变量  分组是array的变量会有多个值不加入流程变量
            params.procinstVars.map(v => {
                if (formData[v]) {
                    if (typeof formData[v] === 'number' || typeof formData[v] === 'string' || (typeof formData[v] === 'object' && Array.isArray(formData[v]))) {
                        dataToSave.variables[v] = { value: formData[v] }
                    }
                } else {
                    //变量在分组下
                    for (let [key, value] of Object.entries(formData)) {
                        if (typeof value === 'object' && !Array.isArray(value)) {
                            for (let [k, child] of Object.entries(value)) {
                                if (child[v]) {
                                    if (typeof child[v] === 'number' || typeof child[v] === 'string' || (typeof child[v] === 'object' && Array.isArray(child[v]))) {
                                        dataToSave.variables[v] = { value: child[v] }
                                    }
                                }
                            }
                        }
                    }
                }
            })
            //流转条件变量
            if (values.expressCondition) {
                dataToSave.variables.deptPass = { value: values.expressCondition == 'pass' ? true : false };
            }
            //会签人员变量
            if (Array.isArray(selectUsers)) {
                dataToSave.variables.fsAssigneeList = { value: selectUsers.map(v => `fsUser${v.id}`) };
            }
            //领导变量
            if (values.departmentLeader) {
                dataToSave.variables.departmentLeader = { value: `fsUser${values.departmentLeader}` };
            }
            //指定人员变量
            if (values.assignUser) {
                dataToSave.variables.fsAssigneeList = { value: [`fsUser${values.assignUser}`] };
            }

            if (params.draftId) {
                dataToSave.draftId = params.draftId;
            }

            dispatch(submitProcessApply(procKey, dataToSave)).then(res => {
                if (res.success) {
                    message.success('提交申请成功');
                    onSucessCallBack && onSucessCallBack({ type: 'submit', formData: formData })
                } else {
                    message.error('提交申请失败');
                    if (statusChange) {
                        statusChange(false);
                    }
                }

            });

            // if (params.taskId) {
            //     dispatch(adjustProcessApply(procKey, dataToSave)).then(res => {
            //         if (res.success) {
            //             message.success('提交申请成功');
            //             onSucessCallBack && onSucessCallBack({ type: 'submit', formData: formData })
            //         } else {
            //             message.error('提交申请失败');
            //         }
            //         if (statusChange) {
            //             statusChange(false);
            //         }
            //     });
            // } else {

            // }
        })
    }

    return (
        <div style={{ display: 'inline-block' }}>
            <Modal visible={isVisible} onOk={() => submitApply(formValues)} onCancel={() => setIsVisible(false)} width={1000}>
                <div style={{ padding: 20 }}>
                    <Form form={form}>
                        {actionEle}
                    </Form>
                </div>
            </Modal>
        </div>
    )
};


function mapStateToProps(state) {
    const { companyOrganization, auth } = state;
    let companyOrganization_ = companyOrganization.data || {};
    return {
        user: JSON.parse(sessionStorage.getItem('user')),
        departments: companyOrganization_.departments || []
    }
}

SubmitApply = connect(mapStateToProps)(SubmitApply);
export default forwardRef((props, ref) => <SubmitApply  {...props} refInstance={ref} />);