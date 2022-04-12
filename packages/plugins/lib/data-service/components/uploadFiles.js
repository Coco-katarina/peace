/**
 * Created by zmh on 2017/6/21.
 */
'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Select, Button, Upload, message } from 'antd';
import { PinyinHelper } from '@peace/utils';
import moment from 'moment';
import { Upload as Upload_ } from '@peace/components'

const { Option } = Select



const UploadFiles = props => {
    const { dispatch, actions, projectList = [], strucList, closeUploadFilesModal, fileTypeId, user } = props
    const { dataService } = actions
    const [form] = Form.useForm();

    const fileTypeStr = fileTypeId == "1" ? "project" : fileTypeId == "2" ? "report" : "data";

    return (
        <Modal
            title="上传文件"
            visible={true}
            onOk={() => {
                form.validateFields().then(v => {
                    
                    const { uploadProjectFile, structureSelected } = v;
                    const file = uploadProjectFile[0];
                   
                    let projectId = projectList.length > 0 ?  projectList[0].projects[0].id : null;
                       
                    let fileInfo = {
                        name: file.name, // {string} 文件名
                        ext: file.name.split('.').pop(), // {string} 文件扩展名
                        typeId: fileTypeId, // {number} 文件类型id，文件类型：{项目文件, 报表文件, 数据文件}
                        link: file.storageUrl, // {string} 文件路径编码
                        size: file.size, // {number} 文件大小，默认单位：B
                        time: moment().format('YYYY-MM-DD HH:mm:ss'), // {datetimeString} 文件创建时间
                        extra: fileTypeId == '1' ? {
                            "projectId": projectId
                        } : fileTypeId == '2' ? {
                            "structureId": structureSelected,
                            "reportConfirmState": false
                        } : {
                            "structureId": structureSelected
                        },
                    }
                    dispatch(dataService.uploadFile(user.id, fileInfo))
                        .then(res => {
                            if (res.success) {
                                closeUploadFilesModal(true);
                            }
                        }, error => {
                            dispatch(dataService.removeFile(fileInfo.link));
                            closeUploadFilesModal();
                        });
                })
            }}
            onCancel={() => { closeUploadFilesModal() }}
            width={500}
            heigth={400}
        >
            <Form layout="horizontal" form={form}>
                {
                    fileTypeId != '1' && <Form.Item
                    label="结构物"
                    name="structureSelected"
                    rules={[{ required: true, message: '请选择结构物!' }]}
                >
                    <Select
                        placeholder="请选择结构物"
                        // disabled={fileTypeLen.length > 2 ? true : false}
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) => {
                            const { children } = option.props;
                            return (
                                PinyinHelper.isSearchMatched(children, input)
                            );
                        }}
                    >
                        {
                            strucList.map((k, i) => <Option key={i} value={k.id}>{k.name}</Option>)
                        }
                    </Select>
                </Form.Item>
                }
                
                <Form.Item
                    label="文件"
                    name="uploadProjectFile"
                    rules={[{ required: true, message: '请上传文件!' }]}
                >
                    <Upload_
                        uploadType={fileTypeStr}
                        maxFilesNum={1}
                        maxFileSize={9}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

function mapStateToProps (state) {
    const { global, auth } = state;

    return {
        resourceRoot: global.resourceRoot,
        actions: global.actions,
        user: auth.user
    }
}

export default connect(mapStateToProps)(UploadFiles)