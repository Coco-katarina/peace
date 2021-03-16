import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Breadcrumb, Table, Input, Spin } from 'antd';
import { getDataFileDir, downloadDataFile } from '../actions/data-file';
import { AuthorizationCode } from '$utils';

class DataFileList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: [],
            dataType: 'theme'
        }
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.fileKey != this.props.fileKey) {
            this.setState({ path: [] });
        }
    }

    changePath(key, enter) {
        if (key) {
            let newPath = this.state.path;
            if (enter) {
                newPath = this.state.path.concat([key]);
            } else {
                const index = this.state.path.indexOf(key);
                newPath = this.state.path.slice(0, index + 1);
            }
            this.setState({ path: newPath });
            if (key == '测点数据' || key == '设备数据') {
                let dataType = key == '测点数据' ? 'theme' : 'raw';
                this.props.dispatch(getDataFileDir(this.props.fileKey, dataType));
                this.setState({ dataType: dataType });
            } else {
                let path = [];
                newPath.map(p => {
                    if (p != '测点数据' && p != '设备数据') {
                        path.push(p);
                    }
                })
                this.props.dispatch(getDataFileDir(this.props.fileKey, this.state.dataType, path.join('/')));
            }
        } else {
            this.setState({ path: [] });
        }
    }

    search = (value) => {
        let path = [];
        this.state.path.map(p => {
            if (p != '测点数据' && p != '设备数据') {
                path.push(p);
            }
        })
        this.props.dispatch(getDataFileDir(this.props.fileKey, this.state.dataType, path.join('/'), value));
    }

    getBStr(size) {
        let i = 0, num = size;
        const map = {
            0: 'B',
            1: 'KB',
            2: 'MB',
            3: 'GB'
        }

        while (num > 1024) {
            num = num / 1024;
            i++;
        }

        return num.toFixed(2) + map[i];
    }

    download(filename, disName) {
        let path = [];
        this.state.path.map(p => {
            if (p != '测点数据' && p != '设备数据') {
                path.push(p);
            }
        })
        window.open(downloadDataFile(this.props.fileKey, this.state.dataType, path.join('/') + '/' + encodeURI(filename), encodeURI(disName)), 'dummyfrm');
    }

    render() {
        const resources = this.props.user.resources;
        const downloadFileRes = resources.length == 0 ? false :
            resources.indexOf(AuthorizationCode.DownloadFile) > -1 ? true : false;

        const columns = [{
            key: 'path',
            dataIndex: 'path',
            title: '文件名',
            width: '70%',
            render: (value, record) => {
                if (record.type == 'DIRECTORY') {
                    return <a onClick={() => this.changePath(value, true)}>
                        <div>
                            <img style={{ float: 'left', marginRight: 16 }} src="/assets/images/folder.png" width="32px" height="32px" />
                            <div style={{ height: 32, lineHeight: '32px', float: 'left' }}>{value}</div>
                        </div>
                    </a>;
                } else {
                    return <div style={{ height: 32, lineHeight: '32px' }}>
                        <img style={{ float: 'left', marginRight: 16 }} src="/assets/images/file.png" width="32px" height="32px" />
                        <div style={{ height: 32, lineHeight: '32px', float: 'left' }}>{record.disName || value}</div>
                    </div>
                }
            }
        }, {
            key: 'length',
            dataIndex: 'length',
            title: '大小',
            width: '15%',
            render: value => value == 0 ? '-' : this.getBStr(value)
        }, {
            key: 'op',
            title: '操作',
            width: '15%',
            render: (value, record) => {
                if (record.type == 'DIRECTORY' || !downloadFileRes) {
                    return ''
                } else {
                    return <a onClick={() => this.download(record.path, record.disName || record.path)}>下载</a>
                }
            }
        }];
        // const dataSource = this.props.dir || [];
        const dataSource = this.state.path.length == 0 ?
            [{ length: 0, path: '测点数据', type: 'DIRECTORY' }, { length: 0, path: '设备数据', type: 'DIRECTORY' }]
            : this.props.dir;

        return (
            <div>
                <Row style={{ padding: '24px 0 0 24px' }}>
                    <Col span="12">
                        <Breadcrumb>
                            <Breadcrumb.Item>数据盘</Breadcrumb.Item>
                            <Breadcrumb.Item><a onClick={() => this.changePath()}>{this.props.fileName}</a></Breadcrumb.Item>
                            {
                                this.state.path.map(p => <Breadcrumb.Item><a onClick={() => this.changePath(p)}>{p}</a></Breadcrumb.Item>)
                            }
                        </Breadcrumb>
                    </Col>
                    <Col span="12">
                        {this.state.path.length == 0 ? null :
                            <Input.Search
                                style={{
                                    zIndex: 1,
                                    float: 'right',
                                    width: '50%',
                                    marginRight: 25
                                }}
                                size="large"
                                placeholder="文件名" onSearch={this.search}
                            />}

                    </Col>
                </Row>
                <Table loading={this.props.isRequesting} dataSource={dataSource} columns={columns} style={{ padding: 24 }} />
                <iframe name="dummyfrm" style={{ display: 'none' }} ref="dummyfrm" ></iframe>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { dataFile, auth } = state;

    return {
        isRequesting: dataFile.isRequesting,
        dir: dataFile.dir,
        user: auth.user
    }
}

export default connect(mapStateToProps)(DataFileList);