import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form, Select, Input, Card, Row, Col, Tag } from "antd";
import { PlusOutlined } from '@ant-design/icons';

import { ImageCropper } from '@peace/components';
import { RouteRequest } from '@peace/utils';

const FormItem = Form.Item;
const Option = Select.Option;

class TypeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      tempDescImg: null
    };
  }
  formRef = React.createRef();
  handleSubmit = values => {
    // e.preventDefault();
    // this.props.form.validateFieldsAndScroll((err, values) => {
    //   if (err) {
    //     return;
    //   }
    //   this.props.addTemplate(values);
    // });
    this.props.addTemplate(values);
  };

  handleModalOk = (file) => {
    const form = this.formRef.current;
    RouteRequest.post('/upload/descImg', file).then(res => {
      this.setState({ tempDescImg: res.uploaded });
      form.setFieldsValue({
        portrait: res.uploaded
      });
    });
    this.setState({ visible: false })
  }
  handleModalCancel = () => {
    this.setState({ visible: false })
  }
  checkName = (rule, value, callback) => {
    if (!value)
      callback();
    else {
      if (this.props.structTypeList.find(s => s.name == value))
        callback([new Error('该结构物类型名称已被占用')])
      else
        callback();
    }
  }

  render() {
    
    const { tempDescImg, visible } = this.state;
    return <div>
      <Modal title={"新增结构物类型"} maskClosable={false} visible={true} onCancel={this.props.closeModal} footer={null}>
        <Form ref={this.formRef} onFinish={this.handleSubmit}>
          <FormItem 
            label="类型名称" 
            labelCol={{ span: 6 }} 
            wrapperCol={{ span: 16 }}
            name='name'
            rules={[
              { required: true, message: "请输入名称" },
              { max: 20, message: "最多20个字符" },
              { validator: this.checkName }
            ]}
          >
           <Input placeholder="名称最长20个字符" />
          </FormItem>
          <FormItem
            labelCol={{ span: 6 }} 
            wrapperCol={{ span: 16 }}
            label="默认图片"
            name='portrait'
          >
            
              <div style={{ textAlign: 'center', cursor: 'pointer', }}>
                {/* <Modal
                  maskClosable={false}
                  title="请选择图片"
                  visible={visible}
                  width='50%'
                  footer={null}
                  closable={false}
                > */}
                  <ImageCropper
                      visible={visible}
                      handleCropperOk={this.handleModalOk}
                      handleCancel={this.handleModalCancel}
                      originalImage={tempDescImg}
                      //noCompress={true}
                  />
                {/* </Modal> */}
                {tempDescImg ? <img src={tempDescImg} width='100%' style={{ display: 'block', border: '1px solid #d9d9d9' }} alt='' /> : null}
                <div onClick={() => this.setState({ visible: true })}
                  style={{ margin: '0 auto', position: 'absolute', top: '50%', left: "70px", marginTop: '-30px', textAlign: 'center', width: '60%', height: '100%' }}>
                  <PlusOutlined type="plus" style={{ fontSize: '60px' }} />
                </div >
                <div style={{ textAlign: 'left' }}>
                  <Tag color="orange">图片格式需是：png | jpg | svg</Tag>
                </div>
              </div>
          </FormItem>
          <FormItem wrapperCol={{ span: 8, offset: 4 }}>
            <Button onClick={this.props.closeModal} style={{ marginRight: 10 }}>
              取消
              </Button>
            <Button type="primary" htmlType="submit">
              保存
              </Button>
          </FormItem>
        </Form>
      </Modal>
    </div>;
  }
}


function mapStateToProps(state) {
  return {
  };
}
export default connect(mapStateToProps)(TypeModal);