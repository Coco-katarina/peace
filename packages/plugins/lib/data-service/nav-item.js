import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';

const SubMenu = Menu.SubMenu;
export function getNavItem(user, dispatch) {
    return (
        <SubMenu key="dataService" icon={<BarChartOutlined />} title={'数据服务'}>
            <Menu.Item key="dataService-check">
                <Link to="/dataService/check">数据查询</Link>
            </Menu.Item>
            <Menu.Item key="dataService-report">
                <Link to="/dataService/report">报表</Link>
            </Menu.Item>    
            <Menu.Item key="dataService-download">
                <Link to="/dataService/download">数据下载</Link>
            </Menu.Item>       
        </SubMenu>
    );
}