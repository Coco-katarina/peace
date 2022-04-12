import React, { Component } from 'react';
import { Popover, Row, Col, Tag, Icon } from 'antd';
import './style.less';

class Spot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            docker: false,
            show: false
        };
    }


    _onVisibleChange = (v) => {
        if (this.props.spot.sensorId) {
            this.props.catchWatch(this.props.spot.sensorId);
        }
    }

    render() {
        const { status, spot } = this.props;
        return (
            <Popover content={spot.sensorName}
                onClick={v => this._onVisibleChange(v)}
               
            >
                <div className="spot">
                    {
                        spot.sensorId ?
                            <div className={`outer-circle outer-circle-${status}`}>
                                <div className={`inner-circle inner-circle-${status}`}></div>
                            </div>
                            :
                            <div>
                                <img style={{ height: 25, borderRadius: 4, border: '1px solid white' }} src={`${this.props.resourceRoot}/${spot.params.portrait}`}></img>
                            </div>
                    }
                </div>
            </Popover>
        );
    }
}

export default Spot;
