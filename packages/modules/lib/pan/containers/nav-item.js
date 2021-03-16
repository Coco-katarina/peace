import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu } from 'antd';
import { HddOutlined } from '@ant-design/icons';

export function getNavItem(user, dispatch) {
    return (
        <Menu.Item key="pan" icon={<HddOutlined />}>
            <Link to="/pan">网盘</Link>
        </Menu.Item>
    );
}