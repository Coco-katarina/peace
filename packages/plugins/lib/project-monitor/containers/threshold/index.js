'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Card } from 'antd';
import CommThreshold from './commThreshold';
import ChangeThread from './changeThreshold';

const TabPane = Tabs.TabPane;

const ThresholdTabs = (props) => {
    const { match, location } = props;
    const { params } = match;

    return (
            <Card>
                <Tabs type={'card'} defaultActiveKey='commThread' >
                    <TabPane tab='测量值' key='commThread'>
                        <CommThreshold params={params} />
                    </TabPane>
                    <TabPane tab='变化速率' key='changeThreshold'>
                        <ChangeThread params={params} />
                    </TabPane>
                </Tabs>
            </Card>
    )
}

export default connect()(ThresholdTabs);
