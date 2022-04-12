'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Upload, message, Modal, Card, Button } from 'antd';
import moment from 'moment';
import { PlusOutlined, UploadOutlined, CloseOutlined } from '@ant-design/icons';

class Uploads extends Component {
    constructor(props) {
        super(props);
        this.ApiRoot = localStorage.getItem('tyApiRoot')
        this.state = {
            fileUploading: false,
            fileList: [],
            curPreviewPic: '',
            delPicIng: false,
            removeFilesList: []
        };
    }

    dealName = (uploaded) => {
        let realName = uploaded.split('/')[2]
        let x1 = realName.split('.')
        let postfix = x1.pop()
        let allName = x1.join('.')
        let x2 = allName.split('_')
        // 剔除为避免文件名重复的 uuid
        if(x2.length>1 && /[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}/.test(x2[x2.length - 1])){
            x2 = x2.slice(0, -1)
        }
        x2 = x2.join('_')
        let showName = `${x2}.${postfix}`
        return showName
    }

    componentDidMount() {
        const { value } = this.props;
        if (value) {
            this.setState(value);
        }
    }

    UNSAFE_componentWillReceiveProps(np) {
        const { dispatch, value: thisEditData, onChange } = this.props;
        const { value: nextEditData, isQiniu } = np;

        const setFileList = () => {
            let defaultFileList = [];
            defaultFileList = nextEditData.map((u, index) => {
                let fileUrl = isQiniu ? `/_file-server/${u.storageUrl}` : `${this.ApiRoot}/${u.storageUrl}`;
                return {
                    uid: -index - 1,
                    name: this.dealName(u.storageUrl),
                    status: 'done',
                    storageUrl: u.storageUrl,
                    url: fileUrl,
                    size: u.size || -1
                };
            });
            this.setState({
                fileList: defaultFileList
            });
        };

        if (nextEditData && nextEditData.length) {
            if (!thisEditData || !this.state.fileList.length) {
                setFileList();
            } else if (nextEditData.length != thisEditData.length) {
                setFileList();
            } else {
                let repeat = true;
                for (let i = 0; i < thisEditData.length; i++) {
                    if (thisEditData[i] != nextEditData[i]) {
                        repeat = false;
                        break;
                    }
                }
                if (!repeat) {
                    setFileList();
                }
            }
        }
        // else{
        //     this.setState({
        //         fileList:[],
        //     })
        // }
    }

