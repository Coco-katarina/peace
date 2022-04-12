'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Tabs } from 'antd';
// import { AuthorizationCode } from '$utils';
import { LayoutContent } from '@peace/components';
import Things from './things'
// import Structuregroup from '../structuregroup/structuregroup'

// const { StructsGroup } = AuthorizationCode
// const { TabPane } = Tabs;

const Default = props => {
    const { dispatch } = props

    return (
        <LayoutContent >
            <Things />
            {/* <Tabs
                onChange={k => {
                    
                }}
                type="card"
                style={{ marginTop: 10 }}
            >
                <TabPane tab="结构物" key="things">
                    
                </TabPane>
                {
                    Func.judgeRights(StructsGroup,
                        <TabPane tab="结构物群" key="structuregroup">
                            <Structuregroup />
                        </TabPane>)
                }
            </Tabs> */}
            <div>
                {props.children}
            </div>
        </LayoutContent>
    )
}

function mapStateToProps(state) {
    const { auth } = state
    return {
        user: auth.user
    }
}

export default connect(mapStateToProps)(Default);