import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';
import { AuthorizationCode } from '$utils';
import { Func } from '@peace/utils';
const { Comparison, Association, EvaluationAnalysis } = AuthorizationCode;

const SubMenu = Menu.SubMenu;
export function getNavItem(user, dispatch) {
    return (
        Func.judgeRights(EvaluationAnalysis) ? 
        <SubMenu key="evaluationAnalysis" icon={<BarChartOutlined />} title={'评估分析'}>
            {
               Func.judgeRights(Comparison) && <Menu.Item key="analysis-comparison">
                  <Link to="/analysis/comparison">数据对比</Link>
                </Menu.Item>
            }
            {
                Func.judgeRights(Association) && <Menu.Item key="analysis-association">
                 <Link to="/analysis/association">数据关联</Link>
                </Menu.Item>  
            }
                
        </SubMenu> : null
    );
}