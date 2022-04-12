import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Card, Spin } from 'antd';
import { getStructState, getFactorItems } from '../../actions/struct';
import { getDimensionsList } from '../../actions/integrationInfo';
import { getCollections, addCollection, editCollection, delCollection, getStations } from '../../actions/dynamic-collection';
import CollectionTable from '../../components/dynamic-collection/collectionTable';

class Collection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dimensions: [],
            stationsData: [],
            alliIemsOption: [],
            factorItemsData: [],
            editDimensionId: null,
            editFormItemNum: 1,
            enable: true,
        }
    }

    componentDidMount() {
        const { dispatch, match: { params } } = this.props;
        dispatch(getStructState(params.id)).then(strucRes => {
            const { success } = strucRes;
            if (success) {
                dispatch(getDimensionsList(strucRes.payload.data.iotaThingId)).then(dimensionRes => {
                    if (dimensionRes.success) {
                        this.setState({ dimensions: dimensionRes.payload.data.dimensions.filter(s => s.scheme == null || (s.scheme && s.scheme.mode == "R")) })
                    }
                });
            }
        });
        dispatch(getStations(params.id)).then(stationRes => {
            const { success, payload } = stationRes;
            if (success) {
                let data = payload.data;
                let stationsData = [];
                for (let stationsFactor of data) {
                    if (stationsFactor.groups.length) {
                        for (let stationsGroup of stationsFactor.groups) {
                            if (stationsGroup.stations.length) {
                                for (let stationsMsg of stationsGroup.stations) {
                                    stationsData.push({
                                        stationName: stationsMsg.name,
                                        stationId: stationsMsg.id,
                                        manual: stationsMsg.manualData,
                                        factorProto: stationsFactor.factorProto,
                                        factorId: stationsFactor.factorId,
                                    })
                                }
                            }
                        }
                    }
                }
                this.setState({ stationsData: stationsData })
            }
        });
        dispatch(getFactorItems(params.id)).then(factorItemRes => {
            const { success, payload } = factorItemRes;
            if (success) {
                let alliIemsOption = [];
                for (let s of payload.data) {
                    if (s.checked == true) {
                        for (let i of s.items) {
                            if (alliIemsOption.filter(k => k.id == i.id).length == 0) {
                                alliIemsOption.push(i)
                            }
                        }
                    }
                }
                this.setState({
                    factorItemsData: factorItemRes.payload.data.filter(s => s.checked == true),
                    alliIemsOption: alliIemsOption
                })
            }
        });
        this.reGetCollections();
    }
    reGetCollections = () => {
        const { dispatch, match: { params } } = this.props;
        return dispatch(getCollections(params.id));
    }
    handleDel = (id) => {
        const { dispatch } = this.props;
        return dispatch(delCollection(id)).then(delRes => {
            if (delRes.success) {
                this.reGetCollections();
            } else {
                message.error(delRes.error);
            }
        })
    }
    handleSave = (isEdit, dataToSave, id) => {
        const { dispatch } = this.props;
        if (isEdit) {
            return dispatch(editCollection(id, dataToSave)).then(editRes => {
                if (editRes.success) {
                    this.reGetCollections();
                } else {
                    message.error(editRes.error);
                }
            })
        } else {
            return dispatch(addCollection(dataToSave)).then(addRes => {
                if (addRes.success) {
                    this.reGetCollections();
                } else {
                    message.error(addRes.error);
                }
            })
        }
    }
    renderTableData = (collectionData, stationsData, dimensions) => {
        let collectionTableData = [];
        if (collectionData && stationsData.length && dimensions.length) {
            collectionTableData = collectionData.map(c => {
                let stationsName = c.cond.map(s => {
                    let currentStation = stationsData.filter(d => d.stationId == s.sensor)[0];
                    if (currentStation) {
                        return currentStation.stationName;
                    } else {
                        return null
                    }
                })
                let dimensionName = dimensions.filter(d => d.id == c.schemeId)[0].name;
                return {
                    key: c.schemeId,
                    dimension: dimensionName,
                    granularity: c.glt,
                    stations: stationsName.toString(),
                    enable: c.enable ? "启用" : "禁用",
                    dimensionId: c.schemeId,
                }
            });
        }
        for (let dimension of dimensions) {
            if (collectionTableData.some(c => c.dimensionId == dimension.id)) {
                dimension.selected = true;
            } else {
                dimension.selected = false;
            }
        }
        return collectionTableData;
    }
    render() {
        const { isRequesting, collectionData, location, match } = this.props;
        const { dimensions, alliIemsOption, stationsData, factorItemsData } = this.state;
        const tableData = this.renderTableData(collectionData, stationsData, dimensions);

        return (
                <Spin spinning={isRequesting}>
                    <Card  >
                        <CollectionTable
                            tableData={tableData}
                            stationsData={stationsData.filter(s => !s.manual)}
                            collectionData={collectionData}
                            dimensions={dimensions}
                            alliIemsOption={alliIemsOption}
                            factorItemsData={factorItemsData}
                            onSave={this.handleSave}
                            onDelete={this.handleDel}
                        />
                    </Card>
                </Spin>
        )
    }
}

function mapStateToProps(state) {
    const { collectionList, auth } = state;
    return {
        isRequesting: collectionList.isRequesting,
        collectionData: collectionList.data,
        user: auth.user
    }
}

export default connect(mapStateToProps)(Collection);