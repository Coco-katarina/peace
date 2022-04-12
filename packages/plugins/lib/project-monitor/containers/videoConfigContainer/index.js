'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Card } from 'antd';
import { getStructureResources } from '../../actions/struct';
import { getNVRs, getIPCs } from '../../actions/video';
import NVR from './nvr';
import IPC from './ipc';

const TabPane = Tabs.TabPane;

class Video extends Component {
    constructor(props) {
        super(props);
        this.structureId = parseInt(props.location.pathname.match(/\d+/g)[0]);
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getStructureResources(this.structureId));
        dispatch(getNVRs(this.structureId));
        dispatch(getIPCs(this.structureId));
    }
    refreshIPCs = () => {
        this.props.dispatch(getIPCs(this.structureId));
    }
    render() {
        const { location, structureResources, ipcs, match } = this.props;

        return (
                <Card>
                    <Tabs type={'card'} size={'small'} defaultActiveKey={'nvr'} >
                        <TabPane tab='NVR配置' key='nvr'>
                            <NVR
                                ipcs={ipcs}
                                location={location}
                                structId={this.structureId}
                                structureResources={structureResources}
                                refreshIPCs={this.refreshIPCs}
                            />
                        </TabPane>
                        <TabPane tab='摄像头配置' key='ipc'>
                            <IPC
                                location={location}
                                structId={this.structureId}
                                structureResources={structureResources}
                            />
                        </TabPane>
                    </Tabs>
                </Card>
        );
    }
}

function mapStateToProps(state) {
    const { structureResources, ipcs } = state;
    return {
        structureResources: structureResources.data,
        ipcs: ipcs.data,
        isRequesting: structureResources.isRequesting
    }
}

export default connect(mapStateToProps)(Video);
