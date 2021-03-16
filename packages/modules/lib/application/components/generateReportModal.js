import React, { Component, useState, useEffect } from 'react';
import moment from 'moment'
import { connect } from "react-redux"
import { Modal, message, DatePicker } from 'antd';
import { generateReviewReport } from "../actions/projectInfo"

const GenerateReportModal = (props) => {
    const { dispatch, generateModalId, closeModal, visible } = props;
    let [generateBegin, setGenerateBegin] = useState(moment().add(-1, 'days'));
    let [generateEnd, setGenerateEnd] = useState(moment());

    const callGenerateReportApi = () => {
        if (generateBegin && generateEnd) {
            dispatch(generateReviewReport(generateModalId, generateBegin.format('YYYY-MM-DD'), generateEnd.format('YYYY-MM-DD'))).then(res => {
                if (res.success) closeModal()
            });
        } else {
            message.warn('请选择时间范围！');
        }
    }

    return (
        <Modal title="生成审核报告" maskClosable={false} visible={visible}
            bodyStyle={{ padding: 16, textAlign: 'center' }}
            onCancel={closeModal}
            onOk={callGenerateReportApi}
        >
            <DatePicker.RangePicker
                defaultValue={[moment().add(-1, 'days'), moment()]}
                format="YYYY-MM-DD"
                bordered={false}
                onChange={dates => {
                    setGenerateBegin(dates[0])
                    setGenerateEnd(dates[1])
                }}
                style={{ width: '100%' }}
            />
        </Modal>
    )
}

function mapStateToProps(state) {
    const { } = state;
    return {

    }
}

export default connect(mapStateToProps)(GenerateReportModal);