'use strict';

import React from 'react';
import { Result} from 'antd';
import { MehOutlined } from '@ant-design/icons';
class NoResource extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const title = this.props.title ? this.props.title : "抱歉，没有可访问的资源！"
        return (
            <Result
            icon={<MehOutlined />}
            title={title}
            />
        );
    }
}

export default NoResource;