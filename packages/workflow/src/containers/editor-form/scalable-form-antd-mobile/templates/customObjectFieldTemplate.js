
import React, { Component } from 'react';
import { Modal, } from 'antd';
import classnames from 'classnames';
const largerBorder = ['确定转办', '确认加签', '同意', '拒绝']

export default class CustomObjectFieldTemplate extends Component {

    render() {
        const { TitleField, properties, title, description, uiSchema, formContext: { popView, closePopView, shouldPopCode, currentNode, isFieldList }, } = this.props;
        const options = uiSchema.hasOwnProperty('items') ? uiSchema.items['ui:options'] || {} : uiSchema['ui:options'] || {};
        const titleName = options.groupName ? options.groupName : title;

        const isGroup = uiSchema && uiSchema['ui:widget'] && (uiSchema['ui:widget'] == 'group' || uiSchema['ui:widget'] == 'Table') ? true : false
        const showGroupTitle = isGroup && uiSchema['ui:options'].showGroupTitle ? true : false

        let hasButton = false
        let hasPopBehavior = false
        let popObj = []
        properties.forEach(proper => {
            if (proper.content.props.uiSchema['ui:widget'] == 'button') {
                hasButton = true
                if (proper.content.props.uiSchema['ui:options'] && proper.content.props.uiSchema['ui:options'].behavior == '弹出控件组') {
                    hasPopBehavior = true
                    if (proper.content.props.uiSchema['ui:options'].popCode != '') {
                        popObj.push(proper.content.props.uiSchema['ui:options'].popCode)
                    }
                }
            }
        })

        return (
            <div className={classnames({ 'object_row_group_wraper': options.groupName ? true : false, 'object_wraper': true, 'object_margin': isGroup && !uiSchema.hasOwnProperty('items') })}>
                {!isGroup ? (titleName && <TitleField title={titleName} />) : showGroupTitle ? (titleName && <TitleField title={titleName} />) : ''}
                <div className={classnames({ 'object_row_group_row': options.groupName ? true : false, 'object_row': true })}>
                    {
                        properties.map(prop => {
                            let itemNumberInRow = (uiSchema[prop.content.key] && uiSchema[prop.content.key]['ui:options'] && uiSchema[prop.content.key]['ui:options'].itemwidth >= 0) ?
                                uiSchema[prop.content.key]['ui:options'].itemwidth : 100;
                            if (isFieldList) {
                                itemNumberInRow = 100
                            }
                            let itemMarginLeft = (uiSchema[prop.content.key] && uiSchema[prop.content.key]['ui:options'] && uiSchema[prop.content.key]['ui:options'].marginLeft >= 0) ?
                                uiSchema[prop.content.key]['ui:options'].marginLeft : 0;
                            let style = Number(itemNumberInRow) > 0 ? { width: (itemNumberInRow + '%'), marginTop: 10, marginLeft: (itemMarginLeft + '%'), marginRight: 10 } : { display: 'none' };

                            if (typeof prop.content.props.formData == 'string')
                                if (largerBorder.some(item => item == prop.content.props.formData)) {
                                    style = Number(itemNumberInRow) > 0 ? { minWidth: (itemNumberInRow + '%'), marginTop: 10, marginLeft: (itemMarginLeft + '%'), marginRight: 10 } : { display: 'none' };
                                }

                            let shownodes;
                            if (uiSchema[prop.content.key]) {
                                if (uiSchema[prop.content.key].items) {
                                    shownodes = (uiSchema[prop.content.key].items['ui:options'] && uiSchema[prop.content.key].items['ui:options'].shownodes) ? uiSchema[prop.content.key].items['ui:options'].shownodes : null;

                                } else {
                                    shownodes = (uiSchema[prop.content.key]['ui:options'] && uiSchema[prop.content.key]['ui:options'].shownodes) ? uiSchema[prop.content.key]['ui:options'].shownodes : null;
                                }
                            }

                            let addClassNames = 'object_content';
                            //判断节点是否可见   
                            if (currentNode) {
                                if (Array.isArray(shownodes) && shownodes.length > 0 && shownodes.indexOf(currentNode) === -1) {
                                    addClassNames = 'object_content xform-hidden';
                                }
                            }

                            if (hasButton && hasPopBehavior && popObj.filter(x => x == prop.content.key).length > 0) {
                                if ((prop.content.props.uiSchema['ui:widget'] && prop.content.props.uiSchema['ui:widget'] == 'group') || (prop.content.props.uiSchema['items'] && prop.content.props.uiSchema['items']['ui:widget'] == 'group')) {
                                    return (
                                        <Modal centered key={prop.content.key} width={800} bodyStyle={{ padding: '34px' }} visible={popView && (shouldPopCode == prop.content.key)} onCancel={() => closePopView()} footer={null} getContainer={false}>
                                            <div style={style} className={addClassNames} >
                                                {prop.content}
                                            </div>
                                        </Modal>
                                    )
                                }
                            }
                            return (
                                <div style={style} className={addClassNames} key={prop.content.key}>
                                    {prop.content}
                                </div>
                            )
                        })
                    }
                </div>
                {description}
            </div>
        );
    }
}