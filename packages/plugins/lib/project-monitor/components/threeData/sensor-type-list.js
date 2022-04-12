'use strict';

 import React, { Component } from 'react'
 import {  Button, Collapse, Tree, Input, Radio } from 'antd';

 const Search = Input.Search;
 import SensorPoint from './sensor-point';
 
 import { PinyinHelper } from '@peace/utils';
 
 class SensorTypeList extends Component {
     constructor(props) {
         super(props);
 
         this.state = {
             modelSize: null,
             testStations: [],
             constStations: [],
             expandedKeys: [],
             autoExpandParent: true,
             searchValue: '',
             deployState: 'all'
         }
     }
 
     _changeData = (sensor) => {
         const { changeData } = this.props;
         changeData(sensor)
     }
 
     _getRightSpot = (spotInfo) => {
       
         const { getRightSpot } = this.props;
         
         getRightSpot && getRightSpot(spotInfo);
     }
     _deleteSpot = (sensor) => {
         const { changeData } = this.props;
         changeData(sensor)
     }
     _dragLabel = (sensorInfo, hotSpotPosition, intersection, face) => {
         const { dragLabel } = this.props;
         dragLabel(sensorInfo, hotSpotPosition, intersection, face)
     };
     onSaveInfo = (info) => {
         const { onSaveCurSpotInfo } = this.props;
         onSaveCurSpotInfo && onSaveCurSpotInfo(info);
     }
     _onLabelDragEnd = (sensorInfo, labelPosition) => {
         const { dragLabel, mouseInput, globelMesh } = this.props;
         let intersections = mouseInput.intersectObject(labelPosition, globelMesh, true);
         if (intersections.length > 0) {
             let hotSpotPosition = intersections[0].point;
 
             let intersection = intersections[0].face.normal.clone();
             intersection.multiplyScalar(10);
             intersection.add(intersections[0].point);
             let face = intersections[0].face.normal;
 
             dragLabel(sensorInfo, hotSpotPosition, intersection, face)
         }
     };
 
     UNSAFE_componentWillReceiveProps(nextProps) {
         const { sensorsSource, structSource, renderTypeList } = nextProps;
        
         if (JSON.stringify(structSource) !== JSON.stringify(this.props.structSource) || renderTypeList) {
             const { onRenderTypeList } = this.props;
             this._getTypeList(sensorsSource,structSource);
             onRenderTypeList();
         }
     }
 
     componentDidMount() {
        const { sensorsSource, structSource } = this.props;
         this._getTypeList(sensorsSource,structSource);
         //Ps.initialize(document.getElementById('SensorsBox'));
     }
 
     _getTypeList = (sensorsSource,structSource) => {
        
         let stationsDeployedMap = new Map();
         structSource.hotspots.forEach(s => {
             stationsDeployedMap.set(s.station.id, { position: s.position, station: s.station });
         })
         let groupKeys = [];//默认展开
         let stations = sensorsSource.reduce((p, theme) => {
             if (theme.groups.length) {
                 let sensors = [];
                 theme.groups.forEach(group => {
                     groupKeys.push(`0-${theme.factorId}-${group.id}`);
                     if (group.stations.length) {
                         group.stations.forEach(m => {
                             let camera = null, hotspot = null, hasSetted = 0;
                             if (stationsDeployedMap.get(m.id)) {
                                 camera = stationsDeployedMap.get(m.id).position.camera;
                                 hotspot = stationsDeployedMap.get(m.id).position.hotspot;
                                 hasSetted = 1;
                             }
                             sensors.push({
                                 factorId: theme.factorId,
                                 factorName: theme.factorName,
                                 groupId: group.id,
                                 groupName: group.name,
                                 location: m.name,
                                 sensorId: m.id,
                                 portrait: m.portrait,
                                 CameraInfo: camera,
                                 SpotInfo: hotspot,
                                 hasSetted: hasSetted
                             })
                         })
                     }
                 })
                 p.push({
                     factorId: theme.factorId,
                     name: theme.factorName,
                     sensors: sensors
                 })
             }
             return p;
         }, []);
         let groupStations = [];
         stations.forEach(item => {
             groupStations = groupStations.concat(item.sensors);
         });
         this.setState({
             testStations: groupStations,
             constStations: groupStations,//筛选用的
             expandedKeys: groupKeys
         }, () => {
             this.filterThreeSpots(this.state.deployState, this.state.searchValue);
         });
     }
     formatTreeSource = (data) => {
         if (!data || data.length == 0) return;
         let tempFactors = new Map();
         let tempGroups = new Map();
         data.forEach(station => {
             if (tempGroups.has(station.groupId)) {
                 let groupChildren = tempGroups.get(station.groupId).children;
                 station.key = `0-${station.factorId}-${station.groupId}-${station.sensorId}`;
                 groupChildren.set(station.sensorId, station);
             } else {
                 tempGroups.set(station.groupId, {
                     'key': `0-${station.factorId}-${station.groupId}`,
                     'factorId': station.factorId,
                     'factorName': station.factorName,
                     'location': station.groupName,
                     'groupId': station.groupId,
                     'children': new Map()
                 });
                 let groupChildren = tempGroups.get(station.groupId).children;
                 station.key = `0-${station.factorId}-${station.groupId}-${station.sensorId}`;
                 groupChildren.set(station.sensorId, station);
             }
         });
         tempGroups.forEach(item => {
             if (tempFactors.has(item.factorId)) {
                 let factorChildren = tempFactors.get(item.factorId).children;
                 item.key = `0-${item.factorId}-${item.groupId}`;
                 factorChildren.set(item.groupId, item);
             } else {
                 tempFactors.set(item.factorId, {
                     'key': `0-${item.factorId}`,
                     'factorId': item.factorId,
                     'location': item.factorName,
                     'children': new Map()
                 });
                 tempFactors.get(item.factorId).children.set(item.groupId, item);
             }
         });
         return tempFactors;
     }
 
     loop = (data) => {
         if (!data || data.length == 0) return [];
         const treeNodes = [];
         const { curSpotInfo } = this.props;
         data.forEach((item) => {
             if (item.children) {
                 treeNodes.push({
                    key: item.key, 
                    title: item.location, 
                    children: this.loop(item.children)
                 });
             } else {
                //  let titleProps = {
                //      info: item,
                //      children: item.children,
                //      onRemoveSpot: this.onRemoveSpot,
                //  };
                //  //性能优化,减少组件渲染
                //  if (this.state.changedTreeNodeKey == item.key) titleProps.key = Math.random();
                 let nodeTitle = <SensorPoint
                     info={item}
                     hasSetted={item.hasSetted}
                     onInfoClick={this.onSaveInfo}
                     //mouseInput={mouseInput}
                     //dragEnd={this._onLabelDragEnd}
                     deleteSpot={this._deleteSpot}
                     getRightSpot={this._getRightSpot}
                     selected={curSpotInfo && (curSpotInfo.sensorId == item.sensorId)}
                 />;
                 treeNodes.push({
                    key: item.key, 
                    title: nodeTitle
                 });
             }
         });
 
         return treeNodes;
     };
     onExpand = (expandedKeys) => {
         this.setState({
             expandedKeys,
             autoExpandParent: false,
         });
     };
     onSearch = (searchValue) => {
         this.filterThreeSpots(this.state.deployState, searchValue);
     };
     handleTypeChange = (e) => {
         this.filterThreeSpots(e.target.value, this.state.searchValue);
     };
 
     filterThreeSpots = (deployState, searchValue) => {
         let deploySpots = this.state.constStations;
         if (deployState != "all") {
             deploySpots = this.state.constStations.filter(s => s.hasSetted == (deployState == "notYet" ? 0 : 1));
         }
 
         let searchSpots = deploySpots;
         
         if (searchValue.trim().length > 0) {
             searchSpots = deploySpots.filter(s => {
                 return s.location.indexOf(searchValue) >= 0 || PinyinHelper.isPinyinMatched(s.location, searchValue);
             });
         }
 
         let keys = searchSpots.map(s => `0-${s.factorId}-${s.groupId}`);
       
         this.setState({
             searchValue,
             deployState,
             testStations: searchSpots,//todo
             expandedKeys: keys,//todo
             autoExpandParent: true,
         });
     };
     render() {
         //const { structSource, dataChanged } = this.props;
         const { deployState, typeList, testStations } = this.state;
         const treeDataSource = this.formatTreeSource(testStations);

         return (<div>
             <Radio.Group value={deployState} onChange={this.handleTypeChange}>
                <Radio.Button value="all">全部</Radio.Button>
                <Radio.Button value="notYet">未布点</Radio.Button>
                <Radio.Button value="already">已布点</Radio.Button>
             </Radio.Group>
             <div style={{ marginTop: -1 }}>
                 <Search
                     style={{ width: 300, borderRadius: 0 }}
                     onChange={e => this.onSearch(e.target.value)}
                     placeholder="关键字搜索"
                 />
             </div>
             <div id="SensorsBox" style={{ textAlign: 'left', height: this.props.clientHeight - 10, overflowY: 'auto' }}>
                 {!treeDataSource || treeDataSource.length == 0 ?
                     <div style={{ width: '100%', textAlign: 'center', marginTop: 10 }}><span>符合条件的记录数为0</span></div>
                     : <Tree
                         showLine
                         onExpand={this.onExpand}
                         expandedKeys={this.state.expandedKeys}
                         autoExpandParent={this.state.autoExpandParent}
                         treeData={this.loop(treeDataSource)}
                     >
                     </Tree>
                 }
             </div>
         </div>
         );
     }
 }
 export default SensorTypeList;
 