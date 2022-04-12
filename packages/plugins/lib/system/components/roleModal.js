import React from 'react';
import { Button } from 'antd';
import { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';

export default (props) => {
  const { title, triggerRender, isGroup = false, roles = [] , editData = null, onFinish } = props;
  const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 14 } };
  const initialValues = editData ? {
    name: editData.name,
    groupId: editData.groupId || null
  } : {};
  return (
    <ModalForm
      title={title || ''}
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
        onFinish && await onFinish(values, editData, isGroup)
        //message.success('提交成功');
        return true;
      }}
    >
      
      {
          isGroup ? <ProFormText
          width="md"
          name="name"
          label="角色组名称"
          rules={[{
            required: true, message: '角色组名称不能为空',
            }, {
                max: 10, message: '名称长度不能大于10个字符'
            }, {
                whitespace: true, message: '请勿输入空格'
            },{
              validator: async (rule, value) => {
                if(editData){
                  if(roles.some(v=> editData.id !== v.id  && v.name === value)){
                    return Promise.reject(new Error('角色组名称已经存在!'));
                    
                  }
                }else{
                  if(roles.some(v=> v.name === value)){
                    return Promise.reject(new Error('角色组名称已经存在!'));
                  }
                }
                return Promise.resolve();
            }
            }]}
           placeholder="请输入角色组名称"
        />:
        <>
            <ProFormText
          width="md"
          name="name"
          label="角色名称"
          rules={[{
            required: true, message: '角色名称不能为空',
            }, {
                max: 10, message: '名称长度不能大于10个字符'
            }, {
                whitespace: true, message: '请勿输入空格'
            },{
              validator: async (rule, value) => {
                if(editData){
                  if(roles.reduce((p,c)=>{ return p.concat(c.roles)},[]).some(v=> editData.id !== v.id  && v.name === value)){
                    return Promise.reject(new Error('角色名称已经存在!'));
                   
                  }
                }else{
                  if(roles.reduce((p,c)=>{ return p.concat(c.roles)},[]).some(v=> v.name === value)){
                    return Promise.reject(new Error('角色名称已经存在!'));
                  }
                }
                return Promise.resolve();
            }
            }]}
           placeholder="请输入角色名称"
        />
        <ProFormSelect
           width="md"
           rules={[{ required: true, message: '请选择角色组!' }]}
           options={roles.filter(f=> f.name != '默认').map(v=> {
             return {
               label: v.name,
               value: v.id
             }
           })}
           name="groupId"
           label="角色组"
         />
        </>

      }
  
    </ModalForm>
  );
};