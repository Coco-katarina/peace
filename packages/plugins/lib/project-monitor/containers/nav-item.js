import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { AuthorizationCode } from '$utils'
import { SolutionOutlined } from '@ant-design/icons';
import { Func } from '@peace/utils';
const { AlarmStrategyManagement, EventScoreManagement, CommunicationState } = AuthorizationCode

export function getNavItem(user, dispatch, id) {
    return (
        <Menu.SubMenu key="project-monitor" title={<span>项目配置</span>} icon={<SolutionOutlined />}>
            <Menu.Item key="structure">
                <Link to="/project-monitor/structure">结构物配置</Link>
            </Menu.Item>
            {/* <Menu.Item key="data">
                <Link to={"/project-monitor/data/chart/:" + id}>数据监控</Link>
            </Menu.Item>
            {
                Func.judgeRights(CommunicationState) &&
                <Menu.Item key="state"><Link to={"/project-monitor/commuincation/state"}>通信状态</Link></Menu.Item>
            }
            <Menu.Item key="alarm">
                <Link to={"/project-monitor/alarm/:" + id}>告警管理</Link>
            </Menu.Item>
            {
                Func.judgeRights(AlarmStrategyManagement) &&
                <Menu.Item key="pushAlarm">
                    <Link to="/project-monitor/pushAlarm">告警策略</Link>
                </Menu.Item>
            }
            {
                Func.judgeRights(EventScoreManagement) &&
                <Menu.SubMenu key='event-score' title="事件评分">
                    <Menu.Item key='event-score-config'><Link to="/project-monitor/event-score/config">评分配置</Link></Menu.Item>
                    <Menu.Item key='event-score-result'><Link to="/project-monitor/event-score/result">评分结果</Link></Menu.Item>
                </Menu.SubMenu>
            }
             <Menu.Item key="schedule"><Link to="/project-monitor/schedule">工程事记</Link></Menu.Item> */}
        </Menu.SubMenu>
    );
}