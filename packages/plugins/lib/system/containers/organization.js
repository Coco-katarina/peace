import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin, Button, Popconfirm } from 'antd';
import { LayoutContent } from '@peace/components';
import ProTable, { DragSortTable } from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import DepartmentModal from '../components/departmentModal';
import DepartmentTree from '../components/departmentTree';
import DepartmentSelectUser from '../components/selectUser';
import {
    modifyDepartmentUsers, addDepartment,
    deleteDepartment, modifyDepartment, sortDepartment, sortDepartmentUsers
} from '../actions/member';
import PerfectScrollbar from 'perfect-scrollbar';
import { Func } from '@peace/utils';
import { AuthorizationCode, Func as localFunc } from '$utils';
import  '../style.less';
const { AddDepartment, ModifyDepartmentName, DeleteDepartment } = AuthorizationCode

const Organization = ({...props}) => {
    const { dispatch, actions, user, loading, enterprises, authorData, clientHeight } = props;
    const [drag, setDrag] = useState(false);
    const [dragUser, setDragUser] = useState(false);
    const [departmentSource, setDepartmentSource] = useState([]);
    const [userSource, setUserSource] = useState([]);
    const [selectDepartment, setSelectDepartment] = useState(null);
    const pageStyle = localFunc.getPaginationStyle();
    let rightTableSrcollBar = null;

    const initDepartmentSource = (node,data) => {
        const departmentChildren = node.isOrg ? data.filter(f=> f.parentId === null).map(v=> {
            return {
                ...v,
                parentName: node.title
            }
        })
        : data.filter(f=> f.parentId === node.departmentId).map(v=>{
            return {
                ...v,
                parentName: node.title
            }
        });
        setDepartmentSource(departmentChildren);
    }

    const initUserSource = (node,data) => {
        let members = [];
        if(node){
            const curDepartment = data.find(v=> v.departmentId === node.departmentId);
            members = curDepartment?.members || [];
            
        }
        setUserSource(members);
    }

    useEffect(() => {
        dispatch(actions.system.getEnterprisesDetails(user?.id));
        dispatch(actions.system.getAuthorList(user?.orgId));
        rightTableSrcollBar = new PerfectScrollbar('#organization-right-table', { suppressScrollX: true });
        
    }, []);
 
    useEffect(() => {
        const domTable = document.getElementById('organization-right-table');
        if (domTable && rightTableSrcollBar) {
            rightTableSrcollBar.update();
            domTable.scrollTop = 0;
        }
    }, [clientHeight])

    useEffect(() => {
        if(authorData.length > 0 && selectDepartment){
            initDepartmentSource(selectDepartment,authorData);
            initUserSource(selectDepartment,authorData)
        }  
    }, [authorData]);

    let departmentColumns = [
        {
            title: '排序',
            dataIndex: 'sort',
            width: 60,
            className: 'drag-visible',
            render: (text,record,index) => {
                if(drag){
                    return ''
                }else{
                    return index + 1;
                }
            },
        },
        {
            title: '部门名称',
            onFilter: true,
            dataIndex: 'departmentName',
            search: false,
            ellipsis: true
        },
        {
            title: '上级部门',
            dataIndex: 'parentName',
            ellipsis: true
        },
        {
            title: '部门主管',
            dataIndex: ['leader','name'],
            ellipsis: true
        },
        {
            title: '部门人数',
            dataIndex: 'departmentCount',
            ellipsis: true,
            render: (text,record) => {
                return  record.members.length
            }
        },
        {
            title: '操作',
            width: 164,
            key: 'option',
            valueType: 'option',
            render: (text,record) => {
               if(record.departmentName == '默认' || drag){
                return '';
               }else{
                let actions = [];
                Func.judgeRights(ModifyDepartmentName) && actions.push(<DepartmentModal 
                    key="edit" 
                    title="编辑部门" 
                    triggerRender={<a>编辑</a>}
                    parent={{departmentId: record.parentId}}
                    editData={record}
                    initialValues={{name: record.departmentName, parentName: record.parentName}}
                    departments={authorData} 
                    onFinish={onFinish} 
                />);
                Func.judgeRights(DeleteDepartment) && actions.push(<Popconfirm key="del" placement="top" title={'子部门以及相关用户都将删除，是否确认删除部门？'} onConfirm={() => handleDeleteDepartment(record.departmentId)} okText="是" cancelText="否">
                <a>删除</a>
                </Popconfirm>)
                return actions;
               }
            },
        },
    ];

    let userColumns = [
        {
            title: '排序',
            dataIndex: 'sort',
            width: 60,
            className: 'drag-visible',
            render: (text,record,index) => {
                if(drag){
                    return ''
                }else{
                    return index + 1;
                }
            },
        },
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
            dataIndex: 'departmentName',
        },
        {
            title: '职位',
            ellipsis: true,
            dataIndex: ['post','name'],
        }
    ];

    const handleDeleteDepartment = (id) => {
        dispatch(deleteDepartment(id)).then(_ => {
            dispatch(actions.system.getAuthorList(enterprises?.id))
        })
    }

    const onFinish = async (values, parent, editData) => {
        
        let params = { name: values.name, parentId: parent?.departmentId || null};
      
        if(editData){
            return dispatch(modifyDepartment(editData?.departmentId, params)).then(() => {
                dispatch(actions.system.getAuthorList(enterprises?.id))
                
            });
        }else{
            return dispatch(addDepartment(enterprises?.id, params)).then(() => {
                dispatch(actions.system.getAuthorList(enterprises?.id))
            });
        }
    }
    
    const onSortEnd = (newData) => {
        setDepartmentSource([...newData]);
    };

    const onUserSortEnd = (newDara) => {
        setUserSource([...newDara])
    }

    const doneSort = () => {   
        const dataList = departmentSource.map((v,index)=> {
            return {
                id: v.departmentId,
                sortIndex: index
            }
        })
        setDrag(false);
        dispatch(sortDepartment({dataList})).then(_ => {
            dispatch(actions.system.getAuthorList(enterprises?.id))
        });
    }
    const doneUserSort = () => {
        const dataList = userSource.map((v,index)=> {
            return {
                id: v.id,
                sortIndex: index
            }
        })
        setDragUser(false);
        dispatch(sortDepartmentUsers({dataList})).then(_ => {
            dispatch(actions.system.getAuthorList(enterprises?.id))
        });
    }
    
    const handleSelectedNode = (node) => {
        
        setSelectDepartment(node);
        initDepartmentSource(node,authorData);
        initUserSource(node,authorData);
    }

    const handleSaveDepartmentUsers = (userIds) => {
        const params = {
            userIds: userIds
        };
        return dispatch(modifyDepartmentUsers(selectDepartment?.departmentId, params)).then(() => {
            dispatch(actions.system.getAuthorList(enterprises?.id));
        });
    }
   

    const renderDepartmentTitle = () => {
        const disabled = selectDepartment?.title === "默认" || !Func.judgeRights(AddDepartment);
        return  <div>
        <span style={{ marginRight: 15 }}>{selectDepartment?.title || ''}</span>
        {
            selectDepartment && <DepartmentModal
            disabled={disabled}
            title="新增子部门" 
            parent={selectDepartment} 
            initialValues={{parentName: selectDepartment?.title || '-'}} 
            departments={authorData} 
            onFinish={onFinish} 
        />
        }
        {
            drag ? <Button style={{marginLeft: 15}} type="primary" disabled={disabled} ghost onClick={doneSort}>完成排序</Button>
            : <Button style={{marginLeft: 15}} type="primary" disabled={disabled} ghost onClick={()=> { setDrag(true)}}>调整排序</Button>
        }
        </div>
    
    }
    const renderUserTitle = () => {
        const disabled = selectDepartment?.title === "默认" || selectDepartment?.isOrg === true || !Func.judgeRights(ModifyDepartmentName);
        return  <div>
        <span style={{ marginRight: 15 }}>部门成员</span>
        <DepartmentSelectUser 
            authorData={authorData.filter(f=> f.departmentName != '默认')} 
            enterprises={enterprises}
            title={'添加用户'}
            disabled={disabled} 
            selectUsers={userSource}
            noDel
            onFinish={handleSaveDepartmentUsers}
        />
        {/* <Button type="primary" style={{ marginRight: 15 }} ghost disabled={disabled} onClick={handleRemoveDepartmentUsers} >移除用户</Button> */}
        {
            dragUser ? <Button type="primary" disabled={disabled}  ghost onClick={doneUserSort}>完成排序</Button>
            : <Button type="primary" disabled={disabled} ghost onClick={()=> { setDragUser(true)}}>调整排序</Button>
        }
        </div>
    
    }
    
    return (
        <LayoutContent perfectScroll={false}>
            <Spin spinning={loading}>
            <ProCard split="vertical">
                    <ProCard colSpan="20%">
                        <DepartmentTree 
                            height={clientHeight - 200}
                            dataList={authorData}
                            enterprises={enterprises}
                            onSelectedDepartment={handleSelectedNode}
                        />
                    </ProCard>
                
                <div id="organization-right-table" style={{ position: 'relative', height: localFunc.getContentHeight(clientHeight)}}>
                <ProCard>
                    {
                        drag ? <DragSortTable
                                    headerTitle={renderDepartmentTitle()} 
                                    columns={departmentColumns}
                                    rowKey="index"
                                    pagination={false}
                                    options={{
                                        search: false,
                                        reload: false
                                    }}                  
                                    dateFormatter="string"
                                    dataSource={departmentSource}
                                    search={false}
                                    onDragSortEnd={onSortEnd}
                                    dragSortKey='sort'  
                                />
                            : <ProTable
                                headerTitle={renderDepartmentTitle()} 
                                columns={departmentColumns}
                                search={false}
                                rowKey="index"
                                options={{
                                    search: false,
                                    reload: false
                                }}
                                pagination={{ ...pageStyle, pageSize:5, pageSizeOptions: [5,10,20] }}            
                                dateFormatter="string"
                                dataSource={departmentSource}   
                              />
                    }
                    {
                        dragUser ? <DragSortTable
                                        headerTitle={renderUserTitle()} 
                                        columns={userColumns}
                                        rowKey="userIndex"
                                        pagination={false}
                                        options={{
                                            search: false,
                                            reload: false
                                        }}                  
                                        dateFormatter="string"
                                        dataSource={userSource}
                                        search={false}
                                        onDragSortEnd={onUserSortEnd}
                                        dragSortKey='sort'  
                                    />
                                : <ProTable 
                                    columns={userColumns} 
                                    rowKey="id" 
                                    search={false}
                                    options={{
                                        search: false,
                                        reload: false
                                    }}
                                    pagination={{ ...pageStyle, pageSize:5, pageSizeOptions: [5,10,20] }} 
                                    dateFormatter="string" 
                                    headerTitle={renderUserTitle()} 
                                    dataSource={userSource} 
                                  />
                    }
                </ProCard>
                </div>
                
               
            </ProCard>
        </Spin>
        </LayoutContent>
    )
}

function mapStateToProps(state) {
    
    const { auth, global, authorData, enterprises } = state;
    return {
        loading: authorData.isRequesting || enterprises.isRequesting,
        user: auth.user,
        actions: global.actions,
        clientWidth: global.clientWidth,
        clientHeight: global.clientHeight,
        enterprises: enterprises.data,
        authorData: authorData.data || []
    };
}

export default connect(mapStateToProps)(Organization);
