import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { AuthorizationCode } from '$utils';
import { Func } from '@peace/utils';

const SubMenu = Menu.SubMenu;

export function getNavItem(user, dispatch) {
    const { AddInstitution, ModifyInstitution, DeleteInstitution, AddConstruction, ModifyConstruction, DeleteConstruction } = AuthorizationCode;
    const showInstitution =  Func.judgeRights(AddInstitution) || Func.judgeRights(ModifyInstitution) || Func.judgeRights(DeleteInstitution);
    const showConstruction = Func.judgeRights(AddConstruction) || Func.judgeRights(ModifyConstruction) || Func.judgeRights(DeleteConstruction);

    return (
        <SubMenu key="smartSite" title={<span><StarOutlined /><span>智慧工地</span></span>}>
            {showInstitution ?
                <Menu.Item key="smartSite/organization"><Link to="/smartSite/organization">机构管理</Link></Menu.Item> : ''}
            {showConstruction ?
                <Menu.Item key="smartSite/construction"><Link to="/smartSite/construction">工地管理</Link></Menu.Item> : ''}
        </SubMenu>
    );
}
