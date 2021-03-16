import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form, Select, Input, Card, Row, Col } from "antd";
import { PinyinHelper } from '@peace/utils';

const FormItem = Form.Item;
const Option = Select.Option;

class TemplateModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            factorListOfType: []
        };
    }
    formRef = React.createRef();
    componentDidMount() {

        if (this.props.modalData) {
            //编辑模式
            let n = this.props.modalData.structtype
            let arr = [{ name: '全部', id: 'all' }];

            for (let i in this.props.structtypeList) {
                let val = this.props.structtypeList[i];
                if (val.id == n) {
                    val.factors.map(val => {
                        arr.push(val);
                    })
                    break;
                }
            }

            this.setState({
                factorListOfType: arr
            })
        } else {
            //新增模式
        }
    }
    handleSubmit = values => {
        for (let i in values.factor) {
            if (values.factor[i] == 'all') {
                let arr = [];
                for (let j = 1; j < this.state.factorListOfType.length; j++) {
                    arr.push(this.state.factorListOfType[j].id);
                }
                values.factor = arr;
                break;
            }
        }
        if (!this.props.modalData) {
            this.props.addTemplate(values);
        } else {
            this.props.updateTemplate(this.props.modalData.id, values);
        }
    };
    typeChange = (e) => {
        let arr = [{ name: '全部', id: 'all' }];

        for (let i in this.props.structtypeList) {
            let val = this.props.structtypeList[i];
            if (val.id == e) {
                val.factors.map(val => {
                    arr.push(val);
                })
                break;
            }
        }
        // this.props.structtypeList[e-1].factors.map(val => {
        //   arr.push(val);
        // })
        this.setState({
            factorListOfType: arr
        })
        const form = this.formRef.current;
        form.setFieldsValue({
            factor: []
        })

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
            <Modal title={this.props.modalData ? "编辑监测模板" : "新增监测模板"} maskClosable={false} visible={true} onCancel={this.props.closeModal} footer={null}>
                <Form ref={this.formRef} onFinish={this.handleSubmit}>
                    <FormItem 
                        label="模板名称" 
                        labelCol={{ span: 6 }} 
                        wrapperCol={{ span: 16 }}
                        name='name'
                        rules={[{ required: true, max: 50, message: "请正确输入模板名称" }]}
                        initialValue={ this.props.modalData ? this.props.modalData.name : null}
                    >
                        <Input placeholder="名称最长50个字符" />
                    </FormItem>
                    <FormItem 
                        label="结构物类型" 
                        labelCol={{ span: 6 }} 
                        wrapperCol={{ span: 16 }}
                        name='type'
                        rules={[{ required: true, message: "请选择类型" }]}
                        initialValue={ this.props.modalData ? this.props.modalData.structtype.toString() : []}

                    >
                        <Select placeholder="请选择类型"
                            showSearch
                            optionFilterProp="children"
                            filterOption={this.filterOption}
                            onChange={this.typeChange}>
                            {this.props.selectData.structtypeList.map(val => {
                                return <Option value={val.id.toString()} key={val.id}>
                                    {val.name}
                                </Option>;
                            })}
                        </Select>
                    </FormItem>
                    <FormItem 
                        label="监测因素" 
                        labelCol={{ span: 6 }} 
                        wrapperCol={{ span: 16 }}
                        name='factor'
                        rules={[{ required: true, message: "请选择监测因素" }]}
                        initialValue={this.props.modalData
                            ? this.props.modalData.factorTemplateFactors.map(val => {
                                return val.factorId.toString();
                            })
                            : []}
                    >
                        <Select mode="multiple" placeholder="请选择监测因素"
                            disabled={!this.state.factorListOfType.length > 0}
                            filterOption={this.filterOption}
                        >
                            {this.state.factorListOfType.map(val => {
                                return <Option value={val.id.toString()} key={val.id}>
                                    {val.name}
                                </Option>;
                            })}
                        </Select>
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
    // const { factorTemplateList , factorProtoList, structureType } = state;
    return {
        
    };
}

export default connect(mapStateToProps)(TemplateModal);