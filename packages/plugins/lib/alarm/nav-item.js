import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { AlertOutlined } from '@ant-design/icons';
import { AuthorizationCode } from '$utils';
import { Func } from '@peace/utils';
const { AlarmManagement, AlarmStrategyManagement } = AuthorizationCode;
const SubMenu = Menu.SubMenu;

export function getNavItem(user, dispatch) {
    return (
        Func.judgeRights(AlarmManagement) || Func.judgeRights(AlarmStrategyManagement) ? 
        <SubMenu key="alarm" icon={<AlertOutlined />} title={'告警管理'}>
            {
                Func.judgeRights(AlarmManagement) &&  <Menu.Item key="alarm-list">
                <Link to="/alarm/list">告警管理</Link>
            </Menu.Item>
            }
            {
                Func.judgeRights(AlarmStrategyManagement) &&  <Menu.Item key="alarm-strategy">
                <Link to="/alarm/strategy">告警策略配置</Link>
            </Menu.Item>  
            }
                 
        </SubMenu>: null
    );
}