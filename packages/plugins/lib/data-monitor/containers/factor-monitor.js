import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin, Select, Tree } from 'antd';
import { LayoutContent } from '@peace/components';
import ProTable from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card'
import { AuthorizationCode, Func as localFunc } from '$utils';
import { Func } from '@peace/utils';
import PerfectScrollbar from 'perfect-scrollbar';
const { AddBridgeComponent, ModifyBridgeComponent, DeleteBridgeComponent } = AuthorizationCode;
import RealTimeData from './factorMontor/real-data'

const FactorMonitor = ({ ...props }) => {
    const { dispatch, actions, user, loading, myStructList, clientHeight, myStationList } = props;
    const [selectStructure, setSelectStructure] = useState(null)
    const [factorId, setFactorId] = useState(null)
    const [factorProto, setFactorProto] = useState(null)

    const contentHeight = clientHeight - 56 - 48;
    useEffect(() => {
        dispatch(actions.dataMonitor.getMyStructList(user?.orgId));
        new PerfectScrollbar('#monitor-content', { suppressScrollX: true });
        new PerfectScrollbar('#monitor-side', { suppressScrollX: true });
    }, []);

    useEffect(() => {
        if (myStationList?.length > 0) {
            setFactorId(myStationList[0].factorId)
            setFactorProto(myStationList[0].factorProto)
        }
    }, [myStationList])

    const sturctureChange = (value) => {
        setSelectStructure(value)
        dispatch(actions.dataMonitor.getStations(value));
    }

    useEffect(() => {
        if (myStructList?.length > 0) {
            setSelectStructure(myStructList[0]?.id)
            dispatch(actions.dataMonitor.getStations(myStructList[0]?.id));

        }
    }, [myStructList])


    const getTreeData = () => {
        let children = []
        myStationList ? myStationList.length > 0 ? myStationList.map((s, index) => {
            children.push({
                title: s.factorName,
                key: `${s.factorId}`,
                isLeaf: true,
            })
        }) : '' : ''
        let treeData = children;
        return treeData
    }

    const onSelect = (value) => {
        value.length > 0 ? setFactorId(value) : ""
        let proto = myStationList.find(s => s.factorId == value)?.factorProto
        setFactorProto(proto)
    }
    return (
        <LayoutContent perfectScroll={false}>
            <Spin spinning={loading}>
                <ProCard split="vertical" className='procard-paddingRight'>

                    <ProCard colSpan="20%">
                        <div id='monitor-side' style={{ height: contentHeight - 48, position: 'relative' }}>
                            <Select
                                allowClear={false}
                                placeholder="选择结构物"
                                style={{ width: '95%', marginBottom: 24 }}
                                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                                value={selectStructure}
                                onChange={sturctureChange}
                            >
                                {myStructList.map(v => <Select.Option key={v.id} value={v.id}>{v.name}</Select.Option>)}
                            </Select>

                            <Tree
                                defaultExpandAll
                                selectedKeys={[`${factorId}`]}
                                treeData={getTreeData()}
                                onSelect={onSelect}
                            />
                        </div>
                    </ProCard>
                    <div id='monitor-content' style={{ height: contentHeight, position: 'relative', width: '80%' }}>
                        <ProCard colSpan="80%" >
                            <RealTimeData structId={selectStructure} factorId={parseInt(factorId)} factorProto={factorProto} myStationList={myStationList} />
                        </ProCard>
                    </div>
                </ProCard>
            </Spin>
        </LayoutContent>
    )
}

function mapStateToProps(state) {

    const { auth, global, myStructList, deviceMeta, deviceList, myStationList, facotrList } = state;
    return {
        loading: myStructList.isRequesting || myStationList.isRequesting,
        user: auth.user,
        actions: global.actions,
        clientWidth: global.clientWidth,
        clientHeight: global.clientHeight,
        myStructList: myStructList.data || [],
        myStationList: myStationList.data || []
    };
}


export default connect(mapStateToProps)(FactorMonitor);
