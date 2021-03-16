import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import { connect } from 'react-redux';
import Ps from 'perfect-scrollbar';
import moment from 'moment';

class NoticeCard extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        Ps.update(document.getElementById('Notice-content'));
    }

    componentDidMount() {
        Ps.initialize(document.getElementById('Notice-content'));
    }

    renderList = (content) => {
        let array = []
        content.content.map(s => { array.push(s.isReaded == true ? 'true' : 'false') })
        let everyResult = array.some(function (item, index, array) {
            return item == 'false';
        })
        if (everyResult == true) {
            return (
                <div key={content.titleTime} style={{ marginTop: '30px', width: '100%' }}>
                    <span style={{ color: 'grey', fontSize: '14' }}>{moment(content.titleTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                    <div style={{ borderTopColor: '#D9D9D9', borderTopWidth: '1px', borderTopStyle: 'solid', width: '100%' }}>

                        {
                            content.content.map(s => {
                                return s.isReaded == false ?
                                    (
                                        <Row key={s.contentId} style={{ marginTop: '20px' }}>
                                            <Col span={2}><img style={{ width: '60%', height: '60%', borderRadius: '50%' }} src={s.imgSrc} /></Col>
                                            <Col span={16}>
                                                <p style={{ marginTop: 10 }}>系统消息: {moment(s.contentTime).format('YYYY-MM-DD HH:mm:ss')}</p>
                                            </Col>
                                        </Row>) : ''
                            })
                        }

                    </div>
                </div>
            )
        }
    }
    render() {
        return <div style={{ height: '280px', position: 'relative', paddingBottom: '30px' }} id='Notice-content'>
            {
                this.props.data.map(s => {
                    return this.renderList(s)
                })
            }
        </div>

    }
}


export default connect()(NoticeCard);