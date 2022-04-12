import React, { useRef } from 'react';
import { Button } from 'antd';
import { ModalForm, ProFormText, ProFormSelect, ProFormDependency} from '@ant-design/pro-form';

export default (props) => {
  const { title, triggerRender, editData = null, onFinish, onRefresh, partComponents, bridgeMembers } = props;
 
  const fromRef = useRef();
  
  const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };


  const initialValues = editData ? {
    name: editData.name,
    partId: editData.partId,
    componentId: editData.componentId
  } : {};


  const checkName =  async (rule, value) => {
    const form = fromRef.current;
    const partId = form.getFieldValue('partId');
    const componentId = form.getFieldValue('componentId');
    if(editData){
        if(bridgeMembers.some(v=> editData.id !== v.id  && v.partId == partId && v.componentId == componentId && v.name === value)){
            return Promise.reject(new Error('构件名称已经存在!'));
        }
    }else{
        if(bridgeMembers.some(v => v.partId == partId && v.componentId == componentId && v.name === value)){
            return Promise.reject(new Error('构件名称已经存在!'));
        }
    }
    return Promise.resolve();
  }

  const partComponentChange = () => {
    const form = fromRef.current;
    form.setFieldsValue({componentId: null})
  }
 
  return (
    <ModalForm
      title={title || ''}
      formRef={fromRef}
      initialValues={initialValues}
      trigger={
        triggerRender ? triggerRender : <Button type="primary" ghost>
            {title || ''}
        </Button>
      }
      layout="horizontal"
      {...formItemLayout}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {},
      }}
      onFinish={async (values) => {
        const res = await onFinish(values, editData)
        if(res?.success){
            onRefresh && onRefresh();
        }
        return editData ? false : true;
      }}
    >

        <ProFormSelect
          width="md"
          rules={[{ required: true, message: '请选择部位!' }]}
          options={partComponents.map(v=> {
            return {
              label: v.name,
              value: v.id
            }
          })}
          fieldProps={{
            onChange: partComponentChange
          }}
          name="partId"
          label="部位: "
        />
        <ProFormDependency name={['partId']}>
            {({ partId }) => {
                return (
                <ProFormSelect
                    options={partComponents.find(f=>f.id === partId) ? partComponents.find(f=>f.id === partId).bridgeComponents.map(v=> {
                        return {
                            label: v.name,
                            value: v.id
                          }
                    }) : []}
                    width="md"
                    rules={[{ required: true, message: '请选择部件!' }]}
                    name="componentId"
                    label={`部件: `}
                />
                );
            }}
        </ProFormDependency>
      
       
        <ProFormText
          width="md"
          name="name"
          label="构件名称: "
          rules={[{
            required: true, message: '构件名称不能为空',
            }, {
                max: 30, message: '构件名称不能大于30个字符'
            }, {
                whitespace: true, message: '请勿输入空格'
            },{
              validator: checkName
            }]}
           placeholder="请输入构件名称"
        />
  
    </ModalForm>
  );
};