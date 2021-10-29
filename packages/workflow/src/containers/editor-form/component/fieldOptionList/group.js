
import React, { PureComponent } from 'react'
import { Button, Row, message, } from 'antd'

class GroupOperateDB extends PureComponent {

    query = (code) => {
        this.props.updateFields(code)
    }

    delete = (field, dispatch, del) => {
        dispatch(del(field.code)).then(_ => {
            if(_.type == 'GET_GROUPBOXS_SUCCESS') {
                this.query(field.code)
                message.success('成功删除业务控件')
            }else {
                message.error('删除业务控件失败')
            }
        })
    }

    insertOrUpdate = (field, dispatch, insertOrUpdate, user, commonFields) => {
        const currentGroupName = field.uiSchema[field.code]['items']? field.uiSchema[field.code]['items']['ui:options'].groupName:field.uiSchema[field.code]['ui:options'].groupName
        let repatGroupName = false
        commonFields.forEach(x => {
            if(x.code != field.code) {
                const parent = x.uiSchema[x.code]['ui:options']? x.uiSchema[x.code]['ui:options']:x.uiSchema[x.code]['items']['ui:options']
                repatGroupName = parent.groupName == currentGroupName? true:false
            }
        })
        if(currentGroupName == '') {
            message.error('请输入分组标题')
        }else if(repatGroupName){
            message.error('分组标题重复')
        }else {
            dispatch(insertOrUpdate(user.orgOwner, user.id, field)).then(_ => {
                if(_.type == 'GET_GROUPBOXS_SUCCESS') {
                    this.query()
                    message.success('成功保存业务控件')
                }else {
                    message.error('保存业务控件失败')
                }
            })
        }
    }

    render() {
        const { fields, editFieldData, dispatch, operateDBGroup, user, commonFields, } = this.props

        const filter = fields.filter(x => x.code == editFieldData.code)
        let currentGroup = {}
        if(filter.length > 0) {
            currentGroup = filter[0]
            currentGroup.children = []
            let currentGroupChildren = []
            fields.forEach(field => {
                if(field.hasgroup && field.hasgroup == currentGroup.code) {
                    currentGroupChildren.push(field)
                }
            })
            currentGroup.children = (currentGroupChildren)
        }

        return (
            <Row type='flex' justify='space-around'>
                <Button type='primary' onClick={() => this.insertOrUpdate(currentGroup, dispatch, operateDBGroup.insertOrUpdate, user, commonFields)}>保存</Button>
                <Button type="primary" danger onClick={() => this.delete(currentGroup, dispatch, operateDBGroup.del)}>删除</Button>
            </Row>
        )
    }
}

export default GroupOperateDB
