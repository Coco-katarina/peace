import React,{ useState, useEffect } from 'react';
import moment from 'moment';
import { Spin, Input, Button, Message, Menu, Dropdown, Row, Drawer } from 'antd'
import { useSafeState } from 'ahooks';

import ZuwangMain from './zuwang-main';
import EquipmentOption from './equipment-option';
import Immutable from 'immutable';
import { AuthorizationCode } from '$utils';
import { Func } from '@peace/utils';
import { PlusOutlined } from '@ant-design/icons';

const Item = Menu.Item;
const { ModifyEquipmentNetworking } = AuthorizationCode

export default ({...props}) => {
        const { dispatch, clientHeight, deviceMetasWithFollow, deviceList, dimensionlist, struct } = props;
        const [g6TreeDirection, setG6TreeDirection] = useSafeState('TB');
        const [devices, setDevices] = useSafeState(null);
        const [selectedNode, setSelectedNode] = useSafeState(null);
        const [selectedParentNode, setSelectedParentNode] = useSafeState(null);
        const [emitDataChange, setEmitDataChange] = useSafeState(false); 
        const [collapseAll, setCollapseAll] = useSafeState(false);
        const [collapsed, setCollapsed] = useSafeState([]);
        const [expandAll, setExpandAll] = useSafeState(false);
        const [expanded, setExpanded] = useSafeState([]);
        const [targetNode, setTargetNode] = useSafeState('');
        const [showOptionModal, setShowOptionModal] = useSafeState(false);
        // const [showAddDimensionModal, setShowAddDimensionModal] = useState(false);
        // const [showAddEquipmentModal, setShowAddEquipmentModal] = useState(false);
        // const [isClAdd, setIsClAdd] = useState(false);
        const [clientWidth, setClientWidth] = useSafeState(document.body.clientWidth - 64 - 20 - 16 - 2);
        // const [clTitle, setClTitle] = useState('');
        const [dimensions, setDimensions] = useSafeState({});
        const [sensorsId, setSensorsId] = useSafeState([]);
        const [sensorsDataItems, setSensorsDataItems] = useSafeState({});
        const [foldAllG6ToCenter, setFoldAllG6ToCenter] = useSafeState(false);
        const [inputSearching, setInputSearching] = useSafeState(false);
        // const [httpServerInterfaceIds, setHttpServerInterfaceIds] = useState([]);
      
    useEffect(() => {
     
            if (deviceMetasWithFollow?.devices) {
                //const deviceMetas = deviceMetasWithFollow?.devices || {};
                // let httpServerInterfaceIds = [];
                // for (let d of deviceMetas) {
                //     if (d.interfaces && d.interfaces.length) {
                //         for (let f of d.interfaces) {
                //             if (f.directType == 1 && f.interfaceMeta && f.interfaceMeta.name == "HTTP_SERVER") {
                //                 httpServerInterfaceIds.push(f.id)
                //             }
                //         }
                //     }
                // }
                // setHttpServerInterfaceIds(httpServerInterfaceIds);
                if (deviceList?.instances) {
                    let sensorsId = [];
                    let sensorsDataItems = {};
                    for (let id in deviceList.instances) {
                        let instances = deviceList.instances[id];
                        if (instances.type == 's.d' && instances.instance.properties.deviceType == 'sensor') {
                            let meta = deviceMetasWithFollow.devices.find(m => m.id == instances.instance.deviceMetaId);
                            sensorsDataItems[id] = {
                                items: {},
                                deviceName: instances.name,
                            }
                            if (meta) {
                                sensorsDataItems[id].items = meta.capabilities[0].properties.reduce((p, n) => {
                                    if (n.category == 'Output') {
                                        p[n.name] = { name: n.showName, unit: n.unit }
                                    }
                                    return p;
                                }, {});
                            }
                            sensorsId.push(id);
                        }
                    }
                    setSensorsId(sensorsId);
                    setSensorsDataItems(sensorsDataItems)
                }

            }
            
            
            if (deviceList?.instances) {
                const newInstances = Object.assign({}, deviceList.instances, dimensionlist);
                setDevices(Object.assign({}, deviceList, { "instances": newInstances }))
               
            } else {
                if (!devices) {
                    let data = { "instances": {} };
                    let uuidNode = guid();
                    data.instances[uuidNode] = {
                        "instance": {},
                        "svg": {
                            "compX": 0,
                            "compY": 0,
                            "isSelected": false,
                            "rotateAng": 0,
                            "scaleX": 1,
                            "scaleY": 1,
                            "x": 2498,
                            "y": 1083
                        },
                        "type": "s.iota",
                    };
                    data.settings = {
                        "grid": {
                            "step": 20
                        },
                        "height": 3072,
                        "padding": 40,
                        "scale": 10,
                        "scrollLeft": 2047,
                        "scrollTop": 1082,
                        "width": 5120
                    }
                    setDevices(data)
                }
            }  

    }, [deviceList,deviceMetasWithFollow]);

    const guid = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    
    const closeOptionModal = () => {
        setShowOptionModal(false);
        setSelectedNode(null);
       
    }
   
    const _handelNodeClick = (node) => {
       
        if (node) {
            let targetId = node.get('model').id;
            let selectedNode = Object.assign({}, devices?.instances[targetId], { id: targetId });
            let deviceMetaId = selectedNode?.instance?.deviceMetaId;
            let selectedDeviceMetaArr = [];
            let selectedDeviceMeta;
            if (selectedDeviceMetaArr.length == 0) {
                selectedDeviceMeta = deviceMetasWithFollow && deviceMetasWithFollow.devices ?
                    deviceMetasWithFollow.devices.filter(s => s.id == deviceMetaId)[0]
                    : [];
            } else {
                selectedDeviceMeta = selectedDeviceMetaArr[0]
            }
            if (selectedNode.type && selectedNode.type != "s.iota") {
                // parentNode
            
                const parentNode = Object.keys(devices.instances).reduce((p, k) => {
                    
                    const instance = devices.instances[k];
                    if (instance.type == 's.l' && instance.instance.from.ownerSvgId == targetId) {
                        p = Object.assign({}, devices.instances[instance.instance.to.ownerSvgId], { id: instance.instance.to.ownerSvgId });;
                    }
                    return p;
                }, null);
              
                const selectedParentNodeMetaId = parentNode ? parentNode.instance.deviceMetaId : null;
                const selectedParentNodeMeta = selectedParentNodeMetaId ? deviceMetasWithFollow.devices.filter(s => s.id == selectedParentNodeMetaId)[0] : null;
                
                setSelectedNode({ "type": "equipment", "device": selectedNode, "meta": selectedDeviceMeta });
                setSelectedParentNode({ "type": "equipment", "device": parentNode, "meta": selectedParentNodeMeta });
                setShowOptionModal(true);
               
            } else {
                setShowOptionModal(false);
                setSelectedNode(null);
                setSelectedParentNode(null);
            }
        } else {
            setShowOptionModal(false);
            setSelectedNode(null);
            setSelectedParentNode(null);
        }
    }

  
    const emitDataChange_ = () => {
        setEmitDataChange(true);
    }

    const _finishDataChange = () => {
        setEmitDataChange(false);
    }

   
    const handleNodeEnter = (node) => {
        
        var result = dimensionlist?.dimensions?.length <= 0 ? true : false;
        return result;
    }
    const onCollapse = (model, collapse) => {
       
        if (collapse) {
            setCollapsed(collapsed.concat([model.id]));
            setExpanded(expanded.filter(c => c != model.id));
           
        } else {
            setCollapsed(collapsed.filter(c => c != model.id));
            setExpanded(expanded.concat([model.id]));
            
        }
    }

   
    const resetFoldAllG6ToCenter = () => {
        setFoldAllG6ToCenter(false);
        
    }

    const changeG6TreeDirection = () => {
        setG6TreeDirection(g6TreeDirection == 'TB' ? 'LR' : 'TB');
        setShowOptionModal(false);
       
    }
    const containerHeight = clientHeight - 270;
   
  
    return (
        <div id="flag">
            <div style={{ position: 'absolute', top: 148, left:  32, zIndex: 2 }}>
                    <Button style={{ marginRight: 12, marginBottom: 12, float: 'left' }} onClick={() => {   
                        setExpandAll(false);
                        setCollapseAll(true);
                        setCollapsed([]);
                        setExpanded([]);
                        setEmitDataChange(true);
                        // setFoldAllG6ToCenter(true);
                        setTargetNode('');
                        document.getElementById('searchInput').value = ''
                    }} >折叠全部</Button>
                    <Button style={{ marginRight: 12, marginBottom: 12, float: 'left' }} onClick={() => {
                        setCollapseAll(false);
                        setExpandAll(true);
                        setCollapsed([]);
                        setExpanded([]);
                        setEmitDataChange(true);
                        setTargetNode('');
                        document.getElementById('searchInput').value = ''
                    }} >展开全部</Button>
                    
                    <Button style={{ marginLeft: 12, marginBottom: 12, }} onClick={changeG6TreeDirection}>组图方向</Button>
                    <span style={{ float: 'left' }}>
                        <Input.Search style={{ width: 200 }}
                            id="searchInput"
                            onSearch={(v) => {
                                setTargetNode(v);
                                setInputSearching(true);
                                // localStorage.setItem('inputSearching', true)
                            }}
                        />
                    </span>
            </div>
            {
                devices?.instances && 
                <ZuwangMain
                data={devices.instances}
                collapseAll={collapseAll}
                expandAll={expandAll}
                collapsed={collapsed}
                expanded={expanded}
                onCollapse={onCollapse}
                width={clientWidth}
                height={containerHeight}
                emitChange={emitDataChange}
                emitDataChange_={emitDataChange_}
                changeFinish={_finishDataChange}
                handelNodeClick={_handelNodeClick}
                targetNode={targetNode}
                inputSearching={inputSearching}
                setInputSearching={setInputSearching}
                struct={struct}
                handleNodeEnter={handleNodeEnter}
                foldAllG6ToCenter={foldAllG6ToCenter}
                resetFoldAllG6ToCenter={resetFoldAllG6ToCenter}
                g6TreeDirection={g6TreeDirection}
            />
            }
            
            <Drawer
                destroyOnClose
                getContainer={document.getElementById('flag')}
                style={{ position: 'absolute' }}
                mask={false}
                maskClosable={false}
                visible={showOptionModal}
                width={480}
                onClose={closeOptionModal}
                bodyStyle={{ padding: 8 }}
            >
               
                <EquipmentOption
                    isEdit={false}
                    struct={struct}
                    devices={devices}
                    deviceMetas={deviceMetasWithFollow}
                    info={selectedNode}
                    parentNode={selectedParentNode}
                    dimensions={dimensionlist}
                    height={containerHeight}
                    dispatch={dispatch}
                />
            </Drawer>
        </div>
    ) 
}
