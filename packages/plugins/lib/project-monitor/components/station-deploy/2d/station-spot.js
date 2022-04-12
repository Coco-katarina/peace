'use strict'

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import { Tooltip } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import Style from './style.css';

const stationSource = {
    beginDrag(props, monitor, component) {
        const dom = findDOMNode(component);
        const rect = {
            x: dom.offsetLeft - dom.offsetParent.scrollLeft,
            y: dom.offsetTop - dom.offsetParent.scrollTop
        };
        const spotInlist = {
            x: dom.getBoundingClientRect().left,
            y: dom.getBoundingClientRect().top
        };

        return {
            info: props.info,
            rect: rect,
            spotInlist: spotInlist,
            deployed: props.info.deployed
        };
    },
    endDrag(props, monitor) {
        if (!monitor.didDrop() && props.onRemoveSpot) {
            props.onRemoveSpot(monitor.getItem().info);
        }
    },
    canDrag(props) {
        if (props.size) {
            //热点图上的热点可拖拽
            return true;
        } else {
            //测点树未布设的叶结点可拖拽
            return !props.children && props.info.deployed == false
        }
    },
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class StationSpot extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        // connectDragSource: PropTypes.func.isRequired,
        // isDragging: PropTypes.bool.isRequired
    };

    renderTreeTitle = () => {
        const { isDragging, info } = this.props;
        const { sensorId, location, deployed, key, iconImgDeviceTypeId } = info;
        const opacity = isDragging ? 0.4 : 1;
        const isFactor = key && key.split('-').length == 2;
        return (
            <span style={{ lineHeight: '15px', opacity }} className={Style['icon']}>
                <span key={sensorId}>
                    <span className={deployed == false ? Style['station-tree-node-normal'] : null}>
                        {location}
                        {
                            isFactor ? iconImgDeviceTypeId ?
                                <img style={{
                                    height: 14,
                                    width: 14,
                                    position: 'relative',
                                    bottom: -2,
                                    marginLeft: 5
                                }}
                                    src={`/assets/factorIcon/icon-${iconImgDeviceTypeId}-4.png`}></img>
                                : <div style={{
                                    height: 14,
                                    width: 14,
                                    borderRadius: '100%',
                                    backgroundColor: '#108ee9',
                                    display: 'inline-block',
                                    position: 'relative',
                                    top: 2,
                                    left: 5
                                }}></div>
                                : ''
                        }
                    </span>
                    {
                        deployed ?
                            <MinusCircleOutlined type="minus-circle-o" className={Style['tip']} onClick={this.onRemoveSpot} /> : null
                    }
                </span>
            </span>
        );
    };

    onRemoveSpot = () => {

        const { onRemoveSpot, info } = this.props;
        if (onRemoveSpot) {
            onRemoveSpot(info);
        }
    };

    renderHotspot = () => {
        const { info, size } = this.props;
        const { key, location, x, y, screenWidth, screenHeight, factorProto, iconImgDeviceTypeId, partId } = info;
        const { width, height } = size;
        let style = {
            position: 'absolute',
            left: width * x / screenWidth,
            top: height * y / screenHeight,
            cursor: 'move'
        };
        let iconDom = <div style={{ height: 14, width: 14, borderRadius: '100%', backgroundColor: '#108ee9', boxShadow: '0 0 10px #108ee9' }}></div>;
        if (factorProto && iconImgDeviceTypeId) {
            iconDom = <img style={{ height: 14, width: 14, position: 'relative', bottom: 2 }} src={`/assets/factorIcon/icon-${iconImgDeviceTypeId}-4.png`}></img>;
        } else if (partId) {
            iconDom = <img style={{ height: 14, width: 14, position: 'relative', bottom: 2 }} src={`/assets/images/sections.png`}></img>;
        } else {

        }

        return <span style={style}>
            <Tooltip title={location}>
                <div style={{ height: 24, width: 24, borderRadius: '100%', backgroundColor: 'rgba(16,142,233,0.2)', padding: '5px' }}>
                    {iconDom}
                </div>
            </Tooltip>
        </span>
    };

    render() {
        const { connectDragSource, size } = this.props;
        return connectDragSource(
            size ? this.renderHotspot() : this.renderTreeTitle()
        );
    }
}

export default connect()(DragSource('stationSpot', stationSource, collect)(StationSpot));
