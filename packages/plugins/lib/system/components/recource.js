'use strict';
import React, { useState, useEffect } from 'react';
import { Row, Col, Checkbox, Button, Card } from 'antd';

//权限资源组件 
const Resource = (props) => {
      const { resourceData, checkedlist, disabled, onPostResourcesSave } = props;
    
      const [checkedList, setCheckedList] = useState({});
      const [indeterminate, setIndeterminate] = useState({});
      const [checkAll, setCheckAll] = useState({});

      useEffect(() => {
        getInitStates();
      }, [resourceData,checkedlist]);

       //选中数据处理
       const getInitStates = () => {
        let obj = {
            initCheckedList: {},
            initIndeterminate: {},
            initCheckAll: {}
        };
        //处理权限是否选中
        const data = resourceData.map(item => {
            const findItem = checkedlist.some(s => s.resourceId == item.id);
            let obj = {
                id: item.id,
                name: item.name,
                children: []
            }
            if(findItem){
                  obj.checked = true; 
            }else{
                 obj.checked = false
            }
            obj.children = item.children.map(child => {
                let childObj = {
                     id: child.id,
                     name: child.name,     
                }
                if(checkedlist.some(s => s.resourceId == child.id)){
                  childObj.checked = true;
                }else{
                  childObj.checked = false;
                } 
                return childObj;
            })
            return obj;
        });
        data.forEach(value => {
            obj.initCheckAll[value.id] = value.checked;
            obj.initCheckedList[value.id] = value.children.filter(f => f.checked).map(m=> m.id);
            obj.initIndeterminate[value.id] = value.children.some(s => s.checked ) && value.children.some(s => !s.checked )

        })
        setCheckedList(obj.initCheckedList);
        setIndeterminate(obj.initIndeterminate);
        setCheckAll(obj.initCheckAll)
      }

     
      const onChange = (value,item) => {
        
        let newCheckedList = {...checkedList};
        newCheckedList[item.id] = value
        setCheckedList(newCheckedList);

        let newCheckAll = {...checkAll};
        newCheckAll[item.id] = item.children.length === newCheckedList[item.id].length;
        setCheckAll(newCheckAll);

        let newIndeterminate = {...indeterminate};
        newIndeterminate[item.id] = !!newCheckedList[item.id].length && (newCheckedList[item.id].length < item.children.length);
        setIndeterminate(newIndeterminate);
      };
    
      const onCheckAllChange = (e,item) => {
          let newCheckAll = {...checkAll};
          newCheckAll[item.id] = e.target.checked;
          setCheckAll(newCheckAll);

          let newCheckedList = {...checkedList};
          newCheckedList[item.id] = e.target.checked ? item.children.map(m=> m.id) : [];
          setCheckedList(newCheckedList);

          let newIndeterminate = {...indeterminate};
          newIndeterminate[item.id] = false;
          setIndeterminate(newIndeterminate);

      };


      const onCheckAll = (e) => {
            let obj = {
                initCheckedList: {},
                initIndeterminate: {},
                initCheckAll: {}
            };
            resourceData.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    children: item.children.map(child => {
                        return {
                             id: child.id,
                             name: child.name,
                             checked: e.target.checked    
                        }
                       
                    }),
                    checked: e.target.checked
                }  
            }).forEach(value => {
                obj.initCheckAll[value.id] = value.checked;
                obj.initCheckedList[value.id] = value.children.filter(f => f.checked).map(m=> m.id);
                obj.initIndeterminate[value.id] = value.children.some(s => s.checked ) && value.children.some(s => !s.checked )
    
            })
            setCheckedList(obj.initCheckedList);
            setIndeterminate(obj.initIndeterminate);
            setCheckAll(obj.initCheckAll)
        
        
      }
      const renderCheckboxGroups = (item) => {
      
        const childreResourceCount = item.children.length;
        return (
            <Checkbox.Group style={{width: '100%'}}  disabled={disabled} value={checkedList[item.id]}  onChange={value => onChange(value, item)}>
                        <Row gutter={[16,16]}>
                        {
                            item.children.map(v => (
                                <Col span={childreResourceCount > 3 ? 8 : 24/childreResourceCount} key={v.id}>
                                    <Checkbox value={v.id}>{v.name}</Checkbox>
                                </Col>
                                
                            ))
                        }
                        </Row>
            </Checkbox.Group>
        )
      }
      const onHandleSave = () => {
          let data = [];
          Object.keys(checkedList).map(key => {
              if(checkAll[key] || checkedList[key].length > 0){
                data.push(key)
              }
              checkedList[key].forEach(k => {
                  data.push(k)
              })
          })
         
          onPostResourcesSave && onPostResourcesSave(data)
      }

   
      const renderItem = () => {
          
          return resourceData && resourceData.map(item=> (
                <Col span={8} key={item.id}>
                    <Card 
                        title={<Checkbox 
                                    checked={checkAll[item.id]} 
                                    disabled={disabled} 
                                    indeterminate={indeterminate[item.id]}  
                                    onChange={(e) => onCheckAllChange(e, item)}>{item.name}
                                </Checkbox>
                        }>
                        {renderCheckboxGroups(item)}
                    </Card>
                </Col>
                
                )
            )
      }
        
    

    return (
        <div>
            <Row gutter={16} style={{marginTop: 20 }}>
                <Col span={24}>
                    <span style={{fontSize: 16, marginRight: 10}}>角色权限</span>
                    <Checkbox 
                        disabled={disabled}
                        checked={resourceData.every(v=> checkAll[v.id])} 
                        onChange={onCheckAll}>全部权限
                    </Checkbox>
                </Col>
            </Row>
            <Row style={{marginTop: 20 }} gutter={[16,16]}>
                {renderItem()}
            </Row>
            {
                !disabled && <Row style={{marginTop: 20 }}>
                <Col span={6}>
                     <Button type="primary" onClick={onHandleSave}>保存修改</Button>        
                </Col>
            </Row>
            }
        </div>
    );
  
  };


export default Resource;