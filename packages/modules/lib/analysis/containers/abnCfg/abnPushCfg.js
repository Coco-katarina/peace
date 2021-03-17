/**
 * Created by wuqun on 2018/6/15.
 */
'use strict';

import React, { Component } from 'react';
import { Card } from 'antd';
import AbnPushCfgTable from "./abnPushCfg-table";
class AbnPushCfg extends Component {
    render() {
        return <Card>
            <div>
                <AbnPushCfgTable />
            </div>
        </Card>;
    }
}

export default AbnPushCfg