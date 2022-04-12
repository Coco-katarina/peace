import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Spin, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import AlarmStrategyModal from '../components/alarm-strategy-modal';
import BroadcastStrategyModal from '../components/broadcast-strategy-modal';
import { LayoutContent } from '@peace/components';
import { getStrategy, addStrategy, editStrategy, deleteStrategy } from '../actions/alarm';
import { Func, AuthorizationCode } from '$utils';
import { PinyinHelper, Func as peaceFunc } from '@peace/utils';
const { AddAlarmPushStrategy, ModifyAlarmPushStrategy, DeleteAlarmPushStrategy } = AuthorizationCode;

const alarmCategories = ["设备类告警", "数据类告警"];
const alarmLevel = ["一级", "二级", "三级"];

const AlarmStrategy = (props) => {
    const { dispatch, actions, user, loading, authorData, myStructList  } = props;
    const ref = useRef();
   
    const pageStyle = Func.getPaginationStyle();

    useEffect(() => {
        dispatch(actions.alarm.getAuthorList(user?.orgId));
        dispatch(actions.alarm.getMyStructList(user?.orgId));
    }, []);

   
    let columns = [
        {
            title: "关注结构物",
            dataIndex: "structure",
            render: (_,record) => Array.isArray(record.structure) ? record.structure.join("/") : '-'
        },
        {
            title: "接收人",
            dataIndex: "name",
            render: (_,record) => Array.isArray(record.name) ? record.name.join("/") : '-'
        },
        {
            title: "接收方式",
            dataIndex: "way",
            render: (_,record) => Array.isArray(record.way) ? record.way.join("/") : '-'
        },
        {
            title: "启用状态",
            dataIndex: "state",
            filters: true,
            onFilter: true,
            valueEnum: {
              enabled: { text: '已启用', status: 'Success' },
              unEnabled: { text: '已禁用', status: 'Error' }
            },
        },
       
        {
            title: '操作',
            width: 160,
            key: 'operation',
            valueType: 'option',
            render: (text,record,action) => { 
                let actions = [];
                peaceFunc.judgeRights(ModifyAlarmPushStrategy) && actions.push(record.broadcastNoticed ? 
                    <BroadcastStrategyModal 
                        key="edit" 
                        title="修改广播策略" 
                        triggerRender={<a>修改</a>}
                        editData={record}
                        myStructList={myStructList}
                        onFinish={onFinish} 
                    />
                    :<AlarmStrategyModal 
                    key="edit" 
                    title="修改告警策略" 
                    triggerRender={<a>修改</a>}
                    editData={record}
                    authorData={authorData}
                    myStructList={myStructList}
                    onFinish={onFinish} 
                />);
                peaceFunc.judgeRights(DeleteAlarmPushStrategy) && actions.push(<Popconfirm key="del" placement="top" title={'是否确认删除该告警策略？'} onConfirm={() => handleDelete(record.id)} okText="是" cancelText="否">
                <a>删除</a>
                </Popconfirm>);
                return actions;
            },
        },
    ];
    const handleDelete = (id) => {
        dispatch(deleteStrategy(id)).then(_ => {
            refresh()
        })
    }
    const onFinish = async (values, editData) => {
        if(editData){
            return dispatch(editStrategy(editData?.id, values)).then(_ => {
                refresh()
            });
        }else{
            return dispatch(addStrategy(user?.orgId,values)).then(_ => {
                refresh()
            });
        }
    }
    
    const refresh = () => {
        ref.current.reload();
    }
    
   
    const renderTitle = () => { 
        return peaceFunc.judgeRights(AddAlarmPushStrategy) ?
        <>
            <AlarmStrategyModal title="新增告警策略"  authorData={authorData} myStructList={myStructList}  onFinish={onFinish} key="addAlarmStrategy" />
            <BroadcastStrategyModal title="新增广播策略"  myStructList={myStructList}  onFinish={onFinish} key="addBroadcastStrategy" />
        </>
        :'';
       
    }
    const formatTableData = (strategy) => {
        
        let tableData = [];
        
        strategy.map((temp, idx) => {
            let struNameArr = [];
            let struIdArr = [];
            let way = [];

            for (let i in temp.projects) {
                for (let j in temp.projects[i].structures) {
                    if (!struIdArr.includes(temp.projects[i].structures[j].id)) {
                        struNameArr.push(temp.projects[i].structures[j].name);
                    }
                    if (!struIdArr.includes(temp.projects[i].structures[j].id))
                        struIdArr.push(temp.projects[i].structures[j].id);
                }
            }
           
            if (temp.emailNoticed.enabled) {
                way.push("邮件");
            }
            if (temp.smsNoticed.enabled) {
                way.push("短信");
            }
            if (temp.broadcastNoticed) {
                way.push("广播");
            }
            let flag = false;
            let ids = myStructList.map(v=> v.id);
            
            struIdArr.map(id => {//需告警策略下所有结构物都包括
                flag = true;
                const structure = ids.find(s => s == id);
                if (!structure)
                    flag = false;
            })
            if (flag)
                tableData.push({
                    id: temp.id,
                    name: temp.noticedUsers.map(user => user.name),
                    structure: struNameArr,
                    alarmType: temp.alarmCategories.map(type => alarmCategories[type - 1]),
                    way: way,
                    smsLevel: temp.smsNoticed.alarmLevels.map(l => alarmLevel[l - 1]),
                    emailLevel: temp.emailNoticed.alarmLevels.map(l => alarmLevel[l - 1]),
                    state: temp.enabled ? "enabled" : "unEnabled",
                    broadcastNoticed: temp.broadcastNoticed,
                    broadcastAlarmLevels: temp.broadcastAlarmLevels ? temp.broadcastAlarmLevels.map(l => alarmLevel[l - 1]) : [],
                    broadcastDeviceId: temp.broadcastDeviceId,
                    action: idx,
                    structures: temp.siteStructs,
                    receivers: temp.noticedUsers.map(v => v.id),
                    categories: temp.alarmCategories,
                    isEmail: temp.emailNoticed.enabled,
                    issms: temp.smsNoticed.enabled,
                    emailAlarmLevel: temp.emailNoticed.alarmLevels,
                    smsAlarmLevel: temp.smsNoticed.alarmLevels,
                    broadcastAlarmLevel: temp.broadcastAlarmLevels
                    
                });
        });
       
       
        return tableData;
    }


    const expandedRowRender = (record) => {
        let columns = [
            {
                title: "接收告警类型",
                dataIndex: "alarmType",
                key: "alarmType",
                render: (_,record) => Array.isArray(record.alarmType) ? record.alarmType.join("/") : '-'
            },

        ];
        if (record.broadcastNoticed) {
            columns = columns.concat(
                [{
                    title: "广播告警级别",
                    dataIndex: "broadcastAlarmLevels",
                    key: "broadcastAlarmLevels",
                    render: (_,record) => Array.isArray(record.broadcastAlarmLevels) ? record.broadcastAlarmLevels.join("/") : '-'
                }, {
                    title: "广播设备ID",
                    dataIndex: "broadcastDeviceId",
                    key: "broadcastDeviceId",
                }]
            )
        } else {
            columns = columns.concat(
                [{
                    title: "短信接收告警级别",
                    dataIndex: "smsLevel",
                    key: "smsLevel",
                    render: (_,record) => Array.isArray(record.smsLevel) ? record.smsLevel.join("/") : '-'
                  
                },
                {
                    title: "邮件接收告警级别",
                    dataIndex: "emailLevel",
                    key: "emailLevel",
                    render: (_,record) => Array.isArray(record.emailLevel) ? record.emailLevel.join("/") : '-'
                },]
            )
        }
        return (
            <ProTable
                tableClassName="child-table"
                columns={columns}
                headerTitle={false}
                search={false}
                options={false}
                pagination={false}
                dataSource={[record]}
            />
        );
    }
    const requestData = async (params) => {
        const { current, pageSize, keyword } = params;
        
        const { payload, success} = await dispatch(getStrategy(user?.orgId));
        const dataSource = formatTableData(payload?.data || []);

        const rslt = keyword ? dataSource.filter(s =>{
            return  s.name.some(v=>  v && (v.indexOf(keyword) != -1 || PinyinHelper.isPinyinMatched(v, keyword)))
            || s.structure.some(v=>  v && (v.indexOf(keyword) != -1 || PinyinHelper.isPinyinMatched(v, keyword)))
        }) : dataSource;
        return {
             data: rslt,
             success: success
        };
     }

    return (
        <LayoutContent>
            <Spin spinning={loading}>
                {
                    !loading && <ProTable 
                    actionRef={ref}
                    columns={columns} 
                    rowKey="id"
                    //postData={formatTableData}
                    request={requestData}
                    search={false} 
                    dateFormatter="string" 
                    headerTitle={renderTitle()} 
                    options={{
                        search: { placeholder: "关键词：结构物名称、接收人姓名", style:{width: 250} },
                        reload: false
                    }}
                    expandable={{ expandedRowRender }}
                    pagination={{ ...pageStyle, pageSizeOptions: [10,20,30] }}
                    //dataSource={filterData}
                />
                }
                
            </Spin> 
        </LayoutContent>
        
    )
}

function mapStateToProps(state) {
    const { auth, global, authorData, myStructList } = state;
    return {
        loading: authorData.isRequesting || myStructList.isRequesting,
        user: auth.user,
        actions: global.actions,
        authorData: authorData.data || [],
        myStructList: myStructList.data || []
    };
}

export default connect(mapStateToProps)(AlarmStrategy);

