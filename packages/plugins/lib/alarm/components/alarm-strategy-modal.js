import React, { useState, useMemo } from 'react';
import { Button, Form, Tooltip,message } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormSwitch,
  ProFormSelect,
  ProFormCheckbox,
  ProFormDependency
} from '@ant-design/pro-form';

import { Func, AlarmColor } from '$utils';

const FormItem = Form.Item;

export default (props) => {
  const { title, triggerRender, authorData = [] , myStructList= [], editData = null, onFinish } = props;
 
  const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 14 } };
  const memberList = useMemo(()=> authorData.reduce((pre,cur)=>{
        pre = [].concat(pre,cur.members);
        return pre;
  },[]),[authorData]);

  const alarmLevel =  AlarmColor.filter(f=> f.level > 0).map(v=> {
    return {
      label: v.name,
      value: v.level
    }
  })

  
  const initialValues = editData ? {
    structures: editData.structures,
    receivers: editData.receivers,
    categories: editData.categories,
    isEnable: editData.state === 'enabled' ? true : false,
    isEmail: editData.isEmail,
    issms: editData.issms,
    emailAlarmLevel: editData.emailAlarmLevel,
    smsAlarmLevel: editData.smsAlarmLevel
  } : { isEnable: true};
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
        
        let data = {
            noticedUsers: values.receivers,
            structures: values.structures,
            alarmCategories: values.categories,
            emailNoticed: {
                enabled: values.isEmail || false,
                alarmLevels: values.emailAlarmLevel || []
            },
            smsNoticed: {
                enabled: values.issms || false,
                alarmLevels: values.smsAlarmLevel || []
            },
            enabled: values.isEnable || false
        };
        if(data.emailNoticed.alarmLevels.length == 0 && data.smsNoticed.alarmLevels.length == 0){
          message.info('请至少选择一种接收方式!');
          return false;
        }
        onFinish && await onFinish(data, editData)
        return true;
      }}
    >
      
      <ProFormSelect
          width="md"
          rules={[{ required: true, message: '请选择结构物!',type: 'array' }]}
          options={myStructList.map(v=> {
            return {
              label: v.name,
              value: v.id
            }
          })}
          fieldProps={{
            mode: 'multiple',
          }}
          name="structures"
          label="结构物"
        />
    
        
       
        <ProFormSelect
          width="md"
          rules={[{ required: true, message: '请选择告警接收人!' }]}
          options={memberList.map(v=> {
            return {
              label: v.name,
              value: v.id,
              disabled:  (!!v.phone || !!v.email) ? false : true,
              phone: v.phone,
              email: v.email,
              department: v.departmentName,
              post: v.departmentName == '默认' ? '管理员' :  v?.post?.name || ''
            }
          })}
          fieldProps={{
            mode: 'multiple',
            optionItemRender(item) {
                return  <Tooltip title={<div>
                    <div>手机号：{item.phone || ''}</div>
                    <div>邮箱：{item.email || ''}</div>
                    <div>部门：{item.department || ''}</div>
                    <div>职位：{item.post}</div>
                </div>} placement="right">
                    {item.label}
                </Tooltip>
              },
          }}
          name="receivers"
          label="告警接收人"
        />
     
        
        
        <ProFormCheckbox.Group
            width="md"
            name="categories"
            label="接收告警类型"
            rules={[{ required: true, message: '请至少选择一种告警类型!' }]}
            options={[
                { label: "数据类告警", value: 2 },
                { label: "设备类告警", value: 1 }
            ]}
        />
       

            <ProFormDependency name={['receivers']}>
                {({ receivers }) => {
                    let isSmsDisabled = true;
                    if(Array.isArray(receivers) && receivers.length > 0){
                        isSmsDisabled = memberList.filter(f=> receivers.includes(f.id)).some(s=> !!s.phone) ? false : true;
                    }
                    return (
                        <ProFormSwitch 
                            width="md"
                            name="issms"
                            disabled={isSmsDisabled}
                            label="短信接收"
                        />
                    );
                }}
            </ProFormDependency>
           
            <ProFormDependency name={['issms']}>
                {({ issms }) => {
                    return (
                        issms ? <ProFormSelect
                            width="md"
                            rules={[{ required: true, message: '请选择告警等级!' }]}
                            options={alarmLevel}
                            fieldProps={{
                                mode: 'multiple',
                            }}
                            name="smsAlarmLevel"
                            label="接收告警等级"
                        />: ''
                    );
                }}
            </ProFormDependency>
        
            <ProFormDependency name={['receivers']}>
                {({ receivers }) => {
                    let isEmailDisabled = true;
                    if(Array.isArray(receivers) && receivers.length > 0){
                        isEmailDisabled = memberList.filter(f=> receivers.includes(f.id)).some(s=> !!s.email) ? false : true;
                    }
                    return (
                        <ProFormSwitch 
                            width="md"
                            name="isEmail"
                            disabled={isEmailDisabled}
                            label="邮件接收"
                        />
                    );
                }}
            </ProFormDependency>
            
            <ProFormDependency name={['isEmail']}>
                {({ isEmail }) => {
                    return (
                        isEmail ? <ProFormSelect
                        width="md"
                        rules={[{ required: true, message: '请选择告警等级!' }]}
                        options={alarmLevel}
                        fieldProps={{
                            mode: 'multiple',
                        }}
                        name="emailAlarmLevel"
                        label="接收告警等级"
                    />: ''
                    );
                }}
            </ProFormDependency>
       
            <ProFormSwitch 
                width="md"
                name="isEnable"
                label="是否启用"
            />
    </ModalForm>
  );
};