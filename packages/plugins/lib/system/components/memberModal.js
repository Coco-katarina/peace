import React, { useMemo } from 'react';
import { Button, Form, TreeSelect } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormSwitch,
  ProFormSelect,
} from '@ant-design/pro-form';

import { Func } from '$utils';
const FormItem = Form.Item;
// const { SHOW_PARENT } = TreeSelect;

export default (props) => {
  const { title, triggerRender, authorData = [] , editData = null, onFinish, roles, posts } = props;
 
  const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 14 } };
  const memberList = useMemo(()=> authorData.reduce((pre,cur)=>{
        pre = [].concat(pre,cur.members);
        return pre;
  },[]),[authorData]);

  const departmentOptions = useMemo(()=> Func.nestCascader(authorData),[ authorData]);
  const rolesOptions = useMemo(()=> Func.nestTreeRoles(roles,true),[ roles ]);
  
  const initialValues = editData ? {
    name: editData.name,
    username: editData.username,
    phone: editData.phone,
    email: editData.email,
    department: `${editData.departmentId}`,
    roles: editData.roles.map(v=> `${v.id}`),
    postId: editData?.post?.id,
    enabled: editData.enabled === 'enabled' ? true : false
  } : { enabled: true};
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
        onFinish && await onFinish(values, editData)
        //message.success('提交成功');
        return true;
      }}
    >
      
        <ProFormText
          width="md"
          name="name"
          label="用户名"
          rules={[{
            required: true, message: '用户名称不能为空',
            }, {
                max: 10, message: '名称长度不能大于10个字符'
            }, {
                whitespace: true, message: '请勿输入空格'
            }]}
           placeholder="请输入用户名"
        />
        <ProFormText
          width="md"
          name="username"
          label="账号"
          rules={[{
            required: true, message: '账号不能为空',
            }, {
                max: 20, message: '账号长度不能大于20个字符'
            }, {
                whitespace: true, message: '请勿输入空格'
            },{
              validator: async (rule, value) => {
                if(editData){
                  if(memberList.some(v=> editData.id !== v.id  && v.username === value)){
                    return Promise.reject(new Error('账号已经存在!'));
                  }
                }else{
                  if(memberList.some(v=> v.username === value)){
                    return Promise.reject(new Error('账号已经存在!'));
                  }
                }
                return Promise.resolve();
            }
            }]}
           placeholder="请输入账号"
        />

        <FormItem
            label="所属部门"
            name="department"
            rules={[{ required: true, message: '请选择所属部门!' }]}
            {...formItemLayout}
        >
            <TreeSelect 
              treeData={departmentOptions}
              placeholder="请选择所属部门" 
            />
        </FormItem>
        <ProFormSelect
          width="md"
          rules={[{ required: true, message: '请选择职位!' }]}
          options={posts.map(v=> {
            return {
              label: v.name,
              value: v.id
            }
          })}
          name="postId"
          label="职位"
        />
        
        <FormItem
            label="所属角色"
            name="roles"
            rules={[{ required: true, message: '请至少选择一个角色!' }]}
            {...formItemLayout}
        >
            <TreeSelect 
              treeData={rolesOptions}
              treeCheckable
              // showCheckedStrategy={SHOW_PARENT}
              placeholder="请选择所属角色" 
            /> 
        </FormItem>
        
        <ProFormText
          width="md"
          name="phone"
          label="手机号"
          rules={[{
            pattern: /^1[3|4|5|7|8|9]\d{9}$/, message: '手机号码无效'
          }]}
           placeholder="请输入手机号"
        />

        <ProFormText
          width="md"
          name="email"
          label="邮箱"
          rules={[{
            type: 'email', message: '邮箱格式错误!'
            }]}
           placeholder="请输入邮箱"
        />

        <ProFormSwitch 
            width="md"
            name="enabled"
            label="是否启用"
        />
    </ModalForm>
  );
};