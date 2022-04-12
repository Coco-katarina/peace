'use strict';
import React, { Component } from 'react';
import { Modal, Tree, Message } from 'antd';
import Immutable from 'immutable';
import PerfectScrollbar from 'perfect-scrollbar';

class BatchRemove extends Component {
    constructor(props) {
        super(props);
        this.disCheckedKeys = [];
        this.state = {
            showPopover: false,
            treeNodeCheckedKeys: { checked: [], halfChecked: [] },
            T1TreeNode: [],
        }
    }

    formedData = () => {
        let structInfo = Immutable.fromJS(this.props.data).toJS();
        let deviceIds = Object.keys(structInfo);
        let node = [], link = [];
        for (let i = 0; i < deviceIds.length; i++) {
            if (structInfo[deviceIds[i]].type == "s.iota") {
                structInfo[deviceIds[i]].name = "数据中心";
                let a = Object.assign({}, structInfo[deviceIds[i]], { "id": deviceIds[i], "label": "数据中心", "color": '#108ee9', "children": [] })
                node.push(a);
                this.state.T1TreeNode.push(a.id);
            } else if (structInfo[deviceIds[i]].type == "s.d") {
                let a = Object.assign({}, structInfo[deviceIds[i]],
                    {
                        "id": deviceIds[i],
                        "label": structInfo[deviceIds[i]].instance.name,
                        "children": [],
                    })

                node.push(a)
            } else if (structInfo[deviceIds[i]].type == "s.l") {
                let temp = structInfo[deviceIds[i]]
                let b = Object.assign({}, { "from": temp.instance.from.ownerSvgId, "to": temp.instance.to.ownerSvgId })
                link.push(b)
            }
        }
        let deviceInfos = {
            nodes: node,
            links: link
        }
        let parent = deviceInfos.nodes.filter(s => s.type == "s.iota")[0].id;
        let nodes = new Map();
        deviceInfos.nodes.forEach(s => {
            nodes.set(s.id, s)
        });
        let links = deviceInfos.links;

        function getLeaf(parentId) {
            let fromStructs = nodes.get(parentId);
            let tempTreeData = []
            links.forEach(m => {
                if (m.to == parentId) {
                    let node = nodes.get(m.from)
                    fromStructs.children.push(node);
                    let nextTempTreeData = getLeaf(m.from);
                    tempTreeData = tempTreeData.concat(nextTempTreeData.treeData);
                    //tempTreeData.push({ name: node.name, id: node.id, children: nextTempTreeData.treeData })
                }
            })
            let treeData = [{ name: fromStructs.name, id: fromStructs.id, children: tempTreeData.length ? tempTreeData : null }]
            return { treeData: treeData };
        }
        return getLeaf(parent);
    }

    // renderTreeNodes = (data, parentId) => {
    //     return data.map((item) => {
    //         item.parentId = parentId;
    //         if (item.children) {
    //             if (item.children[0].id == item.id) {
    //                 item.children = item.children[0].children;
    //             }
    //             if (item.children) {
    //                 return (
    //                     <TreeNode title={item.name} key={item.id} disableCheckbox={item.name == '数据中心'} >
    //                         {this.renderTreeNodes(item.children, item.id)}
    //                     </TreeNode>
    //                 );
    //             }
    //         }
    //         return <TreeNode title={item.name} key={item.id} disableCheckbox={item.name == '数据中心'} />;
    //     });

    // }

    renderTreeNodes = (data, parentId) => {
        const combinTreeNode = (item, parentId) => {
            let treeNode = {
                title: item.name,
                key: item.id,
                parentId: parentId,
                disableCheckbox: item.name == '数据中心'
            }
            if (item.children) {
                treeNode.children = item.children.map(ci => combinTreeNode(ci, item.id))
            }
            return treeNode
        }
        return data.map(item => {
            return combinTreeNode(item)
        })
    }

    onTreeNodeSelect = (checkedKeys) => {
        this.setState({ treeNodeCheckedKeys: checkedKeys });
    }

    handleBatchRemove = () => {
        let removeKeys = this.state.treeNodeCheckedKeys;
        if (removeKeys.length != 0) {
            this.props.deleteEquipments(removeKeys);
        } else {
            Message.info("未选节点！请选择节点后再进行删除操作。")
        }
    }

    componentDidMount() {
        new PerfectScrollbar('#batchRemove', { suppressScrollX: true })
    }

    render() {
        let treeData = this.formedData();
        const { visible, title, onCancel } = this.props;
        let { T1TreeNode } = this.state;
        return (
            <div id='batchRemove'  >
                <Modal
                    maskClosable={false}
                    visible={visible}
                    title={title}
                    onCancel={onCancel}
                    onOk={this.handleBatchRemove}
                >
                    <Tree
                        checkable
                        onCheck={(checkedKeys, e) => this.onTreeNodeSelect(checkedKeys, e, treeData.treeData)}
                        defaultExpandedKeys={T1TreeNode}
                        treeData={this.renderTreeNodes(treeData.treeData, null)}
                    />
                </Modal>
            </div>
        );
    }

}

export default BatchRemove;