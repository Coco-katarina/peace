'use strict';

import React, { Component } from 'react';
import { Modal, Form, Select, Input } from 'antd';
import { PinyinHelper } from '@peace/utils';

const FormItem = Form.Item;
const Option = Select.Option;

class RelateModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    formRef = React.createRef();

    handleOk = () => {
        const form = this.formRef.current;
        
        let siteId = this.props.siteInfo.Id;
        // "form.validateFields" is vital to show validate info.
        form.validateFields().then(val => {
            let structuresArr = [];
            for (let i in val.things) {
                if (val.things[i] != "all") {
                    if (!structuresArr.includes(parseInt(val.things[i]))) {
                        structuresArr.push(parseInt(val.things[i]));
                    }
                } else {
                    structuresArr = this.props.thingsList.map(
                        k => {
                            return k.id;
                        }
                    );
                    break;
                }
            }
            let dataToSave = {
                structureIds: structuresArr,
            };
            this.props.onSave(siteId, dataToSave);
            
        });
    };

    renderSelectThings = () => {
        let selectChild = [<Option key="all">全部</Option>];
        if (!this.props.thingsList.length > 0) {
            return;
        }
        this.props.thingsList.map(val => {
            selectChild.push(
                <Option key={val.id.toString()} value={val.id.toString()}>
                    {val.name}
                </Option>
            );
        });
        return selectChild;
    };
    renderForm = () => {
        const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
        const { siteInfo, reStructs } = this.props;
        return (
            <Form ref={this.formRef}>
                <FormItem 
                    label="工地" 
                    name='name'
                    initialValue={ siteInfo ? siteInfo.siteName : null }
                    {...formItemLayout}
                >
                    <Input disabled={true} />
                </FormItem>
                
                <FormItem 
                    label="结构物" 
                    name='things'
                    initialValue={ reStructs ? reStructs.map(val => val.structId.toString()): [] }
                    {...formItemLayout}
                >
                    <Select 
                        mode="multiple" 
                        style={{ width: "100%" }} 
                        placeholder="请选择结构物" 
                        disabled={this.state.structuresDisabled} 
                        filterOption={(input, option) => {
                            const { children } = option.props;
                            return (
                                children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                PinyinHelper.isPinyinMatched(children, input)
                            );
                        }}
                    >
                        {this.renderSelectThings()}
                    </Select>
                </FormItem>

            </Form>
        );
    };

    render() {
        return (
            <div>
                {this.props.visible ?
                    <Modal
                        maskClosable={false}
                        bodyStyle={{ maxHeight: this.props.modalContentMaxHeight, overflowY: 'auto' }}
                        visible={true}
                        title={'关联结构物'}
                        okText='保存'
                        onOk={this.handleOk}
                        onCancel={this.props.onCancel}
                    >
                        {this.renderForm()}
                    </Modal>
                    : ''}
            </div>
        );
    }
}

export default RelateModal;
