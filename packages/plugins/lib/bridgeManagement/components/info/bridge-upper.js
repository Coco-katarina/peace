import React from 'react';
import {  Row, Col } from 'antd';
import { ProFormText,ProFormTextArea } from '@ant-design/pro-form';
import { checkNumeric, checkInteger } from '../../actions/info';

export default (props) => {
  const {  hasOpr, readOnly } = props;

  const commonFieldProps = {
    onChange: () => {
        hasOpr('upper')
    }
  }
  const restProps =  readOnly ? { readonly : true} : {};
  return (
    <>
    <Row>
        <Col span={8}>
            <ProFormText
                width="md"
                name="formMainbeam"
                label="主梁形式: "
                rules={[
                    { max: 70, message: "最多70个字符" }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入主梁形式"
                {...restProps}
            />
            <ProFormText
                width="md"
                name="formBeam"
                label="横梁形式: "
                rules={[
                    { max: 70, message: "最多70个字符" }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入横梁形式"
                {...restProps}
            />
            <ProFormText
                width="md"
                label="拱桥矢跨比: "
                name="lossspanratioArch"
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入拱桥矢跨比"
                {...restProps}
            />
            <ProFormText
                width="md"
                name="deckStructure"
                label="桥面结构: "
                rules={[
                    { max: 70, message: "最多70个字符" }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入桥面结构"
                {...restProps}
            />
            <ProFormText
                width="md"
                label="伸缩缝数量: "
                name="expansionJointNum"
                rules={[
                    { validator: checkInteger }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入伸缩缝数量"
                {...restProps}
            />
            <ProFormText
                width="md"
                label="引桥纵坡: "
                name="longitudinalApproach"
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "%"}}
                placeholder="请输入引桥纵坡"
                {...restProps}
            />
 
        </Col>
        <Col span={8}>
            <ProFormText
                width="md"
                label="主梁尺寸: "
                name="mainbeamSize"
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "M"}}
                placeholder="请输入主梁尺寸"
                {...restProps}
            />
            <ProFormText
                width="md"
                label="主跨桥下净空: "
                name="clearanceUnderMainspan"
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "M"}}
                placeholder="请输入主跨桥下净空"
                {...restProps}
            />
            <ProFormText
                width="md"
                name="bearingType"
                label="支座形式: "
                rules={[
                    { max: 70, message: "最多70个字符" }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入支座形式"
                {...restProps}
            />
            <ProFormText
                width="md"
                label="桥面铺装厚度: "
                name="deckPavementThickness"
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "M"}}
                placeholder="请输入桥面铺装厚度"
                {...restProps}
            />
            <ProFormText
                width="md"
                label="主桥纵坡: "
                name="longitudinalBridge"
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "%"}}
                placeholder="请输入主桥纵坡"
                {...restProps}
            />
            <ProFormText
                width="md"
                label="引桥横坡: "
                name="crossApproach"
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "%"}}
                placeholder="请输入引桥横坡"
                {...restProps}
            />
        
        </Col>
        <Col span={8}>
            <ProFormText
                width="md"
                label="主梁数量: "
                name="mainbeamNum"
                rules={[
                    { validator: checkInteger }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入主梁数量"
                {...restProps}
            />
            <ProFormText
                width="md"
                label="桥下限高: "
                name="limitHeightBridge"
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "M"}}
                placeholder="请输入桥下限高"
                {...restProps}
            />
            <ProFormText
                width="md"
                label="支座数量: "
                name="bearingNumber"
                rules={[
                    { validator: checkInteger }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入支座数量"
                {...restProps}
            />
            <ProFormText
                width="md"
                name="formExpansionJoint"
                label="伸缩缝形式: "
                rules={[
                    { max: 70, message: "最多70个字符" }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入伸缩缝形式"
                {...restProps}
            />
            <ProFormText
                width="md"
                label="主桥横坡: "
                name="crossBridge"
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "%"}}
                placeholder="请输入主桥横坡"
                {...restProps}
            />
            <ProFormTextArea
                width="md"
                name="upperRemark"
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