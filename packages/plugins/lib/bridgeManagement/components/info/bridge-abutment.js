import React from 'react';
import { Row, Col } from 'antd';
import {
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-form';

import { checkNumeric, checkInteger } from '../../actions/info';

export default (props) => {
  const { hasOpr, readOnly } = props;


  const commonFieldProps = {
    onChange: () => {
        hasOpr('abutment')
    }
  }
  const restProps =  readOnly ? { readonly : true} : {};
  return (
    <>
    <Row>
        <Col span={8}>
            <ProFormText
                width="md"
                name="abutmentForm"
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
                label="桥台数量: "
                name="numberAbutments"
                rules={[
                    { validator: checkInteger }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入桥台数量"
                {...restProps}
            />
            <ProFormText
                width="md"
                label="桥台标高: "
                name="abutmentElevation"
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "M"}}
                placeholder="请输入桥台标高"
                {...restProps}
            />
            <ProFormText
                width="md"
                name="wingWallForm"
                label="翼墙形式: "
                rules={[
                    { max: 70, message: "最多70个字符" }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入翼墙形式"
                {...restProps}
            />
        
        </Col>
        <Col span={8}>
            <ProFormText
                width="md"
                label="基底标高: "
                name="abutmentBaseElevation"
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "M"}}
                placeholder="请输入基底标高"
                {...restProps}
            />
            <ProFormText
                width="md"
                label="台帽尺寸: "
                name="tableCapSize"
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "M"}}
                placeholder="请输入台帽尺寸"
                {...restProps}
            />
            
            <ProFormText
                width="md"
                label="底板尺寸: "
                name="abutmentPlateSize"
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "M"}}
                placeholder="请输入底板尺寸"
                {...restProps}
            />
             <ProFormText
                width="md"
                label="翼墙长度: "
                name="wingWallLength"
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "M"}}
                placeholder="请输入翼墙长度"
                {...restProps}
            />
       
        </Col>
        <Col span={8}>               
            <ProFormText
                width="md"
                label="基桩尺寸: "
                name="abutmentPileSize"
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
                name="abutmentNumPiles"
                rules={[
                    { validator: checkInteger }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入基桩根数"
                {...restProps}
            />
            <ProFormText
                width="md"
                label="挡土板厚度: "
                name="thicknessRetainingPlate"
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "M"}}
                placeholder="请输入挡土板厚度"
                {...restProps}
            />
            <ProFormTextArea
                width="md"
                name="abutmentRemark"
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