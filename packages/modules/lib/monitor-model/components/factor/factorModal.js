import React, { Component } from "react";
import { connect } from "react-redux";
import { getFactorItemList } from "../../actions/factor";
import { Modal, Button, Form, Select, Input, Card, Row, Col } from "antd";
import { PinyinHelper } from '@peace/utils';

const FormItem = Form.Item;
const Option = Select.Option;

class FactorModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    formRef = React.createRef();
    componentDidMount() {
        if (this.props.modalData) {
            //编辑模式
            this.props.dispatch(getFactorItemList(this.props.modalData.factorProto.code));
        } else {
            //新增模式
        }
    }
    handleSubmit = values => {
       
        //const form = this.formRef.current;
        if (!this.props.modalData) {
            this.props.addFactor({ name: values.name, proto: values.type, structureType: values.stuctureType });
        } else {
            this.props.updateFactor(this.props.modalData.id, { name: values.name, proto: values.type, structureType: values.stuctureType });
        }
       
    };
    handleSelectChange = e => {
        this.props.dispatch(getFactorItemList(e)).then(() => {
        });
    }

    filterOption = (inputValue, option) => {
        const { children } = option.props;
        return (
            children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0 ||
            PinyinHelper.isPinyinMatched(children, inputValue)
        );
    };

    render() {
       
        return <div>
            <Modal title={this.props.modalData ? "编辑监测因素" : "新增监测因素"} maskClosable={false} visible={true} onCancel={this.props.closeModal} footer={null}>
                <Form ref={this.formRef} onFinish={this.handleSubmit} >
                    <FormItem 
                        label="名称" 
                        name='name'  
                        rules={[{ required: true, max: 50, message: "请正确输入名称" }]} 
                        labelCol={{ span: 6 }} 
                        wrapperCol={{ span: 16 }}
                        initialValue={this.props.modalData ? this.props.modalData.name : ""}
                    >
                        <Input placeholder="名称最长50个字符" />
                    </FormItem>
                    <FormItem 
                        label="结构物类型" 
                        name='stuctureType' 
                        labelCol={{ span: 6 }} 
                        wrapperCol={{ span: 16 }} 
                        //defaultValue={this.props.modalData ? this.props.modalData.factorProto.code : false}
                        rules={[{ required: true, message: "请选择类型" }]}
                        initialValue={this.props.modalData ? this.props.modalData.structureTypes[0].structureTypeFactor.structureType.toString() : []}
                    >
                        <Select placeholder="请选择类型"
                            showSearch
                            optionFilterProp="children"
                            filterOption={this.filterOption}
                        >
                            {this.props.structtypeList.map(val => {
                                return <Option value={val.id.toString()} key={val.id}>
                                    {val.name}
                                </Option>;
                            })}
                        </Select>
                    </FormItem>
                    <FormItem 
                        label="监测原型" 
                        labelCol={{ span: 6 }} 
                        wrapperCol={{ span: 16 }} 
                        //defaultValue={this.props.modalData ? this.props.modalData.factorProto.code : false}
                        name='type'
                        rules={[{ required: true, message: "请选择监测原型" }]}
                        initialValue={this.props.modalData ? this.props.modalData.factorProto.code : []}
                    >
                        <Select placeholder="请选择监测原型"
                            showSearch
                            optionFilterProp="children"
                            filterOption={this.filterOption}
                            onChange={this.handleSelectChange}>
                            {this.props.factorProtoList.map(val => {
                                return <Option key={val.code} value={val.code.toString()}>
                                    {val.name}
                                </Option>;
                            })}
                        </Select>
                    </FormItem>
                    <FormItem 
                        label={"监测项"} 
                        labelCol={{ span: 6 }} 
                        wrapperCol={{ span: 16 }}
                        name='list'
                    >
                        <Card  bodyStyle={{ padding: 10, minHeight: 62 }}>
                            <Row>
                                {this.props.factorProtoItem.map(val => {
                                    return <Col key={Math.random()} span={14} style={{ padding: 5, color: "rgba(0,0,0,0.8)" }}>
                                        {val.name}({val.itemUnits[0].name})
                                    </Col>;
                                })}
                            </Row>
                        </Card>
                    </FormItem>

                    <FormItem wrapperCol={{ span: 14, offset: 6 }}>
                        <Button onClick={this.props.closeModal} style={{ marginRight: 10 }}>
                            取消
                        </Button>
                        <Button type="primary" htmlType="submit" loading={this.props.isRequesting}>
                            保存
                        </Button>
                    </FormItem>
                </Form>
            </Modal>
        </div>;
    }
}

function mapStateToProps(state) {
    const {  factorProtoList, factorProtoItem } = state;
    return {
        user: state.auth.user,
        isRequesting: factorProtoItem.isRequesting && factorProtoList.isRequesting,
        factorProtoItem: factorProtoItem.data || [],
        factorProtoList: factorProtoList.data || []
    };
}

export default connect(mapStateToProps)(FactorModal);