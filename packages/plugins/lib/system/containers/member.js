import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin, Popconfirm } from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import MemberModal from '../components/memberModal';
import DepartmentTree from '../components/departmentTree';
import { LayoutContent, ExportData } from '@peace/components';
import { deleteMember, addMembers, modifyMembers, enableMember, disableMember } from '../actions/member';
import { Func, AuthorizationCode } from '$utils';
import { PinyinHelper, Func as peaceFunc } from '@peace/utils';
const { AddMember, ModifyMember, DeleteMember, EnableMember, DisableMember } = AuthorizationCode;

const Members = (props) => {
    const { dispatch, actions, user, loading, enterprises, authorData, roles, posts, clientHeight, clientWidth } = props;
   
    const [selectDepartment, setSelectDepartment] = useState(null);
    const [params, setParams] = useState({});
    const pageStyle = Func.getPaginationStyle();

    useEffect(() => {
        dispatch(actions.system.getEnterprisesDetails(user?.id));
        dispatch(actions.system.getAuthorList(user?.orgId));
        dispatch(actions.system.getRoles(user?.orgId));
        dispatch(actions.system.getPosts());
    }, []);


    const actionMember = (e,record) => {
        if(e === 'enabled'){
            dispatch(enableMember(record.id)).then(_ => {
                dispatch(actions.system.getAuthorList(enterprises?.id))
            })
        }else{
            dispatch(disableMember(record.id)).then(_ => {
                dispatch(actions.system.getAuthorList(enterprises?.id))
            })
        }
    }
   
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
            title: '所属部门',
            ellipsis: true,
            dataIndex: 'departmentName',
        },
        {
            title: '职位',
            ellipsis: true,
            dataIndex: ['post','name'],
        },
        {
            title: '手机号',
            ellipsis: true,
            dataIndex: 'phone',
        },
        {
            title: '邮箱',
            ellipsis: true,
            dataIndex: 'email',
        },
        {
            title: '状态',
            dataIndex: 'enabled',
            initialValue: true,
            filters: true,
            onFilter: true,
            valueEnum: {
              enabled: { text: '正常', status: 'Success' },
              unEnabled: { text: '禁用', status: 'Error' }
            },
          },
        {
            title: '操作',
            width: 160,
            key: 'option',
            valueType: 'option',
            render: (text,record,action) => {
               if(record.departmentName == '默认'){
                return '';
               }else{
                let actions = [];
                peaceFunc.judgeRights(ModifyMember) && actions.push(<MemberModal 
                    key="edit" 
                    title="编辑用户" 
                    triggerRender={<a>编辑</a>}
                    editData={record}
                    authorData={authorData}
                    roles={roles}
                    posts={posts}
                    onFinish={onFinish} 
                />);

                peaceFunc.judgeRights(DeleteMember) && actions.push(<Popconfirm key="del" placement="top" title={'是否确认删除该用户？'} onConfirm={() => handleDeleteMember(record.id)} okText="是" cancelText="否">
                <a>删除</a>
                </Popconfirm>);

                let menus = [];
                peaceFunc.judgeRights(EnableMember) && record.enabled === 'unEnabled' && menus.push({ key: 'enabled', name: '启用' });
                peaceFunc.judgeRights(DisableMember) && record.enabled === 'enabled' && menus.push({ key: 'unEnabled', name: '禁用' });

                menus.length > 0 && actions.push(<TableDropdown
                    key="actionGroup"
                    onSelect={(e) => actionMember(e,record)}
                    menus={menus}
                />);

                return actions;
               }
            },
        },
    ];
    const handleDeleteMember = (id) => {
        dispatch(deleteMember(id)).then(_ => {
            dispatch(actions.system.getAuthorList(enterprises?.id))
        })
    }
    const onFinish = async (values, editData) => {
        let params = { ...values, department: Number(values.department), enterpriseId: enterprises?.id };
        if(editData){
            return dispatch(modifyMembers(editData?.id, params)).then(() => {
                dispatch(actions.system.getAuthorList(enterprises?.id))
            });
        }else{
            return dispatch(addMembers(params)).then(() => {
                dispatch(actions.system.getAuthorList(enterprises?.id))
            });
        }
    }
    
    const refresh = () => {
        dispatch(actions.system.getAuthorList(enterprises?.id))
    }
    
    const handleSelectedNode = (node) => {
        setSelectDepartment(node);
    }

    const initUserSource = () => {
        let members = [];
        if(selectDepartment){
            if(selectDepartment.isOrg){
                members = authorData.reduce((p,c)=>{
                    return p.concat(c.members)
                },[])
            }else{
                const departmentIds = Func.getDepartmentsByTree(selectDepartment);
                members = authorData.filter(f=> departmentIds.includes(f.departmentId)).reduce((p,c)=>{
                    return p.concat(c.members)
                },[]);
            }  
        }
        return members;
    }
      
    const renderTitle = () => { 
        if(selectDepartment){
            const members = initUserSource();
            const curDepartment = selectDepartment.departmentId ? authorData.find(v=> v.departmentId === selectDepartment.departmentId) : null;
            const leader = curDepartment ? curDepartment.leader : null;
            return selectDepartment.isOrg ?  <span>{selectDepartment.title}: <span className="text-primary">{members.length}</span> 人</span>
            : <span>{selectDepartment.title}: <span className="text-primary">{members.length}</span> 人, 部门主管: <span className="text-primary"> {leader?.name  || '-'} </span> </span>
        }else{
            return '';
        }
    }

    const getDataSource = () => {
        const members = initUserSource();
        const { keyword } = params;
        let rslt = keyword ? members.filter(s =>s.name.indexOf(keyword) != -1 || PinyinHelper.isPinyinMatched(s.name, keyword)) : members;
        return rslt
    }

    const filterData = getDataSource();
    return (
        <LayoutContent perfectScroll={false}>
            <Spin spinning={loading}>
            <ProCard split="vertical">
                <ProCard >
                     <DepartmentTree 
                        height={clientHeight - 200}
                        dataList={authorData}
                        enterprises={enterprises}
                        onSelectedDepartment={handleSelectedNode}
                     />
                </ProCard>
                <ProCard colSpan="80%">
                    <ProTable 
                        columns={columns} 
                        rowKey="id" 
                        request={async (params) => {
                            setParams(params)  
                            return {
                                data: [],
                                success: true,
                            };
                        }}
                        search={false} 
                        dateFormatter="string" 
                        headerTitle={renderTitle()} 
                        options={{
                            search: { placeholder: "输入用户名称" },
                            reload: false
                        }}
                        pagination={{ ...pageStyle, pageSizeOptions: [10,20,30] }}
                        scroll={{ y: Func.getContentHeight(clientHeight) - 199 }}
                        dataSource={filterData}
                        toolBarRender={() => {
                            let node =  [];
                            peaceFunc.judgeRights(AddMember) && node.push(<MemberModal title="新增用户" posts={posts} authorData={authorData} roles={roles} onFinish={onFinish} key="addMember" />);
                            node.push(<ExportData showIcon={true} fileName={'用户列表'} exportType='fileSaver' data={filterData} columns={columns} key="exportMember" />);
                            return node;
                        }}
                    />
                </ProCard>
            </ProCard>
        </Spin>
        </LayoutContent>
        
    )
}

function mapStateToProps(state) {
    const { auth, global, authorData, enterprises, roles, posts } = state;
    return {
        loading: authorData.isRequesting || enterprises.isRequesting,
        user: auth.user,
        actions: global.actions,
        clientWidth: global.clientWidth,
        clientHeight: global.clientHeight,
        enterprises: enterprises.data,
        authorData: authorData.data || [],
        roles: roles.data || [],
        posts: posts.data || []
    };
}

export default connect(mapStateToProps)(Members);
