'use strict'

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Row, Col, Spin, Button, Input, Card } from 'antd';
import { Func, PinyinHelper } from '@peace/utils';
import { AuthorizationCode } from '$utils';
import { getHeatmaps, deletePointsImg } from '../../actions/2d/station-deploy';
import UploadImgModal from './upload-image-modal';
import HeatmapCard from '../../components/station-deploy/2d/heatmap-card';

const Search = Input.Search;
class Default extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: null,
            uploadImgModal: '',
            searchKey: '',
        };
    }

    componentDidMount() {
        const { dispatch, match: { params } } = this.props;
        dispatch(getHeatmaps(params.id, '2D'));
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { dispatch, match: { params } } = this.props;
        if (params.id != nextProps.match.params.id) {
            dispatch(getHeatmaps(nextProps.match.params.id, '2D'));
        }
    }
    onAddImgClick = () => {
        const { match: { params }, heatMaps } = this.props;
        this.setState({
            uploadImgModal: <UploadImgModal
                structId={parseInt(params.id)}
                imgInfo={null}
                uploadPointsImgSuccess={this.uploadPointsImgSuccess}
                closeUploadPointsImgModal={this.closeUploadPointsImgModal}
                heatMaps={heatMaps}
            />,
        })
    };
    uploadPointsImgSuccess = () => {
        const { dispatch, match: { params } } = this.props;
        const structId = parseInt(params.id);
        this.setState({ uploadImgModal: '' });

        dispatch(getHeatmaps(structId, '2D'));
    }
    closeUploadPointsImgModal = () => {
        this.setState({ uploadImgModal: '' })
    };
    onSearchClick = (value) => {
        this.setState({ searchKey: value });
    };
    deleteHandler = (heatmapId) => {
        const { dispatch, match: { params } } = this.props;
        const structId = params.id;
        dispatch(deletePointsImg(heatmapId)).then(action => {
            if (action.success) dispatch(getHeatmaps(structId, '2D'));
        });
    };
    editHandler = (heatmap) => {
        const { match: { params }, heatMaps } = this.props;
        this.setState({
            uploadImgModal: <UploadImgModal
                structId={parseInt(params.id)}
                imgInfo={heatmap}
                uploadPointsImgSuccess={this.uploadPointsImgSuccess}
                closeUploadPointsImgModal={this.closeUploadPointsImgModal}
                heatMaps={heatMaps} />,
        })
    };
    deployHandler = (heatmap) => {
        const { dispatch, match: { params } } = this.props;
        const structId = params.id;
        dispatch(push(`/project-monitor/things/struct/${structId}/configuration/2d/deploy/${heatmap.id}`));
    };

    render() {
        const { heatMaps, apiRoot, match, location } = this.props;
        let heatmaps = heatMaps;
        const { searchKey, uploadImgModal } = this.state;
        const data = searchKey == '' ? heatmaps :
            heatmaps.filter(m => {
                const { name } = m;
                return name.indexOf(searchKey) >= 0 || PinyinHelper.isPinyinMatched(name, searchKey);
            });
        const canAdd = Func.judgeRights(AuthorizationCode.UploadHotspotMap);

        return (
                <Spin spinning={false}>
                    <Card>
                        <Row style={{ marginBottom: 8 }}>
                            <Search placeholder="布设图名称" style={{ width: '25%' }} onSearch={this.onSearchClick} />
                            <Button style={{ float: 'right', marginLeft: 8 }} type='primary' disabled={!canAdd} onClick={this.onAddImgClick}>添加布设图</Button>
                            {uploadImgModal}
                        </Row>
                        <Row gutter={8} justify="start">
                            {data.map((m, i) => <Col key={`col-${i}`} span="6" style={i % 4 == 0 ? { marginBottom: 8, clear: 'both' } : { marginBottom: 8 }}>
                                <HeatmapCard apiRoot={apiRoot} heatmap={m} onDelete={this.deleteHandler} onEdit={this.editHandler} onDeploy={this.deployHandler} />
                            </Col>)}
                        </Row>
                    </Card>
                </Spin>
        );
    }
}

function mapStateToProps(state) {
    const { stationDeploy, auth, global } = state;

    return {
        user: auth.user,
        heatMaps: stationDeploy.data || [],
        apiRoot: global.apiRoot
    }
}

export default connect(mapStateToProps)(Default)
