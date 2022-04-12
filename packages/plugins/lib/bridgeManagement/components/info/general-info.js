import React from 'react';
import { Row, Col } from 'antd';
import ProForm, {
  ProFormText,
  ProFormDatePicker,
  ProFormSelect,
  ProFormTextArea
} from '@ant-design/pro-form';
import moment from 'moment';

import { checkNumeric, checkInteger } from '../../actions/info';

export default (props) => {
  const {  editData = null, bridges, hasOpr, constants, readOnly } = props;
 
//   const checkNameExists = async (rule, value) => {
//     if(editData){
//       if(bridges.some(v=> editData.id !== v.id  && v.name === value)){
//         return Promise.reject(new Error('该桥梁名称已被占用!'));
//       }
//     }else{
//       if(bridges.some(v=> v.name === value)){
//         return Promise.reject(new Error('该桥梁名称已被占用!'));
//       }
//     }
//     return Promise.resolve();
//   }
  const checkScheme = async (rule, value) => {
    if(editData){
        if(bridges.some(v=> editData.id !== v.id  && v.extraInfo.fileNo == value)){
            return Promise.reject(new Error('该档案编号已存在!'));
         
        }
    }else{
        if(bridges.some(v=> v.extraInfo.fileNo == value)){
            return Promise.reject(new Error('该档案编号已存在!'));
        }
    } 
    return Promise.resolve();
  }

  const commonFieldProps = {
    onChange: () => {
        hasOpr('info')
    }
  }
  const restProps =  readOnly ? { readonly : true} : {};
  return (
    <>
    <Row>
        <Col span={8}>
            <ProFormText
                width="md"
                name="name"
                label="桥梁名称: "
                readonly
                // rules={[
                //     { required: true, whitespace: true, max: 70, message: "不能为空，且最多70个字符" },
                //     { validator: checkNameExists }
                // ]}
                fieldProps={commonFieldProps}
                placeholder="请输入桥梁名称"
            />
            <ProFormText
                width="md"
                name="fileNo"
                label="档案编号: "
                rules={[
                    { required: true, whitespace: true, max: 70, message: "不能为空，且最多70个字符" },
                    { validator: checkScheme }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入档案编号"
                {...restProps}
               
            />
            <ProFormSelect
                width="md"
                rules={[{ required: true, message: '请选择所在地区!' }]}
                options={constants.filter(f => f.category == 'region').map(v=> {
                    return {
                    label: v.name,
                    value: v.id
                    }
                })}
                fieldProps={{...commonFieldProps,labelInValue: true}}
                name="region"
                label="所在地区: "
                {...restProps}
            />
            <ProFormText
                width="md"
                name="way"
                label="所在路名: "
                rules={[
                    { required: true, whitespace: true, max: 70, message: "不能为空，且最多70个字符" }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入所在路名"
                {...restProps}
            />
            <ProFormSelect
                width="md"
                rules={[{ required: true, message: '请选择养护类别!' }]}
                options={constants.filter(f => f.category == 'maintainCate').map(v=> {
                    return {
                    label: v.name,
                    value: v.id
                    }
                })}
                fieldProps={{...commonFieldProps, labelInValue: true}}
                name="maintainCate"
                label="养护类别: "
                {...restProps}
            />
            <ProFormSelect
                width="md"
                rules={[{ required: true, message: '请选择养护等级!' }]}
                options={constants.filter(f => f.category == 'maintainLevel').map(v=> {
                    return {
                    label: v.name,
                    value: v.id
                    }
                })}
                fieldProps={{...commonFieldProps, labelInValue: true}}
                name="maintainLevel"
                label="养护等级: "
                {...restProps}
            />
            <ProFormSelect
                width="md"
                rules={[{ required: true, message: '请选择运行状态!' }]}
                options={constants.filter(f => f.category == 'bridgeState').map(v=> {
                    return {
                    label: v.name,
                    value: v.id
                    }
                })}
                fieldProps={{...commonFieldProps, labelInValue: true}}
                name="bridgeState"
                label="运行状态: "
                {...restProps}
            />
           
            <ProFormDatePicker
                width="md"
                name="createdTime" 
                label="建成年月"
                rules={[{ required: true, message: '请选择日期' }]}
                fieldProps={{
                    ...commonFieldProps, 
                    format: 'YYYYMMDD', 
                    disabledDate: (value) => {
                        return value.valueOf() > moment().valueOf();
                    } 
                }}
                {...restProps}
            />
            <ProFormSelect
                width="md"
                rules={[{ required: true, message: '请选择桥幅数!' }]}
                options={[
                    { label: '单幅', value: 1 },
                    { label: '双幅', value: 2 }
                ]}
                fieldProps={{...commonFieldProps,labelInValue: true}}
                name="sectionNum"
                label="桥幅数: "
                {...restProps}
            />
            <ProFormSelect
                width="md"
                rules={[{ required: true, message: '请选择养护单位!' }]}
                options={constants.filter(f => f.category == 'maintainCompany').map(v=> {
                    return {
                    label: v.name,
                    value: v.id
                    }
                })}
                fieldProps={{...commonFieldProps, labelInValue: true, showSearch: true, filterOption: (input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }}
                name="maintainCompany"
                label="养护单位: "
                {...restProps}
            />
            <ProFormText
                width="md"
                label="跨越: "
                name="strideOver"
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: 'M' }}
                placeholder="请输入跨越长度"
                {...restProps}
            />
            <ProFormText
                width="md"
                label="总造价: "
                name="totalCost"
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: '元' }}
                placeholder="请输入总造价"
                {...restProps}
            />
        </Col>
        <Col span={8}>
            <ProFormSelect
                width="md"
                options={constants.filter(f => f.category == 'manageCompany').map(v=> {
                    return {
                    label: v.name,
                    value: v.id
                    }
                })}
                fieldProps={{...commonFieldProps, labelInValue: true, showSearch: true, filterOption: (input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }}
                name="manageCompany"
                label="管理单位: "
                {...restProps}
            />
            <ProFormText
                width="md"
                name="buildCompany"
                label="建设单位: "
                rules={[
                    { max: 70, message: "最多70个字符" }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入建设单位"
                {...restProps}
            />
            <ProFormText
                width="md"
                name="designCompany"
                label="设计单位: "
                rules={[
                    { max: 70, message: "最多70个字符" }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入设计单位"
                {...restProps}
            />
            <ProFormText
                width="md"
                name="constructionCompany"
                label="施工单位: "
                rules={[
                    { max: 70, message: "最多70个字符" }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入施工单位"
                {...restProps}
            />
            <ProFormText
                width="md"
                name="supervisorCompany"
                label="监理单位: "
                rules={[
                    { max: 70, message: "最多70个字符" }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入监理单位"
                {...restProps}
            />
            <ProFormSelect
                width="md"
                options={constants.filter(f => f.category == 'roadLevel').map(v=> {
                    return {
                    label: v.name,
                    value: v.id
                    }
                })}
                fieldProps={{...commonFieldProps,labelInValue: true}}
                name="roadLevel"
                label="道路等级: "
                {...restProps}
            />
            <ProFormSelect
                width="md"
                options={constants.filter(f => f.category == 'bridgeType').map(v=> {
                    return {
                    label: v.name,
                    value: v.id
                    }
                })}
                fieldProps={{...commonFieldProps, labelInValue: true}}
                name="bridgeType"
                label="结构类型: "
                {...restProps}
            />
            <ProFormSelect
                width="md"
                options={constants.filter(f => f.category == 'bridgeWeight').map(v=> {
                    return {
                    label: v.name,
                    value: v.id
                    }
                })}
                fieldProps={{...commonFieldProps, labelInValue: true}}
                name="bridgeWeight"
                label="设计荷载: "
                {...restProps}
            />
            
            <ProFormText
                width="md"
                name="level"
                label="等级: "
                rules={[
                    { max: 70, message: "最多70个字符" }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入等级"
                {...restProps}
            />
            <ProFormText
                width="md"
                name="limitationCriteria"
                label="限制标准: "
                rules={[
                    { max: 70, message: "最多70个字符" }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入限制标准"
                {...restProps}
            />
            <ProFormSelect
                width="md"
                options={constants.filter(f => f.category == 'bridgeSeismicIntensity').map(v=> {
                    return {
                    label: v.name,
                    value: v.id
                    }
                })}
                fieldProps={{...commonFieldProps, labelInValue: true}}
                name="seismicIntensity"
                label="抗震烈度: "
                {...restProps}
            />
            <ProFormTextArea
                width="md"
                name="remark"
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
                name="skewAngle"
                label="正斜交角: "
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "°"}}
                placeholder="请输入正斜交角"
                {...restProps}
            />
            <ProFormText
                width="md"
                name="bridgeSpans"
                label="桥梁跨数: "
                rules={[
                    { validator: checkInteger }
                ]}
                fieldProps={commonFieldProps}
                placeholder="请输入桥梁跨数"
                {...restProps}
            />
            <ProFormText
                width="md"
                name="spanCombination"
                label="跨径组合: "
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "M"}}
                placeholder="请输入跨径组合"
                {...restProps}
            />
            <ProFormText
                width="md"
                name="deckArea"
                label="桥面面积: "
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "M²"}}
                placeholder="请输入桥面面积"
                {...restProps}
            />
            <ProFormText
                width="md"
                name="bridgeLength"
                label="桥梁总长: "
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "M"}}
                placeholder="请输入桥梁总长"
                {...restProps}
            />
            <ProFormText
                width="md"
                name="bridgeWidth"
                label="桥梁总宽: "
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "M"}}
                placeholder="请输入桥梁总宽"
                {...restProps}
            />
            <ProFormText
                width="md"
                name="roadwayWidth"
                label="车行道净宽: "
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "M"}}
                placeholder="请输入车行道净宽"
                {...restProps}
            />
            <ProFormText
                width="md"
                name="sidewalkWidth"
                label="人行道净宽: "
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "M"}}
                placeholder="请输入人行道净宽"
                {...restProps}
            />
            <ProFormSelect
                width="md"
                options={constants.filter(f => f.category == 'riverLevel').map(v=> {
                    return {
                    label: v.name,
                    value: v.id
                    }
                })}
                fieldProps={{...commonFieldProps, labelInValue: true}}
                name="riverLevel"
                label="河道等级: "
                {...restProps}
            />
            <ProFormText
                width="md"
                name="waterMaxDepth"
                label="最高水位: "
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "M"}}
                placeholder="请输入最高水位"
                {...restProps}
            />
            <ProFormText
                width="md"
                name="waterNormalDepth"
                label="常水位: "
                rules={[
                    { validator: checkNumeric }
                ]}
                fieldProps={{...commonFieldProps, addonAfter: "M"}}
                placeholder="请输入常水位"
                {...restProps}
            />     
        </Col>
    </Row>                     
    </> 
  );
};