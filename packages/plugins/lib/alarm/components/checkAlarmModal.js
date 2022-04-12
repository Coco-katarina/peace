import React from 'react';
import {
  ModalForm,
  ProFormTextArea
} from '@ant-design/pro-form';
import { QuestionCircleOutlined } from '@ant-design/icons';
export default (props) => {
  const {  onFinish, editData } = props;
  const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 14 } };
  return (
    <ModalForm
      title={<span><QuestionCircleOutlined />人工恢复告警？</span>}
      trigger={<a>确认</a>}
      layout="horizontal"
      {...formItemLayout}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {},
      }}
      onFinish={async (values) => {
        onFinish && await onFinish(values,editData)
        return true;
      }}
    >
      
        <ProFormTextArea
          width="md"
          name="content"
          label="确认信息"
          rules={[{
            required: true, message: '不能为空',
            }, {
                max: 100, message: '长度不能大于100个字符'
            }, {
                whitespace: true, message: '请勿输入空格'
            }]}
           placeholder="请输入确认信息"
        />
       
    </ModalForm>
  );
};