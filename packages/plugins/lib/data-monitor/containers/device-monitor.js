import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Spin, Row, Col, Select, Radio, Empty } from 'antd';
import { LayoutContent, ExportData } from '@peace/components';
import ProTable from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import { ApartmentOutlined, TableOutlined } from '@ant-design/icons';
import DeviceTree from '../components/device-tree';
import { Func } from '$utils';
import { PinyinHelper } from '@peace/utils';
import { DeviceTypes } from '../constant';
import '../style.less';


const DeviceMonitor = ({...props}) => {
    const { dispatch, actions, user, clientWidth, clientHeight, loading, 
        myStructList ,deviceMetasWithFollow, devices, dimensions, deviceListAlarms, factorStations
    } = props;
 
    const [params, setParams] = useState({});
    const [selectStructure, setSelectStructure] = useState(null);
    const [extraType, setExtraType] = useState('tree');
    const pageStyle = Func.getPaginationStyle();
  
    useEffect(() => {
        dispatch(actions.dataMonitor.getDeviceMeta());
        dispatch(actions.dataMonitor.getMyStructList(user?.orgId)).then(res=>{
            if(res.success){
                const data = res?.payload?.data || [];
                if(data.length > 0){
                    setSelectStructure(data[0]?.id);
                } 
            }
        });
    }, []);

    useEffect(() => {
        if(selectStructure && myStructList?.length > 0){
            let curStructure = myStructList.find(v=> v.id === selectStructure);
            if(curStructure){
                dispatch(actions.dataMonitor.getStationList(curStructure?.id));
                dispatch(actions.dataMonitor.getDeviceList(curStructure?.iotaThingId)).then(res=>{
                    if(res.success){
                        const instances = res?.payload?.data?.instances;
                        if(instances){
                            let deviceIds = Object.keys(instances).filter(k => instances[k]?.type == 's.d')
                            dispatch(actions.dataMonitor.getDevicesAlarms(deviceIds,{ limit: 5 }));
                        }
                    }
                });
                dispatch(actions.dataMonitor.getDimensionsList(curStructure?.iotaThingId));
            }
        } 
    }, [selectStructure]);
   
   

    //结构物切换
    const sturctureChange = (value) => {
        setSelectStructure(value)
    }
    //展示切换
    const onExtraChange = (e) => {
        setExtraType(e.target.value);
    }

    const renderExtra = () => {
        return <Radio.Group onChange={onExtraChange} value={extraType}>
        <Radio.Button value="tree" ><ApartmentOutlined /> 树状展示</Radio.Button>
        <Radio.Button value="table"><TableOutlined /> 表格展示</Radio.Button>
      </Radio.Group>
    }
    
    //计算设备列表数据缓存
    const dataSource = useMemo(() => {
        let result = [];
        if(devices?.instances){
            let instances = devices.instances;
            let stations = factorStations.reduce((p,c)=>{
                return p.concat(c.groups)
            },[]).reduce((pre,cur)=>{
                return pre.concat(cur.stations) 
            },[]);
            Object.keys(instances).forEach(k=>{
                if(instances[k].type == 's.d'){
                    const dType = instances[k]?.instance?.properties?.deviceType;
                    result.push({
                        id: k,
                        name: instances[k].name || '',
                        deviceTypeId: dType,
                        deviceType: dType ? DeviceTypes[dType] : '',
                        productName: instances[k]?.instance?.properties?.productName || '',
                        productType: instances[k]?.instance?.properties?.productType || '',
                        location: stations.filter(f=> Object.keys(f.iotaDevices).includes(k)).map(v=> v.name).toString(),
                        status: deviceListAlarms.find(v=> v.deviceId === k) ? 'alarm' : 'normal'
                    })
                }
            })
        }
       
        return result;
    }, [devices,deviceListAlarms]);
   
    //筛选过滤数据
    const filterDataSource = () => {
        const { name, deviceType, productType, productName, location, status } = params;
        return dataSource.filter(s =>{
            return  (name ? s.name ? (s.name.indexOf(name) != -1 || PinyinHelper.isPinyinMatched(s.name, name)) : false : true) 
            && (location ? s.location ? (s.location.indexOf(location) != -1 || PinyinHelper.isPinyinMatched(s.location, location)) : false : true)
            && (deviceType ? s.deviceTypeId == deviceType : true)
            && (productType ? s.productType == productType : true)
            && (status ? s.status == status : true)
            && (productName ? s.productName ? (s.productName.indexOf(productName) != -1 || PinyinHelper.isPinyinMatched(s.productName, productName)) : false : true)
        });
    };

    const deviceTypeIds = Func.uniqueArr(dataSource,'deviceTypeId');
    const productTypeIds = Func.uniqueArr(dataSource,'productType')

    const columns = [{
        title: '名称',
        dataIndex: 'name',
        ellipsis: true
        
    },{
        title: '设备类型',
        dataIndex: 'deviceType',
        valueEnum: Func.transValueEnum(deviceTypeIds,'deviceTypeId','deviceType'),
        fieldProps: Func.getSelectCommonProps()
        
    },{
        title: '产品名称',
        dataIndex: 'productName',
        ellipsis: true
        
    },{
        title: '产品型号',
        dataIndex: 'productType',
        valueEnum: Func.transValueEnum(productTypeIds,'productType','productType'),
        fieldProps: Func.getSelectCommonProps()
    },{
        title: '测点',
        dataIndex: 'location',
       
    },{
        title: '状态',
        dataIndex: 'status',
        filters: true,
        onFilter: true,
        valueEnum: {
            normal: { text: '正常', status: 'Success' },
            alarm: { text: '异常', status: 'Error' }
        },
        fieldProps: Func.getSelectCommonProps()
    }];

    const renderTitle = () => {
        return <div className='device-monitor'>
            设备总数: {dataSource.length} 个; 
            异常设备: <span className='title-alarm'>{dataSource.filter(f=> f.status === 'alarm').length}</span> 个; 
            正常设备: <span className='title-normal'>{dataSource.filter(f=> f.status === 'normal').length}</span> 个;
        </div>
    }
    const data = filterDataSource();
    return (
        <LayoutContent >
            <Spin spinning={loading}>
                <Select
                    allowClear
                    placeholder="选择结构物"
                    style={{minWidth: 300, marginBottom: 15}}
                    getPopupContainer={(triggerNode) => triggerNode.parentNode}
                    value={selectStructure}
                    onChange={sturctureChange}
                    >
                    {myStructList.map(v=> <Select.Option key={v.id} value={v.id}>{v.name}</Select.Option>)}
                </Select>
                <ProCard title={renderTitle()} extra={renderExtra()}  headerBordered>
                        {
                            extraType === 'tree' ? 
                            (myStructList.find(v=> v.id === selectStructure) && 
                            deviceMetasWithFollow?.devices?.length > 0 && 
                            devices.instances) ?
                            <DeviceTree
                                deviceMetasWithFollow={deviceMetasWithFollow}
                                deviceList={devices}
                                dimensionlist={dimensions}
                                dispatch={dispatch}
                                struct={myStructList.find(v=> v.id === selectStructure)}
                                clientHeight={clientHeight}
                                clientWidth={clientWidth}
                            /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            :  <ProTable 
                                    tableClassName='device-monitor-pro-table'
                                    className='device-monitor-pro-table'
                                    columns={columns} 
                                    rowKey="id" 
                                    request={async (params) => {
                                        setParams(params)  
                                        return {
                                            data: [],
                                            success: true,
                                        };
                                    }}
                                    pagination={{ ...pageStyle }} 
                                    options={{
                                        search: false,
                                        reload: false
                                    }}
                                    search={{
                                        className: 'device-monitor-search'
                                    }}
                                    toolBarRender={() => {
                                        let node =  [];
                                        node.push(<ExportData showIcon={true} fileName={'设备列表'} exportType='fileSaver' data={data} columns={columns} key="export" />);
                                        return node;
                                    }}
                                    scroll={{ y: Func.getContentHeight(clientHeight) - 421 }}
                                    dateFormatter="string" 
                                    headerTitle={'设备列表'} 
                                    dataSource={data} 
                                />  
                        }
                </ProCard>  
            </Spin>
        </LayoutContent>
    )
}

function mapStateToProps(state) {
    
    const { auth, global, myStructList, deviceMeta, deviceList, dimensionsList, deviceListAlarms, factorStations } = state;
    return {
        loading: myStructList.isRequesting || deviceMeta.isRequesting || deviceList.isRequesting || dimensionsList.isRequesting,
        user: auth.user,
        actions: global.actions,
        clientWidth: global.clientWidth,
        clientHeight: global.clientHeight,
        myStructList: myStructList.data || [],
        deviceMetasWithFollow: deviceMeta.data || {},
        devices: deviceList.data || {},
        dimensions: dimensionsList.data || { dimensions: [], total: 0 },
        deviceListAlarms: deviceListAlarms.data || [],
        factorStations: factorStations.data || []
    };
}

export default connect(mapStateToProps)(DeviceMonitor);
