import React, { useState } from 'react';
import { Button, Modal, Tabs } from 'antd';
import { ModalForm } from '@ant-design/pro-form';
import GeneralInfo from './info/general-info';
import BridgeUpper from './info/bridge-upper';
import BridgePier from './info/bridge-pier';
import BridgeAbutment from './info/bridge-abutment';
import AttachedProject from './info/bridge-project';
import AttachedPipeline from './info/attached-pipeline';

import moment from 'moment';
const { TabPane } = Tabs;

export default (props) => {
  const { title, text, editData = null, onFinish, onRefresh, bridges, constants, readOnly = false } = props;

  const [ activeTabKey, setActiveTabKey] = useState('info');
  const [changeTab, setChangeTab] = useState(null);
  const [modalVisit, setModalVisit] = useState(false);
  const [next,setNext] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(false);
 
  const formItemLayout = { labelCol: { span: 7 }, wrapperCol: { span: 17 } };
 
  const initialValues = editData ? {
    name: editData.name, 
    ...editData.extraInfo, 
    createdTime: editData.extraInfo && editData.extraInfo.createdTime ? moment(editData.extraInfo.createdTime).format('YYYYMMDD') : null
  } : {};
  
  const hasOpr = (tab) => {
    setChangeTab(tab)
  }
  const resetDot = () => {
    setChangeTab(null)
    
  }
  const leaveConfirm = (use, tab) => {
    const confirm = Modal.confirm;
 
    if (changeTab) {
        confirm({
            content: `当前页面信息已修改，是否放弃保存${use == 1 ? '并至下一页' : ''}？`,
            okText: '是',
            cancelText: '否',
            onOk() {
                //切走
                if (use == 1) {
                  setActiveTabKey(tab);
                  setChangeTab(null);
                } else if (use == 2) {
                  setModalVisit(false);
                  setChangeTab(null);
                  setActiveTabKey('info');
                  needRefresh && onRefresh()
                }
            },
            onCancel() {
              
            }
        });
    } else {
        if (use == 1) {
          setActiveTabKey(tab);
        } else if (use == 2) {
          setModalVisit(false);
          setActiveTabKey('info');
          needRefresh && onRefresh()
        }
    }
  }
  const onTabChange = (value) => {
    leaveConfirm(1, value);
  }
  const close = () => {
    setNext(false);
    leaveConfirm(2, null);
  }
  const toNext = () => {
    let tabArray = ['info', 'upper', 'pier', 'abutment', 'project', 'pipeline'];
    let nowIndex = tabArray.findIndex(a => a == activeTabKey);
    setActiveTabKey(tabArray[nowIndex == 5 ? 0 : nowIndex + 1])
  }
  
  return (
    <ModalForm
      title={title || ''}
      initialValues={initialValues}
      visible={modalVisit}
      //onVisibleChange={setModalVisit}
      trigger={<a onClick={()=>{ setModalVisit(true)}}>{text}</a>}
      layout="horizontal"
      {...formItemLayout}
      modalProps={{
        destroyOnClose: true,
        closable: false,
        maskClosable: false
      }}
      width={'90%'}
      submitter={{
        render: (props, defaultDoms) => {
          return readOnly ? [
            <Button type="default" key="close" onClick={close}>关闭</Button>
          ]
            :[
            <Button type="primary" key="current" onClick={() => {
                setNext(false);
                props.submit();
                
              }}
            >保存当前页</Button>,
            <Button type="primary" key="next" onClick={() => {
                setNext(true)
                props.submit();
              }}
            >保存并至下一页</Button>,
            <Button type="default" key="close" onClick={close}>关闭</Button>
          ];
        },
      }}
      onFinish={async (values) => {
        const res =  await onFinish(values, editData, next);
        if(res){
          setNeedRefresh(true);
          if(res.success){
            if(next){
              setChangeTab(null);
              toNext();
            }else{
              onRefresh();
            }   
          }
        }
        return false;
      }}
    >
          <Tabs activeKey={activeTabKey} onChange={onTabChange} animated>
                <TabPane tab={`桥梁一般信息`} key="info">
                  <GeneralInfo readOnly={readOnly} bridges={bridges} constants={constants} editData={editData} hasOpr={hasOpr} resetDot={resetDot} close={close} toNext={toNext} />
                </TabPane>
                  
                <TabPane tab={`桥梁上部结构`} key="upper">
                  <BridgeUpper readOnly={readOnly} bridges={bridges} constants={constants} editData={editData} hasOpr={hasOpr} resetDot={resetDot} close={close} toNext={toNext} />
                </TabPane>

                <TabPane tab={`下部结构（桥墩）`} key="pier">
                  <BridgePier readOnly={readOnly} bridges={bridges} constants={constants} editData={editData} hasOpr={hasOpr} resetDot={resetDot} close={close} toNext={toNext} />
                </TabPane>

                <TabPane tab={`下部结构（桥台）`} key="abutment">
                  <BridgeAbutment readOnly={readOnly} bridges={bridges} constants={constants} editData={editData} hasOpr={hasOpr} resetDot={resetDot} close={close} toNext={toNext} />
                </TabPane>

                <TabPane tab={`附属工程`} key="project">
                  <AttachedProject readOnly={readOnly} bridges={bridges} constants={constants} editData={editData} hasOpr={hasOpr} resetDot={resetDot} close={close} toNext={toNext} />
                </TabPane>

                <TabPane tab={`附属管线`} key="pipeline">
                  <AttachedPipeline readOnly={readOnly} bridges={bridges} constants={constants} editData={editData} hasOpr={hasOpr} resetDot={resetDot} close={close} toNext={toNext} />
                </TabPane>
            </Tabs>
      
    </ModalForm>
  );
};