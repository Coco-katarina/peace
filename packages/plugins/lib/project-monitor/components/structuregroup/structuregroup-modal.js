/**
 * Created by ZhouXin on 2018/9/19.
 */
'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, InputNumber, Input, message } from 'antd';
import { getRelateStructs, STRUCTUREGROUP_RELATE_LIST_SUCCESS } from '../../actions/structuregroup'
import { EnvironmentOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const confirm = Modal.confirm;

var Is = true;
class StructuregroupModal extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            searchResultPannelHtml: null,
            showBaiduMap: false,
            searchAddress: ''
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.showBaiduMap && this.state.showBaiduMap) {
            this.initialize();
        }
    }

    componentDidMount(newprops) {
        if (Is) {
            window._initializeGis = this.initialize;
            if (window.BMap) {
                this.initialize();
            } else {
                this.loadScript();
            }
            Is = false;
        }
    }

    // 编写自定义函数,创建标注
    addMarker = (point) => {
        const { map } = this.state;
        map.clearOverlays();
        let marker = new BMap.Marker(point);
        map.addOverlay(marker);
    }

    showAddressInfo = (e) => {
        const form = this.formRef.current;
        this.addMarker(new BMap.Point(e.point.lng, e.point.lat));
        this.setState({ searchResultPannelHtml: null });
        form.setFieldsValue({ longitude: e.point.lng, latitude: e.point.lat });
    }

    loadScript = () => {
        var script = document.createElement("script");
        script.src = "https://api.map.baidu.com/api?v=2.0&ak=wEiighBCdHAkOrXRHDsqlgW5&callback=_initializeGis";
        script.onerror = () => { this.setState({ noMap: true }); }
        document.body.appendChild(script);
    }

    initialize = () => {
        var map;
        map = new BMap.Map("strmaps", { minZoom: 5, maxZoom: 15 });
        map.setMapType(BMAP_NORMAL_MAP);
        map.addEventListener('click', this.showAddressInfo)
        map.centerAndZoom(new BMap.Point(115.404, 39.915), 11);
        map.enableScrollWheelZoom();
        map.addControl(new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, offset: new BMap.Size(5, 5) }));
        map.addControl(new BMap.NavigationControl({ type: BMAP_NAVIGATION_CONTROL_LARGE }));
        this.setState({ map: map });

        const _this = this;
        var ac;
        if (this.props.currentState == 0) {
            ac = new BMap.Autocomplete({ "input": 'suggestId', "location": map });
        } else {
            ac = new BMap.Autocomplete({ "input": "suggestsId", "location": map });
        }

        ac.addEventListener("onhighlight", function (e) {  //鼠标放在下拉列表上的事件
            var str = "";
            var _value = e.fromitem.value;
            var value = "";
            if (e.fromitem.index > -1) {
                value = _value.province + _value.city + _value.district + _value.street + _value.business;
            }
            str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

            value = "";
            if (e.toitem.index > -1) {
                _value = e.toitem.value;
                value = _value.province + _value.city + _value.district + _value.street + _value.business;
            }
            str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
            _this.setState({ searchResultPannelHtml: str })
        });

        ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
            var _value = e.item.value;
            this.myValue = _value.province + _value.city + _value.district + _value.street + _value.business;

            var str = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + this.myValue;
            _this.setState({ searchResultPannelHtml: str, searchAddress: this.myValue })

            _this.setPlace(this.myValue);
        });
    };

    setPlace = (value) => {
        const { map } = this.state;
        const _this = this;
        map.clearOverlays();    //清除地图上所有覆盖物
        const form = this.formRef.current;
        function myFun() {
            var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果

            _this.setState({ addressInfo: { 'lng': pp.lng, 'lat': pp.lat } });
            form.setFieldsValue({ longitude: pp.lng, latitude: pp.lat });

            map.centerAndZoom(pp, 18);
            map.addOverlay(new BMap.Marker(pp));    //添加标注
        }
        var local = new BMap.LocalSearch(map, {	//智能搜索
            onSearchComplete: myFun
        });
        local.search(value);
    }

    checkInterger = async (rule, value) => {
        if (value) {
            const pattern = /^[0-9]*[0-9][0-9]*$/;
            if (!pattern.test(value)) {
                return Promise.reject('请输入正数');
            }
        }
        return Promise.resolve();
    }

    showBaiduMap = () => {
        this.setState({ showBaiduMap: !this.state.showBaiduMap })
    }

    renderForm = (modalProps) => {
        const { showBaiduMap } = this.state;
        const { isEdit, modalData } = modalProps;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        }

        return (
            <Form ref={this.formRef} {...formItemLayout}>
                <FormItem
                    label="名称" name='name' initialValue={isEdit ? modalData.dataToEdit.name : ''}
                    rules={[{ required: true, max: 50, message: "请正确输入名称" }]}

                >
                    <Input placeholder="名称最长50个字符" />
                </FormItem>
                <FormItem label={<span><span style={{ color: '#FF4D4F' }}>* </span>位置</span>} >
                    <FormItem name='longitude' initialValue={isEdit ? modalData.dataToEdit.longitude : null} noStyle
                        rules={[{
                            required: true, message: '请输入经度',
                        }, {
                            type: 'number', message: '请输入16位以内的数字'
                        }]}
                    >
                        <InputNumber style={{ width: '40%', marginRight: 0 }} min={-180} max={180} initialValue={0} placeholder="经度支持数字" />
                    </FormItem>
                    <span style={{ display: 'inline-block', margin: '0 8px' }}>-</span>
                    <FormItem name='latitude' initialValue={isEdit ? modalData.dataToEdit.latitude : null} noStyle
                        rules={[{
                            required: true, message: '请输入纬度',
                        }, {
                            type: 'number', message: '请输入16位以内的数字'
                        }]}
                    >
                        <InputNumber style={{ width: '40%', marginRight: 0 }} min={-90} max={90} initialValue={0} placeholder="纬度支持数字" />
                    </FormItem>
                    <EnvironmentOutlined onClick={this.showBaiduMap} style={{
                        fontSize: 20, cursor: 'pointer', marginLeft: 8
                    }} />
                </FormItem>
                <FormItem
                    label="地址"
                    style={showBaiduMap ? {} : { display: 'none' }}
                >
                    <Input id="suggestsId" value={this.state.searchAddress} onChange={e => this.setState({ searchAddress: e.target.value })} style={{ width: '90%', marginRight: 0 }} placeholder="输入地址，定位结构物位置" />
                    <div id="searchResultsPanel" style={{ border: '1px solid #d9d9d9', borderRadius: '4px', width: '150px', height: 'auto', display: 'none' }}>{this.state.searchResultPannelHtml}</div>
                </FormItem>
                <FormItem
                    label="地图"
                    style={showBaiduMap ? {} : { display: 'none' }}
                >
                    <div id="strmaps" style={{ height: '425px', marginBottom: '15px' }}></div>
                </FormItem>
                <FormItem key="provinceCode" label="行政区域码-省：" name='provinceCode'
                    initialValue={isEdit ? modalData.dataToEdit.provinceCode : ''}
                    rules={[
                        { message: '长度不超过两位', max: 2 },
                        { message: '长度少于两位', min: 2 },
                        { validator: this.checkInterger }
                    ]}
                >
                    <Input style={{}} placeholder="行政区域码-省支持两位数字" />
                </FormItem>
                <FormItem key="cityCode" label="行政区域码-市：" name='cityCode'
                    initialValue={isEdit ? modalData.dataToEdit.cityCode : ''}
                    rules={[
                        { message: '长度不超过两位', max: 2 },
                        { message: '长度少于两位', min: 2 },
                        { validator: this.checkInterger }
                    ]}
                >
                    <Input style={{}} placeholder="行政区域码-市支持两位数字" />
                </FormItem>
                <FormItem key="countryCode" label="行政区域码-县：" name='countryCode'
                    initialValue={isEdit ? modalData.dataToEdit.countryCode : ''}
                    rules={[
                        { message: '长度不超过两位', max: 2 },
                        { message: '长度少于两位', min: 2 },
                        { validator: this.checkInterger }
                    ]}
                >
                    <Input style={{}} placeholder="行政区域码-县支持两位数字" />
                </FormItem>
            </Form>
        )
    }

    handleCancel = () => {
        this.initModalAddContext();
        this.props.onCancel();
    }

    handleOk = () => {
        let _this = this;
        const form = this.formRef.current;
        form.validateFields().then(values => {
            const { modalProps } = _this.props;
            const { isEdit, modalData } = modalProps;

            if (isEdit) {
                let { provinceCode, cityCode, countryCode } = modalData.dataToEdit;
                if ((provinceCode != null && cityCode != null && countryCode != null) && (values.provinceCode != provinceCode || values.cityCode != cityCode || values.countryCode != countryCode)) {
                    _this.props.dispatch(getRelateStructs(modalData.projectId, 'structures')).then(res => {
                        if (res.type === STRUCTUREGROUP_RELATE_LIST_SUCCESS) {
                            if (res.payload.length > 0) {
                                let content = res.payload[0].structures.map(d => d.name);
                                if (content.length > 0) {
                                    confirm({
                                        title: '该结构物群存在结构物关联，确定删除关联关系？',
                                        content: '关联的结构物有：' + content,
                                        width: '500px',
                                        okText: '是',
                                        cancelText: '否',
                                        onOk() {
                                            _this.props.delRelateStructs(modalData.projectId);
                                            _this.bubbleOkClickEvent(values);
                                        },
                                        onCancel() { }
                                    });
                                } else {
                                    _this.bubbleOkClickEvent(values);
                                }
                            }
                        }
                        else {
                            message.error(payload.error);
                        }
                    })
                } else {
                    _this.bubbleOkClickEvent(values);
                }
            } else {
                _this.bubbleOkClickEvent(values);
            }
        });
    }

    bubbleOkClickEvent = (value) => {
        const { isEdit } = this.props.modalProps;
        const { name, longitude, latitude, provinceCode, cityCode, countryCode } = value;
        let dataToSave = {
            "name": name,
            "longitude": longitude,
            "latitude": latitude,
            "provinceCode": provinceCode,
            "cityCode": cityCode,
            "countryCode": countryCode
        }
        this.props.onSave(isEdit, dataToSave);
        this.initModalAddContext();
    }

    checkErrors = (errors) => {
        if (errors) {
            let keys = Object.keys(errors);
            if (keys.length > 0) {
                let msg = keys.reduce((prev, field) => {
                    let error = errors[field].errors[0].message;
                    prev = prev.concat(error, '; ');
                    return prev;
                }, '');
                return true;
            }
        }
        return false;
    }

    initModalAddContext = () => {
        const form = this.formRef.current;
        this.setState({
            showBaiduMap: false
        });
        form.resetFields();
    };

    render() {
        const { modalProps } = this.props;
        const { isEdit } = modalProps;
        return (
            <Modal
                maskClosable={false}
                bodyStyle={{ maxHeight: this.props.modalContentMaxHeight, overflowY: 'auto' }}
                visible={true}
                title={(isEdit ? '编辑' : '新建') + '结构物群'}
                onCancel={this.handleCancel}
                onOk={this.handleOk}
                width={750}
                zIndex={0}
            >
                {this.renderForm(modalProps)}
            </Modal>
        )
    }
}
function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps)(StructuregroupModal);