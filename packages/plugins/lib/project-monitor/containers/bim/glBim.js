import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Spin, Dropdown, Row, Col, Slider } from 'antd';
import { push } from 'react-router-redux';
import { getBimPath, GET_BIM_PATH_SUCCESS, GET_BIM_STATIONS_SUCCESS, getBimStations } from '../../actions/bim';
import { EditOutlined } from '@ant-design/icons';

const stationIcon = '/assets/images/sensor-yellow.svg';
const optionButtonStyle = {
    width: 100
}

class GlBim extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bimIframeHeight: '100%',
            bimIframeWidth: '100%',
            isModelReady: false,
            isBimStationsReady: false,
        }
    }

    _onWindowResize = () => {
        this.setState({
            bimIframeWidth: window.innerWidth - 200 - 16 * 4,
            bimIframeHeight: window.innerHeight - 65 - 32 - 143 - 16 - 40,
            // isModelReady: false,
            //操作
            showExplosionSlider: false,
            expSliderValue: 0,
            showClipSlider: false,
            xClipSliderValue: [0, 100],
            yClipSliderValue: [0, 100],
            zClipSliderValue: [0, 100],
            showClearSlider: false,
            clearSliderValue: 100,
            isWireFrameModal: false,
            // isBimStationsReady: false,
        })
    }

    UNSAFE_componentWillMount() {
        const { dispatch, match: { params } } = this.props;
        const that = this;
        this._onWindowResize();
        window.addEventListener('resize', this._onWindowResize);
        window.OnLoadModelEnd = function (tag) {
            that.setState({ isModelReady: true });
            dispatch(getBimStations(params.id)).then(res_ => {
                if (res_.type == GET_BIM_STATIONS_SUCCESS) {
                    that.drawBimStations();
                }
                that.setState({ isBimStationsReady: true })
            });
        };
    }

    componentDidMount() {
        this._onWindowResize();
        const { dispatch, match: { params } } = this.props;
        EngineInit('bimIframe', true, '/assets/js/glendale-bim/cube.glb');
        dispatch(getBimPath(params.id)).then(res => {
            if (res.type == GET_BIM_PATH_SUCCESS) {
                let path = res.payload.bimPath;
                if (path && path.indexOf('daxiangyun') == -1) {
                    AddModel(path, params.id);
                }
            }
        });
    }

    drawBimStations = () => {
        let { bimMsg } = this.props;
        if (bimMsg.stations) {
            for (let s of bimMsg.stations) {
                AddAnchor(s.point, stationIcon, 13, 13, s.stationId, true);
            }
        }
    }

    _editModel = () => {
        const { match: { params }, dispatch, struct } = this.props;
        dispatch(push(`/project-monitor/things/struct/${params.id}/configuration/bim/glbimedit?${struct.name}`))
    }

    showAllAnchor = (boolean) => {
        const { bimMsg } = this.props;
        let bimStations = bimMsg.stations;
        for (let s of bimStations) {
            ShowAnchor(s.stationId, boolean)
        }
    }

    changeExSliderShow = () => {//爆炸
        const { showExplosionSlider, isSetPointing, showClipSlider } = this.state;
        if (showExplosionSlider) {//关闭
            this.closeExpSlider();
        } else {
            if (isSetPointing) {
                return message.warning('请先取消或完成当前操作')
            }
            if (showClipSlider) {
                this.closeClipSlider();
            }
            this.setState({ showExplosionSlider: true })
        }
        this.showAllAnchor(showExplosionSlider)
    }
    expValueChange = (v) => {
        this.setState({ expSliderValue: v })
        try {
            PopOut(v);
        } catch (e) {
            console.log(e);
        }
    }
    closeExpSlider = () => {
        this.setState({ showExplosionSlider: false })
        this.expValueChange(0);
    }
    changeClipSliderShow = () => {//剖切
        const { showClipSlider, showExplosionSlider, isSetPointing } = this.state;
        if (showClipSlider) {//close
            this.closeClipSlider()
        } else {
            if (isSetPointing) {
                return message.warning('请先取消或完成当前操作')
            }
            if (showExplosionSlider) {
                this.closeExpSlider();
            }
            this.setState({ showClipSlider: true })
        }
        this.showAllAnchor(showClipSlider)
    }
    closeClipSlider = () => {
        this.setState({
            xClipSliderValue: [0, 100],
            yClipSliderValue: [0, 100],
            zClipSliderValue: [0, 100],
        });
        this.setState({ showClipSlider: false })
        ResetClip()
    }
    xClipValueChange = (v) => {
        this.setState({ xClipSliderValue: v })
        PlateClip('x-min', v[0] / 100);
        PlateClip('x-max', (100 - v[1]) / 100);
    }
    yClipValueChange = (v) => {
        this.setState({ yClipSliderValue: v })
        PlateClip('y-min', v[0] / 100);
        PlateClip('y-max', (100 - v[1]) / 100);
    }
    zClipValueChange = (v) => {
        this.setState({ zClipSliderValue: v })
        PlateClip('z-min', v[0] / 100);
        PlateClip('z-max', (100 - v[1]) / 100);
    }
    changeClearSliderShow = () => {//透明度
        const { showClearSlider } = this.state;
        this.setState({ showClearSlider: !showClearSlider })
    }
    clearValueChange = (v) => {
        const { match: { params } } = this.props;
        this.setState({ clearSliderValue: v })
        SetModelAlpha(params.id, v / 100)
    }
    setModelWireFrame = () => {//线框
        const { isWireFrameModal } = this.state;
        const { match: { params } } = this.props;
        if (isWireFrameModal) {
            this.setState({ isWireFrameModal: false })
            SetModelNomal(params.id)
        } else {
            this.setState({ isWireFrameModal: true })
            SetModelWireFrame(params.id)
        }
    }
    saveImage = () => {
        SaveImage()
    }

    render() {
        const { bimIframeHeight, bimIframeWidth, isModelReady,
            showExplosionSlider, expSliderValue, showClipSlider, xClipSliderValue, yClipSliderValue, zClipSliderValue,
            showClearSlider, clearSliderValue, isWireFrameModal, isBimStationsReady } = this.state;
        const { bimMsg, isStructRequesting, struct, match, location } = this.props;
        let isRequesting = isStructRequesting || bimMsg.pathRequesting;
        return (
                <Spin spinning={isRequesting}>
                    <div>
                        <Card style={{ height: 300, display: bimMsg.bimPath ? 'none' : 'block', textAlign: 'center' }}>
                            <p>上传BIM模型， 请联系我们</p>
                        </Card>
                        <div style={{ visibility: bimMsg.bimPath ? 'visible' : 'hidden' }}>
                            <div id="bimIframe" style={{ height: bimIframeHeight, width: bimIframeWidth }}></div>
                            <Button onClick={this._editModel} style={{ position: 'fixed', bottom: 50, right: 100, zIndex: 777 }} icon={<EditOutlined />}>配置</Button>
                            {
                                isModelReady && isBimStationsReady ?
                                    <div style={{ zIndex: 666, textAlign: 'center', position: 'absolute', width: '100%', height: 30, bottom: 20 }}>
                                        <Button.Group style={{ textAlign: 'center' }} >
                                            <Button style={optionButtonStyle}>
                                                <Dropdown
                                                    overlay={
                                                        <Card style={{ width: 200, padding: '0 7px' }}>
                                                            <Slider
                                                                style={{ padding: '10px 0 15px 0' }}
                                                                value={expSliderValue}
                                                                onChange={this.expValueChange}
                                                            />
                                                        </Card >
                                                    }
                                                    placement="topCenter"
                                                    trigger={['click']}
                                                    visible={showExplosionSlider}

                                                >
                                                    <div onClick={this.changeExSliderShow}>爆炸效果</div>
                                                </Dropdown>
                                            </Button>
                                            <Button style={optionButtonStyle}>
                                                <Dropdown
                                                    overlay={
                                                        <Card style={{ width: 200, position: 'relative', bottom: 10 }}>
                                                            <Row>
                                                                <Col span={3} style={{ position: 'relative', top: 5 }}>X轴</Col>
                                                                <Col span={20}>
                                                                    <Slider
                                                                        range={true}
                                                                        value={xClipSliderValue}
                                                                        onChange={this.xClipValueChange}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col span={3} style={{ position: 'relative', top: 5 }}>Y轴</Col>
                                                                <Col span={20}>
                                                                    <Slider
                                                                        range={true}
                                                                        value={yClipSliderValue}
                                                                        onChange={this.yClipValueChange}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col span={3} style={{ position: 'relative', top: 5 }}>Z轴</Col>
                                                                <Col span={20}>
                                                                    <Slider
                                                                        range={true}
                                                                        value={zClipSliderValue}
                                                                        onChange={this.zClipValueChange}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Card >
                                                    }
                                                    placement="topCenter"
                                                    trigger={['click']}
                                                    visible={showClipSlider}
                                                >
                                                    <div onClick={this.changeClipSliderShow}>剖切</div>
                                                </Dropdown>
                                            </Button>
                                            <Button style={optionButtonStyle} onClick={this.setModelWireFrame} type={isWireFrameModal ? 'primary' : 'default'}>
                                                线框模式
                                        </Button>
                                            <Button style={optionButtonStyle} onClick={this.saveImage}>
                                                生成图片
                                        </Button>
                                            <Button style={optionButtonStyle}>
                                                <Dropdown
                                                    overlay={
                                                        <Card style={{ width: 200, padding: '0 7px' }}>
                                                            <Slider
                                                                style={{ padding: '10px 0 15px 0' }}
                                                                value={clearSliderValue}
                                                                onChange={this.clearValueChange}
                                                            />
                                                        </Card >
                                                    }
                                                    placement="topCenter"
                                                    trigger={['click']}
                                                    visible={showClearSlider}

                                                >
                                                    <div onClick={this.changeClearSliderShow}>透明度</div>
                                                </Dropdown>
                                            </Button>
                                        </Button.Group>
                                    </div>
                                    : ''
                            }
                        </div>
                    </div>
                </Spin>
        )
    }
}

function mapStateToProps(state) {
    let { singleStructState, bim } = state;
    if (bim.bimPath && bim.bimPath.indexOf('daxiangyun') >= 0) {
        bim.bimPath = null;
    }
    let nextBimStations = [];
    if (bim.stations && bim.bimPath) {
        for (let s of bim.stations) {
            if (!s.bbox) {
                nextBimStations.push(s);
            }
        }
        bim.stations = nextBimStations;
    }
    return {
        struct: singleStructState.data || {},
        isStructRequesting: singleStructState.isRequesting,
        bimMsg: bim,
    }
}

export default connect(mapStateToProps)(GlBim);