import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { ReadOutlined } from '@ant-design/icons';

const SubMenu = Menu.SubMenu;

export function getNavItem(user, dispatch) {
    return (
        <Menu.Item key="projectOverview" icon={<ReadOutlined />}>
            <Link to="/projectOverview">项目总览</Link>
        </Menu.Item>
    );
    // return (
    //     <SubMenu key="projectOverview" icon={<ReadOutlined />} title={'项目总览'}>
    //         <Menu.Item key="e1">
    //             <Link to="/example/e1">举个棒子</Link>
    //         </Menu.Item>
    //     </SubMenu>
    // );
}