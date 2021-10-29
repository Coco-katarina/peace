/**
 * xform基础组件 => 图片上传组件
 * {
 *     uid: -1,
 *     name: 'xxx.png',
 *     status: 'done',
 *     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
   //当为图片上传时该项为图片url地址
 * }
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImagePicker, List, Modal } from 'antd-mobile';
import { Upload, Button, message } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import utils from '../util';
import { getMessageId } from '../i18n/localeMessages';
import './index.less';
import { WebAPI } from '$utils';
import { RouteRequest } from '@peace/utils';


const ListItem = List.Item;

export default class CustomUploadWidget extends Component {
    constructor(props) {
        super(props);
        this.hubUrl = [];
        this.onChange = this.onChange.bind(this);
        this.customUpload = this.customUpload.bind(this);
        this.handleImagePreview = this.handleImagePreview.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
        this._getUrlFormHub = this._getUrlFormHub.bind(this);
        this._customRequest = this._customRequest.bind(this);

        this.state = {
            modalVisible: false,
            previewImageUrl: '',
            previewTxtUrl: '',
            isImage: true,
            fileList: []
        };
    }

    componentDidMount() {
        const value = this._checkDataUniqueId(this.props.value);
        this.setState({
            fileList: value
        });
        this.hubUrl = value.map((item) => {
            return {
                uid: item.uid,
                name: item.name,
                url: item.url
            };
        });
        const logger = this.props.formContext.logger;
        logger.logEvent('widget', 'show', 'upload');
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.value) !== JSON.stringify(this.props.value)) {
            const value = this._checkDataUniqueId(nextProps.value);
            this.setState({
                fileList: value
            });
            this.hubUrl = value.map((item) => {
                return {
                    uid: item.uid,
                    name: item.name,
                    url: item.url
                };
            });
        }
    }

    // 检查传入组件的数据中是不是有uid字段，如果没有uid，要默认生成一个uid
    _checkDataUniqueId(data) {
        const result = [];
        // 兼容判断，有些场景初始value写的是‘’
        if (Array.isArray(data)) {
            data.map((dataItem) => {
                if (typeof dataItem.uid !== 'undefined') {
                    result.push(dataItem);
                } else {
                    dataItem.uid = 'rc-upload-' + utils.randomString();
                    result.push(dataItem);
                }
            });
            return result;
        } else {
            return result;
        }
    }


    // 自定义图片上传request（移动端因为涉及到容器的不同，导致不方便集中统一处理上传，故移动端场景必须指定customUploadRequest属性）
    onChange(files) {
        const { onChange, formContext } = this.props;
        const customUploadRequest = formContext.customUploadRequest;
        const fileList = this.state.fileList;
        let uploadFiles = [];
        const { maxFileNum, maxFileSize } = this.props.options;

        uploadFiles = files.filter((file) => {
            return typeof file.file === 'object';
        });
        if (uploadFiles && uploadFiles.length > 0) {
            // 添加上传
            customUploadRequest(uploadFiles, {
                maxFileNum,
                maxFileSize,
                currentFileNum: fileList.length
            }, (urls) => {
                urls.map((url) => {
                    fileList.push(this.fileListConvertor({
                        id: 'rc-upload-' + utils.randomString(),
                        url
                    }));
                    this.setState({
                        fileList
                    });
                    // 这里react-jsonschema-form的onChange没有对formData进行deepClone会导致组件刷新失败，这里必须要自己进行deepClone。参见https://github.com/mozilla-services/react-jsonschema-form/blob/master/src/components/Form.js#L101
                    onChange(fileList.map((item) => {
                        return this.fileListConvertor(item);
                    }));
                });
            });
        } else {
            // 删除上传后的图片
            this.setState({
                fileList: files
            });
            onChange(files.map((item) => {
                return this.fileListConvertor(item);
            }));
        }
    }
    _customRequest(option) {
        const { formContext, options } = this.props;
        const { customUploadRequest } = formContext;
        const { uploadType } = options;
        customUploadRequest(option.file, 'upload', uploadType, (url) => {
            const { onChange } = this.props;
            const { fileList } = this.state;
            let fieldFormData;
            this.hubUrl = this.hubUrl.filter((item) => {
                return item.uid !== option.file.uid;
            });
            this.hubUrl.push({
                name: option.file.name,
                uid: option.file.uid,
                url
            });
            fieldFormData = fileList.map((file) => {
                const status = this._getUrlFormHub(file) ? file.status : 'error';
                return {
                    name: file.name,
                    uid: file.uid,
                    status,
                    url: this._getUrlFormHub(file)
                };
            });
            this.setState({
                fileList: fieldFormData
            });
            option.onSuccess(url);
            onChange(fieldFormData);
        }, (e) => {
            option.onError(e);
        });

    }
    //删除图片文件
    deleteFile(file) {
        const { formContext, options } = this.props;
        const { customUploadRequest } = formContext;
        if (file.url) {
            customUploadRequest(file, 'delete');
        };
    }
    _getUrlFormHub(file) {
        let result = '';
        const uid = file.uid;
        this.hubUrl.map((hubItem) => {
            if (hubItem.uid === uid) {
                result = hubItem.url;
            }
        });
        return result;
    }

    // 自定义图片上传（这里只暴露一个点击上传的trigger，图片选择、图片上传都交由业务自定义，主要用于钉钉这样的将图片选择和图片上传都进行了封装的Bridge的场景）
    customUpload(event) {
        // 阻止input[type=file]的原生选择图片操作
        event.preventDefault();
        const formContext = this.props.formContext;
        const customUpload = formContext.customUpload;
        const onChange = this.props.onChange;
        const { maxFileNum, maxFileSize } = this.props.options;

        const fileList = this.state.fileList;

        customUpload({
            maxFileNum,
            maxFileSize,
            currentFileNum: fileList.length
        }, (urls) => {
            urls.map((url) => {
                fileList.push(this.fileListConvertor({
                    id: 'rc-upload-' + utils.randomString(),
                    url
                }));
            });
            onChange(fileList);
            return false;
        });
    }

    // 兼容PC antd fileList数据格式，将该数据格式转换成imagePicker组件支持的格式
    getImagePickerFileList(fileList) {
        return fileList.map((item) => {
            return {
                id: item.uid,
                url: item.url
            }
        });
    }

    // ant mobile组件数据格式转回antd 的fileList数据格式
    fileListConvertor(file) {
        return {
            uid: file.id,
            status: 'done',
            name: file.name || '来自移动端的图片',
            url: file.url
        };
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

    // 根据options中的validate字段判断是否必填
    _isFieldRequired(validate) {
        let isFieldRequired = false;
        validate.map((validateItem) => {
            if (validateItem.type === 'empty') {
                isFieldRequired = true;
            }
        });
        return isFieldRequired;
    }

    handleImagePreview(url) {
        const { RouteTable } = WebAPI;
        RouteRequest.post(RouteTable.fileExist, { url }).then((res) => {
            if (res && res.isExist) {
                const index = url.lastIndexOf('.');
                const type = url.substring(index, url.length);
                if ([".png", ".jpg", ".svg"].find(v => v === type)) {
                    this.setState({
                        modalVisible: true,
                        previewImageUrl: url,
                        isImage: true
                    });
                } else if (type === '.txt') {
                    this.setState({
                        modalVisible: true,
                        previewTxtUrl: url,
                        isImage: false
                    });
                } else {
                    window.open(url)
                }
            } else {
                message.error('文件不存在或已被移除！');
            }
        })

    }

    onWrapTouchStart(e) {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }

    onModalClose() {
        this.setState({
            modalVisible: false
        });
    }

    render() {
        const { modalVisible, previewImageUrl, previewTxtUrl, isImage } = this.state;
        const messages = this.props.formContext && this.props.formContext.messages;
        let { ...options } = this.props.options;
        // exampleImageUrl表示示例图片，为方便扩展，定义为数组，目前仅支持一张示例图片
        //const exampleImages = options.exampleImageUrl;
        //const hasExampleImage = exampleImages && exampleImages.length > 0;
        //const exampleImageUrl = hasExampleImage ? exampleImages[0].url : '';
        const schema = this.props.schema;
        // react-jsonschema-form组件对于array类型的字段会丢失掉required这个props，只能通过自己的逻辑判断来补齐这个逻辑
        let required = false;
        if (typeof options.validate !== 'undefined') {
            required = this._isFieldRequired(options.validate);
        }
        let value = this.props.value,
            disabled = this.props.disabled,
            readonly = this.props.readonly,
            onChange = this.props.onChange;
        // //判断节点禁用属性
        let formContext = this.props.formContext;
        let disnodes = options.disnodes || null;
        if (formContext.currentNode && Array.isArray(disnodes)) {
            if (disnodes.indexOf(formContext.currentNode) > -1) {
                disabled = true;
            }
        }


        const { customUploadRequest, customUpload } = formContext;
        const maxFileNum = schema.maxFileNum || 9999;
        let maxFileSize = schema.maxFileSize || 9999;
        const files = this.getImagePickerFileList(value);

        //解析schema中约定的_errorType字段，用来标识是validate中哪种类型校验不通过
        let validateMessage = '';
        let _errorType = options._errorType || '';
        if (_errorType !== '' && typeof options.validate !== 'undefined') {
            validateMessage = this._getValidateMessage(_errorType, options.validate);
        }

        if (typeof customUploadRequest === 'function') {
            return (
                <div className={classnames({
                    'xform-custom-widget': true,
                    'xform-custom-upload': true,
                    'xform-item-has-error': _errorType !== '',
                    disabled
                })}>
                    <div className='upload'>
                        <label className={classnames({
                            required: required
                        }) + ' upload-label'}>{schema.title}</label>
                        <Upload
                            //listType="picture"
                            className='upload-content'
                            disabled={disabled || readonly}
                            beforeUpload={(file, fileList) => {
                                if (disabled || readonly) {
                                    return;
                                }
                                const filename = file.name;
                                const blacklistExts = ['php', 'js', 'html', 'htm', 'shtml', 'shtm'];
                                const current = this.state.fileList;
                                const ext = filename.slice(filename.lastIndexOf('.') + 1).toLowerCase();

                                const project = [".txt", ".dwg", ".doc", ".docx", ".xls", ".xlsx", ".pdf", ".png", ".jpg", ".svg"];
                                if (project.indexOf('.' + ext) < 0) {
                                    message.error("文件格式无效");
                                    return false;
                                }

                                // 文件的扩展名不能在黑名单里
                                if (blacklistExts.indexOf(ext) > -1) {
                                    message.error(messages[getMessageId('xformUploaderFileCheckMessage')]);
                                    return false;
                                }

                                // 文件数量不能超出最大限制
                                if (fileList.length + current.length > maxFileNum) {
                                    message.error(messages[getMessageId('xformMaxFileNumErrorTip')]);
                                    return false;
                                }
                                // 文件大小不能超过配置
                                if (file.size > maxFileSize * 1024 * 1024) {
                                    message.error(file.name + messages[getMessageId('xformMaxFileSizeErrorTip')] + maxFileSize + 'M');
                                    return false;
                                }
                                return true;
                            }}
                            onChange={(info) => {
                                if (disabled || readonly) {
                                    return
                                }
                                const current = this.state.fileList;
                                let fileList = info.fileList;
                                let file = info.file;
                                const filename = file.name;
                                fileList.map(item => {
                                    if (item.status == 'done' && item.url == '') {
                                        item.status = 'error'
                                    }
                                })

                                const blacklistExts = ['php', 'js', 'html', 'htm', 'shtml', 'shtm'];
                                const ext = filename.slice(filename.lastIndexOf('.') + 1).toLowerCase();
                                const project = [".txt", ".dwg", ".doc", ".docx", ".xls", ".xlsx", ".pdf", ".png", ".jpg", ".svg"];
                                if (info.file.status === 'error' || (info.file.response === '' && info.file.status !== 'removed')) {
                                    message.error(info.file.name + messages[getMessageId('xformUploadErrorTip')]);
                                }
                                // 文件数量不能超出最大限制
                                // 文件大小不能超过配置
                                // 文件扩展名不能在黑名单里
                                if ((fileList.length > maxFileNum) ||
                                    (file.size > maxFileSize * 1024 * 1024) ||
                                    (blacklistExts.indexOf(ext) > -1) ||
                                    project.indexOf('.' + ext) < 0
                                ) {

                                    this.setState({
                                        fileList: current
                                    });
                                } else {
                                    this.setState({
                                        fileList
                                    });
                                }
                            }}
                            onRemove={(file) => {
                                // 如果是字段禁用状态，不允许删除
                                if (disabled || readonly) {
                                    return false;
                                }
                                const { fileList } = this.state;
                                this.deleteFile(file);
                                const filterFileList = fileList.filter((fileItem) => {
                                    return file.uid !== fileItem.uid;
                                });
                                this.setState({
                                    fileList: filterFileList
                                });
                                // const submitFileList = filterFileList.filter((fileItem) => {
                                //     return !(fileItem.originFileObj);
                                // });
                                onChange(filterFileList);
                            }}
                            onPreview={(previewFile) => {
                                const fileList = this.state.fileList;
                                let url;
                                fileList.map((file) => {
                                    if (file.uid === previewFile.uid) {
                                        url = file.url;
                                    }
                                });
                                this.handleImagePreview(url);
                            }}
                            customRequest={this._customRequest}
                            fileList={this.state.fileList}
                        >
                            {disabled || readonly ? null : <Button style={{ padding: '2px 5px' }}>
                                <UploadOutlined />
                                {options.label || messages[getMessageId('xformBatchUploadDefaultLabel')]}
                            </Button>}

                        </Upload>
                    </div>

                    {/* <ListItem
                        wrap
                        multipleLine
                        error={_errorType !== ''}
                    >
                        <label className={classnames({
                            required: required
                        })}>{schema.title}</label>
                    </ListItem>

                    <ListItem
                        extra={(
                            // <ImagePicker
                            //     files={files}
                            //     selectable={files.length < maxFileNum && !disabled && !readonly}
                            //     multiple
                            //     onChange={this.onChange}
                            //     onImageClick={(index, files) => {
                            //         const url = files[index].url;
                            //         this.handleImagePreview(url);
                            //     }}
                            // />
                            <Upload
                                listType='picture-card'
                                className='upload-content'
                                disabled={disabled||readonly}
                                beforeUpload={(file, fileList) => {
                                    if (disabled||readonly) {
                                        return;
                                    }
                                    const filename = file.name;
                                    const blacklistExts = ['php', 'js', 'html', 'htm', 'shtml', 'shtm'];
                                    const current = this.state.fileList;
                                    const ext = filename.slice(filename.lastIndexOf('.') + 1).toLowerCase();

                                    const project = [".txt", ".dwg", ".doc", ".docx", ".xls", ".xlsx", ".pdf", ".png", ".jpg", ".svg"];
                                    if (project.indexOf('.' + ext) < 0) {
                                        message.error("文件格式无效");
                                        return false;
                                    }

                                    // 文件的扩展名不能在黑名单里
                                    if (blacklistExts.indexOf(ext) > -1) {
                                        message.error(messages[getMessageId('xformUploaderFileCheckMessage')]);
                                        return false;
                                    }

                                    // 文件数量不能超出最大限制
                                    if (fileList.length + current.length > maxFileNum) {
                                        message.error(messages[getMessageId('xformMaxFileNumErrorTip')]);
                                        return false;
                                    }
                                    // 文件大小不能超过配置
                                    if (file.size > maxFileSize * 1024 * 1024) {
                                        message.error(file.name + messages[getMessageId('xformMaxFileSizeErrorTip')] + maxFileSize + 'M');
                                        return false;
                                    }
                                    return true;
                                }}
                                onChange={(info) => {
                                    if (disabled||readonly) {
                                        return
                                    }
                                    const current = this.state.fileList;
                                    let fileList = info.fileList;
                                    let file = info.file;
                                    const filename = file.name;
                                    fileList.map(item => {
                                        if (item.status == 'done' && item.url == '') {
                                            item.status = 'error'
                                        }
                                    })

                                    const blacklistExts = ['php', 'js', 'html', 'htm', 'shtml', 'shtm'];
                                    const ext = filename.slice(filename.lastIndexOf('.') + 1).toLowerCase();
                                    const project = [".txt", ".dwg", ".doc", ".docx", ".xls", ".xlsx", ".pdf", ".png", ".jpg", ".svg"];
                                    if (info.file.status === 'error' || (info.file.response === '' && info.file.status !== 'removed')) {
                                        message.error(info.file.name + messages[getMessageId('xformUploadErrorTip')]);
                                    }
                                    // 文件数量不能超出最大限制
                                    // 文件大小不能超过配置
                                    // 文件扩展名不能在黑名单里
                                    if ((fileList.length > maxFileNum) ||
                                        (file.size > maxFileSize * 1024 * 1024) ||
                                        (blacklistExts.indexOf(ext) > -1) ||
                                        project.indexOf('.' + ext) < 0
                                    ) {

                                        this.setState({
                                            fileList: current
                                        });
                                    } else {
                                        this.setState({
                                            fileList
                                        });
                                    }
                                }}
                                onRemove={(file) => {
                                    if (disabled||readonly) {
                                        return false;
                                    }
                                    const { fileList } = this.state;
                                    this.deleteFile(file);
                                    const filterFileList = fileList.filter((fileItem) => {
                                        return file.uid !== fileItem.uid;
                                    });
                                    this.setState({
                                        fileList: filterFileList
                                    });
                                    onChange(filterFileList);
                                }}
                                onPreview={(previewFile) => {
                                    const fileList = this.state.fileList;
                                    let url;
                                    fileList.map((file) => {
                                        if (file.uid === previewFile.uid) {
                                            url = file.url;
                                        }
                                    });
                                    this.handleImagePreview(url);
                                }}
                                customRequest={this._customRequest}
                                fileList={this.state.fileList}
                            >
                                {disabled || readonly || this.state.fileList.length >= maxFileNum ? null : <PlusOutlined style={{ display: 'block' }} />}
                            </Upload>
                        )}
                    /> */}


                    <Modal
                        visible={modalVisible}
                        title=""
                        transparent
                        animationType="fade"
                        maskClosable
                        onClose={this.onModalClose}
                        footer={[]}
                        className="xform-image-preview-modal"
                        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                    >
                        <div className="xform-image-preview-wrapper">
                            {isImage ? <img src={previewImageUrl} onTouchStart={this.onModalClose} /> :
                                <iframe src={previewTxtUrl} width='100%' height='300' frameborder='0'></iframe>}
                        </div>
                    </Modal>
                    <div className="xform-item-error-explain">{validateMessage}</div>
                </div>
            );
        }
        // } else if (typeof customUpload === 'function') {
        //     return (
        //         <div className={classnames({
        //             'xform-custom-widget': true,
        //             'xform-custom-upload': true,
        //             'xform-item-has-error': _errorType !== '',
        //             disabled
        //         })}>
        //             <ListItem
        //                 wrap
        //                 multipleLine
        //                 error={_errorType !== ''}
        //                 extra={hasExampleImage ? <a href="javascript:;" className="example-link" onClick={() => {
        //                     this.handleImagePreview(exampleImageUrl);
        //                 }}>{messages[getMessageId('xformUploaderExampleLink')]}</a> : null}
        //             ><label className={classnames({
        //                 required: required
        //             })}>{schema.title}</label></ListItem>
        //             <ListItem
        //                 extra={(
        //                     <ImagePicker
        //                         files={files}
        //                         selectable={files.length < maxFileNum && !disabled && !readonly}
        //                         multiple
        //                         onAddImageClick={this.customUpload}
        //                         onChange={(files) => {
        //                             onChange(files.map((item) => {
        //                                 return this.fileListConvertor(item);
        //                             }));
        //                         }}
        //                         onImageClick={(index, files) => {
        //                             const url = files[index].url;
        //                             this.handleImagePreview(url);
        //                         }}
        //                     />
        //                 )}
        //             />
        //             <Modal
        //                 visible={modalVisible}
        //                 title=""
        //                 transparent
        //                 animationType="fade"
        //                 maskClosable
        //                 onClose={this.onModalClose}
        //                 footer={[]}
        //                 className="xform-image-preview-modal"
        //                 wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        //             >
        //                 <div className="xform-image-preview-wrapper">
        //                     <img src={previewImageUrl} onTouchStart={this.onModalClose} />
        //                 </div>
        //             </Modal>
        //             <div className="xform-item-error-explain">{validateMessage}</div>
        //         </div>
        //     );
        // } 
        else {
            //console.warn('xform: 移动端必须自己实现图片上传属性customUploadRequest或customUpload！');
            console.warn('xform: 移动端必须自己实现图片上传属性customUploadRequest！');
            return null;
        }
    }
}

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}
