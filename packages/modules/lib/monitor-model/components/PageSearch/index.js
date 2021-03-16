/**
 * Created by yuanfenghua on 2018/4/19.
 */
'use strict'

import React from 'react';
import { Row, Col, Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

class PageSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    // static propTypes = {
    //     onSearch: React.PropTypes.func.isRequired,
    //     onNew: React.PropTypes.func,
    //     addVisible:React.PropTypes.bool,
    // };

    static height = 44;

    render() {
        const { onSearch, onNew, addVisible, searchValue } = this.props;
        let showAddBtn = addVisible && !!onNew;
        return <Row key={Math.random()} ref={this.onLoad} type="flex" justify="center" gutter={24} style={{ marginBottom: 16 }}>
            {!showAddBtn ? null : <Col><Button onClick={onNew}><PlusOutlined />新建</Button></Col>}
            <Col span={10}>
                <Input.Search defaultValue={searchValue} placeholder="输入关键字搜索" onSearch={onSearch} />
            </Col>
        </Row>
    }
}

export default PageSearch;

