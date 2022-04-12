import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { FlagOutlined } from '@ant-design/icons';

const SubMenu = Menu.SubMenu;

export function getNavItem(user, dispatch) {
    return (
        null
        // <Menu.Item key="singleProjectOverview" icon={<FlagOutlined />}>
        //     <Link to="/singleProjectOverview">单个项目总览</Link>
        // </Menu.Item>
    );
}