import React, { useState } from 'react';
import { Button, Tooltip } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormSwitch,
  ProFormSelect,
  ProFormCheckbox,
  ProFormDependency
} from '@ant-design/pro-form';

import { Func, AlarmColor } from '$utils';

export default (props) => {
  const { title, triggerRender, myStructList= [], editData = null, onFinish } = props;

  const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 14 } };


  const alarmLevel =  AlarmColor.filter(f=> f.level > 0).map(v=> {
    return {
      label: v.name,
      value: v.level
    }
  })

  
  const initialValues = editData ? {
    structures: editData.structures,
    categories: editData.categories,
    isEnable: editData.state === 'enabled' ? true : false,
    deviceId: editData.broadcastDeviceId,
    alarmLevel: editData.broadcastAlarmLevel,
  } : { isEnable: true};
  return (
    <ModalForm
      title={title || ''}
      initialValues={initialValues}
      trigger={
        triggerRender ? triggerRender : <Button style={{marginLeft: 5}} type="primary" ghost>
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
            structures: values.structures,
            alarmCategories: values.categories,
            broadcastNoticed: true,
            broadcastAlarmLevels: values.alarmLevel || [],
            broadcastDeviceId: values.deviceId,
            enabled: values.isEnable || false
        };
        onFinish && await onFinish(data, editData)
        return true;
      }}
    >
      
      <ProFormSelect
          width="md"
          rules={[{ required: true, message: '请选择结构物!', type: 'array' }]}
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

        <ProFormText
            width="md"
            name="deviceId"
            rules={[{ required: true, message: "请填写广播设备ID" }]}
            label="广播设备ID"
            fieldProps={{
                maxLength: 50
            }}
            placeholder="请填写广播设备ID"
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
       
        <ProFormSelect
            width="md"
            rules={[{ required: true, message: '请至少选择一种告警等级!' }]}
            options={alarmLevel}
            fieldProps={{
                mode: 'multiple',
            }}
            name="alarmLevel"
            label="接收告警等级"
        />
            <ProFormSwitch 
                width="md"
                name="isEnable"
                label="是否启用"
            />
    </ModalForm>
  );
};