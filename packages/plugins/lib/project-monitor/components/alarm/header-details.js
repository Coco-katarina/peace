'use strict'

import React from 'react';
import { Row, Col, Button, Input, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const Option = Select.Option;

class HeaderDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        onSearch: React.PropTypes.func.isRequired,
        onNew: React.PropTypes.func.isRequired,
        onOrder: React.PropTypes.func.isRequired,
    };

    static height = 44;

    handleChange = (value) => {
        //this.props.onOrder();
    };

    render() {
        const { onSearch, onNew, onOrder } = this.props;

        return (
            <Row key={Math.random()} type="flex" gutter={16} style={{ marginBottom: 16 }}>
                <Col>
                    <Button onClick={onNew} type="primary"><PlusOutlined />新建</Button>
                </Col>
                <Col span={8}>
                    <Input.Search placeholder="输入关键字搜索" enterButton="Search" onSearch={onSearch} />
                </Col>
                <Col>
                    <label style={{ marginRight: 4 }}>排序:</label>
                    <Select defaultValue="告警等级" onChange={this.handleChange} placeholder="排序列" style={{ width: 120 }}>
                        <Option value="告警等级">告警等级</Option>
                        <Option value="采集完整率">采集完整率</Option>
                        <Option value="数据有效性">数据有效性</Option>
                    </Select>
                </Col>
                <Col>
                    <label style={{ marginRight: 4 }}>过滤:</label>
                    <Select
                        defaultValue="桥梁"
                        placeholder="监测对象类型"
                        onChange={this.handleChange}
                        style={{ width: 120 }}
                    >
                        <Option key="桥梁">桥梁</Option>
                        <Option key="边坡">边坡</Option>
                        <Option key="地铁">地铁</Option>
                    </Select>
                </Col>
            </Row>
        );
    }
}

export default HeaderDetails;

