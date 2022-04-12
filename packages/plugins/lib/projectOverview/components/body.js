import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Tabs, Select, Row, Col, Spin, Empty } from 'antd';
import '../style.less';
import StructSensorAlarm from './structSensorAlarm';
import MoreStructSensorAlarm from './moreStructSensorAlarm';
import Gis from './Gis';
import { push } from 'react-router-redux';
import ProCard from '@ant-design/pro-card';
import { PinyinHelper } from '@peace/utils';
import PerfectScrollbar from 'perfect-scrollbar';
import { Func } from '$utils';

const { TabPane } = Tabs;
const { Option } = Select;

const Body = (props) => {
    const { dispatch, actions, user, clientWidth, structuresList, location, isRequesting, clientHeight} = props

    let [structureSelected, setStructureSelected] = useState(structuresList.length > 0 ? structuresList[0]?.id : null);
    let [structure, setStructure] = useState({ id: -1 });
    let [isEmpty, setIsEmpty] = useState(false);
    let [windowClientWidth, setWindowClientWidth] = useState(1720);
    let [hasAll, setHasAll] = useState(true);
    let scrollbar= null;

    useEffect(() => {
        const { structId } = location.state || {}
        setIsEmpty(true)
        dispatch(actions.projectOverview.getUserAlarmsInfo(user.id));
        dispatch(actions.projectOverview.getStructuresByOrganizations(user.orgId)).then(res => {
            if (res.success) {
                if (res.payload.data.length > 0) {
                    setIsEmpty(false)
                }
                if (structId) {
                    setStructureSelected(structId)
                } else {
                    if (res.payload.data.length == 1) {
                        setStructure(res.payload.data[0])
                        setHasAll(false);
                    }
                    setStructureSelected(res?.payload?.data[0]?.id)
                }
            } else {
                setIsEmpty(true)
            }
        })
        window.onresize = () => {
            setWindowClientWidth(document.body.clientWidth);
        }
       
        scrollbar = new PerfectScrollbar('#card-content', { suppressScrollX: true });
        
    }, [])

    useEffect(() => {

    }, [structure])

    useEffect(() => {
        const dom = document.getElementById('card-content');
        if (dom && scrollbar) {
            scrollbar.update();
            dom.scrollTop = 0;
        }
    }, [clientHeight])

    const projectSelect = (value) => {
        if (structuresList && structuresList.length > 0) {
            let hasStruct = false;
            structuresList.map(s => {
                if (s.id == value) {
                    setStructure(s);
                    hasStruct = true;
                }
            })
            if (!hasStruct) {
                setStructure({ id: -1 })
            }
        }
        setStructureSelected(value)
    }

    const structClick = (id) => {
        dispatch(push({ pathname: `/singleProjectOverview`, state: { structId: id } }))
    }

    const SearchSelect = () => {
        return (
            <Select
                style={{ marginRight: (windowClientWidth > 1400 ? windowClientWidth * 0.6 : windowClientWidth * 0.4), width: 256 }}
                showSearch
                placeholder="可以选择或者搜索结构物"
                onSelect={(value) => projectSelect(value)}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    ||
                    PinyinHelper.isPinyinMatched(option.children, input)
                }
                value={structure ? structure.id : -1}
            >
                {
                    hasAll ?
                        <Option key={-1} value={-1} >{'全部'}</Option> :
                        ''
                }
                {
                    structuresList ?
                        structuresList.map((st, index) => {
                            return (<Option key={index} value={st.id} >{st.name}</Option>)
                        })
                        :
                        ''
                }
            </Select>
        )
    }

    return (
        <Spin spinning={isRequesting}>
            <Tabs
                defaultActiveKey="card"
                tabBarExtraContent={<SearchSelect></SearchSelect>}
            >
                <TabPane tab="卡片" key="card"  >
                <div className="content" id='card-content' style={{height: Func.getContentHeight(clientHeight) - 46, position: 'relative'}}>
                {
                        isEmpty ?
                                <Empty></Empty>
                            :
                            <div>
                                {
                                    structuresList && structuresList.length > 1 ?
                                        structure && structure.id == -1 ?
                                           
                                                <div className="contentBody">
                                                    <ProCard ghost gutter={10} wrap>
                                                       
                                                        {
                                                            structuresList.map((s, index) => {
                                                                return (
                                                                    <ProCard key={index} colSpan={{ xxl: 8, xl: 12 }} style={{ marginBottom: 10 }}>

                                                                        <Row className="structName" onClick={() => structClick(s.id)}
                                                                            style={{ cursor: 'pointer' }}>
                                                                            {s ? s.name : ''}
                                                                        </Row>
                                                                        <Row className="structImg">
                                                                            <img src={s ? s.portrait : ''}></img>
                                                                        </Row>
                                                                        <MoreStructSensorAlarm
                                                                            structureSelected={s.id}
                                                                        />
                                                                    </ProCard>
                                                                )
                                                            })
                                                        }
                                                     
                                                        
                                                    </ProCard>
                                                </div>
                                         
                                            :
                                            structuresList.length == 1 && structure && structure.id == -1 ?
                                               
                                                    <div className="contentBody">
                                                        <ProCard>
                                                            {
                                                                structuresList.map((s, index) => {
                                                                    return <ProCard>
                                                                        <Row className="structName" onClick={() => structClick(s.id)}
                                                                            style={{ cursor: 'pointer' }}>
                                                                            {s ? s.name : ''}
                                                                        </Row>
                                                                        <Row className="structImgSingle">
                                                                            <img src={s ? s.portrait : ''}></img>
                                                                        </Row>
                                                                        <StructSensorAlarm
                                                                            structureSelected={s.id}
                                                                        />
                                                                    </ProCard>
                                                                })
                                                            }
                                                        </ProCard>
                                                    </div>
                                                :
                                              
                                                    <div className="contentBody">
                                                        <ProCard>
                                                            <Row className="structName" onClick={() => structClick(structure.id)}
                                                                style={{ cursor: 'pointer' }}>
                                                                {structure ? structure.name : ''}
                                                            </Row>
                                                            <Row className="structImgSingle">
                                                                <img src={structure ? structure.portrait : ''}></img>
                                                            </Row>
                                                            <StructSensorAlarm
                                                                structureSelected={structureSelected}
                                                            />
                                                        </ProCard>
                                                    </div>
                                              
                                        :
                                  
                                            <div className="contentBody">
                                                <ProCard>
                                                    <Row className="structName" onClick={() => structClick(structure.id)}
                                                        style={{ cursor: 'pointer' }}>
                                                        {structure ? structure.name : ''}
                                                    </Row>
                                                    <Row className="structImgSingle">
                                                        <img src={structure ? structure.portrait : ''}></img>
                                                    </Row>
                                                    <StructSensorAlarm
                                                        structureSelected={structureSelected}
                                                    />
                                                </ProCard>
                                            </div>
                                       
                                }
                            </div>
                    }
                </div>
                    
                </TabPane>
                <TabPane tab="GIS" key="gis">
                    {
                        isEmpty ?
                            <Empty></Empty> :
                            <Gis gisStructures={structure?.id == -1 ? structuresList : [structure]}></Gis>
                    }
                </TabPane>
            </Tabs >
        </Spin>
    )
}

function mapStateToProps(state) {
    const { global, auth, structuresList } = state;
    return {
        loading: structuresList.isRequesting,
        user: auth.user,
        actions: global.actions,
        clientHeight: global.clientHeight,
        clientWidth: global.clientWidth,
        structuresList: structuresList.data || [],
        isRequesting: structuresList.isRequesting,
    };
}

export default connect(mapStateToProps)(Body);
