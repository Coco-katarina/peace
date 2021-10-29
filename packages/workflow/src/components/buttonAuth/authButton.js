import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, message, Modal, Input, Form, Radio } from 'antd';
import { connect } from 'react-redux';
import CustomTransferTable from './customTransferTable/index'
import { postAuditActions } from '../../actions'
const { TextArea } = Input;

const AuthButton = (props) => {

    const { btnInfo, noticeData, userList, departments, dispatch, applyInfo, user, processNodes, currentNodeId, onSucessCallBack } = props;
    const [isVisible, setIsVisible] = useState(false);

    const [form] = Form.useForm();
    //console.log(processNodes,currentNodeId,btnInfo);
    let selectUsers = null;
    let isShow = false;
    let isBeforeAssign = false;
    let isAfterAssign = false;
    let nextNode = {}, currentNode;
    let fsBeforeAssignUser = null;
    let fsBeforeAssignUnNum = null;
    let fsAfterAssignUser = null;
    let fsAfterAssignUnNum = null;
    if (processNodes && currentNodeId && btnInfo) {
        currentNode = processNodes[currentNodeId] || {};

        for (let key in processNodes) {
            let values = processNodes[key];
            if (values.sourceRef) {
                let sourceData = values.sourceRef.find(v => v.id == currentNodeId);
                if (sourceData) {
                    nextNode = values;
                }
            }
        }
        //是否拥有按钮权限
        isShow = Array.isArray(currentNode.buttonList) && currentNode.buttonList.includes(btnInfo.id);
        if (isShow) {
            //判断是否前，后加签人员
            if (Array.isArray(applyInfo.variables)) {
                fsBeforeAssignUser = applyInfo.variables.find(v => (v.name == `fsBeforeAssignUser${user.id}` && v.taskId == applyInfo.taskId));
                fsBeforeAssignUnNum = applyInfo.variables.find(v => (v.name == 'fsBeforeAssignUnNum' && v.taskId == applyInfo.taskId));
                if (fsBeforeAssignUser && fsBeforeAssignUnNum && fsBeforeAssignUnNum.value > 0) {
                    isBeforeAssign = true;
                }
            }
            if (Array.isArray(applyInfo.variables)) {
                fsAfterAssignUser = applyInfo.variables.find(v => (v.name == `fsAfterAssignUser${user.id}` && v.taskId == applyInfo.taskId));
                fsAfterAssignUnNum = applyInfo.variables.find(v => (v.name == 'fsAfterAssignUnNum' && v.taskId == applyInfo.taskId));
                if (fsAfterAssignUser && fsAfterAssignUnNum && fsAfterAssignUnNum.value > 0) {
                    isAfterAssign = true;
                }
            }

            switch (btnInfo.functionName) {
                case 'beforeAssign':
                case 'afterAssign':
                case 'assignee':
                    if (isBeforeAssign || isAfterAssign) {
                        isShow = false;
                    }
                    break;
                case 'back':
                    if (currentNode.sourceRef && currentNode.sourceRef.find(v => v.type == 'bpmn:StartEvent')) {
                        isShow = false;
                    }
                    break;
                case 'nextAssign':
                    if (isBeforeAssign || (isAfterAssign && fsAfterAssignUnNum && fsAfterAssignUnNum.value != 1)) {
                        isShow = false;
                    }
                    //先判断是否多人任务
                    if ((currentNode.multiInstanceType == 'parallel' || currentNode.multiInstanceType == 'squence')) {
                        if (Array.isArray(currentNode.users) && currentNode.users.length > 0) {
                            isShow = false;
                        }
                    }
                    //再判断下个节点是否需要指定
                    const { auditUserType, multiInstanceType } = nextNode;
                    if (auditUserType != 'lastAssign') {
                        isShow = false;
                    }
                    break;
                default:
                    break;
            }
        }

        // if (!isAssignUsers && currentNode.afterAssignUsers && currentNode.afterAssignUsers.length > 0) {
        //     isAssignUsers = currentNode.afterAssignUsers.some(v => v.id == user.id);
        // }


    }

    if (noticeData && noticeData.data && currentNode && currentNode.noticeUsers) {
        noticeData.data = noticeData.data.map(v => {
            let obj = currentNode.noticeUsers.find(val => val.id == v.id);
            if (obj) {
                v.disabled = true;
            }
            return v;
        })
    }

    const options = {
        leftTitle: '待选人员',
        rightTitle: '已选人员',
    }
    const radioOpts = {
        checkType: 'radio'
    }
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


    const confirmClick = () => {

        let endAddress = null;
        if (applyInfo.endAddress) {
            let connector = applyInfo.endAddress.indexOf('?') === -1 ? '?' : '&';
            endAddress = `${applyInfo.endAddress}${connector}token=${user.token}`;
        }
        let params = {
            procinstId: applyInfo.procinstId || '',
            taskId: applyInfo.taskId || '',
            applyUser: applyInfo.applyUser || user.id,
            actionName: btnInfo.name,
            endAddress: applyInfo.endAddress
        }

        form.validateFields().then(values => {
            let noticeUsers = currentNode && currentNode.noticeUsers || [];
            if (values.noticeUsers && values.noticeUsers.length > 0) {
                values.noticeUsers.map(v => {
                    let data = userList.find(user => user.id == v);
                    noticeUsers.push({
                        id: data.id,
                        name: data.name
                    });
                })
            }
            params.noticeUsers = noticeUsers;
            params.comment = values.comment;
            params.variables = {}
            switch (btnInfo.id) {
                case 1://办理

                    //流转条件变量
                    if (values.expressCondition) {
                        params.variables.deptPass = { value: values.expressCondition == 'pass' ? true : false };
                    }
                    //会签人员变量
                    if (Array.isArray(selectUsers)) {
                        params.variables.fsAssigneeList = { value: selectUsers.map(v => `fsUser${v.id}`) };
                    }
                    //领导变量
                    if (values.departmentLeader) {
                        params.variables.departmentLeader = { value: `fsUser${values.departmentLeader}` };
                    }
                    //指定人员变量
                    // if (values.assignUser) {
                    //     params.variables.fsAssigneeList = { value: [`fsUser${values.assignUser}`] };
                    // }
                    //前加签办理
                    if (isBeforeAssign) {
                        params.isBeforeAssign = true;
                        params.fsBeforeAssignUnNum = fsBeforeAssignUnNum.value;
                    }
                    //后加签办理
                    if (isAfterAssign) {
                        params.isAfterAssign = true;
                        params.fsAfterAssignUnNum = fsAfterAssignUnNum.value;
                    }
                    break;
                case 2://退回
                    params.activityIds = currentNode && currentNode.sourceRef && currentNode.sourceRef.filter(f => f.type === 'bpmn:UserTask').map(v => v.id);
                    break;
                case 3://驳回
                    params.deletedType = 'reject';
                    break;
                case 4://前加签
                    let beforeAssignUsers = [];
                    Array.isArray(values.beforeAssignUsers) && values.beforeAssignUsers.map(v => {
                        let data = userList.find(user => user.id == v);
                        beforeAssignUsers.push({
                            id: data.id,
                            name: data.name
                        });
                    })
                    params.beforeAssignUsers = beforeAssignUsers;
                    break;
                case 5://后加签
                    let afterAssignUsers = [];
                    Array.isArray(values.afterAssignUsers) && values.afterAssignUsers.map(v => {
                        let data = userList.find(user => user.id == v);
                        afterAssignUsers.push({
                            id: data.id,
                            name: data.name
                        });
                    })
                    params.afterAssignUsers = afterAssignUsers;
                    break;
                case 6://转办
                    let assigneeUser = userList.find(user => user.id == values.assigneeUser);
                    params.assigneeUser = {
                        id: assigneeUser.id,
                        name: assigneeUser.name
                    };
                    break;
                case 7://指定
                    //流转条件变量
                    if (values.expressCondition) {
                        params.variables.deptPass = { value: values.expressCondition == 'pass' ? true : false };
                    }
                    let assignUser = userList.find(user => user.id == values.assignUser);
                    params.assignUser = {
                        id: assignUser.id,
                        name: assignUser.name
                    };
                    break;
            }

            dispatch(postAuditActions(params, btnInfo.functionName)).then(res => {

                if (res.success) {
                    message.success(`${btnInfo.name}操作成功`);
                    onSucessCallBack && onSucessCallBack()
                } else {
                    const { error } = res;
                    message.error(error || `${btnInfo.name}操作失败`);
                }
            }).catch(err => {
                message.error(`${btnInfo.name}操作失败`);
            });
            setIsVisible(false);
        })
    }

    const renderAction = () => {
        let renderEle = [];
        if (currentNode && !isBeforeAssign && (!isAfterAssign || (isAfterAssign && fsAfterAssignUnNum && fsAfterAssignUnNum.value == 1))) {
            const { express, noticeUsers } = currentNode;
            const { multiInstanceType, users: multiInstanceUsers, auditUserType } = nextNode;
            let excludedUsers = userList.filter(v => v.id != user.id);

            switch (btnInfo.id) {
                case 1://办理
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
                    let transferData = { leftColumns: userColumns, rightColumns: userColumns }
                    if ((multiInstanceType == 'anyone' || multiInstanceType == 'parallel' || multiInstanceType == 'squence')) {

                        switch (auditUserType) {
                            case 'selectUsers':
                                selectUsers = multiInstanceUsers
                                break;
                            case 'departmentLeader':
                                break;
                            case 'lastAssign':
                                //办理中暂不处理指定，默认不指定
                                selectUsers = multiInstanceUsers;

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
                                <CustomTransferTable options={radioOpts} transferData={transferData} />
                            </Form.Item>);
                        }
                    }
                    break;
                case 2://退回
                    break;
                case 3://驳回
                    break;
                case 4://前加签
                    renderEle.push(<Form.Item label='前加签' name='beforeAssignUsers' rules={[{
                        required: true, message: '前加签至少选中一个成员'
                    }]}>
                        <CustomTransferTable options={options} transferData={{ leftColumns: userColumns, rightColumns: userColumns, data: excludedUsers }} />
                    </Form.Item>);
                    break;
                case 5://后加签
                    renderEle.push(<Form.Item label='后加签' name='afterAssignUsers' rules={[{
                        required: true, message: '后加签至少选中一个成员！'
                    }]}>
                        <CustomTransferTable options={options} transferData={{ leftColumns: userColumns, rightColumns: userColumns, data: excludedUsers }} />
                    </Form.Item>);
                    break;
                case 6://转办
                    renderEle.push(<Form.Item label='转办' name='assigneeUser' rules={[{
                        required: true, message: '请选择转办人员！'
                    }]}>
                        <CustomTransferTable options={radioOpts} transferData={{ leftColumns: userColumns, data: excludedUsers }} />
                    </Form.Item>);
                    break;
                case 7://指定

                    if (express && typeof express === 'object') {
                        const radios = Object.values(express).filter(f => ['pass', 'reject'].includes(f.expressType));

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
                    if ((multiInstanceType == 'anyone' || multiInstanceType == 'parallel' || multiInstanceType == 'squence')) {
                        let assignUsers = []
                        if (auditUserType == 'lastAssign') {
                            assignUsers = multiInstanceUsers.map(v => {
                                v.key = v.id;
                                return v
                            });
                        }
                        renderEle.push(<Form.Item label='指定' name='assignUser' rules={[{
                            required: true, message: '请指定人员！'
                        }]}>
                            <CustomTransferTable options={radioOpts} transferData={{ leftColumns: userColumns, data: assignUsers }} />
                        </Form.Item>);

                    }
                    break;
            }
        }
        return renderEle.length > 0 ? renderEle : '';
    }

    return (
        <div style={{ display: 'inline-block' }}>
            {isShow ? <div style={{ display: 'inline-block' }}>
                <Modal visible={isVisible} onOk={confirmClick} onCancel={() => setIsVisible(false)} width={1000}>
                    <div style={{ padding: 20 }}>
                        <Form form={form}>
                            {renderAction()}
                            <Form.Item label='意见' name='comment'>
                                <TextArea showCount={true} maxLength={300} rows={5}></TextArea>
                            </Form.Item>
                            <Form.Item label='抄送' name='noticeUsers'>
                                <CustomTransferTable options={options} transferData={noticeData} targetKeys={currentNode.noticeUsers && currentNode.noticeUsers.length > 0 && currentNode.noticeUsers.map(v => v.id)} />
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
                <Button onClick={() => setIsVisible(true)}>{btnInfo.name}</Button>
            </div> : ''}
        </div>
    )
};

function mapStateToProps(state) {
    const { companyOrganization, auth } = state
    let companyOrganization_ = companyOrganization.data || {};
    let userList = [];
    if (companyOrganization_.departments && companyOrganization_.departments.length > 0) {
        companyOrganization_.departments.map(v => {
            if (v.users && v.users.length > 0) {
                v.users.map(user => {
                    if (!userList.find(val => val.id == user.id)) {
                        let departmentsName = ''
                        let departmentIds = [];
                        user.departments.map(a => {
                            departmentIds.push(a.id);
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
                            department: departmentsName,
                            departmentIds: departmentIds
                        })
                    }
                })

            }
        })
    }
    return {
        user: JSON.parse(sessionStorage.getItem('user')),
        departments: companyOrganization_.departments || [],
        userList,
    }
}

AuthButton.propTypes = {
    noticeData: PropTypes.object, // 包含 {leftColumns,rightColumns,data}
    btnInfo: PropTypes.object, // 按钮信息
    currentNodeId: PropTypes.string,// 当前节点
    processNodes: PropTypes.object,//所有节点信息
    applyInfo: PropTypes.object//申请相关信息
};
export default connect(mapStateToProps)(AuthButton)