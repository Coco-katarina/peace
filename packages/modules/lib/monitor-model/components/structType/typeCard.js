import React, { Component } from "react";
import { Card, Row, Col, Tooltip, Modal,Alert} from "antd";
import { EditOutlined } from '@ant-design/icons';
const confirm = Modal.confirm;

class TypeCard extends Component {
  constructor(props) {
    super(props);
  }

    // static propTypes = {
    //     editVisible: React.PropTypes.bool.isRequired,
    //     deleteVisible: React.PropTypes.bool.isRequired,
    // };

  componentDidMount() {
  }
  showConfirm=()=> {
      let _this = this;
      const {id,name} = this.props.cardData;
      confirm({
          title: '确认删除此结构物类型？',
          content: `${name}`,
          onOk() {
              _this.props.deleteTemplate(id);
          },
          onCancel() {
              _this.setState({
                  visible: false
              });
          },
      });
  }

  renderFactors = ()=>{
      return this.props.factors.map(f=>(
          <Col key={Math.random()} span={8} style={{ paddingBottom: 10,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'  }}>
              {f.name}
          </Col>
      ))
  }

  render() {
      const {editVisible,deleteVisible} = this.props;
      const editStyle={
          cursor: "pointer",
          display:editVisible?"block":"none"
      };
      const deleteStyle={
          cursor: "pointer",
          display:deleteVisible?"block":"none"
      };

    return <Card bordered={false} className="factorCard">
        <Row type="flex" justify="space-between" align="middle" style={{ backgroundColor: "#fff" }}>
          <Col span={22} style={{ fontSize: 14, color: "#000", padding: "15px 24px" }}>
            <span style={{ fontWeight: "bold", fontSize: 14 }}>
              {this.props.cardData.name}
            </span>            
          </Col>
        <Col span={1} style={{ color: "#000" }}>
            {editVisible || deleteVisible ?
                <Tooltip placement="right" trigger="hover" overlayStyle={{marginLeft: 20}} title={<div>
                    <div onClick={() => this.props.showUpdateModal({
                        structType: this.props.cardData,
                        factors: this.props.factors
                    })} style={{cursor: "pointer"}}>
                        编辑
                    </div>
                    <div onClick={this.showConfirm} style={{cursor: "pointer"}}>删除</div>
                </div>}>
                    <EditOutlined  className="factor-card-head-icon"/>
                </Tooltip>
                : null
            }
          </Col>
        </Row>      
        <Row className="factor-card-body" style={{ height: 150}}>
            {this.props.factors && this.props.factors.length > 0
                ? this.renderFactors()
                :
                <Alert
                    message="无监测因素"
                    description="点击右上角编辑按钮，添加监测因素"
                    type="warning"
                    showIcon
                />
            }
        </Row>
      </Card>;
  }
}


export default TypeCard;
