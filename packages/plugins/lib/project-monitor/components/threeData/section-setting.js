 import React, { Component, useEffect } from 'react';
 import { connect } from 'react-redux';
 import { Radio, Collapse, Input, Modal, Form, Button, Tooltip, Icon } from 'antd';
 import { CameraOutlined } from '@ant-design/icons';
 
 import { getHeatMap } from '../../actions/threeHeatMap';
 import { createPointsImg, modifyPointsImg, deletePointsImg, cleanUpTrashImg } from '../../actions/pointsLayoutInfo';

 import boxStyle from './style.css';
 import { PinyinHelper } from '@peace/utils';
 const Search = Input.Search;
 const FormItem = Form.Item;
 
 const CollectionCreateForm = (props) => {
        const [form] = Form.useForm();
        const { visible, sections, onCancel, onCreate, isEdit, title, confirmLoading, dataURL, onUpdateImg,
             selectedSection, hasClickOk, saveFormRef } = props;
         const checkName = async (rule, value) => {
             if (!/^[\w\u4e00-\u9fa5]+$/gi.test(value)) {
                 return Promise.reject('不能包含特殊字符');
                
             } else if (sections.filter(s => s.name == value).length) {
                 if (!isEdit || (isEdit && sections.filter(s => s.name == value)[0].id != selectedSection.id)) {
                     return Promise.reject('截面名称重复');
                 } 
             } 
             return Promise.resolve();
         }
         useEffect(() => {
            saveFormRef && saveFormRef(form)
          })
         
         return (
             <Modal
                 visible={visible}
                 title={title}
                 okText="保存"
                 cancelText="取消"
                 onCancel={onCancel}
                 onOk={onCreate}
                 confirmLoading={confirmLoading && hasClickOk}
                 maskClosable={false}
             >
                 <Form layout="vertical"  form={form}>
                     <FormItem label="截面名称" name='sectionName' rules={[{ required: true, message: '截面名称不能为空!' },
                             { required: true, max: 20, message: '长度不超过20个字符' },
                             { validator: checkName }]}>
                             <Input maxLength={20} />
                     </FormItem>
                     <FormItem label="截面图">
                         {isEdit ? <Button type="primary" icon={<CameraOutlined />} size="small" onClick={onUpdateImg} >更新截面图</Button> : null}
                         <img id="imgObj" alt="截面图" width="100%" src={dataURL} />
                     </FormItem>
                 </Form>
             </Modal>
         );
}
 
 class SectionSetting extends Component {
     constructor(props) {
         super(props);
         this.state = {
             visible: false,
             isEdit: false,
             title: '新增截面',
             selectedSection: null,
             dataURL: '',
             dataSource: [],
         };
         this.form = null;
     }
 
     UNSAFE_componentWillMount() {
         this.setState({ dataSource: this.props.sections });
     }
 
     // componentWillReceiveProps(nextProps) {
     //     if (this.props.sections !== nextProps.sections) {
     //         this.setState({ dataSource: nextProps.sections });
     //     }
     // }
 
     _remove = (section) => {
         const _this = this;
         Modal.confirm({
             title: '删除截面',
             content: `确认删除【${section.name}】？`,
             okText: '是',
             cancelText: '否',
             onOk() {
                 _this.onRemoveSection(section.id);
             },
             onCancel() {
             },
         });
     };
 
     _modify = (section) => {
         this.form.setFieldsValue({
             sectionName: section.name,
         });
 
         this.setState({
             visible: true,
             title: '编辑截面',
             isEdit: true,
             selectedSection: section,
             dataURL: section.portrait,
             hasClickOk: false
         });
     };
 
     handleOk = () => {
         const { onSaveSection, isSaving, structId } = this.props;
         const { selectedSection, isEdit, dataURL } = this.state;
         const { camera: {position, rotation}, controls: { current } } = this.props.react3;
        
         this.setState({ hasClickOk: true })
         const form = this.form;
         let that = this;
         form.validateFields().then(values => {
            if (isEdit) {
                selectedSection.name = values.sectionName;
                selectedSection.structId = structId;
                selectedSection.portrait = dataURL;
                selectedSection.camera = { "position": position, "rotation": rotation, "target": current.target };
                that.onSaveSection(selectedSection, true);

            } else {
                const section = {
                    sectionId: 0,
                    name: values.sectionName,
                    sectionType: 4,
                    structId: structId,
                    imgPath: "",
                    camera: { "position": position, "rotation": rotation, "target": current.target },
                    portrait: dataURL,
                };

                that.onSaveSection(section, false);
            }
         })
     };
 
 
     handleUpdateImg = () => {
         const { react3: {
             renderer, canvas, scene, camera
         } } = this.props;
 
         renderer.render(scene, camera);
         let dataURL = canvas.toDataURL();
         this.setState({
             dataURL: dataURL,
         });
     };
 
     showModal = () => {
         const { react3: {
             renderer, canvas, scene, camera
             
         } } = this.props;
        
         renderer.render(scene, camera);

         let dataURL = canvas.toDataURL();
         
         this.setState({
             visible: true,
             title: '新增截面',
             isEdit: false,
             dataURL: dataURL,
         });
 
     };
     handleCancel = () => {
         this.form.resetFields();
         this.setState({
             visible: false,
             selectedSection: null,
         });
     };
     saveFormRef = (form) => {
         this.form = form;
     };
 
     _handleInputChange = (e) => {
         const { sections } = this.props;
         let input = e.target.value;
         let rslt = sections.filter(s =>
             s.name.indexOf(input) != -1
             || PinyinHelper.isPinyinMatched(s.name, input));
         this.setState({ dataSource: rslt })
     };
 
     _renderSections = () => {
         const { user } = this.props;
         const resources = user.resources;
         const ModifySection = resources.length == 0 ? false : resources.indexOf("007003") > -1 ? true : false;
         const DeleteSection = resources.length == 0 ? false : resources.indexOf("007003") > -1 ? true : false;
 
         let sections = this.state.dataSource;
        
         const style = {
             overflow: 'hidden',
             whiteSpace: 'nowrap',
             textOverflow: 'ellipsis',
             width: '150px',
             cursor: 'pointer'
         };
 
         let sectionLis = sections.map((s) => {
             return <li className={boxStyle.fix} key={s.id}>
                 <Tooltip style={{ width: 250 }} placement={'left'} title={<img style={{ width: '100%', cursor: 'pointer' }}
                     src={s.portrait} />} >
                     <span className={boxStyle.l} style={style} title={s.name}>{s.name}</span>
                 </Tooltip>
                 {ModifySection ? <a style={{ color: '#108ee9' }}><span onClick={() => this._modify(s)} className={boxStyle.r}>编辑</span></a> : null}
                 {ModifySection && DeleteSection ? <span className={boxStyle.separator}>|</span> : null}
                 {DeleteSection ? <a style={{ color: '#108ee9' }}><span onClick={() => this._remove(s)} className={boxStyle.r}>删除</span></a> : null}
             </li>
         });
 
         return sectionLis;
     };
 
     onRemoveSection = (sectionId) => {
         const { params, dispatch } = this.props;
         dispatch(deletePointsImg(sectionId))
             .then(() => {
                 this.setState({ visible: false })
                 this.props.dispatch(getHeatMap(params.id, "3D"))
             });
     };
 
     onSaveSection = (section, isEdit) => {
         const { params, dispatch } = this.props;
         if (isEdit) {
             const heatmap = Object.assign({}, { name: section.name, typeId: section.type.id, camera: section.camera, portrait: section.portrait });
             const params_ = Object.assign({}, { heatmap: heatmap });
             dispatch(modifyPointsImg(section.id, params_))
                 .then(() => {
                     this.closeModal()
                     dispatch(getHeatMap(params.id, "3D"))
                 });
         } else {
             const heatmap = Object.assign({}, { name: section.name, typeId: 4, camera: section.camera, portrait: section.portrait });
             const params_ = Object.assign({}, { heatmap: heatmap, model: '3D' });
             dispatch(createPointsImg(params.id, params_))
                 .then(() => {
                     this.closeModal()
                     dispatch(getHeatMap(params.id, "3D"));
                 });
         }
     };
 
     closeModal = () => {
         const form = this.form;
         this.setState({ visible: false, dataURL: '' })
         form.resetFields();
     }
 
     render() {
         const { isEdit, visible, title, dataSource, selectedSection, hasClickOk } = this.state;
         const { user, sections } = this.props;
 
         const resources = user.resources;
         const AddSection = resources.length == 0 ? false : resources.indexOf("007003") > -1 ? true : false;
 
         return (<div className={boxStyle.container}>
             <div className={boxStyle.sensor_list}>
                 {AddSection ? <Radio.Group className={boxStyle.select_btns}>
                     <Radio.Button onClick={this.showModal}>新增</Radio.Button>
                 </Radio.Group>
                     : null}
                 <div className={boxStyle.sensors_box}>
                     <Collapse accordion style={{ backgroundColor: 'transparent' }}>
                         <div>
                             <Search style={{ width: 244, margin: 5 }} placeholder="Search" onChange={this._handleInputChange} />
                             <ul className={boxStyle.sensors}>
                                 {this._renderSections()}
                             </ul>
                         </div>
                     </Collapse>
                 </div>
             </div>
             <CollectionCreateForm
                 isEdit={isEdit}
                 title={title}
                 saveFormRef={this.saveFormRef}
                 sections={sections}
                 visible={visible}
                 onCancel={this.handleCancel}
                 onCreate={this.handleOk}
                 onUpdateImg={this.handleUpdateImg}
                 confirmLoading={this.props.isSaving}
                 dataURL={this.state.dataURL}
                 selectedSection={selectedSection}
                 hasClickOk={hasClickOk}
             />
         </div>
         );
     }
 }
 
 function mapStateToProps(state) {
     const { auth } = state;
 
     return {
         user: auth.user
     }
 }
 
 export default connect(mapStateToProps)(SectionSetting)
 
 