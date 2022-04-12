import React from 'react';
import { Row, Col } from 'antd';
import {
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-form';

import { checkNumeric, checkInteger } from '../../actions/info';

export default (props) => {
  const {  hasOpr, readOnly } = props;


  const commonFieldProps = {
    onChange: () => {
        hasOpr('pier')
    }
  }
  const restProps =  readOnly ? { readonly : true} : {};
  return (
    <>
    <Row>
        <Col span={8}>
            <ProFormText
                width="md"
                name="pierForm"
                label="形式: "
                rules={[
                    { max: 70, message: "最多70个字符" }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入形式"
                {...restProps}
            />
            <ProFormText
                width="md"
                label="桥墩数量: "
                name="numberPiers"
                rules={[
                    { validator: checkInteger }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入桥墩数量"
                {...restProps}
            />
            <ProFormText
                width="md"
                label="桥墩标高: "
                name="pierElevation"
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "M"}}
                placeholder="请输入桥墩标高"
                {...restProps}
            />
        
        </Col>
        <Col span={8}>
            <ProFormText
                width="md"
                label="盖梁尺寸: "
                name="capBeamSize"
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "M"}}
                placeholder="请输入盖梁尺寸"
                {...restProps}
            />
            <ProFormText
                width="md"
                label="基底标高: "
                name="pierBaseElevation"
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "M"}}
                placeholder="请输入基底标高"
                {...restProps}
            />
            <ProFormText
                width="md"
                label="底板尺寸: "
                name="pierPlateSize"
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "M"}}
                placeholder="请输入底板尺寸"
                {...restProps}
            />
       
        </Col>
        <Col span={8}>
            <ProFormText
                width="md"
                label="基桩尺寸: "
                name="pierPileSize"
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "M"}}
                placeholder="请输入基桩尺寸"
                {...restProps}
            />
            <ProFormText
                width="md"
                label="基桩根数: "
                name="pierNumPiles"
                rules={[
                    { validator: checkInteger }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入基桩根数"
                {...restProps}
            />
        
            <ProFormTextArea
                width="md"
                name="pierRemark"
                label="备注: "
                placeholder="请输入备注"
                rules={[
                    { max: 200, message: "最多200个字符" }
                ]}
                fieldProps={commonFieldProps}
                {...restProps}
            />        
        </Col>
    </Row>                     
    </> 
  );
};