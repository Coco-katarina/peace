import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import ContrastQuery from './contrastQuery';
import { Data, Distribution, Difference } from '../../components/contrast';

class Contrast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            diffOptionId: 0,
            structId: null,//结构物id
            itemsName: '',//测点名称
            fieldName: '',
        };
    }

    // componentDidMount() {
    //     const { dispatch, initPageHeaderDetails } = this.props;
    //     dispatch(initPageHeaderDetails(
    //         <ContrastQuery queryForCharts={this.queryForCharts} />
    //     ));
    // }
    // componentWillUnmount() {
    //     const { dispatch, initPageHeaderDetails } = this.props;
    //     dispatch(initPageHeaderDetails(null));
    // }
    queryForCharts = (structId, itemsName, fieldName) => {
        this.setState({
            structId: structId,
            itemsName: itemsName,
            fieldName: fieldName,
            diffOptionId: 0
        })
    }
    diffOptionIdChange = (optionId) => {
        this.setState({
            diffOptionId: optionId
        })
    }
    render() {
        const { stationsData } = this.props;
        const { itemsName, structId, fieldName, diffOptionId } = this.state;

        return (<div>
            <ContrastQuery queryForCharts={this.queryForCharts} />
            <Row>
                <Col span={16}>
                    {/* 数据对比图表展示 ，todo：图表待采用新封装改造的 */}
                    <Data
                        structId={structId}
                        itemsName={itemsName}
                        stationsData={stationsData}
                    />
                    <Difference
                        structId={structId}
                        itemsName={itemsName}
                        fieldName={fieldName}
                        diffOptionId={diffOptionId}
                        stationsData={stationsData}
                        diffOptionIdChange={this.diffOptionIdChange}
                    />
                </Col>
                <Col span={8} style={{ paddingLeft: 15 }} >
                    <Distribution
                        structId={structId}
                        itemsName={itemsName}
                        stationsData={stationsData}
                    />
                </Col>
            </Row>
        </div>)
    }
}

function mapStateToProps(state) {
    const { global, auth, stationsData } = state;
    const { actions } = global;

    return {
        initPageHeaderDetails: actions && actions.layout && actions.layout.initPageHeaderDetails,
        user: auth.user,
        stationsData: stationsData,//测点数据
    }
}

export default connect(mapStateToProps)(Contrast);