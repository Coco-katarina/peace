'use strict'

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin, Card, Result } from 'antd';
import { getHeatMap } from '../../actions/threeHeatMap';
import { getstationsDeployed } from '../../actions/integrationInfo';
import { createPointsImg } from '../../actions/pointsLayoutInfo';
import ThreeDisplay from '../hotspotThreeContainer/three-display';
import ThreeUpload from '../hotspotThreeContainer/three-upload';
import { clearData } from '@peace/utils';
import { removeFile } from '../../actions/threeDataConfig';


class ThreeBuDian extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: null,
        };
        this._structId = props.match.params.id;
    }

    componentDidMount() {
        this._initContext()
    }
    componentWillUnmount() {
        const { dispatch } = this.props;
        clearData(dispatch, { actionType: 'REQUEST_GET_STATIONS_DEPLOYED_STATE' })
        this.setState({ hasHeatMap: false });
    }
    _initContext = () => {
        const { dispatch, match: { params } } = this.props;
        const structId = parseInt(params.id);
        if (structId) {
            dispatch(getHeatMap(structId, '3D'))
                .then(res => {
                    if (res.payload.heatMap) {
                        let heatmapId = res.payload.heatMap.filter(s => s.type.id == 3);
                        if(heatmapId.length > 0){
                            dispatch(getstationsDeployed(heatmapId[0].id))
                            .then(
                                _ => {
                                    this.props.stationsDeployed.portrait ? this.setState({ hasHeatMap: true }) : this.setState({ hasHeatMap: false });
                                });
                        }
                       
                    }
                });
        }
    }

    _onUploadDone = (imgPath) => {
        const { match: { params }, dispatch } = this.props;
        const heatmap = Object.assign({}, { name: "结构物热点图", typeId: 3, camera: { "position": { x: 0, y: 0, z: 0 }, "rotation": { x: 0, y: 0, z: 0 }, "target": { x: 0, y: 0, z: 0 } }, portrait: imgPath, hotspotsSize: 5 });
        const param = Object.assign({}, { heatmap: heatmap, model: '3D' });
        dispatch(createPointsImg(params.id, param))
            .then(_ => {
                this._initContext();
            })
    };
    onLoadError = (previewImgPath) => {
        this.props.dispatch(removeFile(previewImgPath, "3D模型"))
    };
  
    render() {
        const { match: { params }, isRequesting, pointsImgs, heatMap, stationsDeployed, user } = this.props;
        const { hasHeatMap } = this.state;
        if (isRequesting) {
            return (<Spin />)
        }
        return (<Card>
            {
                stationsDeployed && stationsDeployed.type ?
                    hasHeatMap ? <ThreeDisplay
                            params={params}
                            heatMap={stationsDeployed}
                            user={user}
                            sectionItems={heatMap.filter(s => s.type.id == 4)}
                            onReLoad={this._initContext}
                        /> : null
                    :
                    <ThreeUpload structId={this._structId} onLoadError={this.onLoadError} onUploadDone={this._onUploadDone} user={user} />
            }
            
        </Card>
        );
    }
}

function mapStateToProps(state) {
    const { threeHeatMap, staionsDeployedList, auth } = state;
    let isRequesting = threeHeatMap.isFetching || staionsDeployedList.isRequesting;
    return {
        user: auth.user,
        isRequesting: isRequesting,
        heatMap: threeHeatMap.heatMap,
        stationsDeployed: staionsDeployedList.data
    };
}

export default connect(mapStateToProps)(ThreeBuDian)
