'use strict'

import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import StationSpot from './station-spot';

const heatmapTarget = {
    drop(props, monitor) {
        //get item from station-spot.js
        //item:{deployed, rect, spotInlist, info}
        const item = monitor.getItem();
        const move = monitor.getDifferenceFromInitialOffset();
        props.onDeploySpot({ ...item, move });
    }
};

function collect(connect, monitor) {
    return {
        // 包裹住 DOM 节点，使其可以接收对应的拖拽组件
        connectDropTarget: connect.dropTarget(),
        // drag source是否在 drop target 区域
        isOver: monitor.isOver(),
        // 是否可以被放置
        canDrop: monitor.canDrop()
    };
}

class Heatmap extends React.Component {
    // static propTypes = {
    //     connectDropTarget: PropTypes.func.isRequired,
    //     isOver: PropTypes.bool.isRequired,
    //     onDeploySpot: PropTypes.func.isRequired,
    // };

    renderSpots() {
        const { width, height, spots, onRemoveSpot } = this.props;
        return spots.map(s => <StationSpot key={s.sensorId} info={s}
            size={{ "width": width, "height": height }}
            onRemoveSpot={onRemoveSpot} />);
    }

    render() {
        const { connectDropTarget, isOver, height, image } = this.props;
       
        
        let targetStyle = {
            position: 'relative',
            width: '100%',
            height: height,
            background: `url("${image}") no-repeat`,
            backgroundSize: '100% 100%',
            border: '1px solid #ececec'
        };
        
        // 使用 connectDropTarget 包裹住 DOM 节点，使其可以接收对应的 drag source 组件
        // connectDropTarget 包裹住的 DOM 节点才能接收 drag source 组件
        return connectDropTarget(
            <div id="dragTarget" style={targetStyle}>
                {this.renderSpots()}
            </div>
        )
    }
}

export default DropTarget('stationSpot', heatmapTarget, collect)(Heatmap);

