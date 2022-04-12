
'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Input, Select, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ImageCropper } from '@peace/components';
import { RouteRequest } from '@peace/utils';
import { RouteTable } from '$utils';
import { createPointsImg, modifyPointsImg, cleanUpTrashImg } from '../../actions/2d/station-deploy';
import style from './style.css';

const FormItem = Form.Item;
const Option = Select.Option;
const Default_IMG_SRC = '/assets/images/wholeView/dataflow.jpg'

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
};
class UploadImgModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: null,
            trash: []
        }
    }

    formRef = React.createRef();

    handleOk = () => {
        const { structId, dispatch } = this.props;
        const form = this.formRef.current;

        form.validateFields().then(values => {

            const heatmap = Object.assign({}, values);
            const params = Object.assign({}, { heatmap: heatmap, model: '2D' });

            if (this.props.imgInfo) {
                dispatch(modifyPointsImg(this.props.imgInfo.id, params)).then(action => {
                    if (action.success) this.props.uploadPointsImgSuccess();
                });
            } else {
                dispatch(createPointsImg(this.props.structId, params)).then(action => {
                    if (action.success) this.props.uploadPointsImgSuccess();
                });
            }
        })
    }

    handleCancel = () => {
        const { closeUploadPointsImgModal } = this.props;
        this.cleanUpTrash(true);
        closeUploadPointsImgModal();
        this.setState({ fileName: null })
    }
    checkName = (rule, value, callback) => {
        if (!/^[\w\u4e00-\u9fa5]+$/gi.test(value)) {
            callback('不能包含特殊字符');
        } else {
            callback();
        }
    }
    cleanUpTrash = (cancel) => {
        const { trash, fileName } = this.state;
        let $delete = cancel && fileName ? trash.concat([fileName]) : trash;

        if ($delete.length > 0) {
            cleanUpTrashImg($delete).then(_ => {
            }, err => {
            });
        }
    }
    showModal = () => {
        this.setState({ visible: true })
    }
    handleModalOk = (fd) => {
        const form = this.formRef.current;
        RouteRequest.post(RouteTable.resourceUpload, fd).then(res => {
            form.setFieldsValue({ portrait: res.filename });

            this.setState({ fileName: res.filename })
        })
        this.setState({ visible: false })
    }
    handleModalCancel = () => {
        this.setState({ visible: false })
    }

    render() {
        const imgInfo = this.props.imgInfo;
        let imgUrl = "";
        let imgName = "";
        let imgType = null;
        if (imgInfo != null) {
            imgUrl = imgInfo.portrait;
            imgName = imgInfo.name;
            imgType = imgInfo.type.id;
        }
        const uploadProps = {
            name: 'uploadPointsImg',
            action: '/_upload/new',
            multiple: false,
            showUploadList: false,
            beforeUpload: file => {
                const extNames = file.name.split('.');
                let isImg = false;
                if (extNames.length > 0) {
                    isImg = extNames[extNames.length - 1].toLowerCase();
                }
                if (isImg != "jpg" && isImg != "png") {
                    message.error('只能上传图片文件!');
                }
                const isLt1M = file.size / 1024 / 1024 < 1;
                if (!isLt1M) {
                    message.error('文件必须小于1MB!');
                }
                return isImg && isLt1M;
            },
            onChange: info => {
                if (info.file.status === 'error' && info.file.error.status == 400) {
                    message.error('必须为图片格式');
                }
                if (info.file.status === 'error' && info.file.error.status == 400) {
                    message.error('必须为图片格式');
                }
                if (info.file.status === 'done') {
                    const { trash, fileName } = this.state;
                    this.setState({ fileName: info.file.response.filename, trash: fileName ? trash.concat([fileName]) : trash });
                    imgUrl = '';
                }
            }
        };

        let imgSrc = Default_IMG_SRC;
        
        if (this.state.fileName) {
            imgSrc = `${this.state.fileName}`;
        } else {
            if (imgUrl != "") imgSrc = `${imgUrl}`;
        }

        let disablWhole = false;
        let { heatMaps } = this.props
        if (imgInfo && imgInfo.type.id == 1) {
            disablWhole = false;
        } else {
            disablWhole = heatMaps.some(h => h.type.id == 1);
        }

        return (<Modal
            title="添加布设图"
            visible={true}
            maskClosable={false}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[<Button key="cancel" onClick={this.handleCancel}>取消</Button>,
            <Button key="submit" type="primary" loading={this.props.isRequesting} onClick={this.handleOk}>确定</Button>]}
            width={500}
            heigth={800}>
            <Form ref={this.formRef} layout="horizontal" id={"infoLayout"}>
                <FormItem
                    key="name"
                    name="name"
                    label={!this.state.disabled ? '名称:' : ''}
                    rules={[{ required: true, max: 10, message: '不能为空，最多为10个字符' },
                    { validator: this.checkName }]}
                    initialValue={imgName}
                    {...formItemLayout}>
                    <Input placeholder="不能为空，不能包含特殊字符，最多为10个字符" id="imgName" />
                </FormItem>
                <FormItem
                    key="typeId"
                    name="typeId"
                    label={!this.state.disabled ? '类别:' : ''}
                    rules={[{ required: true, message: '' }]}
                    initialValue={imgType == null ?
                        disablWhole ? "2" : "1"
                        : imgType.toString()}
                    {...formItemLayout}>
                    <Select id="imgType" onChange={this.handleSelectChange} >
                        <Option value="1" disabled={disablWhole}>整体</Option>
                        <Option value="2">截面</Option>
                    </Select>
                </FormItem>
                <FormItem
                    label={!this.state.disabled ? '示意图:' : ''}
                    name="portrait"
                    key="portrait"
                    rules={[{ required: true, message: "请上传图片" }]}
                    initialValue={imgUrl}
                    {...formItemLayout}>
                    <div className="image-upload" style={{ marginTop: '20px' }}>
                        <ImageCropper
                            title="请选择图片"
                            visible={this.state.visible}
                            handleCropperOk={this.handleModalOk}
                            handleCancel={() => {
                                this.setState({ visible: false })
                            }}
                            originalImage={this.state.fileName ? `${this.state.fileName}` : imgUrl != "" ? `${imgUrl}` : ""}
                        />
                        {/* <Modal
                            maskClosable={false}
                            title="请选择图片"
                            visible={this.state.visible}
                            width='50%'
                            footer={null}
                            closable={false}>
                            <ImageCropper key={Math.random()}
                                handleCropperOk={this.handleModalOk}
                                handleCancel={this.handleModalCancel}
                                originalImage={this.state.fileName ? `${this.props.apiRoot}/${this.state.fileName}` : imgUrl != "" ? `${this.props.apiRoot}/${imgUrl}` : ""}
                                imageId="2dImg"
                                noCompress={true}
                            />
                        </Modal> */}
                        {<img src={imgSrc} className={style['thumbnail-img']} alt='' />}
                        <div onClick={this.showModal} className={style['thumbnail']}>
                            <PlusOutlined className={style['plus']} />
                        </div >
                    </div>
                </FormItem>
            </Form>
        </Modal>)
    }
}

function mapStateToProps(state) {
    const { stationDeploy, global } = state;
    return {
        isRequesting: stationDeploy.isSaving,
        apiRoot: global.apiRoot
    }
}

export default connect(mapStateToProps)(UploadImgModal);
