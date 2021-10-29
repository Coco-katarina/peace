/**
 * xform基础widget => 普通文本框类型
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio, Button, Input } from 'antd';
import { Icon } from 'antd-mobile';
import Pinyin from '../../../../../../utils/pinyin';
import classnames from 'classnames';
import './index.less';
const pinyin = new Pinyin();

export default class StampModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterList: props.data
        }
    }

    componentDidMount() {

    }

    handleClick = (data, e) => {
        e.preventDefault();
        console.log(data.value);
        this.props.onValueChange(data.value);
    }

    handleSearch = (e) => {
        const value = e.target.value;
        const { data } = this.props;
        const rslt = [];
        data.map(item => {
            if (item.name.indexOf(value) != -1 ||
                pinyin.getCamelChars(item.name).toLowerCase().indexOf(value.toLowerCase()) != -1 ||
                pinyin.getFullChars(item.name).toLowerCase().indexOf(value.toLowerCase()) != -1) {
                rslt.push(item);
            }
        })
        this.setState({ filterList: rslt });
    }


    render() {
        const { onValueChange, value, data, bodyHeight, clientWidth, onCancel, onOk } = this.props;
        const { filterList } = this.state;
        // const redioInnerWidth = clientWidth - 53;
        const contentHeaderHight = 44
        const contentbodyHeight = bodyHeight - contentHeaderHight
        return (
            <div style={{ background: '#EBEFF5' }}>
                <div className='xform-stamp-mobile-header-search' style={{ height: contentHeaderHight }}>
                    <Input placeholder='输入印章名称' onChange={this.handleSearch} />
                    <span className='search-icon'><Icon type='search' size='sm' /></span>
                </div>
                <div className="xform-stamp-mobile" style={{ height: contentbodyHeight }}>
                    {filterList ?
                        filterList.map(data => {
                            return (
                                <div className='mobile-stamp-item' onClick={e => this.handleClick(data, e)} >
                                    {data.imgURL ? <div className="img"><img style={{ width: '100%' }} src={data.imgURL} /></div> : <div className="img">暂无印章图片</div>}
                                    <span className="item-title">{data.name}</span>
                                    <span className='item-icon'><Icon type='right' size='xs' /></span>
                                </div>
                            )
                        })

                        : <div>暂无印章可以选择</div>
                    }
                </div >
            </div>


        );
    }
}
