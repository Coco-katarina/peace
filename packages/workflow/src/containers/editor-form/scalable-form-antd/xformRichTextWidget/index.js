/**
 * xform基础widget => 富文本类型字段
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { message } from 'antd';
import ReactQuill, { Quill } from 'react-quill';
import { getMessageId } from '../i18n/localeMessages';
import './index.less';

export default class CustomRichText extends Component {
    constructor(props) {
        super(props);
        this.editor = null;
        this.editorRef = React.createRef();
        this.attachQuillRefs = this.attachQuillRefs.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.insertToEditor = this.insertToEditor.bind(this);
        this.state = {
            htmlValue: props.value
        };
    }

    componentDidMount() {
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'richtext');
        this.attachQuillRefs();
        // 为编辑器toolbar植入handler
        this.editor.getModule('toolbar').addHandler('image', () => {
            this.uploadImage();
        });
    }

    // static getDerivedStateFromProps(nextProps, state) {
    //     if (nextProps.value !== state.htmlValue) {
    //         return {
    //             htmlValue: nextProps.value
    //         };
    //     }
    //     return null;
    // }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({
                htmlValue: nextProps.value
            });
        }
    }

    componentDidUpdate() {
        this.attachQuillRefs();
    }

    attachQuillRefs = () => {
        if (typeof this.editorRef.current.getEditor !== 'function') return;
        this.editor = this.editorRef.current.getEditor();
    }

    handleEditorChange(value) {
        const { onChange, formContext } = this.props;
        const { customUploadRequest } = formContext;
        const temp1 = this.getUrlGroup(value) || [];
        const temp2 = this.getUrlGroup(this.state.htmlValue) || [];
        temp2.length > 0 && temp2.map(item1 => {
            if (!temp1.find(item2 => item2 == item1)) {
                let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
                const url = item1.match(srcReg)[1];
                customUploadRequest({ url }, 'delete');
            }
        })
        this.setState({
            htmlValue: value
        });
        onChange(value);
    }

    _getValidateMessage(errorType, validate) {
        let errorMessage = '';
        validate.map((validateItem) => {
            if (validateItem.type === errorType) {
                errorMessage = validateItem.message;
                return false;
            }
        });
        return errorMessage;
    }
    getUrlGroup(htmlStr) {
        const reg = /<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim;
        return htmlStr.match(reg);;
    }

    uploadImage() {
        const { formContext } = this.props;
        const { customUploadRequest, messages } = formContext;
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.click();

        // Listen upload local image and save to server
        input.onchange = () => {
            const file = input.files[0];

            // file type is only image.
            if (/^image\//.test(file.type)) {
                customUploadRequest(file, 'upload', 'picture', (url) => {
                    this.insertToEditor(url);
                }, (e) => {
                    message.error(file.name + messages[getMessageId('xformUploadErrorTip')]);
                    console.error(e);
                });
            } else {
                console.warn('You could only upload images.');
            }
        };
    }

    /**
     * insert image url to rich editor.
     *
     * @param {string} url
     */
    insertToEditor(url) {
        // push image url to rich editor.
        const range = this.editor.getSelection();
        this.editor.insertEmbed(range.index, 'image', url);
    }

    render() {
        let options = this.props.options,
            disabled = this.props.disabled,
            readonly = this.props.readonly,
            placeholder = this.props.placeholder;
        //判断节点禁用属性
        let formContext = this.props.formContext;
        let disnodes = options.disnodes || null;
        if (formContext.currentNode && Array.isArray(disnodes)) {
            if (disnodes.indexOf(formContext.currentNode) > -1) {
                disabled = true;
            }
        }
        const htmlValue = this.state.htmlValue;
        // 为编辑器设置内联样式的html模式
        const SizeStyle = Quill.import('attributors/style/size');
        SizeStyle.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px'];
        Quill.register(SizeStyle, true);
        // const height = options.height || 200;
        // const maxHeight = options.maxHeight || 400;
        let toolbars;
        if (typeof options.toolbars !== 'undefined') {
            toolbars = [[{ size: SizeStyle.whitelist }]].concat(options.toolbars);
        } else {
            toolbars = [
                [{ size: SizeStyle.whitelist }],
                [{ align: [] }, 'direction'],
                ['bold', 'italic', 'underline', 'strike'],
                [{ color: [] }, { background: [] }],
                [{ script: 'super' }, { script: 'sub' }],
                ['blockquote', 'code-block'],
                [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                ['link', 'image'],
                ['clean']
            ];
        }

        const modules = {
            toolbar: toolbars
        };

        //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过
        let validateMessage = '';
        let _errorType = options._errorType || '';
        if (_errorType !== '' && typeof options.validate !== 'undefined') {
            validateMessage = this._getValidateMessage(_errorType, options.validate);
        }

        return (
            <div className={classnames({
                'ant-form-item-control': true,
                'xform-custom-widget': true,
                'xform-custom-richtext': true,
                'has-error': _errorType !== ''
            })}>
                <ReactQuill
                    ref={this.editorRef}
                    theme="snow"
                    value={htmlValue}
                    readOnly={readonly || disabled}
                    placeholder={placeholder}
                    modules={modules}
                    onChange={this.handleEditorChange}
                />
                <div className="ant-form-explain">{validateMessage}</div>
            </div>
        );
    }
}
