import React from 'react';
import { Button } from 'antd';
import {
  ModalForm,
  ProFormText
} from '@ant-design/pro-form';

export default (props) => {
  const { title, triggerRender, parent = null, departments = [] , editData = null, onFinish, initialValues = null, disabled = false } = props;
  const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 14 } };
  return (
    <ModalForm
      title={title || ''}
      initialValues={initialValues || {}}
      trigger={
        triggerRender ? triggerRender : <Button type="primary" disabled={disabled} ghost>
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
        onFinish && await onFinish(values, parent, editData)
        //message.success('提交成功');
        return true;
      }}
    >
      
        <ProFormText
          width="md"
          name="name"
          label="部门名称"
          rules={[{
            required: true, message: '部门名称不能为空',
            }, {
                max: 10, message: '名称长度不能大于10个字符'
            }, {
                whitespace: true, message: '请勿输入空格'
            },{
              validator: async (rule, value) => {
                
                if(editData){
                  if(departments.some(v=> editData.departmentId !== v.departmentId  && v.departmentName === value)){
                    return Promise.reject(new Error('部门名称已经存在!'));
                   
                  }
                }else{
                  if(departments.some(v=> v.departmentName === value)){
                    return Promise.reject(new Error('部门名称已经存在!'));
                  }
                }
                return Promise.resolve();
            }
            }]}
           placeholder="请输入部门名称"
        />

        {
          parent &&  <ProFormText
                        width="md"
                        name="parentName"
                        readonly
                        label="上级部门"
                      />
        }
       
    </ModalForm>
  );
};