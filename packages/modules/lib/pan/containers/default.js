import React, { Component } from 'react';
import {
    Row, Col, Breadcrumb, Icon, Table, Input, Button, Card, Tree, Modal, Progress, Upload, Spin, message,
    Select, Form, Tag, Divider
} from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { getFileList, deleteFile, collectedFile, removeFile } from '../actions/fileInfo';
import { getHdfsDirStats, getProjectList, getStructs, getCedian } from '../actions/data-file';
import NewFolderModal from '../components/newFolderModal';
import UploadFilesModal from '../components/uploadFilesModal';
import BatchDownloadFilesModal from '../components/batchDownloadFilesModal';
import DataFileList from './data-file-list';
import { AuthorizationCode, RouteTable } from '$utils';
import PerfectScrollbar from 'perfect-scrollbar';
import './style.css';
import { PinyinHelper } from '@peace/utils';
//import uuid from 'node-uuid';
import { UploadOutlined, StarFilled, StarOutlined, SearchOutlined, FileOutlined, FolderOutlined, FolderOpenOutlined } from '@ant-design/icons';

// const path = require('path');
const FormItem = Form.Item;
const Search = Input.Search;
const Option = Select.Option;
const { DirectoryTree } = Tree;
var filterSet = { fileName: null, userName: null, updateTime: null }

class Default extends Component {
    constructor(props) {
        super(props);
        //this.tmpDir = uuid.v1();
        this.formRef = React.createRef();
        this.state = {
            filterFunc: {},
            selectNodeKey: [],
            selectParentNodeKeyTitle: ["", ""],
            selectNodeTitle: "",
            expandedKeys: ['pan', 'doc'],
            modal: "",
            uploadFilesModal: "",
            currSelectNodeKey: [],
            manmadeUploadModal: false,
            cedian: [],
            uploadInfo: '',
            structId: '',
            factorId: '',
            token: '',
            color: 'red',
            isUploading: false,
            hdfsNodeSelected: false,
            sName: '',
            sorter: {
                field: 'updateTime',
                order: 'descend'
            },
            batchDownloadFilesModalVisible: false,
            batchDownloadIframeSrc: null,
            dataPanSearchValue: '',
        }
    }

