import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import { Chart } from '@peace/components';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Form, Modal, Input, Button, Switch, DatePicker, Row } from "antd";
import { getAbnParamList, editAbnParams, getItemAbnResult_burr } from '../../actions/abnParamCfg';
import { GetItemAbnResult_burr } from '../../constants';

const { TimeAbnValueLineChart } = Chart;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

class BurrModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currStartTime: moment().add(-1, 'days').format('YYYY-MM-DD HH:mm:ss'),
      currEndTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    };
  }
  formRef = React.createRef();
  componentDidMount() {
    let data = this.props.modalData;
    const form = this.formRef.current;
    form.setFieldsValue({
      stationName: data.stationName,
      factorName: data.factorName + "/" + data.itemName,
      burr: data.params.thr_burr,
      isEnable: data.enabled
    });
  }
  componentWillUnmount() {
    this.props.dispatch({ type: GetItemAbnResult_burr.CLEAR });
  }
  //表单类
  btnFormSubmit = () => {
    let data = this.props.modalData;
    const form = this.formRef.current;
    form.validateFields().then(values => {
      let paramJson = { "thr_burr": Number(values.burr) };
      let pushData = {
        station: data.stationId,//测点
        factorId: data.factorId,
        itemId: data.itemId,
        abnType: 2,//毛刺
        enabled: values.isEnable,
        params: paramJson
      };
      this.props.dispatch(editAbnParams(data.id, pushData)).then(_ => {
        this.props.dispatch(getAbnParamList(this.props.structId)).then(() => {
          this.props.closeModal();
        });
      });
    });
  };

  checkInterger = (rule, value, callback) => {
    if (!value) {
      callback();
    } else {
      const pattern = /^[1-9]*[1-9][0-9]*$/;
      if (pattern.test(value)) {
        callback();
      } else {
        callback(new Error('请输入正整数'));
      }
    }
  };
  timeOnChange = (dates, dateStrings) => {
    if (dates.length == 0) {
      this.setState({
        currStartTime: null,
        currEndTime: null,
      })
      return message.warning('请选择时间');
    }
    this.setState({
      currStartTime: dates[0].format('YYYY-MM-DD HH:mm:ss'),
      currEndTime: dates[1].format('YYYY-MM-DD HH:mm:ss'),
    })
  }
  //数据对比
  dataCompare = () => {
    const form = this.formRef.current;
    form.validateFields().then(values => {
      let paramJson = { "thr_burr": values.burr }
      let data = {
        station: this.props.modalData.stationId,
        factorId: this.props.modalData.factorId,
        itemId: this.props.modalData.itemId,
        abnType: 'burr',//算法类型
        enabled: true,
        params: paramJson
      };
      let start = this.state.currStartTime;
      let end = this.state.currEndTime;
      this.props.dispatch(getItemAbnResult_burr(this.props.structId, start, end, data)).then(res => {
      })
    });
  }
  checkNumber = (rule, value, callback) => {
    if (!value) {
      callback();
    } else {
      const pattern = /^-?\d+(\.\d+)?$/;
      if (pattern.test(value)) {
        callback();
      } else {
        callback(new Error('请输入数字'));
      }
    }
  }
  render() {
    const { abnItemCompData } = this.props;
    let originalData = ['还没查询'], calcArray = [], key, itemName, start, end;
    let stationsData = [];
    if (abnItemCompData) {
      originalData = abnItemCompData.stationData;
      calcArray = abnItemCompData.resultArray;
      key = abnItemCompData.itemKey;
      itemName = abnItemCompData.itemName;
      start = originalData && originalData.length > 0 ? originalData[0].time : '';
      end = originalData && originalData.length > 0 ? originalData[originalData.length - 1].time : '';
      for (let i = 0; i < originalData.length; i++) {
        let one = { name: itemName + "（单位：" + abnItemCompData.unit + "）", value: originalData[i][key], time: originalData[i].time };
        stationsData.push(one);
      }
      for (let j = 0; j < calcArray.length; j++) {
        let one = {
          name: "毛刺点：" + calcArray[j].time + "（突变大小：" + calcArray[j].burr.toFixed(2) + abnItemCompData.unit + "）"
          , value: calcArray[j].value, time: calcArray[j].time
        };
        stationsData.push(one);
      }
    }
    return <div>
      <Modal
        maskClosable={false}
        title="异常参数编辑"
        visible={this.props.visible}
        onCancel={this.props.closeModal}
        width={900}
        footer={[<div>
          <Button type="primary" htmlType="submit" onClick={this.btnFormSubmit}>保存</Button>
          <Button key="cancel" onClick={this.props.closeModal}>关闭</Button>
        </div>]}>
        <Form ref={this.formRef} layout="inline">
          <FormItem
            name={"stationName"}
            key={"stationName"}
            rules={[{ required: true, message: "测点位置" }]}
          >
            <Input id="stationName" disabled={true} />
          </FormItem>
          <FormItem
            name={"factorName"}
            key={"factorName"}
            rules={[{ required: true, message: "监测因素" }]}
          >
            <Input id="factorName" disabled={true} />
          </FormItem>

          <FormItem
            name={"isEnable"}
            key={"isEnable"}
            valuePropName={"checked"}
          >
            <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={'启用'} />
          </FormItem>
          <FormItem
            label="毛刺阈值："
            name={"burr"}
            key={"burr"}
            rules={[
              { required: true, message: '请输入毛刺阈值' },
              { validator: this.checkNumber }
            ]}
          >
            <Input id="burr" placeholder="毛刺阈值：数字" />
          </FormItem>

          <Row style={{ marginTop: 15 }}>
            <FormItem
              name={"timeSelected"}
              key={"timeSelected"}
              initialValue={[moment().add(-1, 'days'), moment()]}
            >
              <RangePicker
                format="YYYY-MM-DD HH:mm:ss"
                showTime
                placeholder={['开始时间', '结束时间']}
                onChange={this.timeOnChange}
              />
            </FormItem>

            <FormItem>
              <Button size='default' type="primary" onClick={this.dataCompare}>数据对比</Button>
            </FormItem>
          </Row>

          <div className="data-chart-container" style={{ width: '100%' }}>
            {originalData && originalData[0] == '还没查询' ?
              <div style={{ margin: '30px 0' }}><InfoCircleOutlined /> 输入参数，点击数据对比展示数据对比图</div>
              :
              originalData && originalData[0] != '还没查询' && originalData.length > 0 ?
                <TimeAbnValueLineChart contentType={'burr'} data={stationsData} width={300} height={300}
                  itemName={itemName} configs={{ slider: { start: start, end: end } }} />
                :
                <div style={{ margin: '30px 0' }}><InfoCircleOutlined /> 没有查询到任何有效数据！</div>}
          </div>

        </Form>
      </Modal>
    </div>;
  }
}
function mapStateToProps(state) {
  const { abnItemState_burr } = state;
  return {
    abnItemCompData: abnItemState_burr.data,
  }
}

export default connect(mapStateToProps)(BurrModal);
