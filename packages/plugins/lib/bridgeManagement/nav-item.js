import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { ShopOutlined } from '@ant-design/icons';
import { AuthorizationCode } from '$utils';
import { Func } from '@peace/utils';
const { 
    BridgeManage 
} = AuthorizationCode

const SubMenu = Menu.SubMenu;

export function getNavItem(user, dispatch) {
    return (
        Func.judgeRights(BridgeManage) &&
        <SubMenu key="bridge" icon={<ShopOutlined />} title={'桥梁管理'}>
            <Menu.Item key="bridge-info">
                <Link to="/bridge/info">桥梁信息管理</Link>
            </Menu.Item>         
        </SubMenu>
    );
}