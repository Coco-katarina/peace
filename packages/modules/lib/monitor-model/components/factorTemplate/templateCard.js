import React, { Component } from "react";
import { Card, Row, Col, Tooltip, Modal } from "antd";
import { EditOutlined } from '@ant-design/icons';
import "../style.css";

class TemplateCard extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }
  showModal = (e) => {
    this.setState({
      visible: true
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false
    });
  };
  componentDidMount() {
  }
  render() {
    const { editVisible, deleteVisible } = this.props;
    const editStyle = {
      cursor: "pointer",
      display: editVisible ? "block" : "none"
    };
    const deleteStyle = {
      cursor: "pointer",
      display: deleteVisible ? "block" : "none"
    };

    return <Card bordered={false} className="factorCard">
      <Row type="flex" justify="space-between" align="middle" style={{ backgroundColor: "#fff" }}>
        <Col span={22} style={{ fontSize: 14, color: "#000", padding: "15px 24px", wordWrap: 'break-word' }}>
          <span style={{ fontWeight: "bold", fontSize: 14 }}>
            {this.props.cardData.name}
          </span>
          <span style={{ color: "#999", fontSize: 13 }}>
            （{this.props.cardData.structureType.name}）
            </span>
        </Col>
        <Col span={1} style={{ color: "#000" }}>
          {editVisible || deleteVisible ?
            <Tooltip placement="right" trigger="hover" overlayStyle={{ marginLeft: 20 }} title={<div>
              <div onClick={() => this.props.showUpdateModal(this.props.cardData)} style={editStyle}>
                编辑
                    </div>
              <div onClick={e => {
                this.showModal();
              }} style={deleteStyle}>
                删除
                    </div>
            </div>}>
              <EditOutlined  className="factor-card-head-icon" />
            </Tooltip>
            : null
          }
        </Col>
      </Row>
      <Row className="factor-card-body" style={{ height: 150 }}>
        {this.props.cardData.factorTemplateFactors.map(
          val => {
            return (
              <Col key={Math.random()} span={8} style={{
                paddingBottom: 10,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {val.factor.name}
              </Col>
            );
          }
        )}
      </Row>
      <Modal title="警告" maskClosable={false} visible={this.state.visible} onOk={() => {
        this.props.deleteTemplate(this.props.cardData.id);
      }} onCancel={this.handleCancel}>
        确认删除此监测模板？
        </Modal>
    </Card>;
  }
}


export default TemplateCard;
