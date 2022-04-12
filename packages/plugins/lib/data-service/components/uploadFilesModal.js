/**
 * Created by zmh on 2017/6/21.
 */
'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Select, Button, Upload, Icon, message, Tag } from 'antd';
import { uploadFile, removeFile, getFileList } from '../actions/fileInfo';
import { PinyinHelper } from '../../../utils/pinyin';
import moment from 'moment';
const path = require('path');
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 12 },
}
const ext = {
    project: [".txt", ".dwg", ".doc", ".docx", ".xls", ".xlsx", ".pdf", ".png", ".jpg"],
    report: [".doc", ".docx", ".xls", ".xlsx", ".pdf"],
    data: [".txt", ".xls", ".xlsx"],
    image: [".png", ".jpg"]
}
class UploadFilesModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: null,
            fileExt: null,
            fileLink: null,
            fileList: [],
            fileSize: null,
            selectedTargetId: null
        }
    }
    handleOk = () => {
        const { getFieldValue } = this.props.form;
        let structureSelected = getFieldValue('structureSelected');
        if (structureSelected == "") {
            message.error('请选择结构物');
            return;
        }
        if (this.state.fileName == null) {
            message.error('请选择上传文件');
            return;
        }
        let extra = {};
        let targetId = null;
        let fileType = this.props.fileTypeId.split('-');
        let fileTypeId = parseInt(this.props.fileTypeId.split('-')[1]);
        if (fileType.length > 2) {
            targetId = parseInt(this.props.fileTypeId.split('-')[2]);
        } else {
            let data = this.props.projectList;
            let dataLength = data == null ? 0 : data.length;
            let projectId = "";
            if (dataLength > 0) {
                projectId = data[0].projects[0].id.toString();
            }
            targetId = fileTypeId == 1 ?
                projectId : parseInt(getFieldValue('structureSelected'));
        }
        extra =
            fileTypeId == 1 ? {
                "projectId": targetId
            } : fileTypeId == 2 ? {
                "structureId": targetId,
                "reportConfirmState": false
            } : {
                        "structureId": targetId
                    };
        let fileInfo = {
            name: this.state.fileName, // {string} 文件名
            ext: this.state.fileExt, // {string} 文件扩展名
            typeId: fileTypeId, // {number} 文件类型id，文件类型：{项目文件, 报表文件, 数据文件}
            link: this.state.fileLink, // {string} 文件路径编码
            size: this.state.fileSize, // {number} 文件大小，默认单位：B
            time: moment().format('YYYY-MM-DD HH:mm:ss'), // {datetimeString} 文件创建时间
            extra: extra
        }
        this.props.dispatch(uploadFile(this.props.userId, fileInfo))
            .then(_ => {
                this.props.dispatch(getFileList(this.props.userId));
                const { closeUploadFilesModal } = this.props;
                closeUploadFilesModal();
                if (_.type == "UPLOAD_FILE_FAILURE") {
                    this.props.dispatch(removeFile(this.state.fileLink, this.state.fileName));
                }
                this.setState({ fileList: [], fileName: null, fileExt: null, fileLink: null, fileSize: null });
            }
                , error => {
                    this.props.dispatch(removeFile(this.state.fileLink, this.state.fileName));
                    const { closeUploadFilesModal } = this.props;
                    closeUploadFilesModal();
                });
    }
    handleCancel = () => {
        if (this.state.fileLink != null) {
            this.props.dispatch(removeFile(this.state.fileLink, this.state.fileName)).then(_ => {
                this.setState({ fileList: [], fileName: null, fileLink: null, fileExt: null, fileSize: null });
            })
        }
        const { closeUploadFilesModal } = this.props;
        closeUploadFilesModal();
    }

    // 文件状态改变的回调。上传中、完成、失败都会调用这个函数。
    handleChange = (info) => {
        // 上传列表数量的限制，只显示最近上传的一个
        let fileList = info.fileList;
        fileList = fileList.slice(-1);

        // 读取远程路径并显示链接
        fileList = fileList.map((file) => {
            if (file.response && file.status != 'error') {
                file.url = this.props.resourceRoot + "/" + file.response.filename;
                let index = info.file.name.lastIndexOf(".");
                let len = info.file.name.length;
                let ext = info.file.name.substring(index, len).toLowerCase();
                let name = info.file.name.substring(0, index);
                this.setState({ fileName: name, fileExt: ext, fileLink: file.response.filename });
                return file;
            }
            return file;
        });
        this.setState({ fileList });

        if (info.file.status === 'done') {
            message.success(`${info.file.name} 文件上传成功`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败`);
        }
    };

    beforeUpload = (file) => {
        let extname = path.extname(file.name);
        extname = extname ? extname : 'unknown';
        extname = extname.toLowerCase();
        let fileType = this.props.fileTypeId.split('-')[1];
        const fileTypeStr = fileType == "1" ? "project" : fileType == "2" ? "report" : "data";
        let msgFlag = true;
        if (ext[fileTypeStr].indexOf(extname) < 0) {
            msgFlag = false;
            message.error('文件格式需是 ：' + ext[fileTypeStr].join(","));
            return msgFlag;
        }
        this.setState({ fileSize: file.size });
        const isLt10M = file.size / 1024 / 1024 <= 10;
        if (!isLt10M) {
            message.error('文件大小必须比10MB小!');
            return isLt10M;
        }
        const fileSize = file.size / 1024 / 1024 / 1024;
        const residualCapacity = this.props.residualCapacity;
        const isLtCapacity = (fileSize - residualCapacity) < 0;// 
        const is0 = fileSize > 0;
        if (!is0) {
            message.error(`文件大小为${fileSize}，请重新选择!`);
            return is0;
        }
        if (!isLtCapacity) {
            message.error(`文件大小为${fileSize}，已超剩余容量${residualCapacity}!`);
            return isLtCapacity;
        }
        return true;
    }

    handleRemove = (file) => {
        if (file.response && this.state.fileName) {
            this.props.dispatch(removeFile(this.state.fileLink, this.state.fileName)).then(_ => {
                this.setState({ fileList: [], fileName: null, fileLink: null, fileExt: null, fileSize: null });
            })
        }
    }

    handleSelectedChange = (value) => {
        this.setState({ selectedTargetId: value });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let fileTypeLen = this.props.fileTypeId.split('-');
        let fileType = fileTypeLen[1];
        const fileTypeStr = fileType == "1" ? "project" : fileType == "2" ? "report" : "data";
        const content = '文件格式：' + ext[fileTypeStr].join(",");
        const uploadProps = {
            name: 'uploadProjectFile',
            action: '/_upload/new?type=' + fileTypeStr,
            beforeUpload: this.beforeUpload,
            onChange: this.handleChange,
            onRemove: this.handleRemove
        };
        let data = this.props.projectList;
        let dataLength = data == null ? 0 : data.length;
        let projectId = "";

        let structOptions = [];
        let defaultStructSelectedValue = "";

        if (dataLength > 0) {
            projectId = data[0].projects[0].id.toString();
            let structList = data[0].projects[0].structures;
            let structDataLength = structList.length;
            for (let i = 0; i < structDataLength; i++) {
                if (fileTypeLen.length > 2) {
                    defaultStructSelectedValue = fileTypeLen[2];
                } else {
                    if (i == 0) {
                        defaultStructSelectedValue = structList[i].id.toString();
                    }
                }
                structOptions.push(
                    <Option value={structList[i].id.toString()} key={"option_struct-" + i}>
                        {structList[i].name}
                    </Option>
                );
            }
        }
        return (
            <Modal
                title="上传文件"
                visible={true}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={
                    [
                        <Button key="cancel" onClick={this.handleCancel}>取消</Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>保存</Button>
                    ]
                }
                width={500}
                heigth={400}
            >
                <Form layout="horizontal">
                    {fileType != "1" && dataLength > 0 ?
                        <FormItem label="结构物" {...formItemLayout} hasFeedback>
                            {getFieldDecorator('structureSelected', {
                                rules: [{ required: true, message: '请选择结构物' }],
                                initialValue: defaultStructSelectedValue
                            })(

                                <Select
                                    id="structureSelected"
                                    placeholder="结构物筛选"
                                    onChange={this.handleSelectedChange}
                                    disabled={fileTypeLen.length > 2 ? true : false}
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) => {
                                        const { children } = option.props;
                                        return (
                                            children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                            PinyinHelper.isPinyinMatched(children, input)
                                        );
                                    }}
                                >
                                    {structOptions}
                                </Select>
                            )}
                        </FormItem> : null
                    }
                    <FormItem label="文件" {...formItemLayout} hasFeedback>
                        <Upload {...uploadProps} fileList={this.state.fileList}>
                            <Button><Icon type="upload" />点击上传</Button>
                        </Upload>
                    </FormItem>
                    <FormItem style={{ paddingLeft: 50 }}>
                        <Tag>{content}</Tag>
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    const { global } = state;

    return {
        resourceRoot: global.resourceRoot
    }
}

export default connect(mapStateToProps)(createForm({})(UploadFilesModal))