'use strict';
import React, { useState, useEffect } from 'react';
import { Tree, Input } from 'antd';
import Highlighter from "react-highlight-words";
import { Func } from '$utils';

const { Search } = Input;

const DepartmentTree = props => {
    const { height, enterprises, dataList, onSelectedDepartment } = props;
  
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    
    const [searchValue, setSearchValue] = useState("");
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    const treeData = (enterprises && dataList.length > 0) ? [{
        title: enterprises.name,
        key: `p-${enterprises.id}`,
        parentName: null,
        isOrg: true,
        children: Func.nestTree(dataList)
    }] : [];


    useEffect(() => {
       if(enterprises && dataList.length > 0){
            if(expandedKeys.length === 0){
                setExpandedKeys([treeData[0].key]);
            }
            if(selectedKeys.length === 0 && treeData[0].children.length > 0){
                setSelectedKeys([treeData[0].key])
                onSelectedDepartment(treeData[0])
            } 
       }else{
            setExpandedKeys([]);
            setSelectedKeys([]);
       }
    }, [dataList,enterprises]);


    //搜索框变化触发方法 
    const onChange = (e) => {
        const { value } = e.target;
        const expandedKeys = dataList
          .map(item => {
            if (item.departmentName.indexOf(value) > -1) {
              return getParentKey(`${item.departmentId}`, treeData);
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
            onSelectedDepartment && onSelectedDepartment(selectNodes.node);
            
        }
    }
    
    return (
        <div className='department-tree'>
            <Input
                placeholder="搜索: 部门"
                onChange={onChange}
            />
            <Tree
                height={height || 300}
                style={{ marginTop: 20 }}
                onExpand={onExpand}
                expandedKeys={expandedKeys}
                selectedKeys={selectedKeys}
                autoExpandParent={autoExpandParent}
                treeData={treeData}
                titleRender={(n) => {
                    return (
                        <Highlighter
                            searchWords={[searchValue]}
                            autoEscape={true}
                            textToHighlight={n.title}
                        />
                    )
                }}
                onSelect={onSelectNode}
            />        
        </div>
    );
}




export default DepartmentTree;