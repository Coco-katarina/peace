import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Spin, Button, Alert, Row, Col, Modal, Result, message } from 'antd';
import ThreeSection from '../../components/threeData/three-section';
import ThreeHeatMap from '../../components/threeData/heat-map';
import { removeFile } from '../../actions/threeDataConfig';
import { modifystationsDeployed } from '../../actions/integrationInfo';
import { modifyPointsImg } from '../../actions/pointsLayoutInfo';
import ThreeUpload from './three-upload';
import ModelPreview from '../../components/threeData/model-preview';
import ErrorBoundary from '../error';
import styleBox from '../../style.css';

class ThreeDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changedCameraInfo: '',
            isShow3D: 'none',
            containerHeight: window.innerHeight - 65 - 16 - 32 - 24 * 2 - 29 - 24 - 37 - 58,
            containerWidth: window.innerWidth - 298,
            handleSectionChange: false,
            uploadVisible: false,
            showPreview: false,
            previewImgPath: '',
        }
    }
    // static propTypes = {
    //     params: PropTypes.object.isRequired,
    //     heatMap: PropTypes.object.isRequired,
    //     sectionItems: PropTypes.array.isRequired
    // }

    _finishCameraChange = () => {
        this.setState({ handleSectionChange: false })
    }

    _onSectionClick = (section) => {
        this.setState({ handleSectionChange: true, changedCameraInfo: section.camera })
    }

    show3D = () => {
        this.setState({
            isShow3D: 'block',
        });
    }
    hide3D = () => {
        this.setState({
            isShow3D: 'none',
        });
    }

    showTips = () => {
        this.refs.tipsBox.style = '';
        this.refs.slideRight.style = '';
        setTimeout(() => {
            this.refs.slideLeft.style.display = 'block';
        }, 800)
    }


    hideTips = () => {
        this.refs.tipsBox.style.left = '-160px';
        setTimeout(() => {
            this.refs.slideRight.style.display = 'block';
            this.refs.slideRight.style.opacity = 1;
            this.refs.slideLeft.style.display = 'none';
        }, 800)
    }

    _onWindowResize = () => {
        this.setState({
            containerHeight: window.innerHeight - 65 - 16 - 32 - 24 * 2 - 29 - 24 - 37 - 58,
            containerWidth: window.innerWidth - 298
        })
    }

    _editModel = () => {
        const {  params } = this.props;
        const structId = params.id;
        this.props.dispatch(push(`/project-monitor/things/struct/${structId}/configuration/3d/deploy`));
    }

    _renderHeatmap = () => {
        const { heatMap } = this.props;

        const { handleSectionChange, changedCameraInfo, containerHeight, containerWidth } = this.state;
        if (!heatMap) return null;
        if (!heatMap.portrait) {
            return <Row style={{ marginTop: '200px' }}>
                <Col span="8"></Col>
                <Col span="8" style={{ textAlign: 'center' }}><h3>未配置三维热点图，不提供热点拓扑功能</h3></Col>
                <Col span="8"></Col>
            </Row>;
        }

        return (
                <ThreeHeatMap
                    heatMap={heatMap}
                    width={containerWidth}
                    height={containerHeight}
                    changedCameraInfo={changedCameraInfo}
                    handleSectionChange={handleSectionChange}
                    endCameraChange={this._finishCameraChange}
                />
        )
        
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this._onWindowResize)
    }

    componentDidMount() {
        const { dispatch } = this.props;

        window.addEventListener('resize', this._onWindowResize);
    }

    handleUploadOK = (e) => {
        const { dispatch, heatMap: stationsDeployed, onReLoad } = this.props;
        const { previewImgPath } = this.state;

        if (previewImgPath === '') {
            Modal.warning({
                title: '模型修改提示',
                content: '请上传模型后再保存！',
            });
            return;
        }

        dispatch(modifystationsDeployed(stationsDeployed.heatmapId, { "hotspots": [] }, true))

        const heatmap = Object.assign({}, { "name": "结构物热点图", "typeId": 3, "camera": { "position": { x: 0, y: 0, z: 0 }, "rotation": { x: 0, y: 0, z: 0 }, "target": { x: 0, y: 0, z: 0 } }, "portrait": previewImgPath.replace("/_file-server/", "") });
        const param = Object.assign({}, { heatmap: heatmap, model: '3D' });

        dispatch(modifyPointsImg(stationsDeployed.heatmapId, param))//在这里删除截面
            .then(() => {
              
                this.setState({
                    uploadVisible: false,
                    showPreview: false,
                    previewImgPath: ''
                });

                onReLoad && onReLoad();

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
    
    _onUploadDone = (imgPath) => {
         this.setState({
             previewImgPath: `/_file-server/${imgPath}`,
             showPreview: true,
         });
     };
    errorRender = () => {
        const { user } = this.props;
        const resources = user.resources;
         const UpdateModel = resources.length == 0 ? false : resources.indexOf("007001") > -1 ? true : false;
        return (
            <div style={{ marginTop: 16, height: 400 }}>
                <div style={{ marginTop: 16, height: '100%' }}>
                    <Result
                        status="warning"
                        title="无法加载该模型"
                        extra={
                            UpdateModel ? <Button type="primary" key="console" onClick={() => this.setState({ uploadVisible: true })}>
                            更新模型
                        </Button>: null
                        }
                    />
                </div>
            </div>
        )
    }

    render() {
        const { heatMap, sectionItems, user } = this.props;
        const { containerWidth, containerHeight,uploadVisible,showPreview,previewImgPath } = this.state;
        
        return (
            <div style={{ position: 'relative', height: containerHeight }}>
                <div style={{ color: '#000000' }}>
                    {heatMap && heatMap.portrait ?
                        <div>
                            <div className={styleBox.help_box}>
                                <div style={{ marginTop: 10, float: "right" }}>
                                    <Button type="default" onMouseOver={this.show3D} onMouseOut={this.hide3D} ghost>
                                        操作指南
                                        <img className={styleBox.help_img} src='/assets/images/help.jpg' alt='' style={{ display: this.state.isShow3D }} />
                                    </Button>
                                    <Button style={{ marginLeft: 10 }} type="default" onClick={this._editModel} ghost >测点布设</Button>

                                </div>
                            </div>
                            <div className={styleBox.section_box}>
                                <ThreeSection
                                    threeSection={this.props.sectionItems}
                                    onSectionClick={this._onSectionClick}
                                />
                            </div>
                        </div>
                        : null
                    }
                </div>
                <ErrorBoundary errorRender={this.errorRender()}>
                    {this._renderHeatmap()}
                </ErrorBoundary>
                <Modal 
                    title="更新模型" 
                    visible={uploadVisible} 
                    maskClosable={false} 
                    onOk={this.handleUploadOK} 
                    onCancel={this.handleUploadCancel}
                >
                    <Alert style={{ marginBottom: 16 }} message="更新模型将同时删除其截面和已布测点" type="warning" />
 
                    {showPreview ?
                    <ModelPreview width={490} height={360}  previewImgPath={previewImgPath} />
                        : <ThreeUpload  onLoadError={this.onLoadError} onUploadDone={this._onUploadDone} user={user} />
                    }
                                            
               </Modal>
            </div>
        )
    }
}

export default connect()(ThreeDisplay);
