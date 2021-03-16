import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

export function getNavItem(user, dispatch) {
    return (
        <Menu.Item key="default" icon={<HomeOutlined />}>
            <Link to="/">
                <span>总览</span>
            </Link>
        </Menu.Item>
    );
}