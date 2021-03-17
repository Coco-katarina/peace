import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import { Chart } from '@peace/components';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Form, Modal, Input, Button, Switch, DatePicker, Row } from "antd";
import { getAbnParamList, editAbnParams, getItemAbnResult_int } from '../../actions/abnParamCfg';
import { GetItemAbnResult_int } from '../../constants'

const { TimeAbnValueLineChart } = Chart;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class InterruptModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currStartTime: moment().add(-1, 'days').format('YYYY-MM-DD HH:mm:ss'),
      currEndTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    };
  }
  formRef = React.createRef();

  // componentDidMount() {
  //   let data = this.props.modalData;
  //   const form = this.formRef.current;
  //   form.setFieldsValue({
  //     stationName: data.stationName,
  //     factorName: data.factorName,
  //     interrupt: data.params.thr_int,
  //     isEnable: data.enabled
  //   });
  // }

  componentWillUnmount() {
    this.props.dispatch({ type: GetItemAbnResult_int.CLEAR });
    // this.props.dispatch({ type: 'ABN_DATA_INTERRUPT_CALC_CLEAR' });
  }
  //表单类
  btnFormSubmit = () => {
    let data = this.props.modalData;
    const form = this.formRef.current;
    form.validateFields().then(values => {
      let paramJson = { "thr_int": Number(values.interrupt) };
      let pushData = {
        station: data.stationId,//测点
        factorId: data.factorId,
        itemId: null,
        abnType: 1,//中断
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
      let paramJson = { "thr_int": values.interrupt }
      let data = {
        station: this.props.modalData.stationId,
        factorId: this.props.modalData.factorId,
        itemId: this.props.modalData.itemId,
        abnType: 'interrupt',//算法类型
        enabled: true,
        params: paramJson
      };
      let start = this.state.currStartTime;
      let end = this.state.currEndTime;
      this.props.dispatch(getItemAbnResult_int(this.props.structId, start, end, data)).then(res => {
      })
    });
  }
  render() {
    const { abnItemCompData, modalData } = this.props;
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
        let one = { name: "中断点：" + calcArray[j].time + "（中断时长：" + calcArray[j].hour.toFixed(2) + "h）", value: calcArray[j].value, time: calcArray[j].time };
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
            name="stationName"
            key="stationName"
            rules={[{ required: true, message: "测点位置" }]}
            initialValue={modalData && modalData.stationName}
          >
            <Input disabled={true} />
          </FormItem>
          <FormItem
            name="factorName"
            key="factorName"
            rules={[{ required: true, message: "监测因素" }]}
            initialValue={modalData && modalData.factorName}>
            <Input disabled={true} />
          </FormItem>
          <FormItem
            name="isEnable"
            key="isEnable"
            valuePropName={"checked"}
            initialValue={modalData && modalData.enabled}
          >
            <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={'启用'} />
          </FormItem>
          <FormItem
            label="中断阈值："
            name="interrupt"
            key="interrupt"
            rules={[
              { required: true, message: '请输入中断阈值' },
              { validator: this.checkInterger }
            ]}
            initialValue={modalData && modalData.params.thr_int}
          >
            <Input placeholder="中断阈值：正整数" />
          </FormItem>

          <Row style={{ marginTop: 15 }}>
            <FormItem
              name="timeSelected"
              key="timeSelected"
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
              <div style={{ margin: '30px 0' }}><InfoCircleOutlined /> 输入参数，点击数据对比展示数据对比图（中断仅展示第一个监测项）</div>
              :
              originalData && originalData[0] != '还没查询' && originalData.length > 0 ?
                <TimeAbnValueLineChart contentType={'interrupt'} data={stationsData}
                  width={300}
                  height={300}
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
  const { abnItemState_int } = state;
  return {
    abnItemCompData: abnItemState_int.data,
  }
}

export default connect(mapStateToProps)(InterruptModal);
