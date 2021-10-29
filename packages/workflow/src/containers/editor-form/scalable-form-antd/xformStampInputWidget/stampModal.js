/**
 * xform基础widget => 普通文本框类型
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Modal, Radio, Tooltip } from 'antd';
import classnames from 'classnames';
import './index.less';

export default class StampModal extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }


    render() {
        const { onValueChange, value, data } = this.props;
        return (
            <div className="xform-stamp">
                {data ?
                    <Radio.Group onChange={onValueChange} value={value}>
                        {data.map(data => {
                            return <Radio value={data.value} key={data.id}>
                                <span className="title">{data.name}</span>
                                <div className={data.state == 1 ? "in-stock" : "lend-out"}>{data.state == 1 ? "在库" : "外借"}</div>
                                {data.imgURL?<div className="img"><img src={data.imgURL} /></div>:<div className="img">暂无印章图片</div>}
                                <div className="detail">
                                    <div><span>印章类型：</span>{data.label}</div>
                                    <div><span>保管人：</span>{data.keeper}</div>
                                    <div><span>印章状态：</span>{data.state == 1 ? "印章在库，可以借用" : "印章外借中..."} </div>
                                </div>
                            </Radio>
                        })}
                    </Radio.Group > : <div>暂无印章可以选择</div>
                }
            </div >
        );
    }
}
