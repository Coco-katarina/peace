/**
 * xform-builder中间“生效字段”
 * @props: platform（选中的平台，laptop表示PC端、mobile表示移动端） editFieldData（当前正在编辑的字段data） fields（生效字段field数据） changeEditFieldHandler（field列表点击事件处理器） deleteEditFieldHandler（删除生效字段处理器） systemFieldEditable（系统字段是否可编辑删除，默认不能删除） addFieldsHandler（添加fields数据处理器） updateFieldsHandler（更新fields列表处理器）
 */

import './index.less';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { InboxOutlined } from '@ant-design/icons';
import ConfigSchema from '../../configSchema/index';
import FieldOption from './option';
import { getMessageId } from '../../i18n/localeMessages';
import { util } from '../../common/util';

export default class FieldList extends PureComponent {
    static propTypes = {
        globalConfig: PropTypes.shape({
            codeEditable: PropTypes.bool.isRequired,
            fieldPreviewable: PropTypes.bool.isRequired
        }).isRequired,
        platform: PropTypes.oneOf(['laptop', 'mobile', 'both']).isRequired,
        messages: PropTypes.object.isRequired,
        emptyPlaceholder: PropTypes.element,
        fields: PropTypes.array.isRequired,
        changeEditFieldHandler: PropTypes.func.isRequired,
        deleteEditFieldHandler: PropTypes.func.isRequired,
        addFieldsHandler: PropTypes.func.isRequired,
        updateFieldsHandler: PropTypes.func.isRequired,
        updateFieldItemHandler: PropTypes.func.isRequired,
        systemFieldEditable: PropTypes.bool
    };

    static defaultProps = {
        systemFieldEditable: false
    };

    constructor(...args) {
        super(...args);
        const { systemFieldEditable } = this.props;
        this.handleFoldChange = this.handleFoldChange.bind(this);
        this.handleFieldListClick = this.handleFieldListClick.bind(this);
        this.handleAddField = this.handleAddField.bind(this);
        this.handleDeleteField = this.handleDeleteField.bind(this);
        this._clearFieldShow = this._clearFieldShow.bind(this);
        this._clearFieldUpdate = this._clearFieldUpdate.bind(this);
        this.handleFieldMove = this.handleFieldMove.bind(this);
        this.state = {
            fold: !systemFieldEditable  // 系统字段部分是否展开，默认折叠收起（如果系统字段可以编辑，则默认展开）
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.deleteFieldCode != this.props.deleteFieldCode) {
            this._deleteFieldCode(nextProps.deleteFieldCode)
        }
    }

    _deleteFieldCode(code) {
        const fields = this.props.fields;
        fields.map((field) => {
            if (field.code === code) {
                this._clearFieldShow(field);
                this._clearFieldUpdate(field);
                this.props.deleteEditFieldHandler(code);
            }
        });
    }

    handleFoldChange() {
        const { fold } = this.state;
        this.setState({
            fold: !fold
        });
    }

    // 点击生效字段
    handleFieldListClick(event) {
        const target = event.currentTarget;
        const code = target.getAttribute('data-code');
        const { editFieldData, changeEditFieldHandler } = this.props;
        let editFieldCode = '';
        if (editFieldData !== null) {
            editFieldCode = editFieldData.code;
        }
        // 如果点击的是当前展示的字段，则不用刷新当前组件。如果刷新字段，会导致字段的即时预览效果中点击相关的操作失效（字段层叠）
        if (editFieldCode === code) {
            return;
        }
        this.props.fields.map((field) => {
            if (field.code === code) {
                changeEditFieldHandler(field);
            }
        });
    }

    // 添加生效字段，添加字段这里需要调整index的值到systemFields.length + index
    handleAddField(field, index) {
        const fields = this.props.fields;
        const systemFields = fields.filter((fieldData) => {
            return fieldData.fieldType === 'system';
        });
        this.props.addFieldsHandler(field, index + systemFields.length);
    }

    // 删除生效字段，同时要删除与该字段相关的全部联动关系
    handleDeleteField(event) {
        event.stopPropagation();
        const fields = this.props.fields;
        const code = event.currentTarget.getAttribute('data-code');
        fields.map((field) => {
            if (field.code === code) {
                this._clearFieldShow(field);
                this._clearFieldUpdate(field);
                this.props.deleteEditFieldHandler(code);
            }
        });
    }

