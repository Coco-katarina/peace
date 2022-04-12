import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { message, Spin } from 'antd';
import ProTable from '@ant-design/pro-table';
import { LayoutContent, ExportData } from '@peace/components';
import moment from 'moment';
import { Func, ApiTable } from '$utils';

import '../style.less';

const Log = (props) => {
    const { dispatch, actions, loading, sysLogs } = props;
    const { getSystemLog } = actions.system
    const { count, rows } = sysLogs
    const [queryData, setQueryData] = useState({})
    const columns = [{
        title: '序号',
        dataIndex: 'idx',
        ellipsis: true,
        search: false,
        render: (text, record, idx) => {
            return idx + 1
        }
    },
    {
        title: '操作模块',
        dataIndex: 'module',
    },
    {
        title: '操作人',
        dataIndex: 'operator',
        ellipsis: true,
        search: false,
        render: (text, record) => {
            return record?.user?.name || '-'
        }
    },
    {
        title: '操作内容',
        dataIndex: 'content'
    },
    {
        title: '操作时间',
        dataIndex: 'logTime',
        valueType: 'dateRange',
        initialValue: [moment().subtract('days', 29), moment()],
        ellipsis: true,
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
        },
        render: (text, record) => {
            return moment(record.logTime).format('YYYY-MM-DD HH:mm:ss')
        }
    }]
    

    return (
        <LayoutContent>
            <ProTable
                columns={columns}
                rowKey='id'
                options={{
                    search: false,
                    reload: false
                }}
                search={{
                    optionRender: (searchConfig, formProps, dom) => {
                        dom = dom.filter(v => v?.key == 'submit')  //过滤重置
                        dom.push(<ExportData showIcon={false} data={[]} fileName={'系统日志'} exportType='fileSaver' exportUrl={ApiTable.getSystemLog} exportQuery={queryData} requestType={'get'} columns={columns.filter(v => v.dataIndex !== 'idx')} key="exportlog" />)
                        return dom
                    }
                }}
                form={{
                    ignoreRules: false,
                }}
                dateFormatter="string"
                request={async (params) => {
                    const { pageSize, current, logTime, module, content } = params
                    const query = {
                        start: logTime ? logTime[0] + ' 00:00:00' : null,
                        end: logTime ? logTime[1] + ' 23:59:59' : null,
                        module: module,
                        content: content
                    }
                    setQueryData(query);
                    const { payload, success } = await dispatch(getSystemLog({
                        ...query,
                        limit: pageSize,
                        offset: ((current || 1) - 1) * pageSize
                    }));
                    const { rows } = payload.data
                    return {
                        data: rows || [],
                        success: success,
                    };
                }}
                pagination={{ ...Func.getPaginationStyle(), total: count }}
            />

        </LayoutContent>
    )
}

function mapStateToProps(state) {
    const { global, sysLogs } = state;

    return {
        loading: sysLogs.isRequesting,
        sysLogs: sysLogs.data || {},
        actions: global.actions,
    };
}

export default connect(mapStateToProps)(Log);
