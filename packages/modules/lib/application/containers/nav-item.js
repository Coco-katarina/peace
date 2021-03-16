import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { AuthorizationCode } from '$utils';
import { Func } from '@peace/utils'
import { AppstoreOutlined } from '@ant-design/icons';

const { AddProject, WillReviewProject, UnreviewedProject, ReviewedProject, PublishedProject } = AuthorizationCode;

export function getNavItem(user, dispatch) {

    return (
        <Menu.SubMenu key="project" icon={<AppstoreOutlined />} title={<span>项目管理</span>}>
            {/* {Func.judgeRights(AddProject, <Menu.Item key="new"><Link to="/project/new">新建项目</Link></Menu.Item>)} */}
            <Menu.Item key="all"><Link to="/project/all">全部项目</Link></Menu.Item>
            {Func.judgeRights(WillReviewProject, <Menu.Item key="willreviewed"><Link to="/project/willreviewed">待发审</Link></Menu.Item>)}
            {Func.judgeRights(UnreviewedProject, <Menu.Item key="unreviewed"><Link to="/project/unreviewed">未审核</Link></Menu.Item>)}
            {Func.judgeRights(ReviewedProject, <Menu.Item key="reviewed"><Link to="/project/reviewed">已审核</Link></Menu.Item>)}
            {Func.judgeRights(PublishedProject, <Menu.Item key="published"><Link to="/project/published">已发布</Link></Menu.Item>)}
        </Menu.SubMenu>
    );
}