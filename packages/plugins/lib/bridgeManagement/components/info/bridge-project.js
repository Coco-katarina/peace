import React from 'react';
import { Row, Col } from 'antd';
import { ProFormText,ProFormTextArea } from '@ant-design/pro-form';
import { checkNumeric, checkInteger } from '../../actions/info';

export default (props) => {
  const {  hasOpr, readOnly } = props;

  const commonFieldProps = {
    onChange: () => {
        hasOpr('project')
    }
  }
  const restProps =  readOnly ? { readonly : true} : {};
  return (
    <>
    <Row>
        <Col span={8}>           
            <ProFormText
                width="md"
                label="集水口尺寸: "
                name="sizeWaterCollectport"
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "M"}}
                placeholder="请输入集水口尺寸"
                {...restProps}
            />
            <ProFormText
                width="md"
                label="集水口数量: "
                name="numberWaterCollectoutlets"
                rules={[
                    { validator: checkInteger }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入集水口数量"
                {...restProps}
            />
            <ProFormText
                width="md"
                label="泄水管尺寸: "
                name="sizeDrainPipe"
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "M"}}
                placeholder="请输入泄水管尺寸"
                {...restProps}
            />
            <ProFormTextArea
                width="md"
                name="workRemark"
                label="备注: "
                placeholder="请输入备注"
                rules={[
                    { max: 200, message: "最多200个字符" }
                ]}
                fieldProps={commonFieldProps}
                {...restProps}
            />  
            
        </Col>
        <Col span={8}>
            <ProFormText
                width="md"
                label="泄水管长度: "
                name="numberDrainPipe"
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "M"}}
                placeholder="请输入泄水管长度"
                {...restProps}
            />
            <ProFormText
                width="md"
                label="栏杆总长: "
                name="totalLengthRailing"
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "M"}}
                placeholder="请输入栏杆总长"
                {...restProps}
            />
            <ProFormText
                width="md"
                name="railingStructure"
                label="栏杆结构: "
                rules={[
                    { max: 70, message: "最多70个字符" }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入栏杆结构"
                {...restProps}
            />

        </Col>
        <Col span={8}>        
            <ProFormText
                width="md"
                label="端柱尺寸: "
                name="endPostSize"
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "M"}}
                placeholder="请输入端柱尺寸"
                {...restProps}
            />
            <ProFormText
                width="md"
                name="typeRevetment"
                label="护岸类型: "
                rules={[
                    { max: 70, message: "最多70个字符" }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入护岸类型"
                {...restProps}
            />
            <ProFormText
                width="md"
                name="typeSlope"
                label="引坡挡墙类型: "
                rules={[
                    { max: 70, message: "最多70个字符" }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入引坡挡墙类型"
                {...restProps}
            />
                  
        </Col>
    </Row>                     
    </> 
  );
};