    // 清除某个字段的级联配置
    _clearFieldShow(field) {
        const fields = this.props.fields;
        const code = field.code;
        fields.map((field, index) => {
            let uiSchemaContent = field.uiSchema[field.code];
            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
                if (typeof uiSchemaContent['ui:options'].show !== 'undefined') {
                    let checkEditCodeIndex = this._hasEditFieldCode(uiSchemaContent['ui:options'].show, code);
                    if (checkEditCodeIndex.result) {
                        uiSchemaContent['ui:options'].show.splice(checkEditCodeIndex.index, 1);
                        if (uiSchemaContent['ui:options'].show.length <= 0) {
                            delete uiSchemaContent['ui:options'].show;
                        }
                    }
                }
            }
            field.uiSchema[field.code] = uiSchemaContent;
            this.props.updateFieldItemHandler(field.code, field);
        });
    }

    // 清除某个字段的数据级联
    _clearFieldUpdate(field) {
        const code = field.code;
        let fieldData = Object.assign({}, field);
        let uiSchemaContent = fieldData.uiSchema[fieldData.code];
        if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
            if (typeof uiSchemaContent['ui:options'].updateFields !== 'undefined') {
                delete uiSchemaContent['ui:options'].updateFields;
            }
        }
        fieldData.uiSchema[fieldData.code] = uiSchemaContent;
        this.props.updateFieldItemHandler(code, fieldData);
    }

    _hasEditFieldCode(fieldShowOptions, editFieldCode) {
        let result = {
            result: false,
            index: 0
        };
        fieldShowOptions.map((option, index) => {
            if (option.field === editFieldCode) {
                result = {
                    result: true,
                    index: index
                };
            }
        });
        return result;
    }

    // 生效字段拖拽排序（注意现在拖拽排序的index不计入系统字段类型了，故fields要排除掉系统字段的数据）
    handleFieldMove(dragIndex, hoverIndex) {
        const fields = this.props.fields;
        let systemFields = [], otherFields = [];
        let sortedFields = [];

        // 从fields中过滤出来系统字段部分（系统字段不能进行排序）
        systemFields = fields.filter((fieldData) => {
            return fieldData.fieldType === 'system';
        });
        otherFields = fields.filter((fieldData) => {
            return fieldData.fieldType !== 'system';
        });

        const dragFields = otherFields[dragIndex];
        const dragFieldcode = dragFields.code;
        let hoverField = otherFields[hoverIndex];

        let afterDragFields = otherFields.slice();
        let indexInFields;
        //add 2020-06-05 如果拖拽 到目标是group 则加入 group ,并且排序到group后面
        if (((hoverField.type === 'group' || hoverField.type === 'Table') && dragFields.hasgroup !== hoverField.code) || hoverField.hasgroup) {
            //如果拖拽本身 是group 不处理
            if (dragFields.type !== 'group' && dragFields.type !== 'Table') {
                dragFields.hasgroup = hoverField.type === 'group' || hoverField.type === 'Table' ? hoverField.code : hoverField.hasgroup;
                // 为 dragFields 被拖动的控件添加标记
                dragFields.jsonSchema[dragFields.code]['groupMsg'] = {
                    type: hoverField.type,
                }
                afterDragFields.splice(dragIndex, 1);
                if (dragIndex > hoverIndex) {
                    afterDragFields.splice(hoverIndex + 1, 0, dragFields);
                } else {
                    afterDragFields.splice(hoverIndex, 0, dragFields);
                }
            }
        } else {
            afterDragFields.splice(dragIndex, 1);
            afterDragFields.splice(hoverIndex, 0, dragFields);
        }

        //afterDragFields.splice(hoverIndex, 0, dragFields);

        //add 2020-06-08 如果 拖拽本身是group 需要把子field 排序到 group后面
        let newAfterDragFields = afterDragFields.slice();
        if (dragFields.type === 'group' || dragFields.type === 'Table') {
            //let groupIndex = hoverIndex    
            newAfterDragFields.map((item, index) => {
                if (item.hasgroup === dragFieldcode) {
                    let newIndex = afterDragFields.findIndex(v => v.code == item.code);
                    if (newIndex > -1) {
                        afterDragFields.splice(newIndex, 1);
                        if (newIndex > hoverIndex) {
                            afterDragFields.splice(hoverIndex + 1, 0, item);
                        } else {
                            afterDragFields.splice(hoverIndex, 0, item);
                        }

                    }
                }
            })
        }

        // 这里还需要处理排序造成的联动逻辑变更，要清除被拖拽字段的相应的联动关系配置
        afterDragFields.map((field, index) => {
            let uiSchemaContent = field.uiSchema[field.code];
            if (typeof uiSchemaContent['ui:options'] !== 'undefined') {
                if (field.code === dragFieldcode) {
                    // 对于拖动的字段本身，要清除掉其show配置中的拖动后位置在其下面的字段
                    if (typeof uiSchemaContent['ui:options'].show !== 'undefined') {
                        uiSchemaContent['ui:options'].show = uiSchemaContent['ui:options'].show.filter((showOption, showIndex) => {
                            indexInFields = this._getFieldIndex(afterDragFields, showOption.field);
                            return indexInFields <= hoverIndex;
                        });
                        if (uiSchemaContent['ui:options'].show.length <= 0) {
                            delete uiSchemaContent['ui:options'].show;
                        }
                    }
                    // 对于拖动的字段本身，要清除掉其updateFields配置中的拖动后位置在其上面的字段
                    if (typeof uiSchemaContent['ui:options'].updateFields !== 'undefined') {
                        uiSchemaContent['ui:options'].updateFields = uiSchemaContent['ui:options'].updateFields.filter((updateCode, updateIndex) => {
                            indexInFields = this._getFieldIndex(afterDragFields, updateCode);
                            return indexInFields >= hoverIndex;
                        });
                        if (uiSchemaContent['ui:options'].updateFields.length <= 0) {
                            delete uiSchemaContent['ui:options'].updateFields;
                        }
                    }
                } else {
                    // 对于其他字段，如果拖动后字段位于上面，则要清除掉这些字段与拖动字段的show关联
                    if (typeof uiSchemaContent['ui:options'].show !== 'undefined') {
                        indexInFields = this._getFieldIndex(afterDragFields, field.code);
                        if (indexInFields < hoverIndex) {
                            uiSchemaContent['ui:options'].show.map((showOption, showIndex) => {
                                if (showOption.field === dragFieldcode) {
                                    uiSchemaContent['ui:options'].show.splice(showIndex, 1);
                                    if (uiSchemaContent['ui:options'].show.length <= 0) {
                                        delete uiSchemaContent['ui:options'].show;
                                    }
                                }
                            });
                        }
                    }
                    // 对于其他字段，如果拖动后字段位于下面，则要清除掉这些字段与拖动字段的updateFields关联
                    if (typeof uiSchemaContent['ui:options'].updateFields !== 'undefined') {
                        indexInFields = this._getFieldIndex(afterDragFields, field.code);
                        if (indexInFields > hoverIndex) {
                            uiSchemaContent['ui:options'].updateFields.map((updateCode, updateIndex) => {
                                if (updateCode === dragFieldcode) {
                                    uiSchemaContent['ui:options'].updateFields.splice(updateIndex, 1);
                                    if (uiSchemaContent['ui:options'].updateFields.length <= 0) {
                                        delete uiSchemaContent['ui:options'].updateFields;
                                    }
                                }
                            });
                        }
                    }
                }
            }
            afterDragFields[index].uiSchema[field.code] = uiSchemaContent;

        });

        sortedFields = systemFields.concat(afterDragFields);
        this.props.updateFieldsHandler(sortedFields);
    }

    // 从fields列表中找出某code值的字段的序列
    _getFieldIndex(fields, code) {
        let resultIndex = 0;
        fields.map((field, index) => {
            if (field.code === code) {
                resultIndex = index;
            }
        });
        return resultIndex;
    }

    render() {
        const { globalConfig, platform, fields, messages, locale, supportFieldList, registerWidgets, customInterfaces, customGateway, customUploadRequest, onImagePreview, editFieldData, systemFieldEditable, emptyPlaceholder } = this.props;
        const { fold } = this.state;
        let editFieldCode = '';
        if (editFieldData !== null) {
            editFieldCode = editFieldData.code;
        }
        const configSchema = ConfigSchema.getDefaultConfig(messages, registerWidgets, supportFieldList);
        let configPlatform, fieldTypeLabel = '';
        let systemFields = [], otherFields = [];

        // 从fields中过滤出来系统字段部分（系统字段不能进行排序）
        systemFields = fields.filter((fieldData) => {
            return fieldData.fieldType === 'system';
        });

        otherFields = fields.filter((fieldData) => {
            return fieldData.fieldType !== 'system';
        });
        let newOtherFields = [];
        let hasGroupFields = otherFields.filter(item => item.type !== 'group' && item.type !== 'Table' && item.hasgroup);
        otherFields.forEach(item => {
            if (item.type === 'group' || item.type === 'Table') {
                let groupFields = hasGroupFields.filter(v => v.hasgroup === item.code);
                let field = {
                    ...item,
                    children: groupFields
                }
                newOtherFields.push(field)
            } else {
                if (!item.hasgroup) {
                    newOtherFields.push(item)
                }
            }

        })
        let sortId = -1;
        return (
            <div className="app-xform-builder-field-list-wrapper">
                <div className="inner-wrapper">
                    {systemFields.length > 0 && (
                        <div className={classnames({
                            'system-preview-wrapper': true,
                            fold
                        })}>
                            <p className="template-title" onClick={this.handleFoldChange}>
                                <span>{messages[getMessageId('systemFieldFoldTitle')]}</span>
                                <i className="xform-iconfont expand-icon">&#xe610;</i>
                            </p>
                            <ul className={classnames({
                                'preview-list': true,
                                hidden: fold
                            })}>
                                {systemFields.map((fieldData, index) => {
                                    configPlatform = (configSchema[fieldData.type] && configSchema[fieldData.type].platform) || [];
                                    fieldTypeLabel = configSchema[fieldData.type] && configSchema[fieldData.type].label;

                                    return (
                                        <div key={fieldData.code}>
                                            <FieldOption
                                                globalConfig={globalConfig}
                                                draggable={false}
                                                index={index}
                                                platformSupport={fieldData.fieldType === 'system' || util._isInConfigPlatform(configPlatform, platform)}
                                                fieldTypeLabel={fieldTypeLabel}
                                                registerWidgets={registerWidgets}
                                                systemFieldEditable={systemFieldEditable}
                                                customInterfaces={customInterfaces}
                                                customGateway={customGateway}
                                                customUploadRequest={customUploadRequest}
                                                onImagePreview={onImagePreview}
                                                locale={locale}
                                                messages={messages}
                                                editFieldCode={editFieldCode}
                                                fieldData={fieldData}
                                                fieldListClickHandler={this.handleFieldListClick}
                                                deleteFieldHandler={this.handleDeleteField}
                                                fieldMoveHandler={this.handleFieldMove}
                                                addFieldHandler={this.handleAddField}
                                            />
                                        </div>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                    <div className="form-body-preview-wrapper">
                        {(() => {
                            if (newOtherFields.length > 0) {
                                return (
                                    <ul className={classnames({
                                        'preview-list': true
                                    })}>
                                        {newOtherFields.map((fieldData, index) => {
                                            configPlatform = (configSchema[fieldData.type] && configSchema[fieldData.type].platform) || [];
                                            fieldTypeLabel = configSchema[fieldData.type] && configSchema[fieldData.type].label;

                                            let itemWidth = (fieldData.uiSchema[fieldData.code] && fieldData.uiSchema[fieldData.code]['ui:options'] && fieldData.uiSchema[fieldData.code]['ui:options'].itemwidth >= 0)
                                                ? fieldData.uiSchema[fieldData.code]['ui:options'].itemwidth : 100;
                                            sortId++
                                            itemWidth = Number(itemWidth) > 0 ? itemWidth : 1;
                                            return (
                                                <div key={fieldData.code} style={{ width: itemWidth + '%' }} className={classnames({
                                                    'preview-group-list': fieldData.type === 'group' || fieldData.type === 'Table'
                                                })}>
                                                    {
                                                        ((fieldData.type === 'group' || fieldData.type === 'Table') && Array.isArray(fieldData.children)) ?
                                                            <div className="group-list-item">
                                                                <div style={{ width: itemWidth + '%' }}>
                                                                    <FieldOption
                                                                        globalConfig={globalConfig}
                                                                        draggable
                                                                        index={sortId}
                                                                        platformSupport={fieldData.fieldType === 'system' || util._isInConfigPlatform(configPlatform, platform)}
                                                                        fieldTypeLabel={fieldTypeLabel}
                                                                        registerWidgets={registerWidgets}
                                                                        systemFieldEditable={systemFieldEditable}
                                                                        customInterfaces={customInterfaces}
                                                                        customGateway={customGateway}
                                                                        customUploadRequest={customUploadRequest}
                                                                        onImagePreview={onImagePreview}
                                                                        locale={locale}
                                                                        messages={messages}
                                                                        editFieldCode={editFieldCode}
                                                                        fieldData={fieldData}
                                                                        fieldListClickHandler={this.handleFieldListClick}
                                                                        deleteFieldHandler={this.handleDeleteField}
                                                                        fieldMoveHandler={this.handleFieldMove}
                                                                        addFieldHandler={this.handleAddField}
                                                                    />
                                                                </div>
                                                                {
                                                                    fieldData.children.map((child, i) => {
                                                                        configPlatform = (configSchema[child.type] && configSchema[child.type].platform) || [];
                                                                        fieldTypeLabel = configSchema[child.type] && configSchema[child.type].label;
                                                                        let childrenItemWidth = (child.uiSchema[child.code]
                                                                            && child.uiSchema[child.code]['ui:options']
                                                                            && child.uiSchema[child.code]['ui:options'].itemwidth >= 0) ? child.uiSchema[child.code]['ui:options'].itemwidth : 100;
                                                                        sortId++
                                                                        let childrenStyle = Number(childrenItemWidth) > 0 ? childrenItemWidth : 1;
                                                                        return (
                                                                            <div key={child.code} style={{ width: childrenItemWidth + '%' }}>
                                                                                <FieldOption
                                                                                    globalConfig={globalConfig}
                                                                                    draggable
                                                                                    index={sortId}
                                                                                    platformSupport={child.fieldType === 'system' || util._isInConfigPlatform(configPlatform, platform)}
                                                                                    fieldTypeLabel={fieldTypeLabel}
                                                                                    registerWidgets={registerWidgets}
                                                                                    systemFieldEditable={systemFieldEditable}
                                                                                    customInterfaces={customInterfaces}
                                                                                    customGateway={customGateway}
                                                                                    customUploadRequest={customUploadRequest}
                                                                                    onImagePreview={onImagePreview}
                                                                                    locale={locale}
                                                                                    messages={messages}
                                                                                    editFieldCode={editFieldCode}
                                                                                    fieldData={child}
                                                                                    fieldListClickHandler={this.handleFieldListClick}
                                                                                    deleteFieldHandler={this.handleDeleteField}
                                                                                    fieldMoveHandler={this.handleFieldMove}
                                                                                    addFieldHandler={this.handleAddField}
                                                                                />
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                            :
                                                            <FieldOption
                                                                globalConfig={globalConfig}
                                                                draggable
                                                                index={sortId}
                                                                platformSupport={fieldData.fieldType === 'system' || util._isInConfigPlatform(configPlatform, platform)}
                                                                fieldTypeLabel={fieldTypeLabel}
                                                                registerWidgets={registerWidgets}
                                                                systemFieldEditable={systemFieldEditable}
                                                                customInterfaces={customInterfaces}
                                                                customGateway={customGateway}
                                                                customUploadRequest={customUploadRequest}
                                                                onImagePreview={onImagePreview}
                                                                locale={locale}
                                                                messages={messages}
                                                                editFieldCode={editFieldCode}
                                                                fieldData={fieldData}
                                                                fieldListClickHandler={this.handleFieldListClick}
                                                                deleteFieldHandler={this.handleDeleteField}
                                                                fieldMoveHandler={this.handleFieldMove}
                                                                addFieldHandler={this.handleAddField}
                                                            />
                                                    }
                                                </div>
                                            );
                                        })}
                                    </ul>
                                );
                            } else {
                                return emptyPlaceholder || (
                                    <div className="empty-box">
                                        <InboxOutlined className="empty-icon" />
                                        <span className="empty-tip">
                                            {messages[getMessageId('fieldConfigListEmptyTip')]}
                                        </span>
                                    </div>
                                );
                            }
                        })()}
                    </div>
                </div>
            </div>
        );
    }
}

