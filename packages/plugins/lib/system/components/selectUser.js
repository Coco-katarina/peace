import React, { useState, useEffect } from 'react';
import { Modal, Button, message, Transfer } from 'antd';
import { useBoolean } from 'ahooks';
import ProCard from '@ant-design/pro-card';
import DepartmentTree from './departmentTree';
import { Func } from '$utils';

export default (props) => {
  const { authorData = [], enterprises, disabled, selectUsers, onFinish, title, oneWay, noDel } = props;
  
  const [ state, { setTrue, setFalse }] = useBoolean(false);
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [selectDepartment, setSelectDepartment] = useState(null);

  useEffect(() => {
    const selectIds = selectUsers.map(v=> v.id);
    setTargetKeys(selectIds);
  }, [selectUsers]);

  const onChange = (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const handleOk = (e) => {
    const userIds = selectUsers.map(v=> v.id).sort();    
    if(userIds.toString() != targetKeys.sort().toString()){
        onFinish && onFinish(targetKeys);
        setFalse()
    }else{
        message.info('未做任何修改!')
    }
    
  }
  const handleSelectedNode = (node) => {    
    setSelectDepartment(node);
  }

  const handleCancel = (e) => {
    setFalse()
  }

  const memberData = selectDepartment ? Func.getMembersByTree(selectDepartment) : [];
 
  return (
    <>
      <Button type="primary" ghost style={{ marginRight: 15 }} disabled={disabled} onClick={e => setTrue()}>{title || '选择用户'}</Button>
      <Modal title={title || '选择用户'} bodyStyle={{maxHeight: 600, overflow: 'scrollY'}} destroyOnClose visible={state} onOk={handleOk} onCancel={handleCancel} width='60%' style={{minWidth: 600}}>
        <ProCard split="vertical">
            <ProCard colSpan="30%">
                    <DepartmentTree 
                        dataList={authorData}
                        enterprises={enterprises}
                        onSelectedDepartment={handleSelectedNode}
                    />
            </ProCard>
            <ProCard>
                <Transfer
                    dataSource={noDel ? memberData.map(v=> {return {...v, disabled : selectUsers.map(s=> s.id).includes(v.id)}}) : memberData}
                    rowKey={record => record.id}
                    titles={['未选用户', '已选用户']}
                    targetKeys={targetKeys}
                    selectedKeys={selectedKeys}
                    onChange={onChange}
                    onSelectChange={onSelectChange}
                    //onScroll={onScroll}
                    oneWay={oneWay || false}
                    render={item => item.name}
                    listStyle={{height: 400}}
                />
            </ProCard>
        </ProCard>
      </Modal>
    </>
  );
};