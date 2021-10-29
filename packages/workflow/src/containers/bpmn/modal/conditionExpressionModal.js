'use strict';
import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Select, Space, Radio, Input, message } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

const { Option } = Select;
const ConditionExpressionModal = ({...props}) => {

    let { saveBpmnJson, bpmnJson, curElementId, procinstVars } = props;
    bpmnJson[curElementId] = bpmnJson[curElementId] || {}
    let { expressType = 'pass', expressCondition = [], expressName = ''  } = bpmnJson[curElementId];
    //console.log(bpmnJson,curElementId)
    if(expressCondition.length == 0){
        expressCondition = [];
        expressCondition.push({
            logical: undefined,
            procinstVar: undefined,
            operator: undefined,
            conditionValue: ''
        });
        bpmnJson[curElementId].expressCondition = expressCondition
    }
    const handleAddExpress = () => {
        if(expressCondition.length > 5){
            message.info('最多支持6个条件');
            return;
        }
        expressCondition.push({
            logical: undefined,
            procinstVar: undefined,
            operator: undefined,
            conditionValue: ''
        })
        bpmnJson[curElementId].expressCondition = expressCondition;
        saveBpmnJson(bpmnJson)
    }
    const handleDeleteExpress = (index) => {
        let newExpressCondition = expressCondition.filter((v,i) => i !== index);
        bpmnJson[curElementId].expressCondition = newExpressCondition;
        saveBpmnJson(bpmnJson)
    }
    const handleProcinstVarChange = (value,index) => {
        bpmnJson[curElementId].expressCondition[index].procinstVar = value;
        saveBpmnJson(bpmnJson)
    }
    const handleOperatorChange = (value,index) => {
        bpmnJson[curElementId].expressCondition[index].operator = value;
        saveBpmnJson(bpmnJson)
    }
    const handleConditionValueChange = (value,index) => {
        bpmnJson[curElementId].expressCondition[index].conditionValue = value;
        saveBpmnJson(bpmnJson)
    }
    const handleLogicalChange = (value,index) => {
        bpmnJson[curElementId].expressCondition[index].logical = value;
        saveBpmnJson(bpmnJson)
    }
    return (
        <div>
         <Row gutter={16} style={{marginBottom: 20}}>
            <Col span={24}>
                <Space>
                条件名称: 
                <Input allowClear value={expressName} onChange={({ target: { value } }) => {
                    bpmnJson[curElementId].expressName = value;
                    saveBpmnJson(bpmnJson)
                }} />
                </Space>
            </Col>
        </Row>
        <Row gutter={16} style={{marginBottom: 20}}>
            <Col span={24}>
                条件选择: <Radio.Group
                onChange={({ target: { value } }) => {
                    bpmnJson[curElementId].expressType = value;
                    saveBpmnJson(bpmnJson)
                }}
                value={expressType}
                >
                <Radio value="pass">是</Radio>
                <Radio value="reject">否</Radio>
                <Radio value="custom">自定义条件</Radio>
                </Radio.Group>  
            </Col>
        </Row>
        {
            expressType === 'custom' && 
            <Row gutter={16} style={{marginBottom: 20}}>
                <Col span={16}>
                    {
                        expressCondition.map((v,index)=>(
                            <Row key={index} gutter={16} style={{marginBottom: 10}}>
                                <Col span={24}>
                                <Space>
                                {
                                    index > 0 && <Select value={v.logical} placeholder="选择条件逻辑"  style={{ width: 150 }} onChange={(value)=>{handleLogicalChange(value,index)}}>
                                    <Option  value='and'>并且</Option>
                                    <Option  value='or'>或者</Option>
                                </Select>
                                }
                                {
                                    procinstVars.length > 0 && <Select value={v.procinstVar} placeholder="选择流程变量"  style={{ width: 150 }} onChange={(value)=>{handleProcinstVarChange(value,index)}}>
                                    {
                                        procinstVars.map( p => <Option key={p.code} value={p.code}>{p.name}</Option> )
                                    }
                                </Select>
                                }
                                {
                                    procinstVars.length > 0 && <Select placeholder="选择运算符" value={v.operator} style={{ width: 150 }} onChange={(value)=>{handleOperatorChange(value,index)}}>
                                    <Option  value='=='>等于</Option>
                                    <Option  value='!='>不等于</Option>
                                    <Option  value='>'>大于</Option>
                                    <Option  value='>='>大于等于</Option>
                                    <Option  value='<'>小于</Option>
                                    <Option  value='<='>小于等于</Option>
                                </Select>
                                }
                                
                                <Input allowClear value={v.conditionValue} onChange={({ target: { value } }) => {
                                    handleConditionValueChange(value,index)
                                }} />
                     
                                {
                                   index > 0 && <Button style={{marginLeft: 10}} shape="circle" onClick={()=> {handleDeleteExpress(index)}} icon={<CloseOutlined />} />
                                }
                                </Space>
                                </Col>
                            </Row>
                        ))
                    } 
                </Col>
                <Col span={2}>
                <Button style={{marginLeft: 10}} shape="circle" onClick={handleAddExpress} icon={<PlusOutlined />} />
                </Col>
            </Row>
        } 
        </div>
      );
}



export default ConditionExpressionModal;