    render() {
        const UploadPath = {
            project: ['txt', 'dwg', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'png', 'jpg', 'rar', 'zip'],
            report: ['doc', 'docx', 'xls', 'xlsx', 'pdf'],
            data: ['txt', 'xls', 'xlsx'],
            image: ['png', 'jpg', 'svg', 'jpeg'],
            three: ['js'],
            video: ['mp4']
        };
        /**
         * uploadType 【string】 主要区别文件上传路径 以及类型 以 web/routes/attachment/index.js 中 UploadPath 的 key 值为准；默认 project；
         * disabled 【boolean】 上传是否可用
         * maxFilesNum 【number】 最大上传数量
         * fileTypes 【array[string]】 可允许上传的文件类型；
         * maxFileSize 【number】 单个文件最大大小 M
         * listType 【antd】 upload 组件的属性
         * onChange 【function】 文件数量变化时候回调 返回文件
         * value 【array[obj]】 编辑数据 [{url:'xxx', [size:999]}]
         * onStateChange 【function】 文件状态改变回调函数 上传中 return { uploading:true/false }
         */
        const {
            uploadType,
            disabled,
            maxFilesNum,
            fileTypes,
            maxFileSize,
            listType,
            onChange,
            value,
            showUploadList,
            onStateChange,
            isQiniu
        } = this.props;
        const { fileList, curPreviewPic, delPicIng, removeFilesList } = this.state;
        const that = this;
        let uploadType_ = uploadType || 'project';
        let maxFilesNum_ = maxFilesNum || 1;
        let defaultFileTypes = fileTypes || UploadPath[uploadType_];
        const uploadProps = {
            name: 'checkFile_',
            multiple: false,
            showUploadList: showUploadList || true,
            action: isQiniu ? `/_upload/attachments/${uploadType_}` : `${this.ApiRoot}/attachments/${uploadType_}`,
            listType: listType || 'text',
            disabled: disabled,
            beforeUpload: (file) => {
                if (fileList.length >= maxFilesNum_) {
                    message.warning(`最多选择${maxFilesNum_}个文件上传`);
                    return false;
                }
                if (file.name.length > 60) {
                    message.warning(`文件名过长(大于60字符)，请修改后上传`);
                    return false;
                }
                const extNames = file.name.split('.');
                var reg = /^[\.\s\u4e00-\u9fa5a-zA-Z0-9_-]{0,}$/;
                if (!reg.exec(file.name)) {
                    message.warning(`文件名包含除字母、汉字、数字、中划线、下划线之外的字符，请修改后上传`);
                    return false;
                }
                let isDAE = false;
                if (extNames.length > 0) {
                    let fileType = extNames[extNames.length - 1].toLowerCase();
                    isDAE = defaultFileTypes.some((f) => f == fileType);
                }
                if (!isDAE) {
                    message.error(`只能上传 ${defaultFileTypes.join()} 格式的文件!`);
                    return false;
                }
                const isLt = file.size / 1024 / 1024 < (maxFileSize || 3);
                if (!isLt) {
                    message.error(`文件必须小于${maxFileSize || 3}MB!`);
                    return false;
                }
                this.setState({
                    fileUploading: true
                });
                if (onStateChange) {
                    onStateChange({ uploading: true });
                }
            },
            onChange(info) {
                const status = info.file.status;
                if (status === 'uploading') {
                    that.setState({
                        fileList: info.fileList
                    });
                }
                if (status === 'done') {
                    let { uploaded, url } = info.file.response;
                    let size = info.file.size;
                    let nextFileList = fileList;
                    nextFileList[nextFileList.length - 1] = {
                        uid: -moment().unix(),
                        name: that.dealName(uploaded),
                        status: 'done',
                        storageUrl: uploaded,
                        url: url || '/_file-server/' + uploaded,
                        size: size
                    };
                    onChange(nextFileList);
                    that.setState({
                        fileUploading: false,
                        fileList: nextFileList
                    });
                    if (onStateChange) {
                        onStateChange({ uploading: false });
                    }
                } else if (status === 'error') {
                    that.setState({
                        fileUploading: false
                    });
                    message.error(`${info.file.name} 上传失败，请重试`);
                    if (onStateChange) {
                        onStateChange({ uploading: false });
                    }
                }
            },
            onRemove(file) {
                let nextFileList = [];
                fileList.map((f, i) => {
                    if (f.uid != file.uid) {
                        nextFileList.push(f);
                    }
                });
                let nextRemoveFiles = removeFilesList.concat([file.storageUrl]);
                if (curPreviewPic == file.url) {
                    that.setState({
                        curPreviewPic: ''
                    });
                }
                onChange(nextFileList);
                that.setState({
                    fileList: nextFileList,
                    removeFilesList: nextRemoveFiles
                });
            },
            onPreview(file) {
                let filePostfix = file.url.split('.').pop();
                filePostfix = filePostfix.toLowerCase();
                if (UploadPath.image.some((img) => img == filePostfix)) {
                    that.setState({
                        curPreviewPic: file.url
                    });
                } else {
                    message.warn('仅支持图片预览');
                }
            }
        };

        let fileList_ = fileList
        // .map(f => {
        //     if (f.storageUrl) {
        //         let realName = f.storageUrl.split('/').pop()
        //         if (f.name != realName) {
        //             f.name = realName
        //         }
        //     }
        //     return f
        // })
        return (
            <div>
                <Spin spinning={delPicIng}>
                    <Upload {...uploadProps} fileList={fileList_}>
                        {
                            disabled ? (
                                ''
                            ) :
                                listType == 'picture-card' ?
                                    (
                                        fileList.length >= maxFilesNum_ ? null : (
                                            <div style={{}}>
                                                <PlusOutlined />
                                                <div>上传图片</div>
                                            </div>
                                        )
                                    ) : (
                                        <Button disabled={fileList.length >= maxFilesNum_} icon={<UploadOutlined />}>  文件上传 </Button>
                                    )
                        }
                    </Upload>
                    {
                        curPreviewPic ? (
                            <Card
                                bodyStyle={{
                                    padding: 8
                                }}
                            >
                                <div style={{ marginBottom: 8 }} >
                                    <span>文件预览</span>
                                    <span
                                        style={{ float: 'right' }}
                                        onClick={() => { this.setState({ curPreviewPic: '' }); }}
                                    >
                                        <CloseOutlined style={{ fontSize: 20 }} />
                                    </span>
                                </div>
                                <img style={{ width: '100%' }} src={curPreviewPic}></img>
                            </Card>
                        ) : ''
                    }
                </Spin>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { auth } = state
    return {
        user: auth.user
    };
}

export default connect(mapStateToProps)(Uploads);
