import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { AuthorizationCode } from '$utils';
import { Func } from '@peace/utils';
const { 
    systemLogSearch, 
    MemberManagement,
    AddDepartment,
    ModifyDepartmentName,
    DeleteDepartment,
    AddMember,
    ModifyMember,
    DeleteMember,
    EnableMember,
    DisableMember,
    AddRole,
    ModifyRoleName,
    DeleteRole

} = AuthorizationCode

const SubMenu = Menu.SubMenu;

export function getNavItem(user, dispatch) {
    return (
        Func.judgeRights(MemberManagement) &&
        <SubMenu key="system" icon={<SettingOutlined />} title={'系统管理'}>
            {
                (Func.judgeRights(AddDepartment) 
                || Func.judgeRights(ModifyDepartmentName)
                || Func.judgeRights(DeleteDepartment)) && <Menu.Item key="system-organization">
                <Link to="/system/organization">组织管理</Link>
            </Menu.Item>
            }
            {

                (Func.judgeRights(AddMember) 
                || Func.judgeRights(ModifyMember)
                || Func.judgeRights(DeleteMember)
                || Func.judgeRights(EnableMember)
                || Func.judgeRights(DisableMember)) && <Menu.Item key="system-members">
                <Link to="/system/members">用户管理</Link>
            </Menu.Item>
            }
           
            {
                (Func.judgeRights(AddRole) 
                || Func.judgeRights(ModifyRoleName)
                || Func.judgeRights(DeleteRole)) && <Menu.Item key="system-roles">
                <Link to="/system/roles">角色管理</Link>
            </Menu.Item>
            }
            
            {
                Func.judgeRights(systemLogSearch) && <Menu.Item key="system-log">
                <Link to="/system/log">系统日志</Link>
            </Menu.Item>
            }
        </SubMenu>
    );
}
