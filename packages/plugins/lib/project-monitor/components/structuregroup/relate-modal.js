/**
 * Created by ZhouXin on 2018/9/20.
 */
'use strict';

import React, { Component } from 'react';
import { Modal, Form, Select, Input } from 'antd';
import { PinyinHelper } from '@peace/utils';

const FormItem = Form.Item;
const Option = Select.Option;

class RelateModal extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
    }

    renderSelectThings = () => {
        const { structureList } = this.props;

        let selectChild = [];
        // [<Option key="all">全部</Option>];
        if (!structureList.length > 0) {
            return;
        }
        structureList.map(val => {
            selectChild.push(
                <Option key={val.id.toString()} value={val.id.toString()}>
                    {val.name}
                </Option>
            );
        });
        return selectChild;
    }

    handleOk = () => {
        let id = this.props.structuregroup.key;
        const form = this.formRef.current;
        form.validateFields().then((val) => {
            let structuresArr = [];
            for (let i in val.structures) {
                // if (val.structures[i] != "all") {
                if (!structuresArr.includes(parseInt(val.structures[i]))) {
                    structuresArr.push(parseInt(val.structures[i]));
                }
                // } else {
                // structuresArr = this.props.structureList.map(
                //     k => {
                //         return k.id;
                //     }
                // );
                // break;
                // }
            }
            let dataToSave = {
                structureIds: structuresArr,
            };
            this.props.onSave(id, dataToSave);
            form.resetFields();
        });
    }
    handleCancel = () => {
        const form = this.formRef.current;
        form.resetFields();
        this.props.onCancel();
    }

    renderForm = () => {
        const { structuregroup } = this.props;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        return (
            <Form ref={this.formRef} {...formItemLayout}>
                <FormItem label="结构物群" name='name'
                    initialValue={structuregroup ? structuregroup.name : null}
                >
                    <Input disabled={true} />
                </FormItem>
                <FormItem label="结构物" name='structures'
                    initialValue={
                        structuregroup ? structuregroup.structs.map(val => {
                            return val.toString();
                        }) : []
                    }
                >
                    <Select mode="multiple" style={{ width: "100%" }} placeholder="请选择结构物" filterOption={(input, option) => {
                        const { children } = option.props;
                        return (
                            children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                            PinyinHelper.isPinyinMatched(children, input)
                        );
                    }}>
                        {this.renderSelectThings()}
                    </Select>
                </FormItem>
            </Form>
        );
    }

    render() {
        return (
            <div>
                <Modal
                    maskClosable={false}
                    visible={this.props.visible}
                    title={'关联结构物'}
                    okText='保存'
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    destroyOnClose
                >
                    {this.renderForm()}
                </Modal>
            </div>
        );
    }
}

export default RelateModal;