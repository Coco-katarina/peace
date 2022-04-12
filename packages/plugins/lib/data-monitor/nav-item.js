import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { FundViewOutlined } from '@ant-design/icons';
import { AuthorizationCode } from '$utils';
import { Func } from '@peace/utils';
const { DataMonitor, FactorMonitor, DeviceMonitor } = AuthorizationCode;

const SubMenu = Menu.SubMenu;
export function getNavItem(user, dispatch) {
    return (
        Func.judgeRights(DataMonitor) ? 
        <SubMenu key="dataMonitor" icon={<FundViewOutlined />} title={'实时监控'}>
            {
                Func.judgeRights(FactorMonitor) && <Menu.Item key="dataMonitor-factor">
                <Link to="/dataMonitor/factor">数据监控</Link>
            </Menu.Item>
            }
            {
                Func.judgeRights(DeviceMonitor) &&  <Menu.Item key="dataMonitor-device">
                <Link to="/dataMonitor/device">设备监控</Link>
            </Menu.Item>  
            }
                
        </SubMenu> : null
    );
}