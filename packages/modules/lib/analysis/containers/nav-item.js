import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, } from 'antd';
import { Func } from '@peace/utils';
import { AuthorizationCode } from '$utils';
import { PieChartOutlined } from '@ant-design/icons';

const SubMenu = Menu.SubMenu;
export function getNavItem(user, dispatch) {
    return (
        <SubMenu key="analysis" title={<span><PieChartOutlined /><span>数据服务</span></span>}>
            {
                Func.judgeRights(AuthorizationCode.Aggregate) ?
                    <Menu.Item key="aggregate"><Link to="/analysis/aggregate">聚集配置</Link></Menu.Item>
                    : ''
            }
            {
                Func.judgeRights(AuthorizationCode.ReportManagement) ?
                    <Menu.Item key="reportConfig"><Link to="/analysis/reportConfig">报表生成</Link></Menu.Item>
                    : ''
            }
            <Menu.Item key="contrast"><Link to="/analysis/contrast">数据对比</Link></Menu.Item>

            <Menu.Item key="correlation"><Link to="/analysis/correlation">数据关联</Link></Menu.Item>
            {

                Func.judgeRights(AuthorizationCode.AbnormalPush) ?
                    <Menu.Item key="abnPushCfg"><Link to="/analysis/abnPushCfg">异常推送配置</Link></Menu.Item>
                    : ''
            }
            {
                Func.judgeRights(AuthorizationCode.DataMath) ?
                    <Menu.Item key="calc"><Link to="/analysis/calc">数据计算</Link></Menu.Item>
                    : ''
                    
            }
        </SubMenu>
    );
}