    UNSAFE_componentWillMount() {
        this.props.dispatch(getHdfsDirStats(this.props.user.orgId));
        this.props.dispatch(getFileList(this.props.user.id));
        this.props.dispatch(getProjectList(this.props.user.id));
        this.props.dispatch(getStructs(this.props.user.orgId)).then(res => {
            res.payload.data.length > 0 ?
                this.props.dispatch(getCedian(res.payload.data[0].id)) : ''
        });
    }
    componentDidMount() {
        new PerfectScrollbar('#ulId');
        new PerfectScrollbar('#treeId');
    }
    componentDidUpdate() {
        // Ps.update(document.getElementById('ulId'));
        // Ps.update(document.getElementById('treeId'));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.cedian && nextProps.cedian.length > 0) {
            this.setState({ cedian: nextProps.cedian })
        }
    }

    newFolderClick = () => {
        this.setState({ modal: <NewFolderModal closeFolderModal={this.closeFolderModal} /> })
    }
    closeFolderModal = () => {
        this.setState({ modal: '' })
    }
    handleInputChange = e => {
        if (e.target.value != null) {
            const value = e.target.value;
            let func = (ep => (s => (s.fileName).search(ep) > -1))(value);
            filterSet.fileName = func;
            func = (ep => (s => (s.userName).search(ep) > -1))(value);
            filterSet.userName = func;
            func = (ep => (s => (s.updateTime).search(ep) > -1))(value);
            filterSet.updateTime = func;
        } else {
            filterSet.fileName = null;
            filterSet.userName = null;
            filterSet.updateTime = null;
        }
        this.setState({ filterFunc: filterSet })
    }

    uploadFile = (selectedNodeKeys, residualCapacity) => {
        let fileTypeId = selectedNodeKeys.split('-')[1];
        let dataLength = this.props.projectList == null ? 0 : this.props.projectList.length;
        if (dataLength == 0 && fileTypeId == "1")
            return message.warning('无项目信息，先配置项目！');
        let structDataLength = this.props.structList == null ? 0 : this.props.structList.length;
        if (structDataLength == 0 && fileTypeId != "1")
            return message.warning('无结构物信息，先配置结构物！');
        this.setState({
            uploadFilesModal: <UploadFilesModal projectList={this.props.projectList}
                structList={this.props.structList} resourceRoot={this.props.resourceRoot}
                userId={this.props.user.id} orgId={this.props.user.orgId} fileTypeId={selectedNodeKeys}
                closeUploadFilesModal={this.closeUploadFilesModal}
                residualCapacity={residualCapacity} />
        })
    }
    closeUploadFilesModal = () => {
        this.setState({ uploadFilesModal: '' })
    }
    onExpand = (expandedKeys, info) => {
        this.setState({ expandedKeys });
    }

    onSelect = (selectedKeys, info) => {
        if (selectedKeys.length > 0) {
            if (selectedKeys.some(s => s == 'structure_search')) return;
            let expandedKeys = this.state.expandedKeys.filter(e => e != selectedKeys[0]);
            if (selectedKeys.some(s => ['pan', 'doc', 'data'].some(k => s == k))) {
                if (expandedKeys.length == this.state.expandedKeys.length) {
                    expandedKeys = expandedKeys.concat(selectedKeys);
                }

                this.setState({ expandedKeys });
                return;
            }

            if (selectedKeys.some(s => s.indexOf('structure_') != -1)) {
                const stid = selectedKeys[0].split('_')[1];
                const st = this.props.structList.filter(s => s.id == stid);
                this.setState({
                    hdfsNodeSelected: true,
                    currSelectNodeKey: selectedKeys,
                    selectNodeKey: [selectedKeys[0]],
                    sName: st.length > 0 ? st[0].name : ''
                });
                return;
            }

            this.setState({
                hdfsNodeSelected: false,
            });


            if (selectedKeys.some(s => ['0-1', '0-2', '0-3'].some(k => s == k))) {
                if (expandedKeys.length == this.state.expandedKeys.length) {
                    expandedKeys = expandedKeys.concat(selectedKeys);
                }
                this.setState({ expandedKeys });
            }

            let selectNodeKeys = selectedKeys[0].split('-');
            let nodeText = info.selectedNodes[0].title;
            let selectParentNodeKeyTitle = selectNodeKeys[1] == "1" ? "应用文件" : selectNodeKeys[1] == "2" ? "报表文件" : "数据文件";
            if (selectNodeKeys.length > 2) {
                this.setState({
                    currSelectNodeKey: ["0-" + selectNodeKeys[1]],
                    selectNodeKey: [selectNodeKeys[2]],
                    selectNodeTitle: nodeText,
                    selectParentNodeKeyTitle: [selectNodeKeys[1], selectParentNodeKeyTitle]
                })
            } else {
                this.setState({
                    currSelectNodeKey: selectedKeys,
                    selectNodeKey: [null],
                    selectNodeTitle: "",
                    selectParentNodeKeyTitle: [selectNodeKeys[1], selectParentNodeKeyTitle]

                })
            }
        }
    }
    collectedNodeOnClick = (fileTypeId, nodeKey, nodeText) => {
        let selectParentNodeKeyTitle = fileTypeId.toString() == "1" ? "应用文件" : fileTypeId.toString() == "2" ? "报表文件" : "数据文件";
        this.setState({
            selectNodeKey: [nodeKey.toString()],
            selectNodeTitle: nodeText,
            selectParentNodeKeyTitle: [fileTypeId.toString(), selectParentNodeKeyTitle],
            hdfsNodeSelected: false
        })
    }

    handleCollected = (selectedNodeKeys, flag) => {
        let _this = this;
        this.props.dispatch(collectedFile(_this.props.user.id, selectedNodeKeys, flag))
            .then(_ => _this.props.dispatch(getFileList(_this.props.user.id)));
    }
    deleteClick = (file) => {
        const _this = this;
        Modal.confirm({
            title: '删除文件',
            content: '确定删除文件【' + file.name + '】吗？',
            onOk() {
                _this.props.dispatch(deleteFile(file.id, null))
                    .then(_ => {
                        if (_.type == 'DELETE_FILE_SUCCESS')
                            _this.props.dispatch(removeFile(file.link, file.name));
                        _this.props.dispatch(getFileList(_this.props.user.id));
                        if (_this.state.currSelectNodeKey.length == 0) {
                            _this.setState({
                                selectNodeKey: [null],
                                selectParentNodeKeyTitle: [1, "应用文件"],
                                selectNodeTitle: "",
                            })
                        } else {
                            let currSelectNodeKey = _this.state.currSelectNodeKey[0];
                            let currSelectType = currSelectNodeKey.split("-")[1];
                            let selectParentNodeKeyTitle = currSelectType == "1" ? "应用文件" : currSelectType == "2" ? "报表文件" : "数据文件";
                            _this.setState({
                                selectNodeKey: [null],
                                selectParentNodeKeyTitle: [currSelectType, selectParentNodeKeyTitle],
                                selectNodeTitle: ""
                            })
                        }

                    });
            },
            onCancel() {
            },
        });
    }
    childTree = (projectCollectedArr, collectedProjectFolderIdNodekey, selectProjectIdName, targets, dataSource, fileTypeId, i, usedCapacity) => {
        const resources = this.props.user.resources;
        const downloadFileRes = resources.length == 0 ? false :
            resources.indexOf(AuthorizationCode.DownloadFile) > -1 ? true : false;
        const deleteFileRes = resources.length == 0 ? false :
            resources.indexOf(AuthorizationCode.DeleteFile) > -1 ? true : false;
        let childTreeNode = [];
        let capacity = 0;
        for (let j = 0; j < targets.length; j++) {
            childTreeNode.push({
                key: '0-' + fileTypeId + '-' + targets[j].id,
                title: targets[j].name,
                icon: <FileOutlined />
            });
            let fileDatas = targets[j].files;
            for (let k = 0; k < fileDatas.length; k++) {
                capacity += fileDatas[k].size;
            }
            if (targets[j].starred) {
                collectedProjectFolderIdNodekey.push(('0-' + fileTypeId + '-' + targets[j].id).toString());
                let fileType = "";
                switch (fileTypeId) {
                    case 1:
                        fileType = "应用文件";
                        break;
                    case 2:
                        fileType = "报表文件";
                        break;
                    case 3:
                        fileType = "数据文件";
                        break;
                }
                projectCollectedArr.push(
                    <div style={{ align: 'center', padding: 10, cursor: 'pointer' }}
                        key={"percent" + fileTypeId + targets[j].id}
                        onClick={() => {
                            this.collectedNodeOnClick(fileTypeId, targets[j].id, targets[j].name)
                        }}>
                        <StarFilled style={{ color: 'orange', marginRight: 5 }} />
                        {targets[j].name + '/' + fileType}
                    </div>
                )
            }
            if (i == 0 && j == 0) {
                selectProjectIdName.push(targets[j].id);
                selectProjectIdName.push(targets[j].name);
            }
            if (fileTypeId.toString() == this.state.selectParentNodeKeyTitle[0] &&
                targets[j].id.toString() == this.state.selectNodeKey[0]
                || (i == 0 && j == 0 && this.state.selectNodeKey.length == 0)
                || (this.state.selectNodeKey[0] == null && fileTypeId.toString() == this.state.selectParentNodeKeyTitle[0])) {
                let fileData = targets[j].files;
                for (let k = 0; k < fileData.length; k++) {
                    let Icon = "";
                    switch (fileData[k].ext) {
                        case ".txt":
                            Icon = <i className="action sc icon-geshi_wendangtxt" style={{ fontSize: 32 }}></i>
                            break;
                        case ".doc":
                        case ".docx":
                            Icon = <i className="action sc icon-geshi_wendangdoc"
                                style={{ fontSize: 32, color: "#2A5699" }}></i>
                            break;
                        case ".pdf":
                            Icon = <i className="action sc icon-geshi_wendangpdf"
                                style={{ fontSize: 32, color: "#E01515" }}></i>
                            break;
                        case ".xls":
                        case ".xlsx":
                            Icon = <i className="action sc icon-geshi_wendangxls"
                                style={{ fontSize: 32, color: "#1F7246" }}></i>
                            break;
                        case ".dwg":
                            Icon = <i className="action sc icon-dwggeshi"
                                style={{ fontSize: 32, color: "#010101" }}></i>
                            break;
                        case ".png":
                            Icon = <i className="action sc icon-geshi_tupianpng"
                                style={{ fontSize: 32, color: "#88C057" }}></i>
                            break;
                        case ".jpg":
                            Icon = <i className="action sc icon-geshi_tupianjpg"
                                style={{ fontSize: 32, color: "#26B99A" }}></i>
                            break;
                        case '.mp4':
                            Icon = <i className="action sc icon-geshi_shipinmp"
                                style={{ fontSize: 32, color: "#26B99A" }}></i>
                            break;
                    }

                    let size = fileData[k].size + 'B';
                    if (parseFloat(fileData[k].size).toString() != "NaN") {
                        if (fileData[k].size >= 1073741824)
                            size = (fileData[k].size / 1024 / 1024 / 1024).toFixed(2) + 'G'
                        else if (fileData[k].size < 1073741824 && fileData[k].size >= 1048576)
                            size = (fileData[k].size / 1024 / 1024).toFixed(2) + 'M'
                        else if (fileData[k].size < 1048576 && fileData[k].size >= 1024)
                            size = (fileData[k].size / 1024).toFixed(2) + 'KB'
                        else
                            size = fileData[k].size + 'B'
                    }
                    if (downloadFileRes || deleteFileRes) {
                        let fileLinkArr = fileData[k].link.split('/');
                        let fileLink = fileData[k].link;
                        if (fileLinkArr.length) {
                            let fileName = fileLinkArr[fileLinkArr.length - 1];
                            fileLink = '';
                            for (let i = 0; i < fileLinkArr.length - 1; i++) {
                                fileLink += fileLinkArr[i] + '/'
                            }
                            fileLink += encodeURIComponent(fileName);
                        }
                        dataSource.push({
                            key: fileData[k].id,
                            fileType: <span>{Icon}</span>,
                            fileName: fileData[k].name,
                            beObject: targets[j].name,
                            fileSize: size,
                            userName: fileData[k].upUser,
                            updateTime: fileData[k].time,
                            operation: <span>
                                {downloadFileRes ?
                                    <a href={"/_file-server/" + fileLink +
                                        "?filename=" + encodeURIComponent(fileData[k].name) + fileData[k].ext}>下载</a> : null}
                                {downloadFileRes && deleteFileRes ? <Divider type="vertical" /> : null}
                                {deleteFileRes ?
                                    <a onClick={() => { this.deleteClick(fileData[k]) }}>删除</a>
                                    : null}
                            </span>
                        })
                    } else {
                        dataSource.push({
                            key: fileData[k].id,
                            fileType: <span>{Icon}</span>,
                            fileName: fileData[k].name,
                            beObject: targets[j].name,
                            fileSize: size,
                            userName: fileData[k].upUser,
                            updateTime: fileData[k].time
                        })
                    }
                }
            }
        }
        if (usedCapacity.length == 0) {
            usedCapacity.push(capacity);
        } else if (usedCapacity.length == 1) {
            let c = usedCapacity[0];
            usedCapacity[0] = c + capacity;
        }
        return childTreeNode;
    }
    fileTree = (projectCollectedArr, collectedProjectFolderIdNodekey, treeArr, selectProjectIdName, data, dataSource, usedCapacity) => {
        let dataLength = data == null ? 0 : data.length;
        for (let i = 0; i < dataLength; i++) {
            if (data[i].fileTypeId > 3) continue;

            let targets = data[i].targets;
            let childTree = this.childTree(projectCollectedArr, collectedProjectFolderIdNodekey, selectProjectIdName, targets, dataSource, data[i].fileTypeId, i, usedCapacity);
            treeArr.push({
                key: "0-" + data[i].fileTypeId,
                title: data[i].fileTypeName,
                icon: this.treeIcon,
                children: childTree
            })
        }
    }

    handleClick = () => {
        this.setState({ manmadeUploadModal: true })
    }

    handlemanmadeCancel = () => {
        this.setState({ manmadeUploadModal: false, uploadInfo: '' })
    }

    handlemanmadeOK = () => {
        this.setState({ manmadeUploadModal: false })
    }

    handleDownloadClick = () => {
        const form = this.formRef.current;
        form.validateFields().then(values => {
            const structName = values.struct;
            const structId = this.props.structList.find(s => s.name == structName).id;
            let ismanMadeCount = 0;

            this.props.cedian && this.props.cedian.forEach(factor => {
                let ismanMade = factor.groups && factor.groups.reduce((p, n) => {
                    n.stations.map(s => {
                        if (s.manualData === true) {
                            p.push(s);
                        }
                    })
                    return p;
                }, []).length > 0;
                if (!ismanMade) {
                    ismanMadeCount++;
                }
            });
            if (ismanMadeCount == this.props.cedian.length) {
                message.error('该结构物下没有配置人工数据上传测点');
            } else {
                const user = JSON.parse(sessionStorage.getItem('user'));
                if (user == null) {
                    message.error("")
                }
                const token = user.token;
                window.open(RouteTable.download.replace('{structId}', structId).replace('{structName}', structName) + `&token=${token}`, '_parent');
            }
        })
        this.setState({ visible: false })
    }

    renderStructs = () => {
        return this.props.structList ? this.props.structList.map(s => {
            return <Option key={s.name}>{s.name}</Option>
        }) : ''
    }

    renderFactors = () => {
        const { cedian } = this.state;
        if (cedian.length > 0) {
            return cedian.map(s => {
                return <Option key={s.factorName}>{s.factorName}</Option>
            })
        }
    }


    handleSelectStruct = (value) => {
        const structId = this.props.structList.find(s => s.name == value).id
        this.props.dispatch(getCedian(structId)).then(actions => {
            this.setState({ cedian: actions.payload.data }, () => {
                const form = this.formRef.current;
                form.setFieldsValue({ factor: actions.payload.data && actions.payload.data.length > 0 ? actions.payload.data[0].factorName : '' })
            })
        })
    }

    renderForm = () => {
        const form = this.formRef.current;
        const formItems = [];
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        }

        formItems.push(
            <FormItem key="struct" label="结构物："  {...formItemLayout} name='struct'
                rules={[{ required: true, message: '不能为空!' }]}
                initialValue={this.props.structList ? this.props.structList.length > 0 ? this.props.structList[0].name : '' : ''}
                placeholder={'请选择结构物'}
            >
                <Select
                    onChange={this.handleSelectStruct}
                    style={{ width: 200 }}
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
                    {this.renderStructs()}
                </Select>
            </FormItem>
        );

        formItems.push(
            <FormItem key="uploadType" label="上传类型：" {...formItemLayout} name='uploadType'
                rules={[{ required: true, message: '不能为空!' }]}
                initialValue={'template'}
                placeholder={'请选择上传类型'}
            >
                <Select
                    style={{ width: 200 }}>
                    <Option value='template'>多监测因素上传</Option>
                    <Option value='jtcxData'>金坛测斜仪数据上传</Option>
                    <Option value='jtszData'>金坛电子水准仪数据上传</Option>
                    <Option value='fscxData' disabled>飞尚测斜仪数据上传</Option>
                </Select>
            </FormItem>
        );

        if (form)
            form.getFieldValue("uploadType") == 'template' ? null :
                formItems.push(
                    <FormItem key="factor" label="监测因素：" {...formItemLayout} name='factor'
                        rules={[{ required: true, message: '不能为空!' }]}
                        initialValue={this.state.cedian.length > 0 ? this.state.cedian[0].factorName : ''}
                        placeholder={'请选择监测因素'}
                    >
                        <Select
                            style={{ width: 200 }}>
                            {this.renderFactors()}
                        </Select>
                    </FormItem>
                );

        return formItems;
    }
    renderUploadTypeButton = () => {
        const form = this.formRef.current;
        const showButton = [];
        if (form) {
            const uploadProps = {
                name: 'uploadExcelFile',
                action: `/_upload/excel?structId=${this.state.structId}&factorId=${this.state.factorId}&token=${this.state.token}`,
                beforeUpload: this.beforeUpload,
                onChange: this.handleChange,
                showUploadList: false,
            };

            if (form.getFieldValue("uploadType") == 'template') {
                showButton.push(
                    <Col span={4} offset={2}>
                        <Button type="primary" style={{ marginLeft: 25, marginTop: 20 }} onClick={this.handleDownloadClick}>模板下载</Button>
                    </Col>
                );
            } else if (form.getFieldValue("uploadType") == 'jtcxData') {
                showButton.push(<Col span={4} offset={2}></Col>);
                uploadProps.action = `/_upload/excel/jtcx?structId=${this.state.structId}&factorId=${this.state.factorId}&token=${this.state.token}`;
            } else if (form.getFieldValue("uploadType") == 'jtszData') {
                showButton.push(<Col span={4} offset={2}></Col>);
                uploadProps.action = `/_upload/excel/jtsz?structId=${this.state.structId}&factorId=${this.state.factorId}&token=${this.state.token}`;
            }

            showButton.push(
                <Col style={{ marginLeft: 25, marginTop: 20 }} span={16}>
                    <Upload {...uploadProps}>
                        <Button style={{ marginLeft: 20 }} icon={<UploadOutlined />}>文件上传</Button>
                    </Upload>
                    <p style={{ marginLeft: 25, marginTop: 20 }}>
                        {
                            this.state.uploadInfo == '' ? '' :
                                <Tag color={this.state.color} >{this.state.uploadInfo}</Tag>
                        }
                    </p>
                </Col>
            )
        }
        return showButton;
    }

    beforeUpload = async (file) => {
        const ext = [".xlsx", ".xls", ".dat"]

        let extname = file.name.split('.').pop();
        extname = extname ? '.' + extname : 'unknown';
        extname = extname.toLowerCase();
        let msgFlag = true;
        if (ext.indexOf(extname) < 0) {
            msgFlag = false;
            this.setState({ uploadInfo: '文件格式需是 ：' + ext.join(","), color: 'red' })
        }

        const form = this.formRef.current;
        let values = await form.validateFields()
        const structName = values.struct;
        const structId = this.props.structList.find(s => s.name == structName).id;
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user == null) {
            message.error("")
        }
        const token = user.token;

        if (values.uploadType == 'template') {
            this.setState({ structId: structId, factorId: null, token: token })
        }
        else {
            const factorName = values.factor;
            const factorId = this.props.cedian.find(s => s.factorName == factorName).factorId;

            let groups = this.props.cedian.find(s => s.factorName == factorName).groups;
            let ismanMade = groups ? groups.length > 0 ? true : false : false;
            if (ismanMade) {

                this.setState({ structId: structId, factorId: factorId, token: token })
            } else {
                msgFlag = false;
                this.setState({ uploadInfo: '该监测因素下没有配置人工数据上传测点', color: 'red', isUploading: false })
            }
        }

        const isLt = file.size / 1024 / 1024 < 2;
        if (!isLt) {
            msgFlag = false;
            this.setState({ uploadInfo: '文件大小必须小于2MB!', color: 'red', isUploading: false })
        }
        if (msgFlag) {
            this.setState({ isUploading: true })
        }
        return msgFlag;
    }

    handleChange = (info) => {
        if (info.file.status === 'done') {
            const successInfo = `${info.file.name} 文件上传成功`
            this.setState({ uploadInfo: successInfo, color: 'green', isUploading: false })
        } else if (info.file.status === 'error') {
            const errorInfo = info.file.response;
            this.setState({ uploadInfo: errorInfo, color: 'red', isUploading: false })
        }
    }

    onTableChange = (pagination, filters, sorter) => {
        this.setState({
            sorter: {
                field: sorter.field,
                order: sorter.order
            }
        });
    }

    closeBatchDownloadFilesModal = () => {
        this.setState({
            batchDownloadFilesModalVisible: false
        })
    }

    openBatchDownloadFilesModal = (e) => {
        e.stopPropagation();
        this.setState({
            batchDownloadFilesModalVisible: true
        })
    }

    batchDownload = (src) => {
        this.setState({ batchDownloadIframeSrc: src })
    }

    dataPanSearch = (e) => {
        this.setState({ dataPanSearchValue: e.target.value })
    }

    treeIcon = (p) => {
        return p.expanded ? <FolderOpenOutlined /> : <FolderOutlined />
    }

    render() {
        const resources = this.props.user.resources;
        const uploadFileRes = resources.length == 0 ? "none" :
            resources.indexOf(AuthorizationCode.UploadFile) > -1 ? 'inline' : 'none';
        const downloadFileRes = resources.length == 0 ? false :
            resources.indexOf(AuthorizationCode.DownloadFile) > -1 ? true : false;
        const deleteFileRes = resources.length == 0 ? false :
            resources.indexOf(AuthorizationCode.DeleteFile) > -1 ? true : false;
        const columns = [
            {
                title: '',
                dataIndex: 'fileType',
                key: 'fileType',
                width: '4%'
            },
            {
                title: '文件名',
                dataIndex: 'fileName',
                key: 'fileName',
                width: '20%'
            },
            {
                title: '归属',
                dataIndex: 'beObject',
                key: 'beObject',
                width: '20%'
            },
            {
                title: '大小',
                dataIndex: 'fileSize',
                key: 'fileSize',
                width: '11%'
            }, {
                title: '更新人',
                dataIndex: 'userName',
                key: 'userName',
                width: '10%'
            }, {
                title: '更新时间',
                dataIndex: 'updateTime',
                key: 'updateTime',
                width: '15%',
                sorter: (a, b) => moment(a.updateTime) - moment(b.updateTime),
                sortOrder: this.state.sorter.field == 'updateTime' ? this.state.sorter.order : 'descend'
            }];
        if (downloadFileRes || deleteFileRes) {
            columns.push({
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                width: '10%'
            })
        }
        const projectCollectedArr = [];
        const treeArr = [];
        const data = this.props.fileList;
        let dataSource = [];
        const selectProjectIdName = [];
        const collectedProjectFolderIdNodekey = [];
        const usedCapacity = [];
        this.fileTree(projectCollectedArr, collectedProjectFolderIdNodekey, treeArr, selectProjectIdName, data, dataSource, usedCapacity);

        let filterData = dataSource;
        let dataPush = [];
        let keyArr = [];
        let flag = false;
        Object.keys(this.state.filterFunc).forEach(key => {
            const filter = this.state.filterFunc[key];
            filterData = dataSource;
            if (filter != null) {
                flag = true;
                filterData = filterData.filter(filter)
                if (filterData.length > 0) {
                    filterData.map(s => {
                        if (keyArr.indexOf(s.key) == -1) {
                            keyArr.push(s.key);
                            dataPush.push(s);
                        }
                    })
                }
            }
        })
        dataSource = flag ? dataPush : dataSource;
        const pagination = {
            total: dataSource.length,
            showSizeChanger: true,
            defaultPageSize: 10,
            showQuickJumper: true,
            onShowSizeChange(current, pageSize) {
            },
            onChange(current) {
            },
        };
        let idName = selectProjectIdName.length > 0 ? selectProjectIdName : ["", ""];
        let currTreeNode = this.state.selectParentNodeKeyTitle[0] != undefined ? this.state.selectParentNodeKeyTitle[0].length > 0 ?
            ("0-" + this.state.selectParentNodeKeyTitle[0]).toString() : "0-1"
            : "0-1";


        let hasUsedCapacity = ((usedCapacity.length == 0 ? 0 : usedCapacity[0]) + this.props.dataFileStats || 0) / 1024 / 1024 / 1024;
        const percent = hasUsedCapacity.toFixed(2) / 1000 * 100;
        const status = percent < 80 ? "normal" : "exception";
        const residualCapacity = 1000 - hasUsedCapacity;
        let isCollected = false;
        let selectedNodeKeys = this.state.selectNodeKey.length == 0 ? (currTreeNode + '-' + idName[0]).toString() :
            this.state.selectNodeKey[0] == null ? currTreeNode.toString() :
                (currTreeNode + '-' + this.state.selectNodeKey[0]).toString();
        let len = selectedNodeKeys.length;
        if (this.state.selectNodeKey.some(s => s && s.indexOf('structure_') > -1)) {
            selectedNodeKeys = this.state.selectNodeKey[0];
        } else {
            selectedNodeKeys = selectedNodeKeys.split("-")[2] == "" ? selectedNodeKeys.substring(0, len - 1) : selectedNodeKeys;
        }
        if (collectedProjectFolderIdNodekey.indexOf(selectedNodeKeys) > -1) {
            isCollected = true;
        } else {
            isCollected = false;
        }
        let collectedIcon = selectedNodeKeys.split("-").length == 2 ?
            "" : isCollected ?
                <StarFilled style={{ color: 'orange', cursor: 'pointer' }} onClick={() => {
                    this.handleCollected(selectedNodeKeys, false)
                }} />
                : <StarOutlined style={{ cursor: 'pointer' }} onClick={() => {
                    this.handleCollected(selectedNodeKeys, true)
                }} />
        const showManmadeUpload = resources.length == 0 ? "none" :
            resources.indexOf(AuthorizationCode.UploadFile) > -1 ? this.state.selectParentNodeKeyTitle[1] == "" ?
                'none' : this.state.selectParentNodeKeyTitle[1] == '数据文件' ? 'inline' : 'none' : 'none';
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user == null) {
            message.error("")
        }
        const token = user.token;

        const uploadProps = {
            name: 'uploadExcelFile',
            action: `/_upload/excel?structId=${this.state.structId}&factorId=${this.state.factorId}&token=${this.state.token}`,
            beforeUpload: this.beforeUpload,
            onChange: this.handleChange,
            showUploadList: false,
        };

        let structList = this.props.structList;
        let dataPanSearchValue = this.state.dataPanSearchValue;
        if (dataPanSearchValue) {
            structList = structList.filter(s => s.name.indexOf(dataPanSearchValue) >= 0 || PinyinHelper.isPinyinMatched(s.name, dataPanSearchValue));
        }

        let dataPan = structList.map(s => ({
            key: 'structure_' + s.id,
            title: s.name,
            isLeaf: true,
        }))
        dataPan.unshift({
            key: 'structure_search',
            title: <Search
                placeholder="搜索"
                style={{ width: 140, position: 'relative', right: 21 }}
                onChange={this.dataPanSearch}
            />,
        })
        return (
            <div>
                <Spin spinning={this.props.isRequesting}>
                    <Row type="flex">
                        <Col className="ant-col-xs-24 ant-col-sm-24 ant-col-md-5 ant-col-lg-5"
                            style={{ borderStyle: 'none solid none none', borderWidth: 0.01, borderColor: '#E9E9E9' }}>
                            <div style={{ height: '400px', position: 'relative' }} id='treeId' >
                                <Tree
                                    showIcon
                                    expandedKeys={this.state.expandedKeys}
                                    onSelect={this.onSelect}
                                    defaultSelectedKeys={[selectedNodeKeys]}
                                    selectedKeys={[selectedNodeKeys]}
                                    onExpand={this.onExpand}
                                    treeData={[{
                                        key: 'pan',
                                        title: '企业网盘',
                                        icon: this.treeIcon,
                                        children: [{
                                            key: 'doc',
                                            title: '文档中心',
                                            icon: this.treeIcon,
                                            children: treeArr
                                        }, {
                                            key: 'data',
                                            title: <span>数据盘 <Button type="primary" onClick={this.openBatchDownloadFilesModal} size='small'>批量下载</Button></span>,
                                            icon: this.treeIcon,
                                            children: dataPan
                                        }]
                                    }]}
                                />
                            </div>
                            <div style={{ margin: 3, height: '150px', position: 'relative' }} id='ulId'>
                                {projectCollectedArr.map(s => {
                                    return s
                                })}
                            </div>
                            <div style={{ margin: 3 }}>
                                <div style={{ align: 'center', padding: 10, marginTop: 30 }} key="percent">
                                    <Progress percent={percent} showInfo={false} status={status} />
                                    <span> {hasUsedCapacity.toFixed(2)}G/1000G</span>
                                </div>
                            </div>
                        </Col>
                        <BatchDownloadFilesModal
                            visible={this.state.batchDownloadFilesModalVisible}
                            closeModal={this.closeBatchDownloadFilesModal}
                            strucList={this.props.structList}
                            batchDownload={this.batchDownload}
                        />
                        <iframe src={this.state.batchDownloadIframeSrc} style={{ display: 'none' }}></iframe>
                        {
                            this.state.hdfsNodeSelected ?
                                <Col className="main-container ant-col-xs-24 ant-col-sm-24 ant-col-md-19 ant-col-lg-19">
                                    <DataFileList fileKey={Number(selectedNodeKeys.split('_')[1])} fileName={this.state.sName} />
                                </Col> :
                                <Col className="main-container ant-col-xs-24 ant-col-sm-24 ant-col-md-19 ant-col-lg-19">
                                    <Row>
                                        <Col span="24" style={{ padding: '8px 24px' }}>
                                            <Breadcrumb>
                                                <Breadcrumb.Item>{this.state.selectParentNodeKeyTitle[1] == "" ?
                                                    "应用文件" : this.state.selectParentNodeKeyTitle[1]}</Breadcrumb.Item>
                                                <Breadcrumb.Item>{selectedNodeKeys.split("-").length == 2 ?
                                                    "" : this.state.selectNodeTitle == "" ?
                                                        idName[1] : this.state.selectNodeTitle}&nbsp;{collectedIcon}
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span="24">
                                            <Button type="primary" style={{ marginLeft: 25, display: uploadFileRes }} onClick={() => {
                                                this.uploadFile(selectedNodeKeys, residualCapacity)
                                            }}>上传</Button>

                                            <Button type="primary" style={{ marginLeft: 25, display: `${showManmadeUpload}` }} onClick={this.handleClick}>人工数据上传</Button>
                                            <Modal
                                                maskClosable={false}
                                                width={800}
                                                title="人工数据上传"
                                                footer={null}
                                                visible={this.state.manmadeUploadModal}
                                                onCancel={this.handlemanmadeCancel}
                                            >
                                                <div>
                                                    <Spin spinning={this.props.isCedianRequesting}>
                                                        <Row>
                                                            <Form ref={this.formRef}>
                                                                {
                                                                    this.renderForm()
                                                                }
                                                            </Form>
                                                        </Row>
                                                    </Spin>
                                                    <Spin spinning={this.state.isUploading} >
                                                        <Row style={{ marginBottom: 16 }}>
                                                            {this.renderUploadTypeButton()}
                                                            {/* <Col span={4} offset={2}>
                                                            <Button type="primary" style={{ marginLeft: 25, marginTop: 20 }} onClick={this.handleDownloadClick}>模板下载</Button>
                                                        </Col>
                                                        <Col style={{ marginLeft: 25, marginTop: 20 }} span={16}>
                                                            <Upload {...uploadProps}>
                                                                <Button style={{ marginLeft: 20 }}><Icon type="upload" />文件上传</Button>
                                                            </Upload>
                                                            <p style={{ marginLeft: 25, marginTop: 20 }}>
                                                                {
                                                                    this.state.uploadInfo == '' ? '' :
                                                                        <Tag color={this.state.color} >{this.state.uploadInfo}</Tag>
                                                                }
                                                            </p>
                                                        </Col> */}
                                                        </Row>
                                                    </Spin>
                                                </div>
                                            </Modal>

                                            <Input id="searchInput"
                                                style={{
                                                    zIndex: 1,
                                                    float: 'right',
                                                    width: '25%',
                                                    marginRight: 25
                                                }}
                                                size="large"
                                                placeholder="文件名、更新人、更新时间" onChange={this.handleInputChange}
                                                suffix={<SearchOutlined />} />
                                        </Col>
                                    </Row>
                                    <Table dataSource={dataSource} columns={columns} style={{ padding: 8 }}
                                        pagination={pagination} onChange={this.onTableChange}
                                    />
                                    {this.state.modal}
                                    {this.state.uploadFilesModal}
                                </Col>
                        }
                    </Row>
                </Spin>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { fileList, auth, projectList, structList, dataFile, global, cedian } = state;
    let isRequesting = fileList.isFetching || projectList.isRequesting;
    return {
        user: auth.user,
        fileList: fileList.items,
        isRequestingFileList: fileList.isFetching,
        projectList: projectList.data || [],
        structList: structList.data || [],
        cedian: cedian.data || [],
        isCedianRequesting: cedian.isRequesting,
        dataFileStats: dataFile.stats,
        isRequesting: isRequesting,
        resourceRoot: global.resourceRoot
    }
}
export default connect(mapStateToProps)(Default);