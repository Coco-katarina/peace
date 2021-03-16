import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
import { ExceptionOutlined } from '@ant-design/icons';

export function getNavItem(user, dispatch) {
   

    return (
        <SubMenu key="monitorModel" title={<span><ExceptionOutlined /><span>监测模型</span></span>}>
            <Menu.Item key="type"><Link to="/monitorModel/type">结构物类型</Link></Menu.Item>
            <Menu.Item key="factor"><Link to="/monitorModel/factor">监测因素</Link></Menu.Item>
            <Menu.Item key="template"><Link to="/monitorModel/template">监测模板</Link></Menu.Item>
        </SubMenu>
    );
}