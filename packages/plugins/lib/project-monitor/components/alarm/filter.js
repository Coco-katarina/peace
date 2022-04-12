import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MultiSelect } from '@peace/components';
import { PinyinHelper } from '@peace/utils';
import { Select, Form, Button, DatePicker, Radio, Row } from "antd";

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;

class AlarmFilter extends Component {
    constructor(props) {
        super(props);
        this.ALARM_TYPE = {
            DATA: [
                { key: 1, id: 1, name: '数据异常' },
                { key: 6, id: 6, name: 'RTU告警' },
            ],
            DEVICE: [
                { key: 2, id: 2, name: 'DTU异常' },
                { key: 3, id: 3, name: '传感器异常' },
                { key: 4, id: 4, name: '网关异常' },
                { key: 5, id: 5, name: '节点异常' }]
        };
        this.state = {
            showDatePicker: false,
            selectTypes: this.props.alarmTypes
        }
    }
    formRef = React.createRef();

    handleDateTypeChange = (e) => {
        this.setState({ showDatePicker: e.target.value == 'history' });
    }

    handleSearchClick = () => {
        const form = this.formRef.current;
        const { getFieldsValue } = form;
        let values = getFieldsValue();

        if (values.structures == '0') {
            values.structures = null;
        } else {
            values.structures = [values.structures];
        }

        if (values.status == 'history' && values.timeRange) {
            values.startTime = values.timeRange[0].startOf('day').format('YYYY-MM-DD HH:mm:ss');
            values.endTime = values.timeRange[1].endOf('day').format('YYYY-MM-DD HH:mm:ss');
            delete values.timeRange;
        }

        if (values.status == 'new') {
            delete values.timeRange;
            values.startTime = null;
            values.endTime = null;
        }

        values.limit = 10;
        values.offset = 0;
        values.types = this.state.selectTypes;
        this.props.onChange(values);
    }

    handleSelectedChange = (value) => {
        this.setState({ selectTypes: value })
    }

    selectStructList() {
        const { structures } = this.props;
        let selectChildStruct = [<Option key="0">全部结构物</Option>];
        structures.forEach(s => {
            selectChildStruct.push(<Option key={s.id} value={s.id.toString()} >{s.name}</Option>)
        });
        return selectChildStruct;
    }

    render() {
        const { structId, alarmTypesName } = this.props;
        const childrenOptions = alarmTypesName.reduce((p, c) => {
            p = p.concat(this.ALARM_TYPE[c]); return p;
        }, []);
        const arr = [];
        this.state.selectTypes.map(s => { arr.push(s.toString()); });

        return (
            <Row justify="end">
                <Form ref={this.formRef} layout="inline" >
                    <FormItem
                        name='structures'
                        initialValue={structId ? structId.toString() : "0"}
                    >
                        <Select style={{ width: 400 }}
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) => {
                                const { children } = option.props;
                                return (
                                    children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                    PinyinHelper.isPinyinMatched(children, input)
                                );
                            }}>
                            {this.selectStructList()}
                        </Select>
                    </FormItem>
                    <FormItem>
                        <MultiSelect
                            placeholder="请选择"
                            mode="multiple"
                            style={{ height: 32, width: 250 }}
                            value={arr}
                            options={childrenOptions}
                            onChange={this.handleSelectedChange} />
                    </FormItem>
                    <FormItem
                        name={'status'}
                        initialValue={'new'}
                    >
                        <Radio.Group onChange={this.handleDateTypeChange}>
                            <Radio.Button value={'new'}>实时</Radio.Button>
                            <Radio.Button value={'history'}>历史</Radio.Button>
                        </Radio.Group>
                    </FormItem>

                    {this.state.showDatePicker ?
                        <FormItem name={'timeRange'}>
                            <RangePicker style={{ width: 240 }} />
                        </FormItem>
                        : []}
                    <Button type="primary" loading={this.props.loading} onClick={this.handleSearchClick}>查询</Button>
                </Form></Row>
        );
    }
}

function mapStateToProps(state) {
    const { router } = state;
    return {
        structId: router.location.pathname.split(":")[1]
    }
}

export default connect(mapStateToProps)(AlarmFilter);