import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin, Card, Tabs } from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { ProductIntroduction } from '../components/index';
//import Bim from '../components/bim';



const { TabPane } = Tabs;

const SingleProjectOverview = (props) => {
    const { dispatch, actions } = props

    useEffect(() => {
    }, [])

    return (
        <div className='singleProjectOverViewHeaderBorderTop'>
            <Tabs defaultActiveKey="1">
                <TabPane tab="项目简介" key="productIntroduction">
                    <ProductIntroduction {...props} />
                </TabPane>
                {/* <TabPane tab="VR" key="vr">
                    Content of Tab Pane 2
                </TabPane> */}
                <TabPane tab="三维展示" key="threeD">
                    Content of Tab Pane 3
                </TabPane>
                {/* <TabPane tab="BIM展示" key="bim">
                    <Bim></Bim> 
                </TabPane> */}
            </Tabs>
        </div>
    )
}

function mapStateToProps(state) {
    const { auth, global } = state;
    return {
        user: auth.user,
        actions: global.actions,
    };
}

export default connect(mapStateToProps)(SingleProjectOverview);
