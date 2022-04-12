import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin, modal } from 'antd';
import { LayoutContent } from '@peace/components';
import ProTable from '@ant-design/pro-table';
import PartModal from '../components/partModal';
import {  postBridgeMembers, putBridgeMembers, delBridgeMembers } from '../actions/info';
import { AuthorizationCode, Func as localFunc } from '$utils';
import { Func } from '@peace/utils';
const {  AddBridgeComponent, ModifyBridgeComponent, DeleteBridgeComponent } = AuthorizationCode;


const PartConfig = ({...props}) => {
    const { dispatch, actions, user, loading, partComponents, bridgeMembers, match } = props;
    const structId = match?.params?.id;
    // const [params, setParams] = useState({});
    const pageStyle = localFunc.getPaginationStyle();

    useEffect(() => {
        dispatch(actions.bridge.getAllPartComponents(structId));
        dispatch(actions.bridge.getBridgeMembers(structId));
    }, []);

  
    const refresh = () => {
        dispatch(actions.bridge.getBridgeMembers(structId))
    }

    const onFinish = async (values, editData) => {
        const dataToSave = {
            ...values,
            structId: structId
        }
        if(editData){
            return dispatch(putBridgeMembers(editData?.id, dataToSave));
        }else{
            return dispatch(postBridgeMembers(dataToSave));
        }
      
    }

    const handleDeletClick = (id) => {
   
        modal.confirm({
            title: '删除构件',
            content: `确定删除该构件吗？`,
            okText: '是',
            cancelText: '否',
            onOk() {
                dispatch(delBridgeMembers(id)).then(_=>{
                    if(_.success){
                        refresh();
                    }
                })
            },
            onCancel() {
            }
        });
    }
    
    const renderTitle = () => {
        return  <div>
                {
                    Func.judgeRights(AddBridgeComponent) && <PartModal  
                    title={`新增构件` }
                    partComponents={partComponents}
                    bridgeMembers={bridgeMembers}
                    onRefresh={refresh}
                    onFinish={onFinish}
                />
                }     
                </div>
    }

    const columns = [{
        title: '部位',
        dataIndex: ['bridgePart','name'],
        ellipsis: true
        
    }, {
        title: '构建位置',
        dataIndex: ['bridgeComponent','name'],
        ellipsis: true
    }, {
        title: '构件名称',
        dataIndex: 'name',
        ellipsis: true
       
    },
    {
        title: '操作',
        key: 'operation',
        valueType: 'option',
        width: '20%',
        render: (text, record) => {
            let actions = [];
            Func.judgeRights(ModifyBridgeComponent) && actions.push(<PartModal 
                key="edit" 
                title="编辑" 
                triggerRender={<a>编辑</a>}
                editData={record}
                partComponents={partComponents}
                bridgeMembers={bridgeMembers}
                onRefresh={refresh}
                onFinish={onFinish} 
            />);
            Func.judgeRights(DeleteBridgeComponent) && actions.push(<a key="del"  onClick={()=> { handleDeletClick(record.id)}}>删除</a>)
            return actions;
        }
    }];
   
    return (
        <LayoutContent>
            <Spin spinning={loading}>
                 
                <ProTable 
                columns={columns} 
                rowKey="id" 
                pagination={{ ...pageStyle }} 
                search={false}
                options={{
                    search: false,
                    reload: false
                }}
                dateFormatter="string" 
                headerTitle={renderTitle()} 
                dataSource={bridgeMembers} 
                />      
           
               
            </Spin>
        </LayoutContent>
    )
}

function mapStateToProps(state) {
   
    const { auth, global, partComponents, bridgeMembers } = state;
    return {
        loading: partComponents.isRequesting || bridgeMembers.isRequesting,
        user: auth.user,
        actions: global.actions,
        clientWidth: global.clientWidth,
        clientHeight: global.clientHeight,
        partComponents: partComponents.data || [],
        bridgeMembers: bridgeMembers.data || []
    };
}

export default connect(mapStateToProps)(PartConfig);
