import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Spin, Row, Col, Card, Button, Table, message, DatePicker, Input } from 'antd';
import { NoResource, ProcessForm } from '$components';
import { Request } from '@peace/utils';
import { buildFormSchemaByDataSourceUrl, Func } from '$utils';
import { getProcessById, createProcessDraft, getProcessFormFields, getFlowRecord } from '../../actions/workflowProcessForm'
import { getCompanyOrganization } from '../../actions/user';
import { SubmitApply } from '../buttonAuth';
import './index.less';

const ProcessApply = props => {
  const { dispatch, user, location, processData, successCallBack, processFormFields, processId } = props;


  const { processInstanceId, taskDefinitionKey, id: taskId } = location && location.state ? location.state : {};
  const { search } = location || {};
  const [processInfo, setProcessInfo] = useState();
  const [formSchema, setFormSchema] = useState();
  const [processNodes, setProcessNodes] = useState();
  const [startNodeId, setStartNodeId] = useState();
  const [isRequesting, setIsRequesting] = useState(true);
  const [xFormRef, setXFormRef] = useState(null);
  const [functionName, setFunctionName] = useState();
  const [expectTime, setExpectTime] = useState(null);
  const [formItemName, setFormItemName] = useState(null);

  const [parentData, setParentData] = useState();
  const [hiddenDraft, setHiddenDraft] = useState(false);
  const submitFormRef = useRef();


  useEffect(() => {
    // window.addEventListener('message', function (e) {
    //   if (e && e.data) {
    //     let temp = JSON.parse(e.data);
    //     if (temp.formData) {
    //       setParentData(temp.formData);
    //     }
    //     if (temp.options && temp.options.hiddenDraft) {
    //       setHiddenDraft(temp.options.hiddenDraft)
    //     }
    //   }
    // }, false);

    initInfo(user);

  }, []);

  const initInfo = (user) => {
    dispatch(getCompanyOrganization(user.companyId));
    dispatch(getProcessFormFields(processId));
    dispatch(getProcessById(processId)).then(res => {
      if (res.success) {
        const { data } = res.payload;
        if (data.form) {
          let processSchema = null;
          if (data.version && data.version.workflowProcessForm && data.version.workflowProcessForm.formSchema) {
            processSchema = data.version.workflowProcessForm.formSchema
          }

          setProcessInfo(data);
          if (data.version && data.version.bpmnJson) {
            setProcessNodes(data.version.bpmnJson);
            for (let key in data.version.bpmnJson) {
              let val = data.version.bpmnJson[key];
              if (val.type == 'bpmn:StartEvent') {
                setStartNodeId(key)
              }
            }
          }

          if (processSchema) {
            buildFormSchemaByDataSourceUrl(processSchema, Request, []).then((schema, sourceData) => {
              setFormSchema(schema);
              setIsRequesting(false)
            }).catch(err => {
              message.error('获取表单数据源失败，请重试!');
              setIsRequesting(false)
            })
          }
        }
      } else {
        setIsRequesting(false)
      }
    });
    if (processInstanceId) {
      dispatch(getFlowRecord({ procinstId: processInstanceId }));
    }
  }
  const btnClick = (functionName) => {
    setFunctionName(functionName)
    xFormRef.XFormSubmit();
  }

  const onSuccess = (info) => {
    if (successCallBack) {
      successCallBack()
      setIsRequesting(false);
    } else if (parent.postMessage) {
      let data = {
        type: 'saveSuccess'
      }
      parent.postMessage(JSON.stringify(data), '*')
    }
  }

  const submitApplyProps = {
    procKey: processInfo && processInfo.version ? processInfo.version.procKey : '',
    params: {
      taskId: taskId,
      processId: processId,
      versionId: processInfo && processInfo.version ? processInfo.version.id : '',
      processName: processInfo ? processInfo.name : '',
      groupName: processInfo ? processInfo.groupName : '',
      node: processNodes && startNodeId ? processNodes[startNodeId].name : '',
      user: {
        id: user && user.id,
        name: user && user.name,
        department: user && user.department
      },
      actionName: '提交申请',
      endAddress: processInfo ? processInfo.endAddress : '',
      syncInterface: processInfo ? processInfo.syncInterface : '',
      expectTime: expectTime,
      formItemName: formItemName,
      procinstVars: processFormFields.filter(f => f.isProcinstVar).map(v => v.code)
    },
    processNodes: processNodes,
    currentNodeId: startNodeId,
    statusChange: (requesting) => {
      setIsRequesting(requesting);
    },
    onSucessCallBack: onSuccess
  }
  const onCurrentRef = (ref) => {
    setXFormRef(ref);
  }

  const handFormSubmit = (formData) => {
    if (functionName == 'submitApply') {
      submitApply(formData);
    } else {
      saveDraft(formData);
    }
  }

  //保存草稿
  const saveDraft = (formData) => {
    const dataToSave = {
      processId: processId,
      versionId: processInfo && processInfo.version ? processInfo.version.id : '',
      formData
    }
    dispatch(createProcessDraft(dataToSave)).then(res => {
      if (res.success) {
        message.success('保存草稿成功');
        onSuccess();
        // sucessCallBack({
        //   type: 'draft',
        //   formData: formData
        // });
      } else {
        message.error('保存草稿失败');
      }
    })
  }

  //提交申请
  const submitApply = (formData) => {
    submitFormRef.current.submit(formData);
  }

  // const disabledDate = (current) => {
  //   return current && current < moment().subtract(1, 'days').endOf('day');
  // }
  // const range = (start, end) => {
  //   const result = [];
  //   for (let i = start; i < end; i += 1) {
  //       result.push(i);
  //   }
  //   return result;
  // };
  // const disabledTime = (date) => {
  //     const hours = moment().hours();
  //     const minutes = moment().minutes();
  //     const seconds = moment().seconds();
  //     // 当日只能选择当前时间之后的时间点
  //     if (date && moment(date).date() === moment().date()) {
  //         return {
  //             disabledHours: () => range(0, 24).splice(0, hours),
  //             disabledMinutes: () => range(0, 60).splice(0, minutes + 1),
  //             disabledSeconds: () => range(0, 60).splice(0, seconds + 1)
  //         };
  //     }
  //     return {
  //         disabledHours: () => [],
  //         disabledMinutes: () => [],
  //         disabledSeconds: () => []
  //     };
  // };
  const onDateChange = (date, dateString) => {
    setExpectTime(dateString);
  }
  const onInputChange = (e) => {
    const { value } = e.target;
    if (!value) {
      setFormItemName(null);
    } else if (value && value.trim() == "") {
      setFormItemName(null)
    } else { setFormItemName(value.trim()) }
  }
  return (<Spin spinning={isRequesting}>
    <div className='process-apply'>
      <Row className='process-apply_header'>
        {formSchema ? <Col span={24} className='process-apply_header-action'>
          <span>事项名称: </span>
          <Input
            style={{ marginRight: 15, width: 200 }}
            maxLength={50}
            defaultValue={processInfo ? processInfo.name : ''}
            onChange={onInputChange}
          />
          <span>期望完成时间: </span><DatePicker
            style={{ marginRight: 15 }}
            format="YYYY-MM-DD HH:00:00"
            //disabledDate={disabledDate}
            showTime={{ format: 'HH' }}
            onChange={onDateChange}
          />
          {hiddenDraft ? '' : <Button onClick={() => btnClick('saveDraft')}>保存草稿</Button>}
          <Button onClick={() => btnClick('submitApply')}>提交申请</Button>
          <SubmitApply ref={submitFormRef} {...submitApplyProps}></SubmitApply>
        </Col> : ''}

      </Row>
      <div className='process-apply_form'>
        {
          formSchema ?
            <ProcessForm
              formSchema={{
                ...formSchema,
                formData: {
                  ...formSchema.formData,
                  ...parentData
                }
              }}
              isRequesting
              onCurrentRef={onCurrentRef}
              // extFormSchema={extFormSchema}
              // extType={`frist`}
              // listItemTitles={listItemTitles}
              currentNode={startNodeId}
              onFormSubmit={handFormSubmit}
            // onCancel={this.handFormCancel}
            />
            : !isRequesting && <NoResource title={Number(processId) > 0 ? '未查询到该流程的表单' : '未查询到该流程'} />
        }
      </div>
    </div >
  </Spin>)
}

function mapStateToProps(state) {
  const { companyOrganization, auth, flowRecord, processFormFields } = state;
  let companyOrganization_ = companyOrganization.data || {};
  let userList = [];
  if (companyOrganization_.departments && companyOrganization_.departments.length > 0) {
    companyOrganization_.departments.map(v => {
      if (v.users && v.users.length > 0) {
        v.users.map(user => {
          if (!userList.find(val => val.id == user.id)) {
            let departmentsName = ''
            user.departments.map(a => {
              if (departmentsName == '') {
                departmentsName = a.name;
              } else {
                departmentsName = departmentsName + ',' + a.name;
              }
            });
            userList.push({
              id: user.id,
              key: user.id,
              name: user.name,
              department: departmentsName
            })
          }
        })

      }
    })
  }
  return {
    user: auth.user,
    flowRecord: flowRecord.data || [],
    processFormFields: processFormFields && processFormFields.data || [],
    userList: userList
  };
}

export default connect(mapStateToProps)(ProcessApply);
