 import React, { Component } from 'react';
 import { connect } from 'react-redux';
 import { push } from 'react-router-redux';
 import { Spin, Button, Alert, Modal, message, Checkbox, Radio, Layout, Menu, InputNumber, Tag, Tooltip } from 'antd';
 import * as THREE from 'three';
 import { RollbackOutlined,SaveOutlined } from '@ant-design/icons';
 import SectionSetting from '../../components/threeData/section-setting';
 import SensorTypeList from '../../components/threeData/sensor-type-list';
 import ThreeUpload from './three-upload';
 import ThreeModel from '../../components/threeData/three-model';
 import ModelPreview from '../../components/threeData/model-preview';
 
 import { getCedian } from '../../actions/zuhe';
 import { getHeatMap } from '../../actions/threeHeatMap';
 import { saveHotspotSize, removeFile } from '../../actions/threeDataConfig';
 import { getstationsDeployed, modifystationsDeployed } from '../../actions/integrationInfo';
 import { createPointsImg, modifyPointsImg, deletePointsImg, cleanUpTrashImg } from '../../actions/pointsLayoutInfo';

 const { Header, Content, Sider } = Layout;

 import threeStyle from './3d-deploy-style.css';
 const ButtonGroup = Button.Group;
 const { SubMenu } = Menu;
 const Header_Height = 64;

 class ThreeDeploy extends Component {
     constructor(props) {
         super(props);
 
         this.isCounting = false;
         this.timeoutID = null;
         this.countDelayTime = 300000;
         this._structId = props.match.params.id;
         this.containerPadding = 16;
 
         this.state = {
             siderHeight: 0,
             containerHeight: window.innerHeight - 65 - 16 - 34,
             containerWidth: window.innerWidth - 340,
 
             dataChanged: false,
             renderTypeList: false,
 
             showSetUpBox: false,
             uploadVisible: false,
             mouseInput: null,
             globelMesh: null,
             cameraPosition: new THREE.Vector3(),
             cameraRotation: new THREE.Euler(),
             controlsTarget: new THREE.Vector3(),
             showSection: false,
             pushSpotSensorId: null,
             pushCameraPosition: null,
             pushSpotPosition: null,
 
             //isDeleteHotspots: false,
             showPreview: false,
             previewImgPath: '',
 
             initCamera: false,
             curSpotInfo: null,
             curControlSpotId: null,
             hotspotMode: 'translate',
             hotspotShowXYZ: ['x','y','z'],
             showModeControl: false,
             react3: null
         }
     }
 
     _getRightSpot = (spotInfo) => {
         this.setState({ curSpotInfo: null, pushSpotSensorId: spotInfo.sensorId, pushCameraPosition: spotInfo.CameraInfo, pushSpotPosition: spotInfo.SpotInfo })
     }
 
     _onModelMounted = (renderer, canvas, scene, camera, controls) => {
         this.setState({
            react3: {renderer, canvas, scene, camera, controls}
         })
     };
 
     _getCameraPosition = (position, rotation, target) => {
         this.setState({ cameraPosition: position, cameraRotation: rotation, controlsTarget: target })
     }
 
     _getGlobelMesh = (mesh) => {
         this.setState({ globelMesh: mesh })
     }
 
     _getMouseInput = (mouseInput) => {
         this.setState({ mouseInput: mouseInput })
     }
 
     show3D = () => {
         const { helpMessage } = this.refs;
         if (helpMessage.style.display == "none") {
             helpMessage.style.display = "block";
         } else {
             helpMessage.style.display = "none";
         }
     };
 
     initCameraPosition = () => {
         const { initCamera } = this.state;
         this.setState({ initCamera: !initCamera })
     }
 
     _onShowSectionClick = () => {
         const { showSection } = this.state;
         this.setState({
             showSection: !showSection,
             showSetUpBox: false,
         });
     };
 
     showSetUpBox = () => {
         const { showSetUpBox } = this.state;
         this.setState({
             showSection: false,
             showSetUpBox: !showSetUpBox
         });
     };
 
     handleUploadOK = (e) => {
         const { dispatch, stationsDeployed } = this.props;
         const { dataChanged, previewImgPath } = this.state;
 
         if (previewImgPath === '') {
             Modal.warning({
                 title: '模型修改提示',
                 content: '请上传模型后再保存！',
             });
             return;
         }
 
         stationsDeployed.hotspots.splice(0, stationsDeployed.hotspots.length);
         this._saveData();

         const heatmap = Object.assign({}, { "name": "结构物热点图", "typeId": 3, "camera": { "position": { x: 0, y: 0, z: 0 }, "rotation": { x: 0, y: 0, z: 0 }, "target": { x: 0, y: 0, z: 0 } }, "portrait": previewImgPath.replace("/_file-server/", "") });
         const param = Object.assign({}, { heatmap: heatmap, model: '3D' });
 
         dispatch(modifyPointsImg(stationsDeployed.heatmapId, param))//在这里删除截面
             .then(() => {
                 this._initContext();
                 this.setState({
                     hasHeatMap: false,
                     uploadVisible: false,
                     showPreview: false,
                     showSetUpBox: false,
                     showSection: false,
                     previewImgPath: ''
                 });
                 message.success("更新模型成功")
             });
     };
     handleUploadCancel = () => {
         if (this.state.previewImgPath) {
             this.props.dispatch(removeFile(this.state.previewImgPath.replace("/_file-server/", ""), "3D模型")).then(_ => {
                 this.setState({
                     uploadVisible: false,
                     showPreview: false,
                     previewImgPath: ''
                 })
             })
         } else {
             this.setState({
                 uploadVisible: false,
                 showPreview: false,
                 previewImgPath: ''
             })
         }
     };
     
     onLoadError = (previewImgPath) => {
        this.props.dispatch(removeFile(previewImgPath, "3D模型")).then(_ => {
            this.setState({
                showPreview: false,
                previewImgPath: ''
            })
        })
    };
     onReturnClick = () => {//返回
        const { match: { params }} = this.props;
         setTimeout(() => {
             this.props.dispatch(push(`/project-monitor/things/struct/${params.id}/configuration/3d`));
         }, 200);
     };
     _initContext = () => {
         const { dispatch, match: { params } } = this.props;
         const structId = parseInt(params.id);
         if (structId) {
             dispatch(getHeatMap(structId, '3D'))
                 .then(res => {
                     let heatmapId = res.payload.heatMap.filter(s => s.type.id == 3);
                     if(heatmapId.length > 0) {
                        dispatch(getstationsDeployed(heatmapId[0].id));
                     }
                     
                 })
                 .then(
                     _ => {
                         this.props.threeHeatMap[0].portrait ? this.setState({ hasHeatMap: true }) : this.setState({ hasHeatMap: false });
                     });
 
             dispatch(getCedian(structId));
         }
     };
 
     _onUploadDone = (imgPath) => {
         this.setState({
             previewImgPath: `/_file-server/${imgPath}`,
             showPreview: true,
         });
     };
 
     _saveData = () => {
         //保存热点数据
         const { dispatch, threeHeatMap, stationsDeployed } = this.props;
         let pushedData = stationsDeployed.hotspots.reduce((p, station) => {
             
             p.push({
                 "stationId": station.station.id,
                 "position": station.position
             })
             return p;
         }, [])
         dispatch(saveHotspotSize(stationsDeployed.heatmapId, stationsDeployed.hotspotsSize));
         dispatch(modifystationsDeployed(stationsDeployed.heatmapId, { "hotspots": pushedData }, true)).then(msg => {
             if (msg.success) {
                 message.success(msg.payload && msg.payload.data && msg.payload.data.message || '测点部署成功');
             }
             clearTimeout(this.timeoutID);
             this.isCounting = false;
             this.setState({ dataChanged: false })
         });
     }
    
     _dragLabel = (sensorInfo, hotSpotPosition, intersection, face) => {
         const { cameraPosition, cameraRotation, controlsTarget } = this.state;
         //拖拽添加热点
         const { stationsDeployed } = this.props;
         const hotspot = {
             "position": { "x": hotSpotPosition.x, "y": hotSpotPosition.y, "z": hotSpotPosition.z },
             "intersection": { "x": intersection.x, "y": intersection.y, "z": intersection.z },
             "face": { "x": face.x, "y": face.y, "z": face.z }
         }
         const camera = {
             "position": { "x": cameraPosition.x, "y": cameraPosition.y, "z": cameraPosition.z },
             "rotation": { "x": cameraRotation.x, "y": cameraRotation.y, "z": cameraRotation.z },
             "target": { "x": controlsTarget.x, "y": controlsTarget.y, "z": controlsTarget.z }
         }
         const station = { "id": sensorInfo.sensorId, "name": sensorInfo.location }
         stationsDeployed.hotspots.push(
             {
                 "id": sensorInfo.sensorId,
                 "position": { "camera": camera, "hotspot": hotspot },
                 "station": station
             }
         )
         this.setState({ dataChanged: sensorInfo ? true : false, renderTypeList: true });
     };
 
     _changeData = (hotSpot, cameraPosition, cameraRotation, controlsTarget) => {
         const { stationsDeployed } = this.props;
         if (hotSpot) {
             
             //TODO:修改热点数据
             stationsDeployed.hotspots.forEach((item, index) => {
                 if (item.id == hotSpot.id || item.station.id == hotSpot.sensorId) {
                     if (cameraPosition) {
                         let strCameraPosition = { "position": cameraPosition, "rotation": cameraRotation, "target": controlsTarget, };
                         item.position.camera = strCameraPosition;
                         item.position.hotspot = hotSpot.SpotInfo;
                     } else {
                         stationsDeployed.hotspots.splice(index, 1);
                         this.setState({renderTypeList: true });
                     }
                 }
             })
         } else {
             stationsDeployed.hotspots.splice(0, stationsDeployed.hotspots.length);
             this._saveData();
         }
 
         this.setState({ dataChanged: hotSpot ? true : false });
     }
 
     
 
     _onRenderTypeList = () => {
         this.setState({ renderTypeList: false })
     }
 
     countToSave = () => {
         const { dataChanged } = this.state;
         if (!this.isCounting) {
             if (dataChanged) {
                 this.timeoutID = setTimeout(this._saveData, this.countDelayTime);
                 this.isCounting = true;
             }
         }
     }
 
     _onWindowResize = () => {
         this.setState({
             containerHeight: window.innerHeight - 65 - 16 - 34,
             containerWidth: window.innerWidth - 340
         })
     }
 
     componentWillUnmount() {
        
         window.removeEventListener('resize', this._onWindowResize)
     }
 
     componentDidMount() {
         this.setSiderHeight();
         window.onresize = () => { this.setSiderHeight(); };
 
         window.addEventListener('resize', this._onWindowResize)
         const { dispatch, match: {params}, threeHeatMap } = this.props;
         //if (!threeHeatMap) {//todo
         const structId = parseInt(params.id);
         if (structId) {
             this._initContext();
         }
         //}
     }
     setSiderHeight = () => {
         let height = innerHeight - Header_Height;
         let width = innerWidth - 300 - 64;
         this.setState({
             siderHeight: height,
         });
     };
     saveCurSpotInfo = info => {
         this.setState({
             curSpotInfo: info
         })
     }
     addHotspot = spotInfo => {
        const { stationsDeployed } = this.props;
        stationsDeployed.hotspots.push(spotInfo);
        this.setState({
            curSpotInfo: null,
            renderTypeList: true
        })
     }
    onShowModeControl = (curControlSpotId,showModeControl = false) => {
        this.setState({ curControlSpotId,showModeControl });
        
    }
    onModeChange = (e) => {
        this.setState({ hotspotMode: e.target.value });
    }
    onShowXYZChange = (value)=> {
        this.setState({ hotspotShowXYZ: value });
    }
    _onModelSizeChange = (value) => {
        const { stationsDeployed } = this.props;
        let relValue = value == "" ? 1 : value
        stationsDeployed.hotspotsSize = relValue;
        this.setState({ dataChanged: relValue ? true : false });
    }
   
     render() {
         const { isRequesting, threeHeatMapSaveMsg, threeHeatMap, stationswithFollow, 
             saveSectionIsRequesting, user, dispatch, match: {params}, stationsDeployed } = this.props;
         const { dataChanged, renderTypeList, containerWidth, containerHeight,
             showSetUpBox, globelMesh, uploadVisible, showPreview,previewImgPath,
             showSection, pushSpotSensorId, pushCameraPosition, pushSpotPosition, initCamera, hasHeatMap, curSpotInfo,
             hotspotMode,hotspotShowXYZ,react3,curControlSpotId,showModeControl
         } = this.state;
         
         this.countToSave();
         const heatmap = Object.assign({}, { "name": "结构物热点图", "typeId": 3, "camera": { "position": { x: 0, y: 0, z: 0 }, "rotation": { x: 0, y: 0, z: 0 }, "target": { x: 0, y: 0, z: 0 } }, "portrait": previewImgPath.replace("/_file-server/", "") });
         const resources = user.resources;
         const UpdateModel = resources.length == 0 ? false : resources.indexOf("007001") > -1 ? true : false;
         let structName = threeHeatMap ? threeHeatMap[0].structName : "";
         return (
             <Layout id="deploy3D">
                 <Header className="header">
                     <div className={threeStyle.title}>
                         <h3 >
                             {`${structName}`}
                             {`-3D测点布设`}
                         </h3>
                     </div>
                     {/* <Menu
                         theme="dark"
                         mode="horizontal"
                         className={threeStyle['header-item']}
                     >
                         <SubMenu key="return" title={<div style={{ width: 64, height: 64 }} onClick={this.onReturnClick}><RollbackOutlined />返回</div>}>
                         </SubMenu>
                     </Menu> */}
                     <div className={threeStyle['header-item']}>
                         <Button type="primary" className={threeStyle['save-button']} onClick={this.onReturnClick}>
                         <RollbackOutlined />返回
                         </Button>
                     </div>
 
                     <div className={threeStyle['header-item']}>
                         <Button type="primary" className={threeStyle['save-button']} onClick={this._saveData}>
                         <SaveOutlined />保存
                         </Button>
                     </div>
                 </Header>
                 <Layout>
                     <Sider width={300} style={{ background: '#fff', height: this.state.siderHeight }}>
                         {!isRequesting && stationsDeployed ?
                             <div className={threeStyle['search-panel']}>
                                 <SensorTypeList
                                     sensorsSource={stationswithFollow}
                                     structSource={stationsDeployed}
                                     dataChanged={dataChanged}
                                     renderTypeList={renderTypeList}
                                     onRenderTypeList={this._onRenderTypeList}
                                     globelMesh={globelMesh}
                                     changeData={this._changeData}
                                     dragLabel={this._dragLabel}
                                     getRightSpot={this._getRightSpot}
                                     clientHeight={this.props.clientHeight}
                                     onSaveCurSpotInfo={this.saveCurSpotInfo}
                                     curSpotInfo={curSpotInfo}
                                 />
                             </div>
                             : ''}
                         <div className={threeStyle['sider-footer']}>选中测点，在模型上点击位置布设</div>
                     </Sider>
                     <Layout style={{ padding: '24px' }}>
                         <Spin spinning={isRequesting}>
                             {!isRequesting && threeHeatMap && stationsDeployed ?
                                 <div id="management-content" style={{ position: 'relative', height: containerHeight }}>
                                     <div style={{ position: 'absolute', width: 800, top: 16, left: 16, zIndex: 2 }}>
                                         
                                         <Tag>布点尺寸:
                                             <InputNumber style={{ margin: 2 }} min={1} max={100} defaultValue={stationsDeployed.hotspotsSize} onChange={this._onModelSizeChange} />
                                         </Tag>
                                       
 
                                         <Button style={{ marginLeft: 2 }} type={showSection ? 'primary' : 'default'} onClick={this._onShowSectionClick}>截面配置</Button>

                                         {UpdateModel ? <Button type='default' style={{ margin: '0 10px' }} onClick={() => this.setState({ uploadVisible: true })}>更新模型</Button> : null}
                                         
                                         <Modal title="更新模型" visible={uploadVisible} maskClosable={false}
                                             onOk={this.handleUploadOK} onCancel={this.handleUploadCancel}
                                         >
                                             <Alert style={{ marginBottom: 16 }} message="更新模型将同时删除其截面和已布测点" type="warning" />
 
                                             {showPreview ?
                                                <ModelPreview width={490} height={360}  previewImgPath={previewImgPath} />
                                                 : <ThreeUpload structId={this._structId} onLoadError={this.onLoadError} onUploadDone={this._onUploadDone} user={user} />
                                             }
                                            
                                         </Modal>
 
                                         <Button value="refresh" onClick={this.initCameraPosition}>全局视角</Button>
                                         {
                                            showModeControl && 
                                            <Tag style={{ padding: 4, marginLeft: 10 }}>坐标轴显示：
                                                <Checkbox.Group style={{marginLeft: 5}} onChange={this.onShowXYZChange} defaultValue={hotspotShowXYZ}>
                                                <Checkbox value="x">X轴</Checkbox>
                                                <Checkbox value="y">Y轴</Checkbox>
                                                <Checkbox value="z">Z轴</Checkbox>
                                                </Checkbox.Group>
                                             </Tag>
                                         }
                                     </div>
                                     <div style={{ position: 'absolute', top: 16, right: '2%', zIndex: 2 }}>
                                         {/* <Radio.Group>
                                             <Button className={Style.resetBtn} value="refresh" onClick={this.initCameraPosition}>全景</Button> */}
                                         <Button value="help" onMouseOver={this.show3D} onMouseOut={this.show3D}>操作指南</Button>
                                         {/* </Radio.Group> */}
                                         <img ref="helpMessage" src='/assets/images/help.jpg' alt='' style={{
                                             display: 'none',
                                             position: 'absolute',
                                             width: '500%',
                                             right: '50%',
                                             top: '30px',
                                             zIndex: 200
                                         }} />
                                     </div>
                                     {hasHeatMap ?
                                         <ThreeModel
                                             showSetUpBox={showSetUpBox}
                                             structSource={stationsDeployed && JSON.stringify(stationsDeployed)}
                                             changeData={this._changeData}
                                             getMouseInput={this._getMouseInput}
                                             getGlobelMesh={this._getGlobelMesh}
                                             getCurrentCameraPosition={this._getCameraPosition}
                                             pushSpotSensorId={pushSpotSensorId}
                                             pushCameraPosition={pushCameraPosition}
                                             pushSpotPosition={pushSpotPosition}
                                             initCamera={initCamera}
                                             width={containerWidth}
                                             height={containerHeight}
                                             onModelMounted={this._onModelMounted}
                                             curSpotInfo={curSpotInfo}
                                             createSpot={this.addHotspot}
                                             hotspotMode={hotspotMode}
                                             hotspotShowXYZ={hotspotShowXYZ}
                                             curControlSpotId={curControlSpotId}
                                             onShowModeControl={this.onShowModeControl}
 
                                         />
                                         : null
                                     }
                                     {showSection ? <SectionSetting
                                         isSaving={saveSectionIsRequesting}
                                         structId={this._structId}
                                         sections={threeHeatMap.filter(s => s.type.id == 4)}
                                         react3={react3}
                                         dispatch={dispatch}
                                         params={params}
                                     /> : null
                                     }
                                 </div>
                                 :
                                 null
                             }
                         </Spin>
                     </Layout>
                 </Layout>
             </Layout >
         )
     }
 }
 
 function mapStateToProps(state) {
     const { threeHeatMap, staionsDeployedList, cedian, saveThreeHeatMap, pointsImgList, auth, global } = state;
     let isRequesting = cedian.isRequesting || threeHeatMap.isFetching;
 
     let err1 = threeHeatMap.error, err2 = saveThreeHeatMap.error;
     let error = `${!err1 ? '' : `${err1};`}${!err2 ? '' : `${err2};`}`;
 
     return {
         clientHeight: global.clientHeight,
         user: auth.user,
         isRequesting: isRequesting,
         isSaving: saveThreeHeatMap.isRequesting,
         error: error,
         threeHeatMap: threeHeatMap.heatMap,
         stationsDeployed: staionsDeployedList.data,
         stationswithFollow: cedian.data || [],
         threeHeatMapSaveMsg: saveThreeHeatMap.saveThreeHeatMapMsg,
 
         saveSectionIsRequesting: pointsImgList.isSaving,
     };
 };
 
 export default connect(mapStateToProps)(ThreeDeploy)