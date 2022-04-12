/**
 * Created by yuanfenghua on 2018/6/1.
 */
'use strict'

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import StructureDetails from "../components/header/structure-details";
import { getStructState } from '../actions/struct';
// import { getStructState, GET_STRUCT_STATE_ERROR, GET_STRUCT_STATE_SUCCESS } from '../actions/integrationInfo';
import { Switch, Route, Router } from "react-router-dom";
import { LayoutContent } from '@peace/components';
import { CeDian, Threshold, StationDeploy2D, GlBim, Zuhe, Video, Collection, Zuwang, ThreeBuDian, AggregateContainers } from './index';

class DefaultStructure extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: null,
        };
    }

    UNSAFE_componentWillMount() {
        const { dispatch, match, location, structList, structure } = this.props;
        let current = this.getCurrentKey();
        this.setState({ current });
        if (match.params && match.params.id && (!structList.length && (!structure || structure.id != match.params.id))) {
            dispatch(getStructState(match.params.id)).then((action) => {
                const { type, payload, success } = action;
                if (success) {
                    //TODO 结构物资源识别
                    if (payload.data) {

                    } else {
                        dispatch(push('/project-monitor/structure'));
                    }
                    // } else if (type == GET_STRUCT_STATE_ERROR) {
                } else {
                    dispatch(push('/project-monitor/structure'));
                }
            });
        }
    }

    getCurrentKey() {
        const modules = ['station', 'aggregate', 'threshold', '2d', '3d', 'group', 'report-config', 'combCalc', 'video', 'glbim', 'collection',];
        const keys = modules.map(m => `configuration/${m}`); //configuration/3d
        let currentKey = 'station';
        keys.forEach(key => {
            if (this.props.location.pathname.indexOf(key) != -1) {
                currentKey = key.split('/')[1];
            }
        });
        return currentKey;
    }

    render() {
        const { dispatch, location, match, } = this.props
        const { current } = this.state
        const params = new URLSearchParams(location.search || '');


        const routerMap = [
            ['station', CeDian],
            ['threshold', Threshold],
            ['2d', StationDeploy2D.Default],
            ['3d', ThreeBuDian],
            ['glbim', GlBim],
            ['combCalc', Zuhe],
            ['video', Video],
            ['collection', Collection],
            ['aggregate', AggregateContainers],
        ]

        return (
            <LayoutContent style={{ height: 'auto' }}>
                <StructureDetails dispatch={dispatch}
                    activeKey={current}
                    match={match}
                    pathname={location.pathname}
                    currentPage={params.get('currentPage') || 1}
                    searchVal={params.get('searchVal') || ''}
                    filterType={params.get('filterType' || '0')}
                />
                <Switch>
                    {
                        routerMap.map(r => <Route key={`configuration_${r[0]}`} exact path={`/project-monitor/things/struct/:id/configuration/${r[0]}`} component={r[1]} />)
                    }
                    <Route key={`configuration_zuwang`} exact path={`/project-monitor/structure/things/:id/equipment`} component={Zuwang} />
                </Switch>
            </LayoutContent>
        )
    }
}

function mapStateToProps(state) {
    const { auth, singleStructState, structList } = state;
    return {
        user: auth.user,
        structure: singleStructState.data,
        structList: structList.data || [],
    };
}

export default connect(mapStateToProps)(DefaultStructure)

