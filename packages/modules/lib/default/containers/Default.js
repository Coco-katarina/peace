import React, { Component } from 'react';
import { Card, Row, Col, Modal, Spin } from 'antd';
import Style from '../style.css';
import boxStyle from '../style.css';
import { connect } from 'react-redux';
import { getWholeview } from '../actions/wholeview';
import ProjectCard from '../components/project'
import ProductCard from '../components/product';
import StructCard from '../components/structCard'
import DataFlow from '../components/dataFlow'
import { SettingOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';

class Default extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            currentImg: [],
        }
    }

    componentDidMount() {
        const { dispatch, user } = this.props;
        dispatch(getWholeview(user.orgId));
    }

    handleManage = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        localStorage.setItem("cardtOrders", this.state.currentImg);
        this.setState({
            visible: false,
        });
    };
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    judge = (obj) => {
        for (var i in obj) {//如果不为空，则会执行到这一步，返回true
            return true;
        }
        return false;
    };

    handleImgClick = (e) => {
        if (this.state.currentImg.indexOf(e) == -1) {
            this.state.currentImg.push(e)
        }
        this.setState({ currentImg: this.state.currentImg })
    }

    handleImgRemove = (e) => {
        const arr = this.state.currentImg;
        const val = e;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                arr.splice(i, 1);
                break;
            }
        }
        this.setState({ currentImg: arr })
    }

    judgeColor = (num) => {
        if (num < 0) {
            return '#FE5500';
        } else if (num > 0) {
            return '#37BD2B';
        } else if (num == 0) {
            return '#CED1D7';
        } else {
            return 'black';
        }
    }

    judgeOrder = (card) => {
        switch (card) {
            case card = "struct":
                return <StructCard />
            case card = "dataflow":
                return <DataFlow />
            case card = "device":
                return <ProductCard />
            case card = "project":
                return <ProjectCard />
        }
    }

    judgeTitle = (card) => {
        switch (card) {
            case card = "struct":
                return "结构物分布"
            case card = "dataflow":
                return "数据流量"
            case card = "device":
                return "设备统计"
            case card = "project":
                return "项目统计"
        }
    }

    setWholeViewIncrement = (data, fixed = false, unit = false) => {
        return data == null ?
            '--' :
            data == 0 ?
                '+' + 0 :
                data > 0 ?
                    '+' + (fixed ? data.toFixed(2) : data) + (unit ? `( ${unit})` : '') :
                    '-' + (fixed ? data.toFixed(2) : data) + (unit ? `( ${unit})` : '');
    }

    render() {
        const { wholeview, isRequesting } = this.props;
        const imgStyle = { width: '90%', height: '60%', marginTop: '15px' }

        const large = { fontSize: '25px', fontWeight: 'bold' }
        const lastweek = { fontSize: 12, color: '#CED1D7', marginLeft: 4 }
        const cardtOrders = localStorage.getItem("cardtOrders");
        let wholeData = this.judge(wholeview) == false ? '' : wholeview.dataVolume.total == null ? 0 : wholeview.dataVolume.total;
        let newData = this.judge(wholeview) == false ? '' : wholeview.dataVolume.increment == null ? '--' : wholeview.dataVolume.increment;

        const unitMap = {
            0: '条',
            1: '万条',
            2: '亿条',
            3: '万亿条'
        }

        let wholeIndex = 0;
        while (wholeData > 10000) {
            wholeData = wholeData / 10000;
            wholeIndex++;
        }
        const wholeUnit = unitMap[wholeIndex];

        let newIndex = 0;
        while (newData > 10000) {
            newData = newData / 10000;
            newIndex++;
        }
        const NewUnit = unitMap[newIndex];

        return <div>
            <Card title={'总览'} extra={
                <a>
                    <SettingOutlined onClick={this.handleManage} style={{ fontSize: 18 }} />
                </a>
            }
                className={Style.integration_main}
            >
                {
                    this.judge(wholeview) ?
                        <Row>
                            {
                                [{
                                    key: 'computer',
                                    title: `总数据量(${wholeUnit})`,
                                    data: wholeData.toFixed(wholeIndex > 0 ? 2 : 0),
                                    colorJudge: wholeview.dataVolume.increment,
                                    increment: this.setWholeViewIncrement(newData, newIndex > 0, NewUnit),
                                }, {
                                    key: 'xinjian',
                                    title: `发布项目(个)`,
                                    data: wholeview.projects.total == null ? '--' : wholeview.projects.total,
                                    colorJudge: wholeview.projects.increment,
                                    increment: this.setWholeViewIncrement(wholeview.projects.increment),
                                }, {
                                    key: 'jianzhu',
                                    title: `结构物(个)`,
                                    data: wholeview.structures.total == null ? '--' : wholeview.structures.total,
                                    colorJudge: wholeview.structures.increment,
                                    increment: this.setWholeViewIncrement(wholeview.structures.increment),
                                }, {
                                    key: 'chuanganqi',
                                    title: `设备(个)`,
                                    data: wholeview.devices.total == null ? '--' : wholeview.devices.total,
                                    colorJudge: wholeview.devices.increment,
                                    increment: this.setWholeViewIncrement(wholeview.devices.increment),
                                }].map(s => (
                                    <Col span={6} key={s.key} className={Style.item}>
                                        <Row>
                                            <i className={`icon sc icon-${s.key}`}></i>
                                            <div style={{
                                                height: 46,
                                                position: 'relative',
                                                bottom: 3
                                            }}>
                                                <p>{s.title}</p>
                                                <p>
                                                    <span style={large}>{s.data}</span>
                                                    <span style={{ fontSize: 12, marginLeft: 8, color: `${this.judgeColor(s.colorJudge)}` }}>{s.increment}</span>
                                                    <span style={lastweek}>本周</span>
                                                </p>
                                            </div>
                                        </Row>
                                    </Col>
                                ))
                            }
                        </Row> : ''
                }
            </Card>
            <Row>
                {
                    (cardtOrders && cardtOrders.length ? cardtOrders.split(',') : ['struct', 'device', 'dataflow', 'project']).map((item, key, arr) => {
                        const paddingLeft = (key + 1) % 2 == 0 ? 10 : 0
                        const marginTop = key > 1 ? 15 : ''
                        return (
                            <Col key={key} style={{ paddingLeft: paddingLeft, marginTop: marginTop }} span={12}>
                                <Card bodyStyle={{ padding: 0 }} style={{ height: '350px' }} title={
                                    <Row><Col span={22}>{this.judgeTitle(item)}</Col></Row>}
                                >
                                    {this.judgeOrder(item)}
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>

            <Modal
                maskClosable={false}
                title="卡片布局调整"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width='80%'
            >
                <Row style={{ backgroundColor: '#ECECEC', padding: '16px', minHeight: '300px' }}>
                    {
                        this.state.currentImg.map((item, key, arr) => {
                            return <Col span={12} className={boxStyle.wrap} onClick={this.handleImgRemove.bind('', item)}><a >
                                <div style={{ position: 'absolute', top: '100px', fontSize: '40px', textAlign: 'center', width: '85%' }}><span><CloseOutlined /></span></div>
                                <img style={{ width: '90%', height: '260px', marginTop: '15px' }} src={"/assets/images/wholeView/" + `${item}` + ".jpg"} /></a>
                            </Col>
                        })
                    }
                </Row>

                <div style={{ borderTopColor: '#D9D9D9', borderTopWidth: '1px', borderTopStyle: 'solid', marginTop: '30px' }} >
                    <Row>
                        {
                            [{
                                bind: 'struct',
                                name: '结构物分布'
                            }, {
                                bind: 'dataflow',
                                name: '数据流量'
                            }, {
                                bind: 'device',
                                name: '设备统计'
                            }, {
                                bind: 'project',
                                name: '项目统计'
                            },].map(s => (
                                <Col span={6} key={s.bind} onClick={this.handleImgClick.bind('', s.bind)} className={boxStyle.wrap}>
                                    <div style={{ position: 'absolute', top: '50px', fontSize: '40px', textAlign: 'center', width: '80%', }}>
                                        <span><PlusOutlined  /></span>
                                    </div>
                                    <a ><img style={imgStyle} src={`/assets/images/wholeView/${s.bind}.jpg`} /></a>
                                    <p style={{ textAlign: 'center' }}>{s.name}</p>
                                </Col>
                            ))
                        }
                    </Row>
                </div>
            </Modal>
        </div>
    }
}

function mapStateToProps(state) {
    const { auth, wholeviewData } = state;
    return {
        wholeview: wholeviewData.data || {},
        user: auth.user,
        isRequesting: wholeviewData.isRequesting
    };
}

export default connect(mapStateToProps)(Default);