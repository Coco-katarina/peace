import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin, Row, Col, Button, message, Select } from 'antd';
import ProTable from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import RoleSelectUser from '../components/selectUser';
import PerfectScrollbar from 'perfect-scrollbar';
import RoleTree from '../components/roleTree';
import { LayoutContent } from '@peace/components';
import Resource from '../components/recource';
import { 
    deleteGroupRole, 
    addGroupRole, 
    modifyGroupRole, 
    addRole, 
    modifyRole, 
    deleteRole, 
    modifyAuthor, 
    modifyRoleUsers, 
    deleteRoleUsers,
    modifyRoleStructures
} from '../actions/role';
import { Func } from '@peace/utils';
import { AuthorizationCode, Func as localFunc } from '$utils';
const { ModifyRoleName, ModifyRoleResource, ModifyRoleStructures } = AuthorizationCode
import  '../style.less';

const Roles = (props) => {
    const { clientHeight, dispatch, actions, user, loading, enterprises, authorData, authors, roles, roleAuthor, roleStructList } = props;
    
    const [selectRole, setSelectRole] = useState(null);
    const [selectUsers, setSelectUsers] = useState([]);
    const [selectStructures, setSelectStructures] = useState([]);
    const pageStyle = localFunc.getPaginationStyle();
    let rightTableSrcollBar = null;
    useEffect(() => {
        dispatch(actions.system.getEnterprisesDetails(user?.id));
        dispatch(actions.system.getAuthorList(user?.orgId));
        dispatch(actions.system.getAuthors(user?.orgId));
        dispatch(actions.system.getRoles(user?.orgId));
        dispatch(actions.system.getRoleStructList(user?.orgId));
        rightTableSrcollBar = new PerfectScrollbar('#role-right-card', { suppressScrollX: true });
    }, []);

    useEffect(() => {
        if(selectRole?.id){
           const role =  roles.reduce((p,c) => {
                return p.concat(c.roles)
            },[]).find(v=> v.id === selectRole.id);
            const structures = role && Array.isArray(role.structures) ?  role.structures.map(v=> v.id) : [];
            setSelectStructures(structures)
        }
    }, [selectRole]);

  
 
    useEffect(() => {
        const domTable = document.getElementById('role-right-card');
        if (domTable && rightTableSrcollBar) {
            rightTableSrcollBar.update();
            domTable.scrollTop = 0;
        }
    }, [clientHeight])
   
    let columns = [
        {
            title: '用户名',
            onFilter: true,
            dataIndex: 'name',
            ellipsis: true
        },
        {
            title: '账号',
            ellipsis: true,
            dataIndex: 'username',
        },
        {
            title: '部门',
            ellipsis: true,
            dataIndex: ['department','name'],
        },
        {
            title: '职位',
            ellipsis: true,
            dataIndex: ['typePost','name'],
        }
    ];

    const handleDeleteGroupRole = (id) => {
        dispatch(deleteGroupRole(id)).then(_ => {
            dispatch(actions.system.getRoles(enterprises?.id));
        })
    }

    const handleDeleteRole = (id) => {
        dispatch(deleteRole(id)).then(_=> {
            dispatch(actions.system.getRoles(enterprises?.id));
        })
    }

    const handleSaveRole = async (values, editData = null, isGroup = false) => {
        let params = { ...values, enterpriseId: enterprises?.id };
        if(isGroup){
            //角色组
            if(editData){
                return dispatch(modifyGroupRole(editData?.id, params)).then(() => {
                    dispatch(actions.system.getRoles(enterprises?.id));
                });
            }else{
                return dispatch(addGroupRole(params)).then(() => {
                    dispatch(actions.system.getRoles(enterprises?.id));
                });
            }
        }else{
             //角色
             if(editData){
                return dispatch(modifyRole(editData?.id, params)).then(() => {
                    dispatch(actions.system.getRoles(enterprises?.id));
                });
            }else{
                return dispatch(addRole(params)).then(() => {
                    dispatch(actions.system.getRoles(enterprises?.id));
                });
            }
        }
      
       
    }

    const handleSaveRoleUsers = (userIds) => {
        const params = {
            userIds: userIds
        };
        return dispatch(modifyRoleUsers(selectRole?.id, params)).then(() => {
            dispatch(actions.system.getAuthorList(enterprises?.id));
            dispatch(actions.system.getRoles(enterprises?.id));
        });
    }

    const handleRemoveRoleUsers = (e) => {
        if(selectUsers.length == 0){
            message.info('未选择需要删除的用户');
            return;
        }
        const params = {
            userIds: selectUsers
        };
        return dispatch(deleteRoleUsers(selectRole?.id, params)).then(() => {
            setSelectUsers([])
            dispatch(actions.system.getAuthorList(enterprises?.id));
            dispatch(actions.system.getRoles(enterprises?.id));
        });
    }

    const handelSaveResourceRole = (data) => {
        const params = {
            resources: data
        };
        return dispatch(modifyAuthor(selectRole?.id, params)).then(() => {
            dispatch(actions.system.getAuthorByRole(selectRole?.id));
        });
    }
    
    const handleSelectedNode = (node) => {
        setSelectRole(node);
        dispatch(actions.system.getAuthorByRole(node.id));
        
    }

    const getSelectRoleUsers = () => {
        let users = [];
        if(selectRole?.id){
           const role =  roles.reduce((p,c) => {
                return p.concat(c.roles)
            },[]).find(v=> v.id === selectRole.id);
            users = role ? role.users : [];
        }
        return users;
    }

    const sturctureChange = (value) => {
        setSelectStructures(value)
    }

    const handleRoleStructures = () => {
        const params = {
            structIds: selectStructures
        };
        return dispatch(modifyRoleStructures(selectRole?.id, params)).then(() => {
            dispatch(actions.system.getRoles(enterprises?.id));
        });
    }

    const renderTitle = () => {
        const disabled = selectRole?.portal === "A" || !Func.judgeRights(ModifyRoleName);
        return  <div>
        <span style={{ marginRight: 15 }}>成员({selectRole?.users.length || 0} 人)</span>
        <RoleSelectUser 
            authorData={authorData.filter(f=> f.departmentName != '默认')} 
            enterprises={enterprises} 
            disabled={disabled} 
            selectUsers={selectRole?.users || []}
            onFinish={handleSaveRoleUsers}
        />
        <Button type="primary" ghost disabled={disabled} onClick={handleRemoveRoleUsers} >移除用户</Button>
        </div>
    
    }
    const rowSelection = {
        type: 'checkbox',
        selectedRowKeys: selectUsers,
        onChange: (selectedRowKeys,selectRow) => {
           setSelectUsers(selectedRowKeys)
        },
      };
    
    return (
        <LayoutContent>
            <Spin spinning={loading}>
            <ProCard split="vertical">
                <ProCard colSpan="260px" >
                     <RoleTree 
                        height={clientHeight - 260}
                        dataList={roles}
                        enterprises={enterprises}
                        onSelectedRole={handleSelectedNode}
                        onSaveRole={handleSaveRole}
                        onDeleteGroupRole={handleDeleteGroupRole}
                        onDeleteRole={handleDeleteRole}
                     />
                </ProCard>
                <div id="role-right-card" style={{ position: 'relative', height: localFunc.getContentHeight(clientHeight)}}>
                    <ProCard title={selectRole?.name || ''}>
                        <Row gutter={16}>
                                {
                                    selectRole?.portal === "A" ?  <Col span={24}><span>关注结构物: </span>全部</Col> :
                                        <>
                                            <Col span={18}>
                                                <span>关注结构物: </span>
                                                <Select
                                                    mode="multiple"
                                                    allowClear
                                                    placeholder="选择结构物"
                                                    style={{width: '80%'}}
                                                    disabled={!Func.judgeRights(ModifyRoleStructures)}
                                                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                                    value={selectStructures}
                                                    onChange={sturctureChange}
                                                    >
                                                    {roleStructList.map(v=> <Select.Option key={v.id} value={v.id}>{v.name}</Select.Option>)}
                                                </Select>
                                            </Col>
                                            <Col span={4}>
                                                <Button type="primary" ghost disabled={!Func.judgeRights(ModifyRoleStructures)}  onClick={handleRoleStructures} >保存</Button>
                                            </Col>
                                        </>   
                                
                                }
                        </Row>
                        <div className="role-user-table">
                            <ProTable 
                                columns={columns} 
                                rowKey="id" 
                                rowSelection={rowSelection}
                                options={{
                                    reload: false
                                }}
                                search={false} 
                                dateFormatter="string"
                                pagination={{ ...pageStyle, pageSize: 5, pageSizeOptions: [5,10,20] }}
                                headerTitle={renderTitle()} 
                                dataSource={getSelectRoleUsers()} 
                                
                            />
                        </div>
                        <Resource resourceData={authors} checkedlist={roleAuthor} disabled={selectRole?.portal === "A" || !Func.judgeRights(ModifyRoleResource)} onPostResourcesSave={handelSaveResourceRole}/>
                    </ProCard>
                </div>
                
            </ProCard>
        </Spin>
        </LayoutContent>   
    )
}

function mapStateToProps(state) {
    const { auth, global, authorData, enterprises, roles, authors, roleAuthor, roleStructList } = state;
    return {
        loading: authorData.isRequesting || enterprises.isRequesting || roles.isRequesting || authors.isRequesting || roleAuthor.isRequesting || roleStructList.isRequesting,
        user: auth.user,
        actions: global.actions,
        clientHeight: global.clientHeight,
        enterprises: enterprises.data,
        authorData: authorData.data || [],
        roles: roles.data || [],
        authors: authors.data || [],
        roleAuthor: roleAuthor.data || [],
        roleStructList: roleStructList.data || []
    };
}

export default connect(mapStateToProps)(Roles);
