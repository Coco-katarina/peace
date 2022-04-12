import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Tabs, Row, Modal, Form, Input, Select, Table, InputNumber, message, Card } from 'antd';
import { AuthorizationCode } from '$utils';
import { getZuheList, getGroupType, getCedian, addGroup, deleteGroup, modifyGroup } from '../../actions/zuhe';
import StationCard from '../../components/seniorConfig/stationCard';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { Option, OptGroup } = Select;

const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
}

class Zuhe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addvisible: false,
            params: [],
            groupParams: {},
            SelectValue: {},
            currentTablePaneKey: null,
            canConfigRef: false,
        }
    }
    formRef = React.createRef();

    componentDidMount() {
        const { match, dispatch } = this.props
        dispatch(getZuheList(match.params.id))
        dispatch(getCedian(match.params.id))
        dispatch(getGroupType()).then(action => {
            this.setState({ groupParams: action.payload.data[0].params });
        })
    }

    handleAdd = (e) => {
        this.setState({ addvisible: true });
    }
    handleAddOk = (e) => {
        const { grouptype, match, data, dispatch } = this.props;
        const form = this.formRef.current;
        form.validateFields().then(values => {
            if (values.reBase != undefined && values.reBase == values.rePoint) {
                return message.error("参考基点不可与参考测定相同")
            }
            const name = values.groupType;
            let code;
            grouptype.map(s => { s.name == name ? code = s.code : '' })
            const stations = []
            this.state.params.map(s => {
                stations.push({ id: s.key, params: s.params })
            })

            let params = {
                "type": code,
                "name": values.name,
                "stations": stations,
                "reBase": values.reBase,
                "rePoint": values.rePoint,
            }
            const groupData = data;
            let isGroupExit = false;
            data.map(s => s.name == values.groupType ? s.groups.map(k => {
                k.name == values.name ? isGroupExit = true : ''
            }) : '')

            if (isGroupExit) {
                message.error("分组名已存在")
                return;
            } else {
                dispatch(addGroup(params)).then(_ => {
                    dispatch(getZuheList(match.params.id))
                })
                form.resetFields();
                this.setState({
                    addvisible: false,
                    params: [],
                    canConfigRef: false,
                });
            }
        });
    }
    handleAddCancel = (e) => {
        const form = this.formRef.current;
        form.resetFields();
        this.setState({
            addvisible: false,
            params: [],
            canConfigRef: false,
        });
    }
    handleGroupSelect = (e) => {
        const { grouptype } = this.props;
        const form = this.formRef.current;
        let params = grouptype.filter(s => s.name == e).map(s => s.params)[0];
        this.setState({ groupParams: params, params: [] });
        form.resetFields()
    }

    handleInputChange = (e) => {
        const arr = this.state.params;
        const value = document.getElementById('input' + e.key).value

        const key = e.key;
        const paramstype = e.params
        arr.map(s => {
            s.key == e.key ? s.params[paramstype] = value : ''
        })
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
    renderItems = () => {
        const { grouptype, cedian } = this.props;
        const { currentTablePaneKey } = this.state;
        const formItems = [];

        let defaultGroupType = ''
        if (grouptype && grouptype.length > 0) {
            let currentGroup = grouptype.filter(g => g.code == currentTablePaneKey);
            defaultGroupType = currentGroup.length > 0 ? currentGroup[0].name : grouptype[0].name
        }

        formItems.push(<FormItem
            key="group-type"
            id="group-type"
            name="groupType"
            label="分组类型："
            rules={[{ required: true, message: '还未选择分组类型!' }]}
            initialValue={defaultGroupType}
            {...formItemLayout}
        >
            <Select
                style={{ width: '100%' }}
                placeholder="请选择"
                onChange={this.handleGroupSelect}
            >
                {grouptype.map(s => <Option key={s.name}>{s.name}</Option>) || []}
            </Select>
        </FormItem>);
        formItems.push(<FormItem key="compangy-guinmo"
            id="compangy-guinmo"
            label="分组名称："
            name="name"
            rules={[{ required: true, message: '不能为空!' }, { max: 20, message: '分组名称长度不能大于20字符' }]}
            {...formItemLayout}
        >
            <Input placeholder="请填写" maxLength="20" />
        </FormItem>);
        formItems.push(<FormItem key="ce-dian"
            id="ce-dian"
            label="测点"
            name="cedian"
            rules={[{ required: true, message: '不能为空!' }]}
            {...formItemLayout}
        >
            <Select
                style={{ width: '100%' }}
                placeholder="请选择"
                mode="multiple"
                onChange={this.handleSelect}
            >
                {this.renderOptions(cedian)}
            </Select>
        </FormItem>);

        return formItems;
    }

    renderOptions = (cedian) => {
        let result = (cedian ? cedian.map((s, index) => {
            return s.factorProto == '4001' || s.factorProto == '4004' || s.factorProto == '4005' || s.factorProto == '4020' ? <OptGroup key={`optGroup-${index}`} label={s.factorName}>
                {
                    s.groups.map(k => {
                        return k.stations.map(y => {
                            return <Option value={y.id} key={y.id}>{y.name}</Option>
                        })
                    })
                }
            </OptGroup> : null
        }) : '').filter(s => s != null)
        return result;
    }

    handleDelete = (id) => {
        const { match, dispatch } = this.props;
        dispatch(deleteGroup(id)).then(_ => {
            dispatch(getZuheList(match.params.id))
        })
    }

    handleModify = (id, params) => {
        const { match, dispatch } = this.props;
        dispatch(modifyGroup(id, params)).then(_ => {
            dispatch(getZuheList(match.params.id))
        })
    }

    renderBaseParams = () => {
        const { groupParams } = this.state;
        const { cedian } = this.props;
        let paramsItems = [];
        if (groupParams.base) {
            paramsItems.push(
                <FormItem key="re-base"
                    id="re-base"
                    label="参考基点"
                    name="reBase"
                    {...formItemLayout}
                >
                    <Select
                        style={{ width: '100%' }}
                        placeholder="请选择参考基点"
                    >
                        {this.renderOptions(cedian)}
                    </Select>
                </FormItem>
            );
            paramsItems.push(
                <FormItem key="re-point"
                    id="re-base"
                    label="参考测点"
                    name="rePoint"
                    {...formItemLayout}
                >
                    <Select
                        style={{ width: '100%' }}
                        placeholder="请选择参考测点"
                    >
                        {this.renderOptions(cedian)}
                    </Select>
                </FormItem>
            )
        }
        return paramsItems;
    }

    tabPaneChange = (key) => {
        const { grouptype } = this.props;
        let params = grouptype.filter(s => s.code == key).map(s => s.params)[0];
        this.setState({ groupParams: params, });
        this.setState({ currentTablePaneKey: key })
    }

    canConfigRefChange = () => {
        const { canConfigRef } = this.state;
        this.setState({ canConfigRef: !canConfigRef })
    }
    render() {
        const { match, location, cedian, grouptype, user } = this.props;
        const { groupParams, canConfigRef } = this.state;
        const columns = [{
            title: '位置',
            dataIndex: 'loc',
            key: 'loc',
        }
        ]
        Object.keys(groupParams).map(key => {
            columns.push({
                title: `${groupParams[key].name}` + ' ' + `${groupParams[key].unit}`,
                dataIndex: `${key}`,
                key: `${key}`,
                render: (text, record) => {
                    let nameStr = record.loc.split('-');
                    let depth = nameStr[nameStr.length - 1];
                    let isNum = /^\d+(\.\d+)?$/.test(depth);
                    return <Row>
                        {
                            groupParams[key].type == 'number' ?
                                <InputNumber
                                    style={{ width: '100%' }}
                                    value={record.params[key] || (isNum ? Number(depth) : "")}
                                    onChange={this.handleInputChange.bind(record, { key: record.key, params: key })}
                                    placeholder={'请输入数值类型值'} id={'input' + record.key} /> :
                                groupParams[key].type == 'boolean' ?
                                    <Select
                                        value={!record.params[key] ? "false" : record.params[key].toString()}
                                        onChange={value => this.handleSelectChange(value, record.key, key)}
                                        style={{ width: '120px' }}>
                                        <Option value="true">true</Option>
                                        <Option value="false">false</Option>
                                    </Select> : ''
                        }
                    </Row>
                }
            })
        })
        const resources = user.resources;
        const AddCalcGroup = resources.length == 0 ? "none" : resources.indexOf(AuthorizationCode.AddCalcGroup) > -1 ? 'block' : 'none';
        const ModifycalcGroup = resources.length == 0 ? "none" : resources.indexOf(AuthorizationCode.ModifycalcGroup) > -1 ? 'inline' : 'none';
        const DeleteCalcGroup = resources.some(r => r == AuthorizationCode.DeleteCalcGroup);
        const data = this.props.data && this.props.data.length > 0 ? this.props.data.sort((a, b) => a.code - b.code) : []
        let defaultActiveKey = ''
        if (this.props.data && this.props.data.length > 0) {
            defaultActiveKey = this.props.data[0].code
        }
        return (
                <Card >
                    <Button style={{ display: AddCalcGroup, marginBottom: 10 }} onClick={this.handleAdd} type='primary'>添加分组</Button>
                    {
                        data.length > 0 ? <Tabs defaultActiveKey={defaultActiveKey} type={'card'} size={'small'} onChange={this.tabPaneChange}>
                            {
                                data.map(s => {
                                    return <TabPane tab={s.name} key={s.code}>
                                        <StationCard
                                            data={s}
                                            code={s.code}
                                            name={s.name}
                                            groupParams={groupParams}
                                            cedian={cedian}
                                            grouptype={grouptype}
                                            formItemLayout={formItemLayout}
                                            DeleteCalcGroup={DeleteCalcGroup}
                                            ModifycalcGroup={ModifycalcGroup}
                                            delete={this.handleDelete}
                                            modifyGroup={this.handleModify}
                                            renderOptions={this.renderOptions}
                                        />
                                    </TabPane>
                                })
                            }
                        </Tabs> : ''
                    }

                    <Modal
                        title="添加分组"
                        maskClosable={false}
                        visible={this.state.addvisible}
                        onOk={this.handleAddOk}
                        onCancel={this.handleAddCancel}
                    >
                        <Form ref={this.formRef}>
                            {this.renderItems()}
                        </Form>
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
                    </Modal>
                </Card>
        )
    }
}
function mapStateToProps(state) {
    const { zuhe, auth, groupType, cedian, singleStructState } = state;
    return {
        data: zuhe.data,
        isRequesting: zuhe.isRequesting || groupType.isRequesting || cedian.isRequesting,
        grouptype: groupType.data || [],
        cedian: cedian.data || [],
        structState: singleStructState.info,
        user: auth.user
    };
}
export default connect(mapStateToProps)(Zuhe);