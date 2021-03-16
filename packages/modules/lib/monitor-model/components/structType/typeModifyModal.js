import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form, Select, Input, Card, Row, Col, Tag } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { ImageCropper } from '@peace/components';
import { PinyinHelper,RouteRequest } from '@peace/utils';

const FormItem = Form.Item;
const Option = Select.Option;

class TypeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            factorListOfType: [],
            visible: false,
            tempDescImg: null
        };
    }
    formRef = React.createRef();
    componentDidMount() {
        let arr = this.props.factors;
        this.setState({
            factorListOfType: arr,
        });
        this.props.factors.unshift({ id: 'all', name: '全部' });
    }
    isContained = (a, b) => {
        if (!(a instanceof Array) || !(b instanceof Array)) return false;
        if (a.length < b.length) return false;
        var aStr = a.toString();
        for (var i = 0, len = b.length; i < len; i++) {
            if (aStr.indexOf(b[i]) == -1) return false;
        }
        return true;
    }
    minus = function (arr) {
        var result = new Array();
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            obj[arr[i]] = 1;
        }
        for (var j = 0; j < this.length; j++) {
            if (!obj[this[j]]) {
                obj[this[j]] = 1;
                result.push(this[j]);
            }
        }
        return result;
    };
    diff = function (a, b) {
        return a.filter(function (i) { return b.indexOf(i) < 0; });
    };
    intersect = function () {
        var result = new Array();
        var obj = {};
        for (var i = 0; i < arguments.length; i++) {
            for (var j = 0; j < arguments[i].length; j++) {
                var str = arguments[i][j];
                if (!obj[str]) {
                    obj[str] = 1;
                }
                else {
                    obj[str]++;
                    if (obj[str] == arguments.length) {
                        result.push(str);
                    }
                }//end else
            }//end for j
        }//end for i
        return result;
    }
    handleSubmit = values => {
        for (let i in values.factors) {
            if (values.factors[i] == 'all') {
                let arr = [];
                for (let j = 1; j < this.state.factorListOfType.length; j++) {
                    arr.push(this.state.factorListOfType[j].id);
                }
                values.factors = arr;
                break;
            }
        }
        this.props.updateStructFactors(this.props.modalData.structType.id, values);
    };

    handleModalOk = (file) => {
        const form = this.formRef.current;
        RouteRequest.post('/upload/descImg', file).then(res => {
            this.setState({ tempDescImg: res.uploaded });
            form.setFieldsValue({
                portrait: res.uploaded
            });
        });
        this.setState({ visible: false })
    }
    handleModalCancel = () => {
        this.setState({ visible: false })
    }
    checkName = (rule, value, callback) => {
        if (!value){
            return Promise.resolve();
            
        }else {
            if (this.props.structTypeList.find(s => s.name == value && this.props.modalData.structType.id != s.id)){
                return Promise.reject("该结构物类型名称已被占用");
            }else {
                return Promise.resolve(); 
            }
        }
    }

    render() {
       
        const { visible, tempDescImg } = this.state;
        const portrait = this.props.modalData ? this.props.modalData.structType.portrait : '';
        return <div>
            <Modal title={"编辑结构物类型"} visible={true} maskClosable={false} onCancel={this.props.closeModal} footer={null}>
                <Form ref={this.formRef} onFinish={this.handleSubmit}>
                    <FormItem 
                        label="类型名称" 
                        labelCol={{ span: 6 }} 
                        wrapperCol={{ span: 16 }}
                        name='name'
                        rules={[
                            { required: true, message: "请输入名称" },
                            { max: 20, message: "最多20个字符" },
                            { validator: this.checkName }
                        ]}
                        initialValue={this.props.modalData ? this.props.modalData.structType.name : null}
                    >
                        <Input placeholder="名称最长20个字符" />
                    </FormItem>
                    <FormItem 
                        label="监测因素" 
                        labelCol={{ span: 6 }} 
                        wrapperCol={{ span: 16 }}
                        name='factors'
                        rules={[{ required: true, message: "请选择监测因素" }]}
                        initialValue={this.props.modalData
                            ? this.props.modalData.factors.map(val => {
                                return val.id.toString();
                            })
                            : []}
                    >
                       <Select mode="multiple" placeholder="请选择监测因素" filterOption={
                            (input, option) => {
                                const { children } = option.props;
                                return (
                                    children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                    PinyinHelper.isPinyinMatched(children, input)
                                );
                            }}>
                            {
                                this.props.factors.map(val => {
                                    return <Option value={val.id.toString()} key={val.id}>
                                        {val.name}
                                    </Option>;
                                })}
                        </Select>
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 6 }} 
                        wrapperCol={{ span: 16 }}
                        label="默认图片"
                        name='portrait'
                        initialValue={portrait}
                    >
                        
                            <div style={{ textAlign: 'center', cursor: 'pointer', }}>
                                    <ImageCropper
                                        visible={visible}
                                        handleCropperOk={this.handleModalOk}
                                        handleCancel={this.handleModalCancel}
                                        originalImage={tempDescImg || portrait}
                                    />
                                
                                {tempDescImg || portrait ? <img src={tempDescImg || portrait} width='100%' style={{ display: 'block', border: '1px solid #d9d9d9' }} alt='' /> :
                                    null}
                                <div onClick={() => this.setState({ visible: true })}
                                    style={{ margin: '0 auto', position: 'absolute', top: '50%', left: "70px", marginTop: '-30px', textAlign: 'center', width: '60%' }}>
                                    <PlusOutlined type="plus" style={{ fontSize: '60px' }} />
                                </div >
                                <div style={{ textAlign: 'left' }}>
                                    <Tag color="orange">图片格式需是：png | jpg | svg</Tag>
                                </div>
                            </div>
                    </FormItem>
                    <FormItem wrapperCol={{ span: 8, offset: 4 }}>
                        <Button onClick={this.props.closeModal} style={{ marginRight: 10 }}>
                            取消
              </Button>
                        <Button type="primary" htmlType="submit">
                            保存
              </Button>
                    </FormItem>
                </Form>
            </Modal>
        </div>;
    }
}


function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps)(TypeModal);