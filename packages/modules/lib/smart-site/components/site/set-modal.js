'use strict';

import React, { Component } from 'react';
import { Modal, Form, Select, Input, DatePicker, Upload, Icon, InputNumber, message } from 'antd';
import moment from 'moment';
import { PinyinHelper } from '@peace/utils';
import { LoadingOutlined, PlusOutlined, EnvironmentOutlined } from '@ant-design/icons';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option }= Select;


class SiteSetModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: '',
            showBaiduMap: false,
            searchResultPannelHtml: null,
        }
        this.token = JSON.parse(sessionStorage.getItem('user')).token;
    }
    formRef = React.createRef();

    bubbleOkClickEvent = (values) => {
        const { isEdit, modalData } = this.props.modalProps;
        let imgurl = this.state.imageUrl == '1' ? modalData.dataToEdit['Portrait'] : this.state.imageUrl
        let dataToSave = {
            siteName: values.siteName,
            siteAddress: values.address,
            longitude: values.longitude,
            latitude: values.latitude,
            description: values.description,
            Portrait: imgurl,
            builtBureauId: parseInt(values.built),
            constructId: parseInt(values.construct),
            supervisionId: parseInt(values.supervision),
            ownerId: parseInt(values.owner),
            beginTime: moment(values.time[0]).format('YYYY-MM-DD HH:mm:ss'),
            endTime: moment(values.time[1]).format('YYYY-MM-DD HH:mm:ss'),
            area: values.area,
            height: values.height,
            designCompany: values.designCompany,
            projectType: values.projectType
        };
        this.initModalAddContext();
        this.setState({ imageUrl: '1', showBaiduMap: false },()=>{
            this.props.onSave(isEdit, dataToSave);
        }) 
    };

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
    };

    componentDidMount() {
        const { isEdit, modalData } = this.props.modalProps;
        if (isEdit) {
            if (this.state.imageUrl == '') {
                let imageUrl = isEdit ? modalData ? modalData.dataToEdit ? modalData.dataToEdit['Portrait'] : '' : '' : ''
                this.setState({ imageUrl })
            }
        }
        window._initializeGis = this.initialize;
        if (window.BMap) {
            this.initialize();
        } else {
            this.loadScript();
        }
    }

    initModalAddContext = () => {
        const form = this.formRef.current;
        form.resetFields();
    };

    handleCancel = () => {
        this.initModalAddContext();
        this.setState({ imageUrl: '', showBaiduMap: false })
        this.props.onCancel();
    };

    handleOk = () => {
        // "form.validateFields" is vital to show validate info.
        const form = this.formRef.current;
        form.validateFields().then(values => {
            this.bubbleOkClickEvent(values);
        });
    };

    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        if (e.file.status == 'done') {
            this.setState({ imageUrl: e.file.response.filename })
        }
        return e && e.fileList;
    }

    beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJPG) {
            message.error('支持jpg和png格式文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片大小不能大于2MB!');
        }
        return isJPG && isLt2M;
    }

    getInitialvalue = (key) => {
        const { isEdit, modalData } = this.props.modalProps;
        let value = isEdit ? modalData ? modalData.dataToEdit ? modalData.dataToEdit[key] : '' : '' : ''
        return value
    }

    checkNameExist = (rule, value) => {
        const { siteList } = this.props;
        const { isEdit, modalData } = this.props.modalProps;
        if (siteList.filter(s => s.siteName == value).length) {
            if (!isEdit || (isEdit && siteList.filter(s => s.siteName == value)[0].Id != modalData.id)) {
                return Promise.reject(new Error('工地名称重复'))
            } else {
                return Promise.resolve();
            }
        } else {
            return Promise.resolve();
            
        }
    }

    showBaiduMap = () => {
        const form = this.formRef.current;
        this.setState({ showBaiduMap: !this.state.showBaiduMap });
        if (window.BMap) {
            this.initialize(form.getFieldValue('longitude'), form.getFieldValue('latitude'));
        } else {
            this.loadScript();
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
        var geoc = new BMap.Geocoder();
        var _this = this;
        geoc.getLocation(e.point, function (rs) {
            var _value = rs.addressComponents;
            form.setFieldsValue({ 'address': _value.province + _value.city + _value.district + _value.street + _value.streetNumber });
        });
        this.setState({ searchResultPannelHtml: null });
        form.setFieldsValue({ longitude: e.point.lng, latitude: e.point.lat });
    }

    loadScript = () => {
        var script = document.createElement("script");
        script.src = "https://api.map.baidu.com/api?v=2.0&ak=wEiighBCdHAkOrXRHDsqlgW5&callback=_initializeGis";
        script.onerror = () => { this.setState({ noMap: true }); }
        document.body.appendChild(script);
    }

    initialize = (longitude, latitude) => {
        const form = this.formRef.current;
        var map;
        map = new BMap.Map("strmaps", { minZoom: 5, maxZoom: 15 });
        map.setMapType(BMAP_NORMAL_MAP);
        map.addEventListener('click', this.showAddressInfo)

        if (longitude && latitude) {
            map.centerAndZoom(new BMap.Point(longitude, latitude), 11);
        } else {
            map.centerAndZoom(new BMap.Point(115.404, 39.915), 11);
        }

        map.enableScrollWheelZoom();
        map.addControl(new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, offset: new BMap.Size(5, 5) }));
        map.addControl(new BMap.NavigationControl({ type: BMAP_NAVIGATION_CONTROL_LARGE }));
        this.setState({ map: map });

        const _this = this;
        var ac;

        ac = new BMap.Autocomplete({ "input": address, "location": map });
        if (form.getFieldValue('address'))
            ac.setInputValue(form.getFieldValue('address'));
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
            _this.setState({ searchResultPannelHtml: str })

            _this.setPlace(this.myValue);
            form.setFieldsValue({ 'address': this.myValue });
        });

    };

    setPlace = (value) => {
        const { map } = this.state;
        const form = this.formRef.current;
        const _this = this;
        map.clearOverlays();    //清除地图上所有覆盖物
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

    filterOption = (inputValue, option) => {
        const { children } = option.props;
        return (
            children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0 ||
            PinyinHelper.isPinyinMatched(children, inputValue)
        );
    };

    renderForm = (modalProps) => {
        const { isEdit, modalData } = modalProps;
        const { siteDepartments } = this.props;
        const { showBaiduMap } = this.state;
        const formItems = [];
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        }
        let built = []; let construct = []; let supervision = []; let owner = [];
        if (siteDepartments) {
            siteDepartments['built'] ? built = siteDepartments['built'] : ''
            siteDepartments['construct'] ? construct = siteDepartments['construct'] : ''
            siteDepartments['supervision'] ? supervision = siteDepartments['supervision'] : ''
            siteDepartments['owner'] ? owner = siteDepartments['owner'] : ''
        }

        const dateFormat = 'YYYY/MM/DD HH:mm:ss';

        const rangeConfig = {
            initialValue: isEdit ? modalData ? modalData.dataToEdit ?
                modalData.dataToEdit['beginTime'] ? [moment(modalData.dataToEdit['beginTime'], dateFormat), moment(modalData.dataToEdit['endTime'], dateFormat)] : '' : '' : '' : '',
            rules: [{ type: 'array', required: true, message: '请选择时间范围!' }],
        };
        const props = {
            action: '/_resource/upload',
            listType: 'picture-card',
            multiple: false
        };

        const initImageValue = isEdit ? modalData ? modalData.dataToEdit ? [{
            uid: 0,
            name: modalData.dataToEdit['Portrait'],
            status: 'done',
            response: [{ uploaded: modalData.dataToEdit['Portrait'] }],
            url: encodeURI(`/_file-server/${modalData.dataToEdit['Portrait']}?token=${this.token}`),
        }] : '' : '' : ''
        const initImageName = isEdit ? modalData ? modalData.dataToEdit['Portrait'] : '' : ''
        const uploadButton = (
            <div>
                { this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Upload</div>
            </div>
        )

        formItems.push(<FormItem 
            key="siteName"
            label="工地名称："
            name='siteName'
            initialValue={this.getInitialvalue('siteName')}
            rules={[{ required: true, message: '内容不能为空' },
                { max: 50, message: '长度不超过50个字符' },
                { validator: this.checkNameExist }]}
            {...formItemLayout}
        >
            <Input />
        </FormItem>);

        formItems.push(<FormItem key="address" label="工地地址：" {...formItemLayout}>
            <FormItem 
                noStyle
                name="address"
                initialValue={this.getInitialvalue('siteAddress')}
                rules={[{ required: true, message: '不能为空!', },
                    { message: '长度不能大于100!', max: 100 }
                    ]}
            >
                <Input />
            </FormItem>
            <div id="searchResultsPanel" style={{ border: '1px solid #d9d9d9', borderRadius: '4px', width: '150px', height: 'auto', display: 'none' }}>{this.state.searchResultPannelHtml}</div>
        </FormItem>);

        formItems.push(<FormItem key="longitude" label="位置" {...formItemLayout}>
            <FormItem
                noStyle
                name='longitude'
                initialValue={this.getInitialvalue('longitude')}
                rules={[{
                    required: true, message: '请输入经度',
                }, {
                    type: 'number', message: '请输入16位以内的数字'
                }]}
            >
                <InputNumber style={{ width: '40%', marginRight: 0 }} min={-180} max={180} initialValue={0} placeholder="经度支持数字" />
            </FormItem>
                <span style={{ display: 'inline-block', width: '10%', textAlign: 'center' }}>-</span>
            <FormItem
                noStyle
                name='latitude'
                initialValue={this.getInitialvalue('latitude')}
                rules={[{
                    required: true, type: 'number', message: '请输入纬度',
                }, {
                    type: 'number', message: '请输入16位以内的数字'
                }]}
            >
                
                <InputNumber style={{ width: '40%', marginRight: 0 }} min={-90} max={90} initialValue={0} placeholder="纬度支持数字" />
            </FormItem> 
            <EnvironmentOutlined style={{
                fontSize: 20, cursor: 'pointer', position: 'absolute',
                top: '7px'
            }} onClick={this.showBaiduMap} />
        </FormItem>);
        
        formItems.push(
                <FormItem
                    key="maps"
                    {...formItemLayout}
                    label="地图"
                    hasFeedback
                    style={showBaiduMap ? { display: 'flex' } : { display: 'none' }}
                >
                    <div id="strmaps" style={{ width: '90%', height: '425px', marginBottom: '15px' }}></div>
                </FormItem>
        );

        formItems.push(<FormItem key="built"
            id="built"
            name="built"
            label="住建单位："
            initialValue={isEdit ? modalData ? modalData.dataToEdit ? `${modalData.dataToEdit['builtBureauId']}` : '' : '' : built.length > 0 ? `${built[0].Id}` : '' }
            rules={[{ required: true, message: '请选择住建单位!' }]}
            {...formItemLayout}
        >
            <Select style={{ width: '100%' }}
                showSearch
                optionFilterProp="children"
                filterOption={this.filterOption}
            >
                {
                    built.map(s => {
                        return <Option key={`${s.Id}`} value={`${s.Id}`}>{s.organizationName}</Option>
                    })
                }
            </Select>
        </FormItem>);

        formItems.push(<FormItem key="construct"
            id="construct"
            name='construct'
            label="施工单位："
            initialValue={isEdit ? modalData ? modalData.dataToEdit ? `${modalData.dataToEdit['constructId']}` : '' : '' : construct.length > 0 ? `${construct[0].Id}` : ''}
            rules={[{ required: true, message: '请选择施工单位!' }]}
            {...formItemLayout}
        >
            
            <Select style={{ width: '100%' }}
                showSearch
                optionFilterProp="children"
                filterOption={this.filterOption}
            >
                {
                    construct.map(s => {
                        return <Option key={`${s.Id}`} value={`${s.Id}`}>{s.organizationName}</Option>
                    })
                }
            </Select>
            
        </FormItem>);

        formItems.push(<FormItem key="supervision"
            id="supervision"
            name="supervision"
            label="监理单位："
            initialValue={isEdit ? modalData ? modalData.dataToEdit ? `${modalData.dataToEdit['supervisionId']}` : '' : '' : supervision.length > 0 ? `${supervision[0].Id}` : ''}
            rules={[{ required: true, message: '请选择监理单位!' }]}
            {...formItemLayout}
        > 
            <Select style={{ width: '100%' }}
                showSearch
                optionFilterProp="children"
                filterOption={this.filterOption}
            >
                {
                    supervision.map(s => {
                        return <Option key={`${s.Id}`} value={`${s.Id}`}>{s.organizationName}</Option>
                    })
                }
            </Select>   
        </FormItem>);

        formItems.push(<FormItem key="owner"
            id="owner"
            name="owner"
            label="建设单位："
            initialValue={isEdit ? modalData ? modalData.dataToEdit ? `${modalData.dataToEdit['ownerId']}` : '' : '' : owner.length > 0 ? `${owner[0].Id}` : ''}
            rules={[{ required: true, message: '请选择建设单位!' }]}
            {...formItemLayout}
        >
           
            <Select style={{ width: '100%' }}
                showSearch
                optionFilterProp="children"
                filterOption={this.filterOption}
            >
                {
                    owner.map(s => {
                        return <Option key={`${s.Id}`} value={`${s.Id}`}>{s.organizationName}</Option>
                    })
                }
            </Select>
        </FormItem>);

        formItems.push(<FormItem key="projectType"
            label="项目类型"
            name="projectType"
            initialValue={this.getInitialvalue('projectType')}
            rules={[{ required: true, message: '项目类型不能为空!', }]}
            {...formItemLayout}
        >
            <Select style={{ width: '100%' }}
                placeholder="请选择"
                showSearch
            >
                <Option key={1} value={1}>房建项目</Option>
                <Option key={2} value={2}>市政项目</Option>
            </Select>
        </FormItem>);

        formItems.push(<FormItem key="time"
            name="time"
            {...rangeConfig}
            {...formItemLayout}
            label="时间范围"
        >
            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </FormItem>)

        formItems.push(<FormItem
            key="upload"
            name="upload"
            initialValue={initImageValue}
            getValueFromEvent={this.normFile}
            valuePropName='fileList'
            rules={[{ required: true, message: '请上传图片!' }]}
            {...formItemLayout}
            label="工地图片"
        >
                <Upload {...props}
                    name="upload"
                    showUploadList={false}
                    beforeUpload={this.beforeUpload}
                >
                    <div>
                        {
                            this.state.imageUrl == '' ? uploadButton :
                                this.state.imageUrl == '1' ? initImageName == '' ? uploadButton : <img src={encodeURI(`/_file-server/${initImageName}?token=${this.token}`)} width='100%' /> :
                                    <img src={encodeURI(`/_file-server/${this.state.imageUrl}?token=${this.token}`)} width='100%' />
                        }
                    </div>
                </Upload>
            
        </FormItem>)

        formItems.push(<FormItem key="area"
            label="面积"
            name="area"
            initialValue={this.getInitialvalue('area')}
            rules={[{ required: true, message: '面积不能为空!', },
                {
                    type: 'number', message: '请输入数字'
                }]}
            {...formItemLayout}
        >
            <InputNumber style={{ width: '60%', marginRight: 0 }} min={0} initialValue={0} placeholder="面积支持数字" />
        </FormItem>);

        formItems.push(<FormItem key="height"
            label="高度"
            name="height"
            initialValue={this.getInitialvalue('height')}
            rules={[{ required: true, message: '高度不能为空!', },
                {
                    type: 'number', message: '请输入数字'
                }]}
            {...formItemLayout}
        >
            <InputNumber style={{ width: '60%', marginRight: 0 }} min={0} initialValue={0} placeholder="高度支持数字" />
        </FormItem>);

        formItems.push(<FormItem key="description"
            label="描述"
            name="description"
            initialValue={this.getInitialvalue('description')}
            rules={[{ required: true, message: '描述不能为空!', }]}
            {...formItemLayout}
        >
            <Input />
        </FormItem>);

        formItems.push(<FormItem key="designCompany"
            label="设计单位"
            name="designCompany"
            initialValue={this.getInitialvalue('designCompany')}
            rules={[{ required: true, message: '设计公司不能为空!', }]}
            {...formItemLayout}
        >
            <Input />
        </FormItem>);

        return formItems;
    };

    render() {
        const { modalProps } = this.props;
        const { isEdit, modalVisible } = modalProps;
        return (
            <Modal
                bodyStyle={{ maxHeight: this.props.modalContentMaxHeight, overflowY: 'auto' }}
                visible={true}
                maskClosable={false}
                title={isEdit ? '编辑' : '新增'}
                okText='保存'
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Form ref={this.formRef}>
                    {this.renderForm(modalProps)}
                </Form>
                
            </Modal>
        )
    }
}

export default SiteSetModal;
