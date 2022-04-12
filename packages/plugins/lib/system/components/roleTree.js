'use strict';
import React, { useState, useEffect } from 'react';
import { Tree, Input, Row, Col, Popconfirm, message } from 'antd';
import Highlighter from "react-highlight-words";
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import RoleModal from './roleModal';
import { Func } from '@peace/utils';
import { AuthorizationCode } from '$utils';
const { AddRole, ModifyRoleName, DeleteRole } = AuthorizationCode

const RoleTree = props => {
    const { height, dataList, onSelectedRole, onSaveRole, onDeleteGroupRole, onDeleteRole } = props;
   
  
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [autoExpandParent, setAutoExpandParent] = useState(true);


    const onGroupRoleDel = (e,s) => {
        if(s.roles.length > 0){
            message.warning('该角色组已存在角色,请先删除角色！');
            return;
        }
        onDeleteGroupRole && onDeleteGroupRole(s.id);
    }

    const onRoleDel = (e, k) => {
        
        onDeleteRole && onDeleteRole(k.id);
        setSelectedKeys([])
    }

     //角色组
     const renderGroupTitle = (s) => {
        return (
            <div className="icon">
                <Highlighter
                    searchWords={[searchValue]}
                    autoEscape={true}
                    textToHighlight={s.name}
                />
                {s.name != '默认' && <span>
                        {
                            Func.judgeRights(ModifyRoleName) && <RoleModal 
                            title="编辑角色组"
                            isGroup
                            triggerRender={<FormOutlined className="tip" style={{ marginLeft: 10}}/>}
                            roles={dataList}
                            editData={s}
                            onFinish={onSaveRole} 
                        />
                        }
                        {
                            Func.judgeRights(DeleteRole) && <DeleteOutlined className="tip" onClick={e=> onGroupRoleDel(e,s)} style={{ marginLeft: 5}}/>
                        }
                        
                        
                </span>
                }
            </div>
        )
    };
    //角色
    const renderTitle = (k, groupId) => {
        return (
            <div  className="icon">
                <Highlighter
                    searchWords={[searchValue]}
                    autoEscape={true}
                    textToHighlight={k.name}
                />
                {k.name == '所有者' ? '' : <span >
                        {
                            Func.judgeRights(ModifyRoleName) && <RoleModal 
                            title="编辑角色"
                            triggerRender={<FormOutlined className="tip" style={{ marginLeft: 10}}/>}
                            roles={dataList}
                            editData={{...k,groupId: groupId}}
                            onFinish={onSaveRole} 
                        />
                        }
                        {
                            Func.judgeRights(DeleteRole) && <Popconfirm
                            title="删除角色,将导致关联该角色的用户权限受影响，确认删除吗?"
                            onConfirm={e=> onRoleDel(e,k)}
                            okText="是"
                            cancelText="否"
                        >
                            <DeleteOutlined className="tip" style={{ marginLeft: 5}}/>
                        </Popconfirm>
                        }
                        
                    
                </span>
                }
            </div>
        )
    };
    const treeData = dataList.length > 0 ? dataList.map(item => {
        
        return {
            ...item,
            title: renderGroupTitle(item),
            value: `group-${item.id}`,
            key: `group-${item.id}`,
            selectable: false,
            children: Array.isArray(item.roles) ? item.roles.map(v=> {
                return {
                    ...v,
                    title: renderTitle(v,item.id),
                    value: `${v.id}`,
                    key: `${v.id}`,
                }
            }): []
        }
    }) : [];
   
    
    useEffect(() => {
       if(dataList.length > 0){
            if(expandedKeys.length === 0){
                setExpandedKeys([treeData[0].key]);
            }
            if(selectedKeys.length === 0 && treeData[0].children.length > 0){
                setSelectedKeys([treeData[0].children[0].key])
                onSelectedRole && onSelectedRole(treeData[0].children[0])
            }
            
       }else{
        setExpandedKeys([]);
        setSelectedKeys([]);
       }
       
    }, [dataList]);


    //搜索框变化触发方法 
    const onChange = (e) => {
        const { value } = e.target;
        const expandedKeys = dataList.reduce((p,c)=>{
            return p.concat(c.roles);
        },[]).map(item => {
            if (item.name.indexOf(value) > -1) {
              return getParentKey(`${item.id}`, treeData);
            }
            return null;
          })
          .filter((item, i, self) => item && self.indexOf(item) === i);
        setExpandedKeys(expandedKeys);
        setSearchValue(value);
        setAutoExpandParent(true);
    }


    const getParentKey = (key, tree) => {
        let parentKey;
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.children) {
                if (node.children.some(item => item.key === key)) {
                    parentKey = node.key;
                } else if (getParentKey(key, node.children)) {
                    parentKey = getParentKey(key, node.children);
                }
            }
        }
        return parentKey;
    };

    const onExpand = (expandedKeys) => {
        setExpandedKeys(expandedKeys);
        setAutoExpandParent(false);
    };

    const onSelectNode =  (selected, selectNodes) => {
        
        if (selectNodes.selected) {
            setSelectedKeys(selected)
            onSelectedRole && onSelectedRole(selectNodes.node);
            
        }
    }
    

    return (
        <div className="role-tree">
                <Row gutter={16}>
                    <Col span={24}><Input placeholder="搜索: 角色" onChange={onChange} /></Col>
                </Row>
                {
                    Func.judgeRights(AddRole) && <Row gutter={16} style={{ marginTop: 10}} justify="space-between">
                    <Col span={12} >
                        <RoleModal 
                            title="新建角色组"
                            isGroup
                            roles={dataList}
                            onFinish={onSaveRole} 
                        />
                        </Col>
                    <Col span={12}>
                        <RoleModal 
                            title="新建角色"
                            roles={dataList}
                            onFinish={onSaveRole} 
                        />
                    </Col>
                </Row>
                }
                
                <Tree
                    height={ height || 300}
                    style={{ marginTop: 20 }}
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    selectedKeys={selectedKeys}
                    autoExpandParent={autoExpandParent}
                    treeData={treeData}
                    // titleRender={(n) => {
                    //     return (
                    //         <Highlighter
                    //             searchWords={[searchValue]}
                    //             autoEscape={true}
                    //             textToHighlight={n.title}
                    //         />
                    //     )
                    // }}
                    onSelect={onSelectNode}
                >
                     
                </Tree>
        </div>
    );
}




export default RoleTree;