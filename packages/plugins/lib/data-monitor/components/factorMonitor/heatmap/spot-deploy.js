import React, { Component, PropTypes } from 'react';
import Spot from './spot';

class DeploySpot extends Component {
    constructor(props) {
        super(props);
    }

    _catchWatch = (spot) => {
        this.props.catchWatch(spot);
    }

    renderData = (sensorId) => {
        let hasData = false
        const { realtimeData } = this.props

        if (realtimeData && sensorId && realtimeData.stations && realtimeData.stations.find(s => s.id == sensorId)) {
            let dataSource = realtimeData.stations.find(s => s.id == sensorId).data
            if (dataSource.length > 0) {
                hasData = true
            }
        }

        return hasData
    }

    deployedSpots = (data) => {
        const { screenSize, on2DHeatmapChange, heatmaps, user, realtimeAlarms } = this.props;
        let deployedSpots = [];
        if (data.spots.constructor != Array) {
            return null;
        }

        data.spots.forEach(item => {
            let alarmLevel = this.renderData(item.sensorId) ? 'good' : 'none';
            // let alarmLevel = 'good';

            if (realtimeAlarms?.alarms && realtimeAlarms.alarms.length > 0) {
                let alarm = realtimeAlarms.alarms[0].alarms.find(s => s.source.id == item.sensorId)
                if (alarm && alarm.level) {
                    let level = alarm.level;
                    alarmLevel = level
                }
            }

            let realTop = screenSize ? screenSize.height * (item.position.y + 6) / item.position.screenHeight : null,
                realLeft = screenSize ? screenSize.width * (item.position.x + 0) / item.position.screenWidth : null;
            if (realTop && realLeft) {
                deployedSpots.push(
                    <div key={item.id} style={{ position: 'absolute', left: realLeft, top: realTop }}>
                        <Spot spot={item} status={alarmLevel} items={data.items} resourceRoot={this.props.resourceRoot}
                            realtimeData={data.stations} catchWatch={this._catchWatch}
                            on2DHeatmapChange={on2DHeatmapChange}
                            heatmaps={heatmaps}
                            user={user}
                        />
                    </div>
                )
            }
        })
        return deployedSpots;
    }

    render() {
        const { data } = this.props;
        return (
            <div>
                {this.deployedSpots(data)}
            </div>
        )
    }
}

export default DeploySpot;