import React, { Component } from 'react';
import { Row, Col, Modal, Form, Input, Select, Card, Popconfirm, Table, InputNumber, message } from 'antd';
import { FrownOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import './style.less'

const FormItem = Form.Item;
const { Option } = Select;

class StationCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            deletevisible: { 1: false, 2: false, 3: false, 4: false },
            tableparams: [],
            editParams: {},
            params: [],
            groupParams: {},
            stationParams: [],
            canConfigRef: false,
        }
    }
    formRef = React.createRef();

    handleEdit = (s) => {
        this.setState({ groupParams: this.props.data.params });
        let hasBaseParams = s && s.params && (s.params.ref_base || s.params.ref_point);
        this.setState({
            visible: true,
            editParams: s,
            canConfigRef: hasBaseParams,
        })
        let e = []
        s.stations.forEach(s => {
            e.push({ id: s.id, name: s.name })
        })
        let newParams = []
        for (var i = 0; i < e.length; i++) {
            let name = e[i].name
            let params = this.props.data.groups.find(x => x.id == s.id).stations.find(k => k.id == e[i].id).params
            newParams.push({
                key: e[i].id,
                loc: name,
                params: JSON.parse(JSON.stringify(params))
            })
        }
        this.setState({ params: newParams });
    }
    handleOk = (e) => {
        const form = this.formRef.current;
        form.validateFields().then(values => {
            if (values.reBase != undefined && values.reBase == values.rePoint) {
                return message.error("参考基点不可与参考测定相同")
            }
            const stations = []
            this.state.params.map(s => {
                stations.push({ id: s.key, params: s.params })
            })
            let baseNum = 0
            stations.map(s => {
                s.params["base"] ? s.params["base"] == true ? baseNum++ : '' : ''
            })
            if (baseNum > 1) {
                message.error("只能配置一个基准点")
                return;
            } else {
                const name = values.groupType;
                let code;
                this.props.grouptype.find(s => {
                    s.name == name ? code = s.code : ''
                })
                let params = {
                    "type": code,
                    "name": values.name,
                    "stations": stations,
                    "reBase": values.reBase,
                    "rePoint": values.rePoint,
                }
                const groupId = this.state.editParams.id;
                this.props.modifyGroup(groupId, params)
                this.setState({
                    visible: false,
                });
                form.resetFields();
            }
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            canConfigRef: false,
        });
        const form = this.formRef.current;
        form.resetFields();
    }

    handleSelect = (e) => {
        let newParams = []
        for (var i = 0; i < e.length; i++) {
            let name = ''
            this.props.cedian.map(s => {
                {
                    s.groups.map(k => {
                        k.stations.map(y => {
                            e[i] == y.id ? name = y.name : ''
                        })
                    })
                }
            })

            let params = {};
            let nameStr = name.split('-');
            let depth = nameStr[nameStr.length - 1];
            let isNum = /^\d+(\.\d+)?$/.test(depth);
            Object.keys(this.state.groupParams).forEach(key => {
                params[key] = this.state.groupParams[key].type == 'boolean' ? false : isNum ? Number(depth) : ""
            })
            newParams.push({
                key: e[i],
                loc: name,
                params: params
            })
        }
        this.setState({
            params: newParams
        })
    }

    handleDelete = (id) => {
        this.state.deletevisible[id] = true;
        this.setState({ deletevisible: this.state.deletevisible });
        this.props.delete(id)
    }
    handleDeleteOk = (id) => {
        this.state.deletevisible[id] = false;
        this.setState({ deletevisible: this.state.deletevisible });
    }
    hide = (id) => {
        this.state.deletevisible[id] = false;
        this.setState({ deletevisible: this.state.deletevisible });
    }
    handleGroupSelect = (e) => {
        let params = this.props.grouptype.filter(s => s.name == e).map(s => s.params)[0];
        this.setState({ groupParams: params })
    }
    renderItems = () => {
        const { cedian, renderOptions } = this.props;
        const formItems = [];
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 },
        }
        const keys = []
        if (this.state.editParams.stations) {
            this.state.editParams.stations.map(s => { keys.push(s.id) })
        }

        formItems.push(<FormItem
            key="groupType"
            label="分组类型："
            name="groupType"
            initialValue={this.props.data.name}
            {...formItemLayout}>
            <Select
                style={{ width: '100%' }}
                placeholder="Please select"
                onChange={this.handleGroupSelect}
                disabled={true}>
                {this.props.grouptype ? this.props.grouptype.map((s, index) => <Option key={`groupType-${index}`} value={s.name}>{s.name}</Option>) : ''}
            </Select>
        </FormItem>);

        formItems.push(<FormItem
            key="name"
            name="name"
            label="分组名称："
            rules={[{ required: true, message: '不能为空!' }, { max: 20, message: '分组名称长度不能大于20字符' }]}
            initialValue={this.state.editParams.name}
            {...formItemLayout}>
            <Input maxLength="20" />
        </FormItem>);

        formItems.push(<FormItem
            key="cedian"
            name="cedian"
            label="测点"
            rules={[{ required: true, message: '不能为空!' }]}
            initialValue={keys}
            {...formItemLayout}>
            <Select
                style={{ width: '100%' }}
                placeholder="请选择"
                mode="multiple"
                onChange={this.handleSelect}>
                {renderOptions(cedian)}
            </Select>
        </FormItem>);

        return formItems;
    }

    handleDeleteVisibleChange = (visible) => {
        this.setState({ deletevisible: visible });
    }

    handleInputChange = (e) => {
        const arr = this.state.params;
        const value = document.getElementById('inputs' + e.key).value

        const key = e.key;
        const paramstype = e.params
        arr.map(s => { s.key == e.key ? s.params[paramstype] = value : '' })
        this.setState({ params: arr });
    }

    handleSelectChange = (value, keys, params) => {
        let arr = this.state.params;
        const trueOrfalse = value == "true" ? true : false;
        const key = keys;
        const paramstype = params
        arr.map(s => {
            trueOrfalse ? s.key == key ? s.params[paramstype] = true : s.params[paramstype] = false : s.params[paramstype] = trueOrfalse
        })
        this.setState({ params: arr });
    }

    showAllStations = (s) => {
        Modal.info({
            title: '分组信息',
            content: (
                <div>
                    {s.stations.map((item, key, arr) => {
                        return <Row style={{ marginLeft: '15px', marginTop: '8px' }} key={`group-row-${key}`}>
                            <Col span={12} key={`group-col-${key}`}>
                                <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                    <a>
                                        {item.name}
                                    </a>
                                </div>
                            </Col>
                            {
                                Object.keys(item.params).map((key, i) => {
                                    let result = item.params[key]
                                    return <Col span={6} key={`params-${i}`}><b>{result === true ? 'true' : result === false ? 'false' : result}</b></Col>
                                })
                            }
                        </Row>
                    })
                    }
                </div>
            ),
            onOk() { },
        });
    }

    renderBaseParams = () => {
        const { groupParams } = this.state;
        const { formItemLayout, renderOptions, cedian } = this.props;
        const { editParams, canConfigRef } = this.state;
        let baseParams = editParams && editParams.params && (editParams.params.ref_base || editParams.params.ref_point) ? editParams.params : null;
        let paramsItems = [];
        if (groupParams.base) {
            paramsItems.push(
                <FormItem key="re-base"
                    id="re-base"
                    label="参考基点"
                    name="reBase"
                    initialValue={baseParams ? baseParams.ref_base : undefined}
                    {...formItemLayout}
                >
                    <Select
                        style={{ width: '100%' }}
                        placeholder="请选择参考基点"
                    >
                        {renderOptions(cedian)}
                    </Select>
                </FormItem>
            );
            paramsItems.push(
                <FormItem key="re-point"
                    id="re-base"
                    name="rePoint"
                    label="参考测点"
                    initialValue={baseParams ? baseParams.ref_point : undefined}
                    {...formItemLayout}
                >
                    <Select
                        style={{ width: '100%' }}
                        placeholder="请选择参考测点"
                    >
                        {renderOptions(cedian)}
                    </Select>
                </FormItem>
            )
        }
        return paramsItems;
    }

    searchCeDian = (id) => {
        const { cedian } = this.props;
        for (let c of cedian) {
            for (let g of c.groups) {
                for (let s of g.stations) {
                    if (s.id == id) {
                        return s.name
                    }
                }
            }
        }
        return id
    }

    canConfigRefChange = () => {
        const { canConfigRef } = this.state;
        this.setState({ canConfigRef: !canConfigRef })
    }
    render() {
        const columns = [{
            title: '位置',
            dataIndex: 'loc',
            key: 'loc',
        }];

        const { groupParams, canConfigRef } = this.state;
        Object.keys(groupParams).map((key, index) => {
            columns.push({
                title: `${groupParams[key].name}` + ' ' + `${groupParams[key].unit}`,
                dataIndex: `${key}`,
                key: `${key}`,
                render: (text, record) => {
                    let nameStr = record.loc.split('-');
                    let depth = nameStr[nameStr.length - 1];
                    let isNum = /^\d+(\.\d+)?$/.test(depth);
                    return <div>
                        {
                            groupParams[key].type == 'number' ?
                                <InputNumber style={{ width: '100%' }}
                                    value={record.params[key] || (isNum ? Number(depth) : "")}
                                    onChange={this.handleInputChange.bind(record, { key: record.key, params: key })} placeholder={'请输入数值类型值'} id={'inputs' + record.key} /> :
                                groupParams[key].type == 'boolean' ?
                                    <Select value={!record.params[key] ? "false" : record.params[key].toString()}
                                        onChange={value => this.handleSelectChange(value, record.key, key)}
                                        style={{ width: '120px' }}>
                                        <Option value="true" >true</Option>
                                        <Option value="false">false</Option>
                                    </Select> : ''
                        }</div>
                }
            })
        })

        if (this.props.data.groups.length > 0) {
            this.props.data.groups.sort((a, b) => a.id - b.id)
            this.props.data.groups.forEach(s => {
                s.stations.sort((a, b) => a.id - b.id)
            })
        }

        return (
            <div>
                <Row>
                    {
                        this.props.data.groups.length == 0 ?
                            <div style={{ width: '100%', textAlign: 'center', padding: 50, background: '#f8f8f8' }}>
                                <span><FrownOutlined /> 暂无数据</span>
                            </div>
                            : this.props.data.groups.map((s, index) => {
                                const locparams = s.stations.length != 0 ? s.stations[0].params : ''
                                let loc = ''
                                let data = ''
                                for (var i in locparams) {
                                    loc = i;
                                    data = locparams[i]
                                }
                                let hasParams = s.params.ref_base || s.params.ref_point;
                                return <Col style={{ margin: '10px' }} span={7} key={`data-col-${index}`}>
                                    <Card bodyStyle={{ padding: 0 }} key={`card-${index}`}>
                                        <div style={{ borderRadius: '4px', paddingTop: '10px', height: '260px' }}>
                                            <p style={{ fontSize: '18px', clear: 'both', width: '100%', paddingLeft: 9 }}><b>{s.name}</b></p>
                                            <div className="station" style={{ paddingLeft: '10px', width: hasParams ? '60%' : '80%', float: 'left', borderRight: hasParams ? '1px solid #D9D9D9' : 'none', marginTop: '8px' }}>
                                                <Row style={{ marginLeft: '15px' }} key={`station-row-${index}`}>
                                                    <Col span={18} key={`station-col-${index}`}><b>测点</b></Col>
                                                    {Object.keys(this.props.data.params).map((key, i) => {
                                                        return <Col span={6} key={`station-params-col-${i}`}><b>{key}{this.props.data.params[key].unit ? `/(${this.props.data.params[key].unit})` : ''}</b></Col>
                                                    })}
                                                </Row>
                                                {s.stations.map((item, key, index) => {
                                                    return key < 6 ? <Row style={{ marginLeft: '15px' }} key={`station-name-row-${key}`}>
                                                        <Col span={18} key={`station-name-col-${key}`}>
                                                            <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                                                <a>{item.name}</a>
                                                            </div>
                                                        </Col>
                                                        {Object.keys(item.params).map((key, i) => {
                                                            let result = item.params[key]
                                                            return <Col span={6} key={`station-params-col${i}`}><b>{result === true ? 'true' : result === false ? 'false' : result}</b></Col>
                                                        })}
                                                    </Row> : ''
                                                })}
                                                {s.stations.length >= 6 ? <Row style={{ marginLeft: '15px', marginTop: '8px' }} key={`station-extra-${index}`}>
                                                    <Col span={18} key={`station-extra-b-${index}`}></Col>
                                                    <Col span={6} key={`station-extra-a-${index}`}>
                                                        <a onClick={() => this.showAllStations(s)}><EditOutlined style={{ fontSize: '18px' }} /></a>
                                                    </Col>
                                                </Row> : ''}
                                            </div>
                                            <div style={{ width: '40%', float: 'right', marginTop: '8px', paddingLeft: 8, paddingRight: 8 }}>
                                                <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                                    {s.params.ref_base ?
                                                        '参考基点：' + this.searchCeDian(s.params.ref_base) : null}
                                                </div>
                                                <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                                    {s.params.ref_point ?
                                                        '参考测点：' + this.searchCeDian(s.params.ref_point) : null}
                                                </div>
                                            </div>
                                            <div style={{ padding: '6px 16px', backgroundColor: '#FAFAFA', textAlign: 'right', position: 'absolute', bottom: 0, width: '100%' }}                                            >
                                                <a style={{ display: this.props.ModifycalcGroup }} onClick={this.handleEdit.bind(s, s)}><EditOutlined style={{ fontSize: '18px' }} /></a>
                                                {
                                                    !this.props.DeleteCalcGroup ? '' :
                                                        [
                                                            <Popconfirm key={`popconfirm-${index}`} title="确定要删除该分组吗？" onConfirm={this.handleDelete.bind(s, s.id)}>
                                                                <a><DeleteOutlined style={{ fontSize: '18px', marginLeft: '15px', }} /></a>
                                                            </Popconfirm>
                                                        ]
                                                }
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            })
                    }
                </Row>

                <Modal
                    maskClosable={false}
                    title="编辑分组"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form ref={this.formRef}>
                        {this.renderItems()}

                        <div style={{ marginLeft: '30px', marginBottom: 15, width: '78%' }}>
                            <Table bordered size='small' pagination={false} columns={columns} dataSource={this.state.params} />
                        </div>
                        {
                            groupParams.base ?
                                <div style={{ textAlign: 'center', fontSize: 'smaller', position: 'relative', right: 43, marginBottom: 13 }}>
                                    <a onClick={this.canConfigRefChange}>参考点配置</a>
                                </div> : null
                        }
                        {canConfigRef ? this.renderBaseParams() : null}
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default connect()(StationCard);;