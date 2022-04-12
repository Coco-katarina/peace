/**
 * Created by xueweizhu on 2017/7/13.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { AuthorizationCode } from '$utils';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const Dragger = Upload.Dragger;

class ThreeUpload extends Component {
    constructor(props) {
        super(props);
        this._structId = props.structId;
    }

    _onUploadDone = (fileName) => {
        this.props.onUploadDone(fileName);
    };
    render() {
        const { user,onLoadError } = this.props;
        const _this = this;
        const canAdd = user.resources.some(r => r == AuthorizationCode.AddModel);
        const uploadProps = {
            name: '3D-file',
            action: '/_resource/upload?type=three',
            showUploadList: false,
            beforeUpload: file => {
                const extNames = file.name.split('.');
                let isDAE = false;
                if (extNames.length > 0) {
                    
                    isDAE = extNames[extNames.length - 1].toLowerCase() === 'glb' || extNames[extNames.length - 1].toLowerCase() === 'gltf';
                }
                if (!isDAE) {
                    message.error('只能上传glb 、gltf文件!');
                }
                const isLt5M = file.size / 1024 / 1024 < 10;
                if (!isLt5M) {
                    message.error('文件必须小于10MB!');
                }
                return isDAE && isLt5M;
            },
            onChange: info => {
                if (info.file.status === 'error' && info.file.error.status == 400) {
                    message.error('文件格式不正确');
                }
                
                if (info.file.status === 'done') {
                    const resFileName = info.file.response.filename;
            
                    //检查模型是否能够正确加载
                    const loader = new GLTFLoader();
                    loader.load(`/_file-server/${resFileName}`, function ( gltf ) {
                        _this._onUploadDone(resFileName);
                    }, undefined, function ( error ) {
                        message.error('无法加载该模型资源，请重新上传正确的模型');
                        onLoadError(resFileName);
                    } );
                    
                }
            }
        };

        return (
            <div style={{ marginTop: 16, height: 400 }}>
                <div style={{ marginTop: 16, height: '100%' }}>
                    <Dragger {...uploadProps} disabled={!canAdd}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">点击或拖动文件上传</p>
                        <p className="ant-upload-hint">支持单个模型(glb、gltf格式)上传</p>
                        <p className="ant-upload-hint">文件必须小于10M</p>
                    </Dragger>
                </div>
            </div>
        )
    }
}

export default connect()(ThreeUpload);