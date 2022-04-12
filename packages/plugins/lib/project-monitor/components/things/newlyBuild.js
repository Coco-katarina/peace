import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Steps, Form, Input, Select, Upload, InputNumber, Tag, Checkbox, Row, Col, message, DatePicker, Popover } from 'antd';
import { ImageCropper } from '@peace/components'
import { push } from 'react-router-redux';
import { addStruct, addStructFactors } from '../../actions/struct'
import { modifyStructState } from '../../actions/integrationInfo';
import { getRelateStructs, STRUCTUREGROUP_RELATE_LIST_SUCCESS, delRelateStructs, STRUCTUREGROUP_RELATE_DEL_SUCCESS } from '../../actions/structuregroup'
import moment from 'moment';
// import WcForm from './wcForm';
import { PinyinHelper, RouteRequest } from '@peace/utils';
import { EnvironmentOutlined, PlusOutlined } from '@ant-design/icons';
import { RouteTable } from '$utils';
const Step = Steps.Step;
const FormItem = Form.Item;
const Option = Select.Option;
const createForm = Form.create;
const confirm = Modal.confirm;

var Is = true;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

class NewlyBuild extends React.Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            visible: false,
            visibles: false,
            confirmLoading: false,
            loading: false,
            showBaiduMap: false,
            searchResultPannelHtml: null,
            tempDescImg: null,
            value: [],
            values: [],
            name: null,
            typeId: null,
            latitude: null,
            longitude: null,
            portrait: null,
            description: null,
            defaults: false,
            buttonLoading: false,
            isZxq: false,
            myTypeId: 0,
            isChange: false,
            time: null,
            qlcd: null,
            sjdw: null,
            jsdw: null,
            gydw: null,
            isTd: false,
            foreArmLen: null,
            rearArmLen: null,
            armHeight: null,
            multiplyPower: null,
            showAdvancedFormatTip: 'none',
            tiptitle: '高级属性',

            isWc: false,
            wcPicUrls: [],
            wcExtraInfo: null,
            imageUrl: null,
            structTypeChange: false,

            current: 0,
            addStruct: {},
            show: false,
            searchAddress: '',
            imgError: false
        }
    }

    UNSAFE_componentWillMount() {
        const { currentId, thingsList } = this.props
        if (currentId) {
            thingsList.map(a => {
                if (a.id == currentId) {
                    let values = a;
                    this.setState({
                        name: values.name,
                        typeId: values.type.id,
                        latitude: values.latitude,
                        longitude: values.longitude,
                        portrait: values.portrait,
                        description: values.desc,
                        time: values.extraInfo ? moment(values.extraInfo.ConstructionDate) : null,
                        qlcd: values.extraInfo ? values.extraInfo.BridgeLength : null,
                        sjdw: values.extraInfo ? values.extraInfo.DesignOrganization : null,
                        jsdw: values.extraInfo ? values.extraInfo.DevelopmentOrganization : null,
                        gydw: values.extraInfo ? values.extraInfo.ManagementOrganization : null,
                        foreArmLen: values.extraInfo ? values.extraInfo.foreArmLen : null,
                        rearArmLen: values.extraInfo ? values.extraInfo.rearArmLen : null,
                        armHeight: values.extraInfo ? values.extraInfo.armHeight : null,
                        multiplyPower: values.extraInfo ? values.extraInfo.multiplyPower : null,
                        showAdvancedFormatTip: 'none',
                        tiptitle: '高级属性',
                        provinceCode: values.extraInfo ? values.extraInfo.divisionCode ? values.extraInfo.divisionCode.slice(0, 2) : null : null,
                        cityCode: values.extraInfo ? values.extraInfo.divisionCode ? values.extraInfo.divisionCode.slice(2, 4) : null : null,
                        countryCode: values.extraInfo ? values.extraInfo.divisionCode ? values.extraInfo.divisionCode.slice(4, 6) : null : null,
                        townCode: values.extraInfo ? values.extraInfo.divisionCode ? values.extraInfo.divisionCode.slice(6, 9) : null : null,
                        villageCode: values.extraInfo ? values.extraInfo.divisionCode ? values.extraInfo.divisionCode.slice(9, 12) : null : null,
                    })

                    if (this.props.structTypes.find(m => m.id == values.type.id && m.name == '公厕')) {
                        this.setState({
                            isWc: true,
                            wcExtraInfo: values.extraInfo
                        })
                    }
                }
            })
        }
    }

    componentDidMount() {
        if (window.BMap) {
            this.initialize();
        } else {
            this.loadScript();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.showBaiduMap && this.state.showBaiduMap) {
            if (window.BMap) {
                this.initialize();
            } else {
                this.loadScript();
            }
        }
    }

    checkName = async (rule, value) => {
        if (value) {
            const pattern = /^[\w#\u4e00-\u9fa5（）()-、#+~.]+$/gi;
            const { thingsList } = this.props;
            let name = null;
            thingsList.map(a => {
                if (a.id == this.props.currentId) {
                    name = a.name;
                }
            })
            if (value.trim().length == 0) {
                return Promise.reject('结构物名称不能为空');
            } else if (!pattern.test(value)) {
                return Promise.reject('名称只能包括中文 数字 字母 _ - ( ) 、# + ~ .');

            } else {
                if (thingsList.filter(s => s.name == value).length && value != name) {
                    return Promise.reject('该结构物名称已被占用');
                }
            }
        }
        return Promise.resolve();
    }

    showBaiduMap = () => {
        this.setState({ showBaiduMap: !this.state.showBaiduMap })
    }
    // 编写自定义函数,创建标注
    addMarker = (point) => {
        const { map } = this.state;
        map.clearOverlays();
        let marker = new BMap.Marker(point);
        map.addOverlay(marker);
    }

    showAddressInfo = (e) => {
        this.addMarker(new BMap.Point(e.point.lng, e.point.lat));
        this.setState({ searchResultPannelHtml: null });
        const form = this.formRef.current;
        form.setFieldsValue({ longitude: e.point.lng, latitude: e.point.lat });
    }

    loadScript = () => {
        var script = document.createElement("script");
        script.src = "https://api.map.baidu.com/api?v=2.0&ak=wEiighBCdHAkOrXRHDsqlgW5&callback=_initializeGis";
        script.onerror = () => { this.setState({ noMap: true }); }
        document.body.appendChild(script);
    }
    initialize = () => {
        try {
            var map;
            if (this.props.currentState == 0) {
                map = new BMap.Map("map", { minZoom: 5, maxZoom: 15 });
            } else {
                map = new BMap.Map("maps", { minZoom: 5, maxZoom: 15 });
            }
            map.setMapType(BMAP_NORMAL_MAP);
            map.addEventListener('click', this.showAddressInfo)
            map.centerAndZoom(new BMap.Point(116.404, 39.915), 10);
            map.enableScrollWheelZoom();
            map.addControl(new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, offset: new BMap.Size(5, 5) }));
            map.addControl(new BMap.NavigationControl({ type: BMAP_NAVIGATION_CONTROL_LARGE }));
            this.setState({ map: map });

            const _this = this;
            var ac;
            if (this.props.currentState == 0) {
                ac = new BMap.Autocomplete({ "input": 'suggestId', "location": map });
            } else {
                ac = new BMap.Autocomplete({ "input": 'suggestsId', "location": map });
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
        } catch (error) {
            console.error(error)
        }
    };

    setPlace = (value) => {
        const { map } = this.state;
        const _this = this;
        map.clearOverlays();    //清除地图上所有覆盖物
        function myFun() {
            var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果

            _this.setState({ addressInfo: { 'lng': pp.lng, 'lat': pp.lat } });
            const form = _this.formRef.current;
            form.setFieldsValue({ longitude: pp.lng, latitude: pp.lat });

            map.centerAndZoom(pp, 18);
            map.addOverlay(new BMap.Marker(pp));    //添加标注
        }
        var local = new BMap.LocalSearch(map, {	//智能搜索
            onSearchComplete: myFun
        });
        local.search(value);
    }

    showModals = () => {
        this.setState({
            visibles: true,
        });
    }

    handleModalOk = (fd) => {
        RouteRequest.post(RouteTable.resourceUpload, fd).then(res => {
            this.setState({ tempDescImg: res.filename, structTypeChange: false, portrait: res.filename });
        })

        // RouteRequest.post('/upload/descImg', fd).then(res => {
        //     this.setState({ tempDescImg: res.uploaded, structTypeChange: false, portrait: res.uploaded });
        // });
        this.setState({ visibles: false })
    }
    handleModalCancel = () => {

        this.setState({ defaults: false, visibles: false })
    }

    handleDelRelateStructs = (structId) => {
        this.props.dispatch(delRelateStructs(structId, 'structgroups')).then(action => {
            const { type, payload } = action;
            if (type === STRUCTUREGROUP_RELATE_DEL_SUCCESS) {
                message.success('删除关联成功');
            } else {
                message.error(payload.error);
            }
        })
    }

    handleOk = () => {
        const form = this.formRef.current;
        form.validateFields().then(values => {
            if (this.props.currentState == 1) {
                let _this = this;
                const { provinceCode, cityCode, countryCode } = this.state;
                if ((provinceCode != null && cityCode != null && countryCode != null) && (values.provinceCode != provinceCode || values.cityCode != cityCode || values.countryCode != countryCode)) {
                    _this.props.dispatch(getRelateStructs(_this.props.currentId, 'structgroups')).then(res => {
                        if (res.type === STRUCTUREGROUP_RELATE_LIST_SUCCESS) {
                            if (res.payload.length > 0) {
                                let content = res.payload[0].structuregroups.map(d => d.name);
                                if (content.length > 0) {
                                    confirm({
                                        title: '该结构物存在结构物群关联，确定删除关联关系？',
                                        content: '关联的结构物群有：' + content,
                                        width: '500px',
                                        okText: '是',
                                        cancelText: '否',
                                        onOk() {
                                            _this.handleDelRelateStructs(_this.props.currentId);
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
                this.bubbleOkClickEvent(values);
            }
        });
    }

    getWcPics = (picUrls) => {
        this.setState({ wcPicUrls: picUrls })
    }

    bubbleOkClickEvent = (values) => {
        const structTypes = this.props.structTypes;
        const { isWc, wcPicUrls, wcExtraInfo, portrait } = this.state;
        if (!portrait) {
            this.setState({
                imgError: true
            });
            return;
        }
        let value = {
            "name": values.name,
            "typeId": values.type,
            "latitude": values.latitude,
            "longitude": values.longitude,
            "portrait": portrait,// values.portrait,
            "description": values.describe,
            "time": values.time ? moment(values.time.format('YYYY-MM-DD')) : null,
            "qlcd": values.qlcd ? values.qlcd : null,
            "jsdw": values.jsdw ? values.jsdw : null,
            "sjdw": values.sjdw ? values.sjdw : null,
            "gydw": values.gydw ? values.gydw : null,
            'foreArmLen': values.foreArmLen ? values.foreArmLen : null,
            'rearArmLen': values.rearArmLen ? values.rearArmLen : null,
            'armHeight': values.armHeight ? values.armHeight : null,
            'multiplyPower': values.multiplyPower ? values.multiplyPower : null,
            'provinceCode': values.provinceCode,
            'cityCode': values.cityCode,
            'countryCode': values.countryCode,
            'townCode': values.townCode,
            'villageCode': values.villageCode,
        }
        if (isWc && this.props.currentState == 1) {
            let wcValue = {
                company: wcExtraInfo.wcBusiness ? wcExtraInfo.wcBusiness : null,
                wcBusiness: wcExtraInfo.wcBusiness,//所属单位
                personnelMan: wcExtraInfo.personnelMan,  //男厕保洁员
                personnelWomen: wcExtraInfo.personnelWomen,  //女厕保洁员
                address: wcExtraInfo.address,  //厕所地址
                designFlow: wcExtraInfo.designFlow, // 设计流量
                toiletStyle: wcExtraInfo.toiletStyle,  //公厕类型
                toiletScale: wcExtraInfo.toiletScale,  //公厕规模
                time: wcExtraInfo.time,  //建立时间
                toiletState: wcExtraInfo.toiletState,  //公厕状态
                stateCode: wcExtraInfo.stateCode,  //绑定公厕状态
                responsibilityPerson: wcExtraInfo.responsibilityPerson,  //责任人
                phone: wcExtraInfo.phone,  //电话
                manSquatPosition: wcExtraInfo.manSquatPosition,  //男厕蹲位
                manUrinatingDevice: wcExtraInfo.manUrinatingDevice,  //男厕小便器
                manClosestool: wcExtraInfo.manClosestool,  //男厕马桶
                manFan: wcExtraInfo.manFan,  //男厕排风扇
                manAirConditioner: wcExtraInfo.manAirConditioner,  //男厕空调
                manIncenseIncreasingDevice: wcExtraInfo.manIncenseIncreasingDevice,  //男厕增香器
                manPlasticMirror: wcExtraInfo.manPlasticMirror,  //男厕整容镜
                manCapsHook: wcExtraInfo.manCapsHook,  //男厕衣帽钩
                manWashBasin: wcExtraInfo.manWashBasin,  //男厕洗手盆
                manHandDryer: wcExtraInfo.manHandDryer,  //男厕干手器
                womanSquatPosition: wcExtraInfo.womanSquatPosition,  //女厕蹲位
                womanClosestool: wcExtraInfo.womanClosestool,  //女厕马桶
                womanFan: wcExtraInfo.womanFan,  //女厕排风扇
                womanAirConditioner: wcExtraInfo.womanAirConditioner,  //女厕空调
                womanIncenseIncreasingDevice: wcExtraInfo.womanIncenseIncreasingDevice,  //女厕增香器
                womanPlasticMirror: wcExtraInfo.womanPlasticMirror,  //女厕整容镜
                womanCapsHook: wcExtraInfo.womanCapsHook,  //女厕衣帽钩
                womanWashBasin: wcExtraInfo.womanWashBasin,  //女厕洗手盆
                womanHandDryer: wcExtraInfo.womanHandDryer,  //女厕干手器
                picture: wcExtraInfo.picture//厕所轮播图片
            }
            if (this.props.currentState == 1) {
                let isBDchanged = wcExtraInfo.BD09 == [values.longitude, values.latitude].join(',');
                let locationValue = {
                    locationId: isBDchanged ? wcExtraInfo.localtionId : '', //高德地点id
                    WGS84: isBDchanged ? wcExtraInfo.WGS84 : null, //  gps坐标
                    GCJ02: isBDchanged ? wcExtraInfo.GCJ02 : null, // 国测局坐标
                    BD09: isBDchanged ? wcExtraInfo.BD09 : null //  百度坐标
                }
                wcValue = Object.assign(wcValue, locationValue)
            }

            value = Object.assign(value, wcValue)
        }
        let a = 0;
        if (structTypes != null) {
            structTypes.map(p => {
                if (p.id == values.type) {
                    return p.factors.map(r => {
                        if (r.org != null) {
                            a++;
                        }
                    })
                }
            })
        }
        let show = a > 0 ? true : false;
        if (this.props.currentState == 1) {
            let a = [];
            let b = [];
            structTypes.map(p => {
                if (p.id == values.type) {
                    return p.factors.map(r => {
                        if (r.org == null) {
                            a.push(r.id);
                        } else {
                            b.push(r.id)
                        }
                    })
                }
            })
            a = this.arrayIntersection(a, this.props.factors);
            b = this.arrayIntersection(b, this.props.factors);
            this.setState({
                value: a,
                values: b,
            });
        } else {
            this.setState({
                value: [],
                values: []
            });
        }

        this.setState({
            current: 1,
            addStruct: value,
            show: show
        })
    }

    arrayIntersection = (a, b) => {   //循环判断数组a里的元素在b里面有没有，有的话就放入新建立的数组中
        var result = new Array();
        for (var i = 0; i < a.length; i++) {
            if (b.some(x => x.id == a[i])) {
                result.push(a[i]);
            }
        }
        return result;
    }

    handleCancel = () => {
        const form = this.formRef.current;
        this.setState({
            defaults: false,
            showBaiduMap: false,
            tempDescImg: null,
            isZxq: false,
            isChange: false,
            isTd: false,
            isWc: false,
            showAdvancedFormatTip: 'none',
            tiptitle: '高级属性'
        })
        this.props.closeModel(-1);
    }

    factorTemplateChange = (value) => {
        const factorTemplate = this.props.factorTemplate;
        const typeId = this.state.addStruct.typeId
        var value;
        factorTemplate.map(p => {
            if (p.structtype == typeId && p.id == value) {
                value = p.factorTemplateFactors.map(a => {
                    return a.factorId;
                })
            }
        })
        this.setState({
            value: value,
            values: value,
        });
    }

    checkChange = (value) => {
        this.setState({
            value: value
        });
    }

    checkChanges = (value) => {
        this.setState({
            values: value
        });
    }

    modelback = () => {
        this.setState({
            defaults: true,
            showBaiduMap: false,
            current: 0
        })
    }

    modelOk = () => {
        const { dispatch, user, currentState, currentId } = this.props;
        const { value, values } = this.state;

        this.setState({
            defaults: false,
            showBaiduMap: false,
            tempDescImg: null,
            buttonLoading: true,
            isZxq: false,
            isChange: false,
            isTd: false
        })
        if (value.length == 0 && values.length == 0) {
            message.warn('请选择监测因素');
            this.setState({ buttonLoading: false });
        } else {
            if (currentState == 0) {
                dispatch(addStruct(user.orgId, this.state.addStruct))
                    .then(res => {
                        let c = value.concat(values);
                        let d = Array.from(new Set(c));
                        dispatch(addStructFactors(res.payload.data.structureId, d))
                    })
                    .then(_ => {
                        this.setState({
                            buttonLoading: false
                        })
                        this.props.refreshs();
                        this.props.closeModel(-1);
                    })
            } else {
                dispatch(modifyStructState(currentId, this.state.addStruct))
                    .then(res => {
                        let c = value.concat(values);
                        let d = Array.from(new Set(c));
                        dispatch(addStructFactors(currentId, d))
                    })
                    .then(_ => {
                        this.setState({
                            buttonLoading: false
                        })
                        this.props.refreshs();
                        this.props.closeModel(-1);
                    })
            }
        }
    }

    handleChanged = (value) => {
        const { structTypes, currentState } = this.props;
        const { addStruct } = this.state
        const form = this.formRef.current;
        var obj = structTypes.find(m => m.id == value && m.parentTypeId == 1);
        var tdobj = structTypes.find(m => m.id == value && m.name == '塔吊');
        let wcobj = structTypes.find(m => m.id == value && m.name == '公厕');
        const imageUrl = structTypes.find(m => m.id == value);
        this.setState({
            isZxq: obj ? true : false, isChange: true, isTd: tdobj ? true : false, isWc: wcobj ? true : false,
            imageUrl: imageUrl.portrait,
            structTypeChange: imageUrl.portrait ? true : false
        });
        if (imageUrl.portrait) {//有默认图片则展示
            this.setState({ portrait: imageUrl.portrait })
        } else if (currentState) {//编辑，记录的图片或该结构物存储数据库的图片
            this.setState({ portrait: addStruct.portrait || this.state.portrait })
        } else {//新增，记录的图片或不展示
            this.setState({ portrait: addStruct.portrait || '', tempDescImg: addStruct.portrait || '' })
        }
        //注
        //新增，对结构物类型切换时，有默认图片则展示，无默认图片时，若进行过下一步操作，会记录所选择的图片，则展示该图片，否则不展示
        //编辑，对结构物类型切换时，有默认图片则展示，无默认图片时，若进行过下一步操作，会记录所选择的图片，则展示该图片，否则展示该结构物存储数据库的图片
    }

    checkNumber = async (rule, value) => {
        const form = this.props.form;
        if (isNaN(value)) {
            return Promise.reject('请输入数字!');
        } else if (value < 0) {
            return Promise.reject('请输入正数!');
        }
        return Promise.resolve();
    }

    toggoleTip = () => {
        const { showAdvancedFormatTip } = this.state;
        if (showAdvancedFormatTip == 'none') {
            this.setState(
                {
                    showAdvancedFormatTip: 'inherit',
                    tiptitle: '收起-高级属性'
                });
        } else if (showAdvancedFormatTip == 'inherit') {
            this.setState(
                {
                    showAdvancedFormatTip: 'none',
                    tiptitle: '高级属性'
                });
        }
    }

    showAdvanced = (defaults, addStruct, currentState) => {
        const formItems = [];
        const formItemAdvancedLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };

        formItems.push(
            <FormItem key="provinceCode"{...formItemLayout} label="行政区域码-省：" {...formItemAdvancedLayout} name='provinceCode'
                initialValue={defaults ? addStruct.provinceCode : currentState == 1 ? this.state.provinceCode : ""}
                rules={[
                    { message: '长度不超过两位', max: 2 },
                    { message: '长度少于两位', min: 2 },
                    { validator: this.checkInterger }]}
            >
                <Input style={{ width: '90%', marginRight: 0 }} placeholder="行政区域码-省支持两位数字" />
            </FormItem>);

        formItems.push(
            <FormItem key="cityCode"{...formItemLayout} label="行政区域码-市：" {...formItemAdvancedLayout} name='cityCode'
                initialValue={defaults ? addStruct.cityCode : currentState == 1 ? this.state.cityCode : ""}
                rules={[
                    { message: '长度不超过两位', max: 2 },
                    { message: '长度少于两位', min: 2 },
                    { validator: this.checkInterger }]}
            >
                <Input style={{ width: '90%', marginRight: 0 }} placeholder="行政区域码-市支持两位数字" />
            </FormItem>);

        formItems.push(<FormItem {...formItemLayout} key="countryCode" label="行政区域码-县：" {...formItemAdvancedLayout} name='countryCode'
            initialValue={defaults ? addStruct.countryCode : currentState == 1 ? this.state.countryCode : ""}
            rules={[
                { message: '长度不超过两位', max: 2 },
                { message: '长度少于两位', min: 2 },
                { validator: this.checkInterger }]}
        >
            <Input style={{ width: '90%', marginRight: 0 }} placeholder="行政区域码-县支持两位数字" />
        </FormItem>);

        formItems.push(
            <FormItem key="townCode" {...formItemLayout} label="行政区域码-镇/乡：" {...formItemAdvancedLayout} name='townCode'
                initialValue={defaults ? addStruct.townCode : currentState == 1 ? this.state.townCode : ""}
                rules={[
                    { message: '长度不超过三位', max: 3 },
                    { message: '长度少于三位', min: 3 },
                    { validator: this.checkInterger }]}
            >
                <Input style={{ width: '90%', marginRight: 0 }} placeholder="行政区域码-镇/乡支持三位数字" />
            </FormItem>);

        formItems.push(<FormItem key="villageCode" {...formItemLayout} label="行政区域码-村/社区：" {...formItemAdvancedLayout} name='villageCode'
            initialValue={defaults ? addStruct.villageCode : currentState == 1 ? this.state.villageCode : ""}
            rules={[
                { message: '长度不超过三位', max: 3 },
                { message: '长度少于三位', min: 3 },
                { validator: this.checkInterger }]}
        >
            <Input style={{ width: '90%', marginRight: 0 }} placeholder="行政区域码-村/社区支持三位数字" />
        </FormItem>);

        return formItems;
    }

    checkInterger = async (rule, value) => {
        if (value) {
            const pattern = /^[0-9]*[0-9][0-9]*$/;
            if (!pattern.test(value)) {
                return Promise.reject('请输入正整数!');
            }
        }
        return Promise.resolve();
    }

    render() {
        const { confirmLoading, imageUrl, structTypeChange, showBaiduMap, tempDescImg, value, values, defaults, buttonLoading, tiptitle,
            isWc, wcExtraInfo, current, addStruct, show, imgError } = this.state;
        const { factorTemplate, structTypes, currentState, currentId, visible } = this.props;
        const types = addStruct.typeId
        const typeId = defaults ? addStruct.typeId : currentState == 1 ? this.state.typeId : "";
        const valued = this.state.isChange ? "" : typeId;
        const isZxq = valued != "" && structTypes && structTypes.length > 0 ? structTypes.find(m => m.id == typeId && m.parentTypeId == 1) : null;
        const isTd = valued != "" && structTypes && structTypes.length > 0 ? structTypes.find(m => m.id == typeId && m.name == '塔吊') : null;
        const isWc_ = valued != "" && structTypes && structTypes.length > 0 ? structTypes.find(m => m.id == typeId && m.name == '公厕') : null;
        let clientHeight = window.innerHeight;

        return (
            <Modal
                maskClosable={false}
                title={currentState != 1 ? '新建结构物' : this.state.name}
                visible={visible}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
                width={750}
                zIndex={0}
                footer={
                    current == 0 ?
                        [<Button key="back" onClick={this.handleCancel}>取消</Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>下一步</Button>] :
                        [<Button key="back" onClick={this.modelback}>上一步</Button>,
                        <Button key="submit" type="primary" onClick={this.modelOk} loading={buttonLoading}>完成</Button>]
                }
            >
                <div style={{ padding: '0 50px', height: clientHeight * 0.65, overflow: 'auto' }}>
                    <Steps size="small" current={current} style={{ marginBottom: '30px' }}>
                        <Step title="填写基础信息" />
                        <Step title="监测因素配置" />
                    </Steps>
                    {
                        current == 0 ?
                            <Form ref={this.formRef} {...formItemLayout}>
                                <FormItem
                                    label="名称："
                                    hasFeedback
                                    name='name'
                                    initialValue={defaults ? addStruct.name : currentState == 1 ? this.state.name : ""}
                                    rules={[{
                                        required: true, message: '不能为空，且最多为20个字符'
                                    }, {
                                        validator: this.checkName
                                    }]}
                                >
                                    <Input maxLength='20' placeholder="名称最长20个字符" />
                                </FormItem>
                                <FormItem
                                    label="类型" hasFeedback name='type'
                                    initialValue={defaults ? addStruct.typeId : currentState == 1 ? this.state.typeId : null}
                                    rules={[{
                                        required: true, message: '请选择类型'
                                    }]}
                                >
                                    <Select
                                        placeholder="选择类型"
                                        showSearch
                                        disabled={currentState == 1}
                                        optionFilterProp="children"
                                        filterOption={(input, option) => {
                                            const { children } = option.props;
                                            return (
                                                children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                                PinyinHelper.isPinyinMatched(children, input)
                                            );
                                        }}
                                        onChange={this.handleChanged}>
                                        {
                                            structTypes != null ? structTypes.map(s => {
                                                return <Option value={s.id}>{s.name}</Option>
                                            }) : ""
                                        }
                                    </Select>
                                </FormItem>
                                <FormItem label={<span className="form-require">位置</span>}  >
                                    <FormItem name='longitude' initialValue={defaults ? addStruct.longitude : currentState == 1 ? this.state.longitude : null} noStyle
                                        rules={[{
                                            required: true, message: '请输入经度',
                                        }, {
                                            type: 'number', message: '请输入16位以内的数字'
                                        }]}>
                                        <InputNumber style={{ width: '40%', marginRight: 0 }} min={-180} max={180} initialValue={0} placeholder="经度支持数字" />
                                    </FormItem>
                                    <span style={{ display: 'inline-block', width: '10%', textAlign: 'center' }}>-</span>
                                    <FormItem name='latitude' initialValue={defaults ? addStruct.latitude : currentState == 1 ? this.state.latitude : null} noStyle
                                        rules={[{
                                            required: true, type: 'number', message: '请输入纬度',
                                        }, {
                                            type: 'number', message: '请输入16位以内的数字'
                                        }]}>
                                        <InputNumber style={{ width: '40%', marginRight: 0 }} min={-90} max={90} initialValue={0} placeholder="纬度支持数字" />
                                    </FormItem>
                                    <EnvironmentOutlined onClick={this.showBaiduMap} style={{
                                        fontSize: 20, cursor: 'pointer', marginLeft: 8
                                    }} />
                                </FormItem>
                                <FormItem
                                    label={isWc || isWc_ ? '定位' : "地址"} style={showBaiduMap ? {} : { display: 'none' }}
                                >
                                    {
                                        <div>
                                            <Input id={currentState == 1 ? "suggestsId" : "suggestId"} value={this.state.searchAddress}
                                                onChange={e => this.setState({ searchAddress: e.target.value })}
                                                placeholder="输入地址，定位结构物位置"
                                            />
                                            <div id={currentState == 1 ? "searchResultsPanel" : "searchResultPanel"} style={{ border: '1px solid #d9d9d9', borderRadius: '4px', width: '150px', height: 'auto', display: 'none' }}>{this.state.searchResultPannelHtml}</div>
                                        </div>
                                    }
                                </FormItem>
                                <FormItem label="地图" style={showBaiduMap ? {} : { display: 'none' }}  >
                                    <div id={currentState == 1 ? "maps" : "map"} style={{ width: '100%', height: '425px', marginBottom: '15px' }}></div>
                                </FormItem>

                                <FormItem label="描述" hasFeedback name='describe'
                                    initialValue={defaults ? addStruct.description : currentState == 1 ? this.state.description : ""}
                                    rules={[{ required: true, message: '描不能为空，且最多为100个字符' }]}
                                >
                                    <Input type="textarea" maxLength='100' placeholder="描述(最长100个字符)" autosize={{ minRows: 2, maxRows: 6 }} style={{ minWidth: "412px" }} />
                                </FormItem>
                                <FormItem
                                    id={defaults ? "structAddModelImg" : tempDescImg ? "structAddModelImg" : null}
                                    label={<span className="form-require">示意图</span>}
                                    hasFeedback
                                    mame='portrait'
                                    initialValue={defaults ? addStruct.portrait : currentState == 1 ? this.state.portrait : ""}
                                    rules={[{
                                        required: true, message: '请上传示意图',
                                    }]}
                                >
                                    <div style={{ textAlign: 'center', cursor: 'pointer', }}>
                                        <ImageCropper
                                            visible={this.state.visibles}
                                            handleCropperOk={this.handleModalOk}
                                            handleCancel={this.handleModalCancel}
                                            originalImage={defaults ? addStruct.portrait : currentState == 1 ? this.state.portrait : tempDescImg}
                                        />
                                        {
                                            structTypeChange ?
                                                <img src={imageUrl} width='100%' style={{ display: 'block', }} alt='' /> :
                                                defaults ?
                                                    <img src={addStruct.portrait} width='100%' style={{ display: 'block', }} alt='' /> :
                                                    tempDescImg ?
                                                        <img src={tempDescImg} width='100%' style={{ display: 'block', }} alt='' /> :
                                                        currentState == 1 ?
                                                            <img src={this.state.portrait} width='100%' style={{ display: 'block', }} alt='' /> :
                                                            null
                                        }
                                        <div onClick={this.showModals} style={{
                                            margin: '0 auto', position: 'absolute', top: '50%', left: "89px", marginTop: '-30px',
                                            textAlign: 'center', width: '60%',
                                        }}>
                                            <PlusOutlined style={{ fontSize: '60px' }} />
                                        </div >
                                        <div style={{ textAlign: 'left' }}>
                                            <Tag color="orange">图片格式需是：png | jpg | svg</Tag>
                                        </div>


                                    </div>
                                    {
                                        imgError && <div class="ant-form-item-explain ant-form-item-explain-error">
                                            <div role="alert">请上传示意图</div>
                                        </div>
                                    }
                                </FormItem>
                                <div style={{ backgroundColor: 'white', textAlign: 'center', }}><a onClick={() => this.toggoleTip()}>{tiptitle}</a></div>
                                <div style={{ marginTop: '30px', display: this.state.showAdvancedFormatTip }}>
                                    {this.showAdvanced(defaults, addStruct, currentState)}
                                </div>
                            </Form>
                            :
                            <div>
                                <span style={{
                                    display: 'inline-block',
                                    width: '103px',
                                    textAlign: 'right',
                                    paddingRight: '10px'
                                }}>监测模板</span>
                                <Select placeholder="选择监测因素模板" size='large' style={{ width: '412px', marginBottom: '20px' }} onChange={this.factorTemplateChange}>
                                    {
                                        factorTemplate.length > 0 ? factorTemplate.map(p => {
                                            if (p.structtype == types) {
                                                return <Option value={p.id} key={p.id}>{p.name}</Option>
                                            }
                                        }) : ""
                                    }
                                </Select>
                                <Row>
                                    <Col span={4}>
                                        <span style={{
                                            display: 'inline-block',
                                            width: '103px',
                                            textAlign: 'right',
                                            paddingRight: '10px'
                                        }}>推荐因素</span>
                                    </Col>
                                    <Col span={20}>
                                        <Checkbox.Group style={{ width: '412px' }} value={value} onChange={this.checkChange}>
                                            <Row>
                                                {
                                                    structTypes != null ? structTypes.map(p => {
                                                        if (p.id == types) {
                                                            return p.factors.map(r => {
                                                                if (r.org == null) {
                                                                    let a = value.findIndex(y => Object.is(r.id, y))
                                                                    return (
                                                                        <Col span={8} key={r.id}>
                                                                            <Checkbox value={r.id} >
                                                                                <Popover content={r.items.map((i, index) => <div key={`t-${i.id}-${index}`}>{i.name} ( {i.unit} )</div>)} title="监测项">
                                                                                    {r.name}
                                                                                </Popover>
                                                                            </Checkbox>
                                                                        </Col>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                    }) : ""
                                                }
                                            </Row>
                                        </Checkbox.Group>
                                    </Col>
                                </Row>
                                <Row style={show ? { marginTop: "20px" } : { display: "none", marginTop: "20px" }}>
                                    <Col span={4}>
                                        <span style={{
                                            display: 'inline-block',
                                            width: '103px',
                                            textAlign: 'right',
                                            paddingRight: '10px'
                                        }}>私有因素</span>
                                    </Col>
                                    <Col span={20}>
                                        <Checkbox.Group style={{ width: '412px' }} value={values} onChange={this.checkChanges}>
                                            <Row>
                                                {
                                                    structTypes != null ?
                                                        structTypes.map(p => {
                                                            if (p.id == types) {
                                                                return p.factors.map(r => {
                                                                    if (r.org != null) {
                                                                        let a = value.findIndex(y => Object.is(r.id, y))
                                                                        return (
                                                                            <Col span={8} key={r.id}>
                                                                                <Checkbox value={r.id} checked={a != -1 ? true : false}>
                                                                                    <Popover content={r.items.map((i, index) => <div key={`s-${i.id}-${index}`}>{i.name} ( {i.unit} )</div>)} title="监测项">
                                                                                        {r.name}
                                                                                    </Popover>
                                                                                </Checkbox>
                                                                            </Col>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        }) : ""
                                                }
                                            </Row>
                                        </Checkbox.Group>
                                    </Col>
                                </Row>
                            </div>
                    }
                </div>
            </Modal >
        );
    }
}

function mapStateToProps(state) {
    const { structList, auth, factorTemplateData, structFactorList } = state;
    return {
        user: auth.user,
        factorTemplate: factorTemplateData.data || [],
        structFactorList: structFactorList.data || [],
    }
}

export default connect(mapStateToProps)(NewlyBuild);