import React from 'react';
import { Row, Col } from 'antd';
import {
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-form';


export default (props) => {
  const {  hasOpr, readOnly } = props;


  const commonFieldProps = {
    onChange: () => {
        hasOpr('pipeline')
    }
  }
  const restProps =  readOnly ? { readonly : true} : {};
  return (
    <>
    <Row>
        <Col span={12}>
            <ProFormText
                width="md"
                name="waterPipe"
                label="给水管: "
                rules={[
                    { max: 70, message: "最多70个字符" }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入给水管"
                {...restProps}
            />
            <ProFormText
                width="md"
                name="gasPipe"
                label="燃气管: "
                rules={[
                    { max: 70, message: "最多70个字符" }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入燃气管"
                {...restProps}
            />
            <ProFormTextArea
                width="md"
                name="pipelineRemark"
                label="备注: "
                placeholder="请输入备注"
                rules={[
                    { max: 200, message: "最多200个字符" }
                ]}
                fieldProps={commonFieldProps}
                {...restProps}
            />  
            
        </Col>
        <Col span={12}>
            <ProFormText
                width="md"
                name="powerCable"
                label="电力缆: "
                rules={[
                    { max: 70, message: "最多70个字符" }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入电力缆"
                {...restProps}
            />
            <ProFormText
                width="md"
                name="communicationCables"
                label="通信电缆: "
                rules={[
                    { max: 70, message: "最多70个字符" }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入通信电缆"
                {...restProps}
            />

        </Col>
        
    </Row>                     
    </> 
  );
};