'use strict';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, Row, Col, Form, Input, Radio, message, Select, Button, DatePicker, Space, Table } from 'antd';
import { getProcessPageConfig } from '../../actions/workflowProcessForm'
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;
const { RangePicker } = DatePicker;

const ProcessApproval = props => {
    //console.log(props);
    const { dispatch, match, processPageConfig, history } = props
    const [form] = Form.useForm();

    useEffect(() => {
        const { params } = match
        dispatch(getProcessPageConfig(params.processId))
    }, [])

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const searchJson = processPageConfig || [{
        type: 'select',
        label: '状态',
        name: 'state',
        placeholder: "审核状态",
        options: [
            { value: 1, name: '待审批', default: true },
            { value: 2, name: '审批通过' },
            { value: 3, name: '审批退回' },
            { value: 4, name: '全部' },
        ]
    }, {
        type: 'rangePicker',
        label: '日志日期',
        name: 'logTime',
    }, {
        type: 'input',
        label: '关键字',
        name: 'keyword',
        placeholder: "客户名称/储备项目/销售",
    },];

    const getDefaultValue = (searchJson) => {
        let defaultV = {}
        for (let sj of searchJson) {
            switch (sj.type) {
                case 'input':
                    if (sj.defaultV) {
                        defaultV[sj.name] = sj.defaultV
                    }
                    break;
                case 'select':
                    let defaultValue = sj.options.find(sjo => sjo.default)
                    if (defaultValue) {
                        defaultV[sj.name] = defaultValue.value
                    }
                    break;
                default:
                    ''
            }
        }
        return defaultV
    };

    const tableColumns = [
        {
            title: '序号',
            key: 'index',
            render(t, r, i) {
                return i + 1
            }
        }, {
            title: '日志日期',
            key: 'logTime',
        }, {
            title: '提交日期',
            key: 'upTime',
        }, {
            title: '今日事务',
            key: 'today',
        }, {
            title: '是否拜访',
            key: 'logTime',
            filters: [
                {
                    text: '是',
                    value: '是',
                },
                {
                    text: '否',
                    value: '否',
                },
            ],
            onFilter: (value, record) => record.logTime.indexOf(value) === 0,
        }, {
            title: '明日计划',
            key: 'logTime',
        }, {
            title: '存在问题',
            key: 'logTime',
        }, {
            title: '当前状态',
            key: 'logTime',
        }, {
            title: '批复意见',
            key: 'logTime',
        }, {
            title: '批复时间',
            key: 'logTime',
        }, {
            title: '操作',
            render(r) {
                return (
                    <a style={{ cursor: 'pointer' }} onClick={() => {
                        window.open('http://localhost:5000/process/detail',
                            // "_blank",
                            "_self",
                            `toolbar=yes, location=yes, directories=no, status=no, menubar=yes, 
                        scrollbars=yes, resizable=no, copyhistory=yes, width=900, height=700 `
                        )
                    }}>查看详情</a>
                )
            }
        },
    ].map(c => {
        c['ellipsis'] = true
        return c
    })

    return (
        <div style={{
            height: document.body.clientHeight,
            backgroundColor: '#fff'
        }}>
            <Space wrap>
                <Button>添加 + 流程名称</Button>
                <Form
                    layout={'inline'}
                    form={form}
                    initialValues={getDefaultValue(searchJson)}
                    onFinish={onFinish}
                >
                    <Space wrap>
                        {
                            (() => {
                                return searchJson.map(sj => {
                                    let content = ''
                                    switch (sj.type) {
                                        case 'input':
                                            content = <Input placeholder={sj.placeholder} />
                                            break;
                                        case 'select':
                                            content = (
                                                <Select style={{ minWidth: 120 }} >
                                                    {sj.options.map(sjo => <Option key={sjo.value} value={sjo.value}>{sjo.name}</Option>)}
                                                </Select>
                                            )
                                            break;
                                        case 'rangePicker':
                                            content = <RangePicker />
                                            break;
                                        default:
                                            ''
                                    }
                                    if (content) {
                                        return (
                                            <Form.Item key={sj.name} label={sj.label} name={sj.name}>
                                                {content}
                                            </Form.Item>
                                        )
                                    }
                                })
                            })()
                        }
                        <Form.Item>
                            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>查询</Button>
                        </Form.Item>
                    </Space>
                </Form>
            </Space>

            <div style={{ marginTop: 16 }}>
                <Table dataSource={[
                    { logTime: '2021' }
                ]} columns={tableColumns} />
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    const { processPageConfig } = state
    return {
        processPageConfig: processPageConfig.data
    }
}

export default connect(mapStateToProps)(ProcessApproval)