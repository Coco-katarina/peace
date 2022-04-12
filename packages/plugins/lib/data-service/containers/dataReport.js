
import { LayoutContent } from '@peace/components';
import { ProFormDateRangePicker, ProFormSelect, ProFormText, QueryFilter } from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';
import { PinyinHelper } from '@peace/utils';
import { Button, Spin, Space, Modal } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Func, AuthorizationCode } from '$utils';
import { removeFile, downloadFile } from '../actions/dataFiles'
import ReportRename from '../components/reportRename'
import UploadFiles from '../components/uploadFiles'

const reportTypes = ['时报','日报','周报','月报','年报'];
const DataReport = (props) => {
    const { actions, dispatch, user, requesting, strucList } = props;
    const { dataService } = actions
    const [report, setReport] = useState([])
    const [strucEnum, setStrucEnum] = useState({})
    const [filterParams, setFilterParams] = useState({})
    const [reportShow, setReportShow] = useState([])
    const [loading, setLoading] = useState(false)
    const [renameData, setRenameData] = useState(null)
    const [showUpload, setShowUpload] = useState(false)
    const ApiRoot = localStorage.getItem('tyApiRoot')

    const filterFiles = (report) => {
        let nextShow = []
        for (let r of report) {
            if (!filterParams.struct || r.strucId == filterParams.struct) {
                if (!filterParams.dateRange || moment(r.time).isBetween(filterParams.dateRange[0], filterParams.dateRange[1])) {
                    if (!filterParams.keyWord || PinyinHelper.isSearchMatched(r.name, filterParams.keyWord)) {
                        if(!filterParams.reportType || r.reportType == filterParams.reportType){
                            nextShow.push(r)
                        }
                    }
                }
            }
        }
        setReportShow(nextShow)
    }

    const getFiles = () => {
        setLoading(true)
        dispatch(dataService.getNetdiskFiles(user.id)).then(res => {
            if (res.success) {
                const { data } = res.payload
                const report = data.find(d => d.fileTypeId == 2)
                let nextReport = []
                let nextStrucEnum = []
                if (report) {
                    for (let s of report.targets) {
                        for (let r of s.files) {
                            nextReport.push({
                                ...r,
                                strucName: s.name,
                                strucId: s.id,
                            })
                        }
                        nextStrucEnum[s.id] = s.name
                    }
                }
                nextReport.sort((x, y) => moment(x.time).isAfter(moment(y.time)) ? -1 : 1)
                setReport(nextReport)
                setStrucEnum(nextStrucEnum)
                filterFiles(nextReport)
            }
            setLoading(false)
        })
    }

    useEffect(() => {
        getFiles()
        dispatch(dataService.getStrucList(user.orgId))
    }, [])

    useEffect(() => {
        filterFiles(report)
    }, [filterParams])

    return (
        <LayoutContent>
            <Spin spinning={loading || requesting}>
               
                <QueryFilter
                    style={ {padding:16, marginBottom: 10}}
                    labelWidth="auto"
                    dateFormatter={false}
                    initialValues={{

                    }}
                    submitter={{
                        // 配置按钮的属性
                        resetButtonProps: {
                            style: {
                                // 隐藏重置按钮
                                display: 'none',
                            },
                        },
                        render: (props, doms) => {
                            return [
                                ...doms,
                                <Button htmlType="button" onClick={() => { setShowUpload(true) }} key="upload">
                                    上传
                                </Button>
                            ]
                        },
                    }}
                    onFinish={async (values) => {
                        setFilterParams(values)
                    }}
                >
                    <ProFormSelect
                        name="struct"
                        label=""
                        valueEnum={strucEnum}
                        width={120}
                        placeholder="请选择项目"
                        rules={[{ required: false, message: '' }]}
                    />
                    <ProFormSelect
                        name="reportType"
                        label=""
                        options={[
                            { label: '时报', value: '0' },
                            { label: '日报', value: '1' },
                            { label: '周报', value: '2' },
                            { label: '月报', value: '3' },
                            { label: '年报', value: '4' },
                          ]}
                        width='xs'
                        placeholder="请选择报表类型"
                        rules={[{ required: false, message: '' }]}
                    />
                    <ProFormDateRangePicker name="dateRange" label="" width='md' />
                    <ProFormText width="md" name="keyWord" label="" placeholder='关键词' width='sm' />
                </QueryFilter>
                    <ProTable
                        columns={[{
                            title: '项目名称',
                            dataIndex: 'strucName',
                            ellipsis: true
                        },
                        {
                            title: '报表名称',
                            dataIndex: 'name',
                            ellipsis: true
                        },
                        {
                            title: '报表类型',
                            dataIndex: 'reportType',
                            render: (_,record) => {
                                return record.reportType !== null ? reportTypes[Number(record.reportType)] : '-'
                            }
                        },
                        {
                            title: '生成日期',
                            dataIndex: 'time',
                            ellipsis: true
                        },
                        {
                            title: '操作',
                            dataIndex: 'option',
                            render (t, r) {
                                let fileLinkArr = r.link.split('/');
                                let fileLink = r.link;
                                if (fileLinkArr.length) {
                                    let fileName = fileLinkArr[fileLinkArr.length - 1];
                                    fileLink = '';
                                    for (let i = 0; i < fileLinkArr.length - 1; i++) {
                                        fileLink += fileLinkArr[i] + '/'
                                    }
                                    fileLink += encodeURIComponent(fileName);
                                }
                                return (
                                    <Space>
                                        <a onClick={()=>{
                                            window.open(downloadFile(encodeURIComponent(r.link),encodeURIComponent(r.name)))
                                        }}>下载</a>
                                        <a onClick={() => {
                                            setRenameData({
                                                id: r.id,
                                                name: r.name
                                            })
                                        }}>重命名</a>
                                        <a onClick={() => {
                                            Modal.confirm({
                                                title: '删除文件',
                                                content: '确定删除文件【' + r.name + '】吗？',
                                                onOk () {
                                                    dispatch(dataService.deleteFile(r.id)).then(res => {
                                                        if (res.success) {
                                                            dispatch(removeFile(r.link, r.name));
                                                            getFiles()
                                                        }
                                                    });
                                                },
                                                onCancel () { },
                                            });
                                        }}>删除</a>
                                    </Space>
                                )
                            }
                        },]}
                        rowKey="id"
                        options={{
                            search: false,
                            reload: false
                        }}
                        search={false}
                        dateFormatter="string"
                        dataSource={reportShow}
                        pagination={{ ...Func.getPaginationStyle() }}
                    />
            </Spin>
            {
                renameData ?
                    <ReportRename
                        visible={Boolean(renameData)}
                        editData={renameData}
                        onClose={(reflash) => {
                            if (reflash) {
                                getFiles()
                            }
                            setRenameData(null)
                        }}
                    /> : ''
            }{
                showUpload ?
                    <UploadFiles
                        strucList={strucList}
                        closeUploadFilesModal={(refresh) => {
                            if (refresh) {
                                getFiles()
                            }
                            setShowUpload(false)
                        }}
                        fileTypeId={'2'}
                    /> : ''
            }
        </LayoutContent>
    )
}

function mapStateToProps (state) {
    const { auth, global, strucList } = state;
    return {
        requesting: strucList.isRequesting,
        actions: global.actions,
        user: auth.user,
        strucList: strucList.data || []
    };
}

export default connect(mapStateToProps)(DataReport);